import { ExecutorContext, readTargetOptions } from '@nrwl/devkit';
import { execSync } from 'child_process';
import { readdirSync, renameSync } from 'fs';

export default async function compileTypedocs(_options: any, context: ExecutorContext) {
    const projectPath = context.workspace?.projects[context.projectName as string].sourceRoot;
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
    execSync(
        `npx typedoc --out ${outputPath} ${projectPath} --tsconfig ${tsConfig} --hideGenerator --theme apps/docs/src/fd-typedoc`,
        { stdio: 'inherit' }
    );

    for (const f of getFiles(outputPath)) {
        await renameSync(f, f.toLocaleLowerCase());
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
