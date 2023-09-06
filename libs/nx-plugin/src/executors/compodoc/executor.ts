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
    const entities = Object.keys(outputFileContents).reduce((acc: any[], key) => {
        const value = outputFileContents[key];
        if (Array.isArray(value)) {
            const entitiesFromValue = value.filter(({ name }) => options.entities.indexOf(name) > -1);
            acc.push(...entitiesFromValue);
        }
        return acc;
    }, []);
    writeFileSync(options.outputPath, JSON.stringify(entities, null, 2));
    return { success: true };
}
