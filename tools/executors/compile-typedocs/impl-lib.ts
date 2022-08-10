import { ExecutorContext } from '@nrwl/devkit';
import { rmdirSync, existsSync } from 'fs';
import * as childProcess from 'child_process';

export default async function compileTypedocs(_options: any, context: ExecutorContext) {
    const outPath = `apps/docs/src/assets/typedoc/${context.projectName}`;
    const projectName: string = context.projectName as unknown as string;
    if (existsSync(outPath)) {
        console.log(`Deleting previous docs: ${outPath}`);
        rmdirSync(outPath, { recursive: true });
        console.log(`Deleted previous docs: ${outPath}`);
    } else {
        console.log(`Could not find ${outPath}, skipping deletion`);
    }
    const projectConfig = context.workspace.projects[projectName];
    const projectRoot = projectConfig.root;
    const projectTsConfig = `${projectRoot}/tsconfig.${projectConfig.projectType === 'library' ? 'lib' : 'app'}.json`;
    childProcess.execSync(
        `typedoc --out ${outPath} ${projectRoot} --tsconfig ${projectTsConfig} --hideGenerator --theme apps/docs/src/fd-typedoc`
    );
    return { success: true };
}
