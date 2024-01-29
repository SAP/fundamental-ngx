import { Tree } from '@nx/devkit';

export function updateTypings(tree: Tree, languageKeys: string[]): void {
    const content = `
/**
* Type contains all the language keys.
* This type is generated automatically. Please, do not change it manually.
**/
export type FdLanguageKeyIdentifier = ${languageKeys.map((k) => JSON.stringify(k)).join(` | `)};
    `;
    tree.write('libs/i18n/src/lib/models/fd-language-key-identifier.ts', content);
}
