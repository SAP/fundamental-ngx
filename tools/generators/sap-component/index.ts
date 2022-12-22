import { strings } from '@angular-devkit/core';
import { readJson, Tree, writeJson, formatFiles, generateFiles } from '@nrwl/devkit';
import { SchematicsException } from '@angular-devkit/schematics';
import { names } from '@nrwl/devkit';
import * as ts from 'typescript';
import {
    addModuleOrComponentExportToModule,
    getPropertyAssignmentByName,
    getVariableStatement,
    getVariableValue,
    replaceContentInFile
} from '../utils/ast-utils';
import { addEslintJsonOverrides } from '../utils/linting';
import { componentGenerator, libraryGenerator, UnitTestRunner } from '@nrwl/angular/generators';
import path from 'path';

export default async function (tree: Tree, schema: SapComponentSchema) {
    await libraryGenerator(tree, {
        name: schema.name,
        directory: `${getProjectDirName(schema)}/src/lib`,
        tags: [`scope:${getProjectTag(schema)}`, 'type:lib'].join(','),
        unitTestRunner: UnitTestRunner.Karma,
        prefix: getProjectTag(schema),
        publishable: true,
        importPath: getImportPath(schema),
        style: 'scss',
        changeDetection: 'OnPush',
        viewEncapsulation: 'None'
    });

    updateLibraryData(tree, schema);

    await componentGenerator(tree, {
        project: getProjectName(schema),
        name: schema.name,
        style: 'scss',
        flat: true,
        changeDetection: 'OnPush',
        viewEncapsulation: 'None',
        path: `libs/${getProjectDirName(schema)}/src/lib/${schema.name}`,
        export: true
    });

    updateComponentFiles(tree, schema);
    addEslintJsonOverrides(tree, getProjectName(schema));
    addDocsLibrary(tree, schema);
    addDocsLibraryToNx(tree, schema);
    updateDocsRoutes(tree, schema);
    addDocsRouteToNav(tree, schema);
    updateApiFiles(tree, schema);
    formatFiles(tree);

    return;
}

function addDocsLibraryToNx(tree: Tree, schema: SapComponentSchema) {
    const projectName = `docs-${getProjectName(schema)}`;
    const pathToSource = `libs/docs/${getProjectDirName(schema)}/${schema.name}`;
    const angularJson = readJson(tree, '/angular.json');
    angularJson.projects[projectName] = pathToSource;
    writeJson(tree, '/angular.json', angularJson);

    const tsconfigJson = readJson(tree, '/tsconfig.base.json');
    tsconfigJson.compilerOptions.paths[getDocImportPath(schema)] = [`${pathToSource}/index.ts`];
    writeJson(tree, '/tsconfig.base.json', tsconfigJson);
}

function updateApiFiles(tree: Tree, schema: SapComponentSchema) {
    const filePath = `libs/docs/${getProjectDirName(schema)}/shared/src/lib/api-files.ts`;
    const content = tree.read(filePath);
    const tsSourceFile = ts.createSourceFile(filePath, content?.toString() ?? '', ts.ScriptTarget.Latest, true);
    const statement = getVariableStatement(tsSourceFile, 'API_FILES');
    const apiFilesVar = statement && getVariableValue(statement);

    if (!apiFilesVar || !ts.isObjectLiteralExpression(apiFilesVar)) {
        throw new SchematicsException(`Could not resolve "API_FILES" variable in "${filePath}"`);
    }
    const prefixComma = apiFilesVar.properties.hasTrailingComma || apiFilesVar.properties.length === 0 ? '' : ', ';
    const componentName = strings.classify(`${schema.name}Component`);

    tree.write(
        filePath,
        `${content?.slice(0, apiFilesVar.properties.end)}${prefixComma}"${strings.camelize(
            schema.name
        )}": [ '${componentName}' ]${content?.slice(apiFilesVar.properties.end)}`
    );
}

function updateDocsRoutes(tree: Tree, schema: SapComponentSchema) {
    const filePath = `apps/docs/src/app/${getProjectDirName(schema)}/${getProjectDirName(
        schema
    )}-documentation.routes.ts`;
    const content = tree.read(filePath);
    const tsSourceFile = ts.createSourceFile(filePath, content?.toString() ?? '', ts.ScriptTarget.Latest, true);
    const statement = getVariableStatement(tsSourceFile, 'ROUTES');
    const routesVar = statement && getVariableValue(statement);

    if (!routesVar || !ts.isArrayLiteralExpression(routesVar)) {
        throw new SchematicsException(`Could not resolve "children" property in "${filePath}"`);
    }
    const routesValues = routesVar.elements[0] as ts.ObjectLiteralExpression;
    const childrenProp = getPropertyAssignmentByName(routesValues.properties, 'children')?.initializer;
    if (!childrenProp || !ts.isArrayLiteralExpression(childrenProp)) {
        throw new SchematicsException(`Could not resolve "children" property in "${filePath}"`);
    }

    const prefixComma = childrenProp.elements.hasTrailingComma ? '' : ', ';
    const importValue = `
        {
            path: '${schema.name}',
            loadChildren: () => import('${getDocImportPath(schema)}')
                .then((m) => m.${strings.classify(schema.name)}DocsModule)
        }
    `;

    tree.write(
        filePath,
        `${content?.slice(0, childrenProp.elements.end)}${prefixComma}${importValue}${content?.slice(
            childrenProp.elements.end
        )}`
    );
}

function addDocsRouteToNav(tree: Tree, schema: SapComponentSchema) {
    const filePath = `apps/docs/src/app/${getProjectDirName(schema)}/documentation/${getProjectDirName(
        schema
    )}-documentation-data.ts`;

    const content = tree.read(filePath);
    const tsSourceFile = ts.createSourceFile(filePath, content?.toString() ?? '', ts.ScriptTarget.Latest, true);
    const statement = getVariableStatement(tsSourceFile, 'components');
    const componentsVar = statement && getVariableValue(statement);

    if (!componentsVar || !ts.isArrayLiteralExpression(componentsVar)) {
        throw new SchematicsException(`Could not resolve "components" variable in "${filePath}"`);
    }

    const prefixComma = componentsVar.elements.hasTrailingComma ? '' : ', ';
    const importValue = `
        {
            url: '${getProjectDirName(schema)}/${schema.name}',
            name: '${startCaseName(schema.name)}'
        },
    `;

    tree.write(
        filePath,
        `${content?.slice(0, componentsVar.elements.end)}${prefixComma}${importValue}${content?.slice(
            componentsVar.elements.end
        )}`
    );
}

function addDocsLibrary(tree: Tree, schema: SapComponentSchema) {
    generateFiles(tree, path.join(__dirname, 'files/docs'), `libs/docs/${getProjectDirName(schema)}/${schema.name}`, {
        ...names(schema.name),
        moduleName: strings.classify(schema.name),
        projectTag: getProjectTag(schema),
        projectDirName: getProjectDirName(schema),
        startCaseName: startCaseName(schema.name),
        importPath: getDocImportPath(schema)
    });
}

function updateLibraryData(tree: Tree, schema: SapComponentSchema): void {
    const oldName = `${getProjectDirName(schema)}-src-lib-${schema.name}`;
    const newName = `${getProjectDirName(schema)}-${schema.name}`;

    function updateAngularJson() {
        const angularJson = readJson(tree, '/angular.json');

        const config = angularJson.projects[oldName];

        angularJson.projects[newName] = config;
        delete angularJson.projects[oldName];

        writeJson(tree, '/angular.json', angularJson);
    }

    function updateTsConfig() {
        const tsconfigJson = readJson(tree, '/tsconfig.base.json');

        tsconfigJson.compilerOptions.paths[getImportPath(schema)][0] = tsconfigJson.compilerOptions.paths[
            getImportPath(schema)
        ][0].replace('src/index.ts', 'index.ts');

        writeJson(tree, '/tsconfig.base.json', tsconfigJson);
    }

    function treeManipulations() {
        const newModulePath = `${getLibraryDirectory(schema)}/${schema.name}.module.ts`;
        // renaming module file name and moving it to the root of library
        tree.rename(`${getLibraryDirectory(schema)}/src/lib/${oldName}.module.ts`, newModulePath);
        // update imports and move files to the root
        const indexTsContent = `export * from './${schema.name}.module';\n`;
        tree.write(`${getLibraryDirectory(schema)}/index.ts`, indexTsContent);
        tree.delete(`${getLibraryDirectory(schema)}/src/index.ts`);
        // update paths for moved files
        replaceContentInFile(tree, `${getLibraryDirectory(schema)}/ng-package.json`, [
            ['"src/index.ts"', '"./index.ts"']
        ]);
        replaceContentInFile(tree, `${getLibraryDirectory(schema)}/tsconfig.lib.json`, [
            ['"src/test.ts"', '"./test.ts"']
        ]);
        replaceContentInFile(tree, `${getLibraryDirectory(schema)}/tsconfig.spec.json`, [
            ['"src/test.ts"', '"./test.ts"']
        ]);
        // renaming module class name
        const oldModuleName = strings.classify(oldName);
        replaceContentInFile(tree, newModulePath, [[oldModuleName, strings.classify(schema.name)]]);

        // add created module to exports of root package module
        const moduleName = `fundamental-ngx${
            schema.project === 'experimental' ? '-' + getProjectTag(schema) : ''
        }.module.ts`;
        addModuleOrComponentExportToModule(
            tree,
            `${getLibraryDirectory(schema, false)}/${moduleName}`,
            strings.classify(schema.name) + 'Module',
            getImportPath(schema)
        );

        // add created module to exports from root package's public_api.ts
        let modulePublicApiContent = tree.read(`${getLibraryDirectory(schema, false)}/public_api.ts`)?.toString() ?? '';
        modulePublicApiContent = modulePublicApiContent + `export * from '${getImportPath(schema)}';\n`;
        tree.write(`${getLibraryDirectory(schema, false)}/public_api.ts`, modulePublicApiContent);
    }

    updateAngularJson();
    updateTsConfig();
    treeManipulations();
}

function updateComponentFiles(tree: Tree, schema: SapComponentSchema) {
    generateFiles(tree, path.join(__dirname, 'files/lib'), getLibraryDirectory(schema), {
        ...names(schema.name),
        project: getProjectDirName(schema),
        props: []
    });
}

function getLibraryDirectory(schema: SapComponentSchema, withComponentFolder = true): string {
    return `libs/${getProjectDirName(schema)}/src/lib` + (withComponentFolder ? `/${schema.name}` : '');
}

function getProjectName(schema: SapComponentSchema): string {
    return `${getProjectDirName(schema)}-${schema.name}`;
}

function getImportPath(schema: SapComponentSchema): string {
    return `@fundamental-ngx/${getProjectDirName(schema)}/${schema.name}`;
}

function getDocImportPath(schema: SapComponentSchema): string {
    return `@fundamental-ngx/docs/${getProjectDirName(schema)}/${schema.name}`;
}

function getProjectDirName(schema: SapComponentSchema): string {
    switch (schema.project) {
        case 'core':
            return 'core';
        case 'platform':
            return 'platform';
        case 'experimental':
            return 'fn';
        case 'cx':
            return 'cx';
        default:
            throw new SchematicsException(`Could not resolve project type from the given value: "${schema.project}"`);
    }
}

function getProjectTag(schema: SapComponentSchema): string {
    switch (schema.project) {
        case 'core':
            return 'fd';
        case 'platform':
            return 'fdp';
        case 'experimental':
            return 'fn';
        case 'cx':
            return 'cx';
        default:
            throw new SchematicsException(`Could not resolve project type from the given value: "${schema.project}"`);
    }
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
    project: 'core' | 'platform' | 'experimental' | 'cx';
}
