import { ExecutorContext, readTargetOptions } from '@nx/devkit';
import { sync as fastGlobSync } from 'fast-glob';
import { readFileSync, readdirSync, renameSync, writeFileSync } from 'fs';
import { join, parse, resolve } from 'path';
import { Application, DefaultTheme, PageEvent, Reflection, TSConfigReader, TypeDocOptions } from 'typedoc';
import { CompileTypedocExecutorSchema } from './schema';
import { FdThemeContext } from './theme';

export class FdTheme extends DefaultTheme {
    private _contextCache?: FdThemeContext;

    override getRenderContext(pageEvent: PageEvent<Reflection>): FdThemeContext {
        this._contextCache ||= new FdThemeContext(this, pageEvent, this.application.options);
        return this._contextCache;
    }
}

export default async function compileTypedocs(_options: CompileTypedocExecutorSchema, context: ExecutorContext) {
    const projectPath = context.projectsConfigurations?.projects[context.projectName as string].root as string;
    const { outputPath } = readTargetOptions(
        {
            project: context.projectName as string,
            target: context.targetName as string,
            configuration: context.configurationName
        },
        context
    );
    const tsConfig: string =
        _options.tsConfig ||
        readTargetOptions({ project: context.projectName as string, target: 'build' }, context).tsConfig;
    const ngPackageJsonFiles = fastGlobSync(projectPath + '/**/*/ng-package.json');
    const entryPoints = ngPackageJsonFiles.map((f) => {
        const json = JSON.parse(readFileSync(f, 'utf-8'));
        const main = json.lib.entryFile;
        return resolve(parse(f).dir, main);
    });

    const app = await Application.bootstrapWithPlugins({
        tsconfig: tsConfig,
        out: outputPath,
        json: join(outputPath, 'typedoc.json'),
        entryPoints,
        hideGenerator: true,
        excludePrivate: true,
        excludeExternals: true,
        plugin: ['typedoc-plugin-merge-modules'],
        mergeModulesRenameDefaults: true,
        mergeModulesMergeMode: 'project',
        theme: 'fd-typedoc'
    } as unknown as Partial<TypeDocOptions>);
    app.options.addReader(new TSConfigReader());

    app.renderer.defineTheme('fd-typedoc', FdTheme);

    const project = await app.convert();

    if (!project) {
        return { success: false };
    }

    const outputDir = outputPath;

    await app.generateDocs(project, outputDir);
    await app.generateJson(project, join(outputDir, 'typedoc.json'));

    for (const f of getFiles(outputPath)) {
        const contents = readFileSync(f, 'utf-8').replace(`<!DOCTYPE html>\n`, '');
        writeFileSync(f, contents);
        renameSync(f, f.toLocaleLowerCase());
    }
    return { success: true };
}

function getFiles(dir): string[] {
    const items = readdirSync(dir, { withFileTypes: true });
    let files: string[] = [];
    for (const item of items) {
        if (item.isFile() && item.name.endsWith('.html')) {
            files.push(`${dir}/${item.name}`);
        }
        if (item.isDirectory()) {
            files = [...files, ...getFiles(`${dir}/${item.name}`)];
        }
    }
    return files;
}
