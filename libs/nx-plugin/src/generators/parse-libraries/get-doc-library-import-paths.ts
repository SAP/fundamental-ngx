import { Tree } from "@nx/devkit";
import { parse } from '@babel/parser';
import { isIdentifier, isStringLiteral, isArrayExpression } from '@babel/types';
import { traverse } from "@babel/core";

export function getDocLibraryImportPaths(tree: Tree, indexFile: string): string[] {
    const content = tree.read(indexFile, 'utf-8');
    if (!content) {
        console.warn(`Could not find ${indexFile}`);
        return [];
    }
    const parsedContent = parse(content, {
        sourceType: 'module',
        plugins: ['typescript']
    });
    const importPaths: string[] = [];
    traverse(parsedContent, {
        VariableDeclarator: (path) => {
            if (!path.node.id) {

            }
            if (isIdentifier(path.node.id) && path.node.id.name === 'LIBRARY_IMPORT_PATH') {
                if (isStringLiteral(path.node.init)) {
                    importPaths.push(path.node.init.value);
                } else if (isArrayExpression(path.node.init)) {
                    path.node.init.elements.forEach((element) => {
                        if (isStringLiteral(element)) {
                            importPaths.push(element.value);
                        } else {
                            console.warn(`Could not fully parse ${indexFile} for library import paths`);
                        }
                    });
                }
            }
        }
    });
    return importPaths;
}
