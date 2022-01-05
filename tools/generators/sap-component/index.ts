import { strings } from '@angular-devkit/core';
import {
    Rule,
    chain,
    externalSchematic,
    apply,
    url,
    applyTemplates,
    move,
    mergeWith,
    MergeStrategy,
    SchematicsException,
    Tree
} from '@angular-devkit/schematics';
import { formatFiles, updateJsonInTree } from '@nrwl/workspace';
import { names } from '@nrwl/devkit';
import { insert, InsertChange } from '@nrwl/workspace/src/utils/ast-utils';
import * as ts from 'typescript';
import {
    addModuleOrComponentExportToModule,
    getPropertyAssignmentByName,
    getVariableStatement,
    getVariableValue,
    replaceContentInFile
} from '../utils/ast-utils';
import { addEslintJsonOverrides } from '../utils/linting';

export default function (schema: SapComponentSchema): Rule {
    return chain([
        externalSchematic('@nrwl/angular', 'lib', {
            name: schema.name,
            style: 'scss',
            directory: `${getProjectDirName(schema)}/src/lib`,
            tags: [getProjectTag(schema)].join(','),
            unitTestRunner: 'karma',
            prefix: getProjectTag(schema),
            publishable: true,
            importPath: getImportPath(schema)
        }),
        updateLibraryData(schema),
        externalSchematic('@nrwl/angular', 'component', {
            project: getProjectName(schema),
            name: schema.name,
            style: 'scss',
            flat: true,
            changeDetection: 'OnPush',
            viewEncapsulation: 'None',
            path: `libs/${getProjectDirName(schema)}/src/lib/${schema.name}`
        }),
        updateComponentFiles(schema),
        (tree) => addEslintJsonOverrides(tree, getProjectName(schema)),
        addDocsComponents(schema),
        updateDocsRoutes(schema),
        addDocsRouteToNav(schema),
        updateApiFiles(schema),
        formatFiles()
    ]);
}

function updateApiFiles(schema: SapComponentSchema): Rule {
    return (tree) => {
        const filePath = `apps/docs/src/app/${getProjectDirName(schema)}/api-files.ts`;
        const content = tree.read(filePath);
        const tsSourceFile = ts.createSourceFile(filePath, content.toString(), ts.ScriptTarget.Latest, true);
        const apiFilesVar = getVariableValue(getVariableStatement(tsSourceFile, 'API_FILES'));

        if (!ts.isObjectLiteralExpression(apiFilesVar)) {
            throw new SchematicsException(`Could not resolve "API_FILES" variable in "${filePath}"`);
        }
        const prefixComma = apiFilesVar.properties.hasTrailingComma ? '' : ', ';
        const componentName = strings.classify(`${schema.name}Component`);
        insert(tree, filePath, [
            new InsertChange(
                filePath,
                apiFilesVar.properties.end,
                `${prefixComma}"${strings.camelize(schema.name)}": [ '${componentName}' ]`
            )
        ]);
    };
}

function updateDocsRoutes(schema: SapComponentSchema): Rule {
    return (tree) => {
        const filePath = `apps/docs/src/app/${getProjectDirName(schema)}/${getProjectDirName(
            schema
        )}-documentation.routes.ts`;
        const content = tree.read(filePath);
        const tsSourceFile = ts.createSourceFile(filePath, content.toString(), ts.ScriptTarget.Latest, true);
        const routesVar = getVariableValue(getVariableStatement(tsSourceFile, 'ROUTES'));

        if (!ts.isArrayLiteralExpression(routesVar)) {
            throw new SchematicsException(`Could not resolve "children" property in "${filePath}"`);
        }
        const routesValues = routesVar.elements[0] as ts.ObjectLiteralExpression;
        const childrenProp = getPropertyAssignmentByName(routesValues.properties, 'children')?.initializer;
        if (!ts.isArrayLiteralExpression(childrenProp)) {
            throw new SchematicsException(`Could not resolve "children" property in "${filePath}"`);
        }

        const prefixComma = childrenProp.elements.hasTrailingComma ? '' : ', ';
        const importValue = `
            {
                path: '${schema.name}',
                loadChildren: () => import('./component-docs/${schema.name}/${schema.name}-docs.module')
                    .then((m) => m.${strings.classify(schema.name)}DocsModule)
            }
        `;
        insert(tree, filePath, [new InsertChange(filePath, childrenProp.elements.end, `${prefixComma}${importValue}`)]);
    };
}

function addDocsRouteToNav(schema: SapComponentSchema): Rule {
    return (tree) => {
        const filePath = `apps/docs/src/app/${getProjectDirName(schema)}/documentation/${getProjectDirName(
            schema
        )}-documentation-data.ts`;

        const content = tree.read(filePath);
        const tsSourceFile = ts.createSourceFile(filePath, content.toString(), ts.ScriptTarget.Latest, true);
        const componentsVar = getVariableValue(getVariableStatement(tsSourceFile, 'components'));

        if (!ts.isArrayLiteralExpression(componentsVar)) {
            throw new SchematicsException(`Could not resolve "components" variable in "${filePath}"`);
        }

        const prefixComma = componentsVar.elements.hasTrailingComma ? '' : ', ';
        const importValue = `
            { 
                url: '${getProjectDirName(schema)}/${schema.name}', 
                name: '${startCaseName(schema.name)}' 
            },
        `;
        insert(tree, filePath, [
            new InsertChange(filePath, componentsVar.elements.end, `${prefixComma}${importValue}`)
        ]);
    };
}

function addDocsComponents(schema: SapComponentSchema): Rule {
    const template = apply(url('./files/docs'), [
        applyTemplates({
            ...names(schema.name),
            moduleName: getModuleName(schema),
            projectTag: getProjectTag(schema),
            startCaseName: startCaseName(schema.name)
        }),
        move(`apps/docs/src/app/${getProjectDirName(schema)}/component-docs/${schema.name}`)
    ]);

    return mergeWith(template, MergeStrategy.Overwrite);
}

function updateLibraryData(schema: SapComponentSchema): Rule {
    const oldName = `${getProjectDirName(schema)}-src-lib-${schema.name}`;
    const newName = `${getProjectDirName(schema)}-${schema.name}`;
    return chain([
        updateJsonInTree('/angular.json', (angularJson) => {
            angularJson.projects[newName] = angularJson.projects[oldName];
            delete angularJson.projects[oldName];

            if (schema.project === 'platform') {
                angularJson.projects[newName].implicitDependencies = ['core'];
            }

            return angularJson;
        }),
        move(`${getLibraryDirectory(schema)}/src/test.ts`, `${getLibraryDirectory(schema)}/test.ts`),
        (tree) => {
            const newModulePath = `${getLibraryDirectory(schema)}/${schema.name}.module.ts`;
            // renaming module file name and moving it to the root of library
            tree.rename(`${getLibraryDirectory(schema)}/src/lib/${oldName}.module.ts`, newModulePath);
            // update imports and move files to the root
            const indexTsContent = `export * from './${schema.name}.module';\nexport * from './${schema.name}.component';\n`;
            tree.create(`${getLibraryDirectory(schema)}/index.ts`, indexTsContent);
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
            replaceContentInFile(tree, newModulePath, [[oldModuleName, getModuleName(schema)]]);
            // add component to exports of the created module
            addModuleOrComponentExportToModule(
                tree,
                newModulePath,
                strings.classify(schema.name) + 'Component',
                `./${schema.name}.component`
            );

            // add created module to exports of root package module
            const moduleName = `fundamental-ngx${
                schema.project === 'experimental' ? '-' + getProjectTag(schema) : ''
            }.module.ts`;
            addModuleOrComponentExportToModule(
                tree,
                `${getLibraryDirectory(schema, false)}/${moduleName}`,
                getModuleName(schema) + 'Module',
                `@fundamental-ngx/${getProjectTag(schema)}/${schema.name}`
            );
        }
    ]);
}

function updateComponentFiles(schema: SapComponentSchema): Rule {
    const template = apply(url('./files/lib'), [
        applyTemplates({
            ...names(schema.name),
            project: getProjectDirName(schema),
            props: []
        }),
        move(getLibraryDirectory(schema))
    ]);

    return mergeWith(template, MergeStrategy.Overwrite);
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

function getModuleName(schema: SapComponentSchema): string {
    return strings.classify(`${schema.project}-${schema.name}`);
}

function getProjectDirName(schema: SapComponentSchema): string {
    switch (schema.project) {
        case 'core':
            return 'core';
        case 'platform':
            return 'platform';
        case 'experimental':
            return 'fn';
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
    project: 'core' | 'platform' | 'experimental';
}
