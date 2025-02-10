import { strings } from '@angular-devkit/core';
import { SchematicsException } from '@angular-devkit/schematics';
import { formatFiles, generateFiles, names, readCachedProjectGraph, Tree } from '@nx/devkit';
import { join } from 'path';
import { addEntryToApiFiles } from './add-entry-to-api-files';
import { addEntryToDocsRoutes } from './add-entry-to-docs-routes';
import { GenerationContext } from './generation-context';

function getProjectTag({ project }: SapComponentSchema) {
    return {
        core: 'fd',
        platform: 'fdp',
        cx: 'fdx',
        cdk: 'fdk',
        btp: 'fdb'
    }[project];
}

export default async function (tree: Tree, schema: SapComponentSchema) {
    const transformedNames = names(schema.name);
    const project = readCachedProjectGraph().nodes[schema.project];
    const docsProject = readCachedProjectGraph().nodes['docs-' + schema.project];

    if (!project) {
        throw new SchematicsException(`Could not resolve project configuration for "${schema.project}"`);
    }

    if (!docsProject) {
        throw new SchematicsException(`Could not resolve project configuration for "docs-${schema.project}"`);
    }
    const libDestination = join(project.data.root, transformedNames.fileName);
    const libDocDestination = join('libs', 'docs', schema.project, transformedNames.fileName);
    const projectImportPath = `@fundamental-ngx/${schema.project}/${transformedNames.fileName}`;
    const selector = `${getProjectTag(schema)}-${transformedNames.fileName}`;
    const generationContext: GenerationContext = {
        ...transformedNames,
        selector,
        startCaseName: startCaseName(schema.name),
        projectName: `${project.name}-${transformedNames.fileName}`,
        scopeName: getProjectTag(schema),
        projectImportPath
    };
    generateFiles(tree, join(__dirname, 'files', 'library'), libDestination, generationContext);
    generateFiles(tree, join(__dirname, 'files', 'docs'), libDocDestination, {
        ...generationContext,
        projectName: `${docsProject.name}-${transformedNames.fileName}`
    });

    // Update API files
    addEntryToApiFiles(tree, docsProject, generationContext);

    // Update docs-routes
    addEntryToDocsRoutes(tree, project, docsProject, generationContext);

    // Update toolbar
    const docsDataPath = join(docsProject.data.root, 'docs-data.json');
    const docsData = JSON.parse(tree.read(docsDataPath, 'utf-8') as string);
    const newEntry = {
        name: generationContext.startCaseName,
        url: `${project.name}/${transformedNames.fileName}`
    };

    docsData.components = docsData.components ? [...docsData.components, newEntry] : [newEntry];
    tree.write(docsDataPath, JSON.stringify(docsData, null, 4));

    return formatFiles(tree);
}

function startCaseName(str: string): string {
    return strings
        .dasherize(str)
        .split('-')
        .map((word) => strings.capitalize(word))
        .join(' ');
}

interface SapComponentSchema {
    name: string;
    project: 'core' | 'platform' | 'cx' | 'cdk' | 'btp';
}
