'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const devkit_1 = require('@nrwl/devkit');
const child_process_1 = require('child_process');
const fs_1 = require('fs');
async function compileTypedocs(_options, context) {
    const projectPath = context.workspace.projects[context.projectName].sourceRoot;
    const { outputPath } = (0, devkit_1.readTargetOptions)(
        {
            project: context.projectName,
            target: context.targetName,
            configuration: context.configurationName
        },
        context
    );
    const { buildTarget = 'build' } = context.workspace.projects[context.projectName];
    const { tsConfig } = (0, devkit_1.readTargetOptions)(
        { project: context.projectName, target: buildTarget },
        context
    );
    (0, child_process_1.execSync)(
        `npx typedoc --out ${outputPath} ${projectPath} --tsconfig ${tsConfig} --hideGenerator --theme apps/docs/src/fd-typedoc`,
        { stdio: 'inherit' }
    );
    for (const f of getFiles(outputPath)) {
        await (0, fs_1.renameSync)(f, f.toLocaleLowerCase());
    }
    return { success: true };
}
exports.default = compileTypedocs;
function getFiles(dir) {
    const items = (0, fs_1.readdirSync)(dir, { withFileTypes: true });
    let files = [];
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
//# sourceMappingURL=index.js.map
