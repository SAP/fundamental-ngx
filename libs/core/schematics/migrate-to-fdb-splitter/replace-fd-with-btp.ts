import { chain, Rule, Tree } from '@angular-devkit/schematics';
import { getProjectMainFile, getTargetTsconfigPath } from '@angular/cdk/schematics';
import { dirname, resolve } from 'path';
import { oneTimePackages } from '../utils/one-time-packages';
import { getProjectBuildTargetName, getProjectDefinition } from '../utils/workspace';
import { getFileDependencies } from './get-file-dependencies';
import { regexReplacements } from './replacements';
import { MigrateToFdpSplitterSchema } from './schema';

const exportedElements = new Set([
    'SplitterPaginationComponent',
    'SplitterPaneContainerComponent',
    'NoDefaultPanePipe',
    'transformPaneTypeInput',
    'PaneType',
    'PaneTypeInput',
    'SplitterResizerComponent',
    'SplitterSplitPaneComponent',
    'SplitterComponent',
    'SplitterModule',
    'SplitterPaneResizeEvent',
    'SplitterPaneContainerOrientation',
    'SplitterPaneContainerOrientationType'
]);

const replaceRegex = (content: string): string => {
    for (const [regex, replacement] of regexReplacements.entries()) {
        content = content.replace(regex, replacement);
    }
    return content;
};

/**
 * Migrates the project to the new splitter component.
 * @param options
 */
export function replaceFdWithBtp({ project: projectName }: MigrateToFdpSplitterSchema): Rule {
    const [install, uninstall] = oneTimePackages(['@swc/core', 'dependency-tree']);
    return chain([
        install,
        async (tree: Tree): Promise<void> => {
            const { parseSync, printSync } = await import('@swc/core');
            const project = await getProjectDefinition(tree, projectName);
            const mainFile = getProjectMainFile(project);
            const projectBuildTargetName = await getProjectBuildTargetName(tree, projectName);
            const tsConfigPath = getTargetTsconfigPath(project, projectBuildTargetName);
            const tsFilesList = (await getFileDependencies(mainFile, tsConfigPath as string)).map((p) =>
                p.replace(process.cwd(), '.')
            );

            tsFilesList.forEach((filePath: string) => {
                const originalContent = tree.readText(filePath);
                let newContent = replaceRegex(originalContent);

                const parsed = parseSync(newContent, {
                    syntax: 'typescript',
                    decorators: true
                });
                let replaced = false;
                parsed.body.forEach((node, index) => {
                    if (node.type === 'ImportDeclaration' && node.source.value === '@fundamental-ngx/core') {
                        const specifiers = node.specifiers.filter(
                            (specifier) =>
                                specifier.type === 'ImportSpecifier' && exportedElements.has(specifier.local.value)
                        );
                        if (specifiers.length) {
                            const newImport = { ...node };
                            newImport.specifiers = specifiers;
                            newImport.source = {
                                type: 'StringLiteral',
                                value: '@fundamental-ngx/btp/splitter',
                                span: node.source.span
                            };
                            node.specifiers = node.specifiers.filter((s) => !specifiers.includes(s));
                            parsed.body.splice(index, node.specifiers.length === 0 ? 1 : 0, newImport);
                            replaced = true;
                        }
                        return;
                    }
                    const classDeclaration = (() => {
                        if (node.type === 'ClassDeclaration') {
                            return node;
                        }
                        if (node.type === 'ExportDeclaration' && node.declaration.type === 'ClassDeclaration') {
                            return node.declaration;
                        }
                        return undefined;
                    })();
                    if (classDeclaration) {
                        const componentDecorator = classDeclaration.decorators?.find(
                            (decorator) =>
                                decorator.expression.type === 'CallExpression' &&
                                decorator.expression.callee.type === 'Identifier' &&
                                decorator.expression.callee.value === 'Component'
                        );
                        if (componentDecorator) {
                            const objectExpression =
                                componentDecorator.expression.type === 'CallExpression'
                                    ? componentDecorator.expression.arguments[0]
                                    : undefined;
                            if (objectExpression?.expression.type === 'ObjectExpression') {
                                const templateUrlProperty = objectExpression?.expression.properties.find(
                                    (prop) =>
                                        prop.type === 'KeyValueProperty' &&
                                        prop.key.type === 'Identifier' &&
                                        prop.key.value === 'templateUrl'
                                );
                                const templateUrlPropertyValue =
                                    templateUrlProperty?.type === 'KeyValueProperty' &&
                                    templateUrlProperty?.value.type === 'StringLiteral'
                                        ? templateUrlProperty.value.value
                                        : undefined;
                                if (templateUrlPropertyValue) {
                                    const pathToFile = resolve(dirname(filePath), templateUrlPropertyValue).replace(
                                        process.cwd(),
                                        '.'
                                    );
                                    const originalFile = tree.readText(pathToFile);
                                    const newFile = replaceRegex(originalFile);
                                    if (originalFile !== newFile) {
                                        tree.overwrite(pathToFile, newFile);
                                    }
                                }
                            }
                        }
                    }
                });
                if (replaced) {
                    newContent = printSync(parsed).code;
                }
                if (newContent !== originalContent) {
                    tree.overwrite(filePath, newContent);
                }
            });
        },
        uninstall
    ]);
}
