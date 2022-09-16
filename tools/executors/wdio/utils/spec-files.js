'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.specFiles = void 0;
const devkit_1 = require('@nrwl/devkit');
const get_projects_1 = require('./get-projects');
async function specFiles(options, context) {
    const projects = await (0, get_projects_1.getProjects)(
        context,
        options.affected,
        options.affected ? options.base : undefined,
        options.affected ? options.head : undefined
    );
    return await getSpecFiles(projects, context);
}
exports.specFiles = specFiles;
async function getSpecFiles(projects, context) {
    if (!context.projectGraph) {
        throw new Error('Project graph not available. Nx Console did not gave it to us.');
    }
    const projectGraph = context.projectGraph;
    const directProjectDependencies = projectGraph.nodes[context.projectName].data.files.reduce((deps, file) => {
        if (file.deps) {
            file.deps.filter((dep) => !!context.workspace.projects[dep]).forEach((dep) => deps.add(dep));
        }
        return deps;
    }, new Set());
    if (directProjectDependencies.size === 0) {
        return [];
    }
    const dependencies = projects.filter(
        (p) => directProjectDependencies.has(p) && projectGraph.nodes[p].data.targets.e2e
    );
    const specFiles = [];
    for (const dependency of dependencies) {
        const targetOptions = (0, devkit_1.readTargetOptions)(
            { project: dependency, target: 'e2e', configuration: context.configurationName },
            context
        );
        if (targetOptions.e2eFiles && targetOptions.e2eFiles.length > 0) {
            devkit_1.logger.info(`Including spec files from ${dependency}`);
            specFiles.push(...targetOptions.e2eFiles);
        }
    }
    return specFiles;
}
//# sourceMappingURL=spec-files.js.map
