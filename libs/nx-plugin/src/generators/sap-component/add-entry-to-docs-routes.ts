import { ProjectGraphProjectNode, Tree } from '@nx/devkit';
import { ArrayExpression, VariableDeclaration, parseSync, printSync } from '@swc/core';
import { join } from 'path';
import { GenerationContext } from './generation-context';

const span = { start: 0, end: 0, ctxt: 0 };

/**
 *
 **/
export function addEntryToDocsRoutes(
    tree: Tree,
    hostProject: ProjectGraphProjectNode,
    docsProject: ProjectGraphProjectNode,
    generationContext: GenerationContext
): void {
    const docsRoutesPath = join(docsProject.data.root, 'docs-routes.ts');
    const docsRoutesContent = tree.read(docsRoutesPath, 'utf-8') as string;
    const parsedDocsRoutes = parseSync(docsRoutesContent, { syntax: 'typescript' });
    const componentRoutesVariableDeclaration = parsedDocsRoutes.body.find(
        (node) =>
            node.type === 'VariableDeclaration' &&
            node.declarations[0].id.type === 'Identifier' &&
            node.declarations[0].id.value === 'componentRoutes'
    ) as VariableDeclaration;
    (componentRoutesVariableDeclaration.declarations[0].init as ArrayExpression).elements.push({
        expression: {
            type: 'ObjectExpression',
            span,
            properties: [
                {
                    type: 'KeyValueProperty',
                    key: {
                        type: 'Identifier',
                        span,
                        value: 'path',
                        optional: false
                    },
                    value: {
                        type: 'StringLiteral',
                        span,
                        value: generationContext.fileName
                    }
                },
                {
                    type: 'KeyValueProperty',
                    key: {
                        type: 'Identifier',
                        span,
                        value: 'loadChildren',
                        optional: false
                    },
                    value: {
                        type: 'ArrowFunctionExpression',
                        span,
                        params: [],
                        body: {
                            type: 'CallExpression',
                            span,
                            callee: {
                                type: 'MemberExpression',
                                span,
                                object: {
                                    type: 'CallExpression',
                                    span,
                                    callee: {
                                        type: 'Import',
                                        span
                                    },
                                    arguments: [
                                        {
                                            expression: {
                                                type: 'StringLiteral',
                                                span,
                                                value: `@fundamental-ngx/docs/${hostProject.data.name}/${generationContext.fileName}`
                                            }
                                        }
                                    ]
                                },
                                property: {
                                    type: 'Identifier',
                                    span,
                                    value: 'then',
                                    optional: false
                                }
                            },
                            arguments: [
                                {
                                    expression: {
                                        type: 'Identifier',
                                        span,
                                        value: 'configureLibRoutes',
                                        optional: false
                                    }
                                }
                            ]
                        },
                        async: false,
                        generator: false
                    }
                }
            ]
        }
    });
    tree.write(docsRoutesPath, printSync(parsedDocsRoutes, { minify: false }).code);
}
