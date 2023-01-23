import { ExecutorContext, logger, ProjectGraph, readTargetOptions } from '@nrwl/devkit';
import { TestAppOptions } from '../test-app/options.type';
import { getProjects } from './get-projects';

export async function specFiles(options: TestAppOptions, context: ExecutorContext): Promise<string[]> {
    const projects = await getProjects(
        context,
        options.affected,
        options.affected ? options.base : undefined,
        options.affected ? options.head : undefined
    );
    return await getSpecFiles(projects, context);
}

async function getSpecFiles(projects: string[], context: ExecutorContext): Promise<string[]> {
    if (!context.projectGraph) {
        throw new Error('Project graph not available. Nx Console did not gave it to us.');
    }
    const projectGraph = context.projectGraph as ProjectGraph;
    const directProjectDependencies = projectGraph.nodes[context.projectName as string].data.files.reduce(
        (deps, file) => {
            if (file.deps) {
                file.deps.filter((dep) => !!context.workspace?.projects[dep]).forEach((dep: string) => deps.add(dep));
            }
            return deps;
        },
        new Set<string>()
    );
    if (directProjectDependencies.size === 0) {
        return [];
    }
    const dependencies = projects.filter(
        (p) => directProjectDependencies.has(p) && projectGraph.nodes[p].data.targets?.e2e
    );
    const e2eFiles: string[] = [];
    for (const dependency of dependencies) {
        const targetOptions: { e2eFiles?: string[] } = readTargetOptions(
            { project: dependency, target: 'e2e', configuration: context.configurationName },
            context
        );
        if (targetOptions.e2eFiles && targetOptions.e2eFiles.length > 0) {
            logger.info(`Including spec files from ${dependency}`);
            e2eFiles.push(...targetOptions.e2eFiles);
        }
    }
    return e2eFiles;
}
