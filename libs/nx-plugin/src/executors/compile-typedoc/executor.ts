import { ExecutorContext, readTargetOptions } from '@nx/devkit';
import { readFileSync, readdirSync, renameSync, writeFileSync } from 'fs';
import { join } from 'path';
import { Application, DefaultTheme, PageEvent, Reflection, TSConfigReader } from 'typedoc';
import { FdThemeContext } from './theme';
import { CompileTypedocExecutorSchema } from './schema';

export class FdTheme extends DefaultTheme {
    private _contextCache?: FdThemeContext;

    override getRenderContext(pageEvent: PageEvent<Reflection>): FdThemeContext {
        this._contextCache ||= new FdThemeContext(this, pageEvent, this.application.options);
        return this._contextCache;
    }
}

export default async function compileTypedocs(_options: CompileTypedocExecutorSchema, context: ExecutorContext) {
    const projectPath = context.workspace?.projects[context.projectName as string].sourceRoot as string;
    const { outputPath } = readTargetOptions(
        {
            project: context.projectName as string,
            target: context.targetName as string,
            configuration: context.configurationName
        },
        context
    );
    const { buildTarget = 'build' } = context.workspace?.projects[context.projectName as string] as any;
    const { tsConfig } = readTargetOptions({ project: context.projectName as string, target: buildTarget }, context);

    const app = new Application();
    app.options.addReader(new TSConfigReader());

    app.renderer.defineTheme('fd-typedoc', FdTheme);

    app.bootstrap({
        tsconfig: tsConfig,
        out: outputPath,
        json: join(outputPath, 'typedoc.json'),
        entryPoints: [projectPath],
        hideGenerator: true,
        excludePrivate: true,
        excludeExternals: true,
        compilerOptions: {
            jsx: 'react',
            jsxFactory: 'JSX.createElement',
            jsxFragmentFactory: 'JSX.Fragment'
        },
        theme: 'fd-typedoc'
    });

    const project = app.convert();

    if (!project) {
        return;
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
