import { ProjectGraphProjectNode, Tree } from '@nx/devkit';
import { ExportDeclaration, ObjectExpression, VariableDeclaration, parseSync, printSync } from '@swc/core';
import { join } from 'path';
import { GenerationContext } from './generation-context';

export function addEntryToApiFiles(
    tree: Tree,
    docsProject: ProjectGraphProjectNode,
    generationContext: GenerationContext
) {
    const docsApiFilesPath = join(docsProject.data.root, 'api-files.ts');
    const docsApiFilesContent = tree.read(docsApiFilesPath, 'utf-8') as string;
    const parsedDocsApiFiles = parseSync(docsApiFilesContent, { syntax: 'typescript' });

    const apiFilesVariableDeclaration = parsedDocsApiFiles.body.find(
        (n) =>
            n.type === 'ExportDeclaration' &&
            n.declaration.type === 'VariableDeclaration' &&
            n.declaration.declarations[0].id.type === 'Identifier' &&
            n.declaration.declarations[0].id.value === 'API_FILES'
    ) as ExportDeclaration;

    (
        (apiFilesVariableDeclaration.declaration as VariableDeclaration).declarations[0].init as ObjectExpression
    ).properties.push({
        type: 'KeyValueProperty',
        key: {
            type: 'Identifier',
            value: generationContext.propertyName,
            optional: false,
            span: { start: 0, end: 0, ctxt: 0 }
        },
        value: {
            type: 'ArrayExpression',
            elements: [
                {
                    expression: {
                        type: 'StringLiteral',
                        value: `${generationContext.className}Component`,
                        span: { start: 0, end: 0, ctxt: 0 }
                    }
                }
            ],
            span: { start: 0, end: 0, ctxt: 0 }
        }
    });
    tree.write(docsApiFilesPath, printSync(parsedDocsApiFiles).code);
}
