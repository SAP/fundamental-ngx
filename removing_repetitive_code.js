const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
const t = require('@babel/types');
const { sync: globSync } = require('fast-glob');
const { readFileSync, writeFileSync } = require('fs');

const files = globSync('libs/docs/platform/*/index.ts', {
    // ignore: ['libs/docs/cdk/forms/index.ts', 'libs/docs/cdk/data-source/index.ts', 'libs/docs/cdk/drag-n-drop/index.ts']
});

for (const filePath of files) {
    const fileContent = readFileSync(filePath, 'utf-8');
    const libraryName = filePath.split('/')[3];
    const ast = parser.parse(fileContent, {
        sourceType: 'module',
        plugins: ['typescript']
    });
    ast.program.body.push(
        t.exportNamedDeclaration(
            t.variableDeclaration('const', [
                t.variableDeclarator(t.identifier('LIBRARY_NAME'), t.stringLiteral(libraryName))
            ])
        )
    );
    let primaryModified = false;
    traverse(ast, {
        ObjectExpression: (objExpressionPath) => {
            if (primaryModified) {
                return;
            }
            const properties = objExpressionPath.node.properties;
            const indexOfProviders = properties.findIndex((property) => {
                return property.key.name === 'providers';
            });
            if (indexOfProviders !== -1) {
                const providersProperty = properties[indexOfProviders];
                const providers = providersProperty.value.elements.filter((arrElm) => {
                    if (t.isCallExpression(arrElm) && arrElm.callee.name === 'currentComponentProvider') {
                        return false;
                    }
                    return !(t.isIdentifier(arrElm) && arrElm.name === 'ApiDocsService');
                });
                if (providers.length === 0) {
                    objExpressionPath.node.properties.splice(indexOfProviders, 1);
                } else {
                    providersProperty.value.elements = providers;
                }
            }
            objExpressionPath.node.properties.push(
                t.objectProperty(
                    t.identifier('data'),
                    t.objectExpression([t.objectProperty(t.identifier('primary'), t.booleanLiteral(true))])
                )
            );
            primaryModified = true;
        }
    });
    traverse(ast, {
        ObjectExpression: (objExpressionPath) => {
            const properties = objExpressionPath.node.properties;
            const pathProperty = properties.find((property) => {
                return property.key.name === 'path';
            });
            if (pathProperty) {
                if (pathProperty.value.value === 'api') {
                    let apiFileKey;
                    objExpressionPath.traverse({
                        MemberExpression: (memberExpressionPath) => {
                            if (memberExpressionPath.node.object.name === 'API_FILES') {
                                apiFileKey = memberExpressionPath.node.property.name.toString();
                            }
                        }
                    });
                    objExpressionPath.parent.elements.splice(
                        objExpressionPath.parent.elements.indexOf(objExpressionPath.node),
                        1
                    );
                    if (apiFileKey) {
                        ast.program.body.push(
                            t.exportNamedDeclaration(
                                t.variableDeclaration('const', [
                                    t.variableDeclarator(t.identifier('API_FILE_KEY'), t.stringLiteral(apiFileKey))
                                ])
                            )
                        );
                    }
                }
                if (pathProperty.value.value === 'i18n') {
                    let i18nKey;
                    objExpressionPath.traverse({
                        CallExpression: (callExpression) => {
                            if (callExpression.node.callee.name === 'getI18nKey') {
                                i18nKey = callExpression.node.arguments[0].value;
                            }
                        }
                    });
                    objExpressionPath.parent.elements.splice(
                        objExpressionPath.parent.elements.indexOf(objExpressionPath.node),
                        1
                    );
                    if (i18nKey) {
                        ast.program.body.push(
                            t.exportNamedDeclaration(
                                t.variableDeclaration('const', [
                                    t.variableDeclarator(t.identifier('I18N_KEY'), t.stringLiteral(i18nKey))
                                ])
                            )
                        );
                    }
                }
            }
        }
    });
    const { code } = generator(ast);
    writeFileSync(filePath, code, 'utf-8');
}
