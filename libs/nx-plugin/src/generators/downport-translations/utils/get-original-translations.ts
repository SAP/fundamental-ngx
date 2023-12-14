import * as types from '@babel/types';
import traverse from '@babel/traverse';
import { parse } from '@babel/parser';
import { Tree } from '@nx/devkit';
import generate from '@babel/generator';
import { flattenTranslations } from './flatten-object';

const englishLanguageFilePath = 'libs/i18n/src/lib/languages/english.ts';

export function getOriginalTranslations(tree: Tree, filePath: string): Record<string, string> {
    const exists = tree.exists(filePath);
    const fileContent = tree.read(exists ? filePath : englishLanguageFilePath, 'utf-8') as string;
    try {
        const ast = parse(fileContent, {
            sourceType: 'module',
            plugins: ['typescript']
        });
        traverse(ast, {
            ObjectProperty(path) {
                const node = path.node as types.ObjectProperty;
                if (node.value.type === 'ArrowFunctionExpression') {
                    const fnString = generate(node.value).code;
                    const stringifiedObjProp = types.objectProperty(node.key, types.stringLiteral(fnString));
                    path.replaceWith(stringifiedObjProp);
                    path.shouldSkip = true;
                } else if (node.value.type === 'StringLiteral') {
                    const stringLiteral = generate(node.value).code;
                    path.replaceWith(types.objectProperty(node.key, types.stringLiteral(stringLiteral)));
                    path.shouldSkip = true;
                }
            }
        });
        const exportDeclaration = ast.program.body.find(
            (node) => node.type === 'ExportNamedDeclaration'
        )! as types.ExportNamedDeclaration;
        const objExpr = (exportDeclaration.declaration as types.VariableDeclaration).declarations[0]
            .init as types.ObjectExpression;
        const code = generate(objExpr, { jsescOption: { es6: true, minimal: true } }).code;
        // eslint-disable-next-line no-eval
        const fdLang = eval(`() => (${code})`)();
        return flattenTranslations(fdLang, null);
    } catch (e) {
        console.log(e);
        return {};
    }
}
