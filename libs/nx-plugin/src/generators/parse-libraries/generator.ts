import { Tree } from "@nrwl/devkit";
import { ParseLibrariesSchema } from "./schema";
import { join } from "path";
import { buildProjectGraphWithoutDaemon } from "@nx/workspace/src/core/project-graph";
import { createProjectRootMappings, findProjectForPath } from "nx/src/project-graph/utils/find-project-for-path";
import { get } from "lodash";
import { ProjectConfiguration } from "@nx/devkit";
import { getDocLibraryImportPaths } from "./get-doc-library-import-paths";
import { docJsonEntityTypes } from "./docJsonEntityTypes";
import { printChanges } from "nx/src/generators/tree";

// import { execSync } from "child_process";


interface ComponentData {

}

interface DirectiveData {

}

interface PipeData {

}

interface ClassData {

}

interface InterfaceData {

}

interface InjectableData {

}

type EntityType = ComponentData | DirectiveData | PipeData | ClassData | InterfaceData | InjectableData;

interface ProjectEntities {
    components: ComponentData[];
    directives: DirectiveData[];
    pipes: PipeData[];
    classes: ClassData[];
    interfaces: InterfaceData[];
    injectables: InjectableData[];
    entitiesMap: Record<string, EntityType>;
}

interface NormalizedProjectConfiguration extends ProjectConfiguration {
    entities: ProjectEntities,
    importPath: string,
}

export default async function generator(tree: Tree, options: ParseLibrariesSchema) {
    const configuration = JSON.parse(tree.read(options.config, 'utf-8') as string);
    // execSync(`npx compodoc -c ${options.config}`, { stdio: 'inherit' });
    const docsJsonPath = join(configuration.output || 'documentation', 'documentation.json');
    const tsConfigPaths = Object.entries(JSON.parse(tree.read('tsconfig.base.json', 'utf-8') as string).compilerOptions.paths) as Array<[string, string[]]>;
    const tsConfigPathsMap = new Map<string, string[]>(tsConfigPaths);
    const graph = await buildProjectGraphWithoutDaemon();
    const rootMappings = createProjectRootMappings(graph.nodes);
    const docsJson = JSON.parse(tree.read(docsJsonPath, 'utf-8') as string);
    const projects: Record<string, NormalizedProjectConfiguration> = Object.entries(graph.nodes).reduce((acc, [projectName, project]) => {
        acc[projectName] = project.data;
        acc[projectName].importPath = tsConfigPaths.find(([, [entryFile]]) => findProjectForPath(entryFile, rootMappings) === projectName)?.[0] || '';
        return acc;
    }, {});

    docJsonEntityTypes().forEach(entityType => {
        const entities = get(docsJson, entityType);
        if (Array.isArray(entities)) {
            entities.forEach((instance) => {
                const projectName = findProjectForPath(instance.file, rootMappings) as string;
                const project = projects[projectName];
                project.entities = project.entities || {};
                project.entities[entityType] = project.entities[entityType] || [];
                project.entities[entityType].push(instance);
                project.entities.entitiesMap = project.entities.entitiesMap || {};
                project.entities.entitiesMap[instance.name] = instance;
            });
        } else {
            console.log('not an array', entityType);
        }
    });
    const groups: Record<string, Array<{
        projectName: string,
        project: ProjectConfiguration,
        dependencies: ProjectConfiguration[]
    }>> = {};
    for (const [projectName, project] of Object.entries(graph.nodes)) {
        if ( // Selecting only the docs projects excluding the root docs project
            projectName.startsWith('docs-')
            && !projectName.startsWith('docs-shared')
            && projectName.split('-').length > 2
            && !projectName.endsWith('e2e')
            && !projectName.endsWith('schema')
        ) {
            const indexFile = tsConfigPathsMap.get(projects[projectName].importPath)?.[0];
            const importPaths = getDocLibraryImportPaths(tree, indexFile as string);
            const documentationTargetProjects = importPaths.map((importPath) => {
                const depIndexFile = tsConfigPathsMap.get(importPath);
                return projects[findProjectForPath(depIndexFile?.[0] as string, rootMappings) as string];
            });
            tree.write(
                join(project.data.root, 'documentation-target-projects.json'),
                JSON.stringify(documentationTargetProjects.map(({ entities }) => entities), null, 2)
            );
        }
    }
    printChanges(tree.listChanges());
    console.log({ groups });
}
