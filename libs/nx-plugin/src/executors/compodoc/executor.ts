import {
    ExecutorContext,
    getOutputsForTargetAndConfiguration,
    logger,
    parseTargetString,
    ProjectGraph
} from '@nx/devkit';
import { readFileSync, writeFileSync } from 'fs';
import merge from 'lodash/merge';
import { Schema } from './schema';

const readEntities = (collection: Record<string, Array<any>> | Array<any>, entities: string[]) => {
    if (Array.isArray(collection)) {
        return collection.filter(({ name }) => entities.indexOf(name) > -1);
    }
    return Object.keys(collection).reduce(
        (acc: any[], key) => [...acc, ...readEntities(collection[key], entities)],
        []
    );
};

export default async function runExecutor(
    options: Schema,
    executorContext: ExecutorContext
): Promise<{ success: boolean }> {
    const executorDependencies: string[] = (executorContext.target?.dependsOn as string[]) || [];
    const projectGraph = executorContext.projectGraph as ProjectGraph;
    const depFiles = executorDependencies.reduce((acc: string[], t: string) => {
        const targ = parseTargetString(t, projectGraph);
        const proj = projectGraph.nodes[targ.project];
        return [...acc, ...getOutputsForTargetAndConfiguration({ target: targ, overrides: null }, proj)];
    }, []);
    if (depFiles.length === 0) {
        logger.error(`No documentation.json files found for dependencies of ${executorContext.targetName}`);
        return { success: false };
    }
    const outputFileContents = depFiles.reduce((acc: any, f: string) => {
        const fileContent = JSON.parse(readFileSync(f).toString());
        return merge(acc, fileContent);
    }, {});
    const entities = readEntities(outputFileContents, options.entities);
    const foundEntities = new Set(entities.map(({ name }) => name));
    const missingEntities = options.entities.filter((e) => !foundEntities.has(e));
    if (missingEntities.length > 0) {
        logger.warn(`Could not find documentation for the following entities: ${missingEntities.join(', ')}`);
    }
    writeFileSync(options.outputPath, JSON.stringify(entities, null, 2));
    return { success: true };
}
