import { strings } from '@angular-devkit/core';
import {
    apply,
    applyTemplates,
    chain,
    externalSchematic,
    MergeStrategy,
    mergeWith,
    move,
    Rule,
    SchematicsException,
    url
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
            directory: `${getProjectDirName(schema)}/src/lib`,
            tags: [`scope:${getProjectTag(schema)}`, 'type:lib'].join(','),
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
        addDocsLibrary(schema),
        addDocsLibraryToNx(schema),
        updateDocsRoutes(schema),
        addDocsRouteToNav(schema),
        updateApiFiles(schema),
        formatFiles()
    ]);
}

function addDocsLibraryToNx(schema: SapComponentSchema) {
    const projectName = `docs-${getProjectName(schema)}`;
    const pathToSource = `libs/docs/${getProjectDirName(schema)}/${schema.name}`;
    return chain([
        updateJsonInTree('angular.json', (angularJson) => {
            angularJson.projects[projectName] = pathToSource;
            return angularJson;
        }),
        updateJsonInTree('tsconfig.base.json', (tsconfigJson) => {
            tsconfigJson.compilerOptions.paths[getDocImportPath(schema)] = [`${pathToSource}/index.ts`];
            return tsconfigJson;
        })
    ]);
}

function updateApiFiles(schema: SapComponentSchema): Rule {
    return (tree) => {
        const filePath = `libs/docs/${getProjectDirName(schema)}/shared/src/lib/api-files.ts`;
        const content = tree.read(filePath);
        const tsSourceFile = ts.createSourceFile(filePath, content?.toString() ?? '', ts.ScriptTarget.Latest, true);
        const statement = getVariableStatement(tsSourceFile, 'API_FILES');
        const apiFilesVar = statement && getVariableValue(statement);

        if (!apiFilesVar || !ts.isObjectLiteralExpression(apiFilesVar)) {
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
        insert(tree, filePath, [new InsertChange(filePath, childrenProp.elements.end, `${prefixComma}${importValue}`)]);
    };
}

function addDocsRouteToNav(schema: SapComponentSchema): Rule {
    return (tree) => {
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
        insert(tree, filePath, [
            new InsertChange(filePath, componentsVar.elements.end, `${prefixComma}${importValue}`)
        ]);
    };
}

function addDocsLibrary(schema: SapComponentSchema): Rule {
    const template = apply(url('./files/docs'), [
        applyTemplates({
            ...names(schema.name),
            moduleName: strings.classify(schema.name),
            projectTag: getProjectTag(schema),
            projectDirName: getProjectDirName(schema),
            startCaseName: startCaseName(schema.name),
            importPath: getDocImportPath(schema)
        }),
        move(`libs/docs/${getProjectDirName(schema)}/${schema.name}`)
    ]);

    return mergeWith(template, MergeStrategy.Overwrite);
}

function updateLibraryData(schema: SapComponentSchema): Rule {
    const oldName = `${getProjectDirName(schema)}-src-lib-${schema.name}`;
    const newName = `${getProjectDirName(schema)}-${schema.name}`;
    return chain([
        updateJsonInTree('/angular.json', (angularJson) => {
            const config = angularJson.projects[oldName];

            // since we're placing everything in the root of the library, need to update configs
            config.sourceRoot = config.root;
            config.architect.build.outputs[0] = config.architect.build.outputs[0].replace('/src/lib', '');
            config.architect.test.options.main = config.architect.test.options.main.replace('src/test.ts', 'test.ts');
            config.architect.lint.options.lintFilePatterns = config.architect.lint.options.lintFilePatterns.map((str) =>
                str.replace('src/**', '**')
            );

            angularJson.projects[newName] = config;
            delete angularJson.projects[oldName];

            if (schema.project === 'platform') {
                angularJson.projects[newName].implicitDependencies = ['core'];
            }

            return angularJson;
        }),
        updateJsonInTree('/tsconfig.base.json', (tsconfigJson) => {
            tsconfigJson.compilerOptions.paths[getImportPath(schema)][0] = tsconfigJson.compilerOptions.paths[
                getImportPath(schema)
            ][0].replace('src/index.ts', 'index.ts');
            return tsconfigJson;
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
            replaceContentInFile(tree, newModulePath, [[oldModuleName, strings.classify(schema.name)]]);
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
                strings.classify(schema.name) + 'Module',
                getImportPath(schema)
            );

            // add created module to exports from root package's public_api.ts
            let modulePublicApiContent =
                tree.read(`${getLibraryDirectory(schema, false)}/public_api.ts`)?.toString() ?? '';
            modulePublicApiContent = modulePublicApiContent + `export * from '${getImportPath(schema)}';\n`;
            tree.overwrite(`${getLibraryDirectory(schema, false)}/public_api.ts`, modulePublicApiContent);
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
