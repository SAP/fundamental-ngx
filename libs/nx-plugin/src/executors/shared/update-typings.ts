import { Tree, workspaceRoot } from '@nx/devkit';
import { readFileSync, writeFileSync } from 'fs';

/**
 * Extract translation keys from FdLanguage interface in fd-language.ts
 */
export function extractKeysFromFdLanguageInterface(): string[] {
    const filePath = `${workspaceRoot}/libs/i18n/src/lib/models/fd-language.ts`;
    const content = readFileSync(filePath, 'utf-8');

    const keys: string[] = [];

    // Find the start of the FdLanguage interface
    const interfaceStart = content.indexOf('export interface FdLanguage');
    if (interfaceStart === -1) {
        throw new Error('Could not find FdLanguage interface in fd-language.ts');
    }

    // Find the opening brace
    const openBraceIndex = content.indexOf('{', interfaceStart);
    if (openBraceIndex === -1) {
        throw new Error('Could not find opening brace of FdLanguage interface');
    }

    // Find the matching closing brace by counting brace depth
    let braceDepth = 0;
    let closeBraceIndex = -1;
    for (let i = openBraceIndex; i < content.length; i++) {
        if (content[i] === '{') {
            braceDepth++;
        } else if (content[i] === '}') {
            braceDepth--;
            if (braceDepth === 0) {
                closeBraceIndex = i;
                break;
            }
        }
    }

    if (closeBraceIndex === -1) {
        throw new Error('Could not find closing brace of FdLanguage interface');
    }

    // Extract the interface body
    const interfaceBody = content.substring(openBraceIndex + 1, closeBraceIndex);
    const lines = interfaceBody.split('\n');

    // Stack to track nesting level and current key path
    const keyStack: string[] = [];
    let nestedBraceDepth = 0;

    for (const line of lines) {
        const trimmed = line.trim();

        // Skip comments and empty lines
        if (trimmed.startsWith('/**') || trimmed.startsWith('*') || trimmed === '') {
            continue;
        }

        // Skip locale and name metadata properties
        if (trimmed.startsWith('locale?:') || trimmed.startsWith('name?:')) {
            continue;
        }

        // Check for FdLanguageKey property FIRST (before checking for opening brace)
        // This ensures properties with type parameters like FdLanguageKey<{ count: number }>
        // are not misidentified as nested objects
        if (trimmed.includes(': FdLanguageKey')) {
            const match = trimmed.match(/^(\w+):\s*FdLanguageKey/);
            if (match) {
                const propertyName = match[1];
                const fullKey = [...keyStack, propertyName].join('.');
                keys.push(fullKey);
            }
        }
        // Check for opening brace (nested object)
        else if (trimmed.includes('{')) {
            // Extract property name before the colon
            const match = trimmed.match(/^(\w+):\s*\{/);
            if (match) {
                keyStack.push(match[1]);
                nestedBraceDepth++;
            }
        }
        // Check for closing brace
        else if (trimmed.startsWith('}')) {
            if (nestedBraceDepth > 0) {
                keyStack.pop();
                nestedBraceDepth--;
            }
        }
    }

    return keys;
}

/**
 * Generate the content for fd-language-key-identifier.ts
 */
function generateFdLanguageKeyIdentifierContent(languageKeys: string[]): string {
    const keys = languageKeys.map((k) => `    | '${k}'`).join('\n');
    return `/**
 * Type contains all the language keys.
 * This type is generated automatically. Please, do not change it manually.
 **/
export type FdLanguageKeyIdentifier =\n${keys};\n`;
}

/**
 * Update fd-language-key-identifier.ts with the current list of translation keys
 * (file system version - used by i18n-manage)
 */
export function updateFdLanguageKeyIdentifier(languageKeys: string[]): void {
    const content = generateFdLanguageKeyIdentifierContent(languageKeys);
    const filePath = `${workspaceRoot}/libs/i18n/src/lib/models/fd-language-key-identifier.ts`;
    writeFileSync(filePath, content, 'utf-8');
}

/**
 * Update fd-language-key-identifier.ts with the current list of translation keys
 * (NX Tree version - used by sync command)
 */
export function updateTypings(tree: Tree, languageKeys: string[]): void {
    const content = generateFdLanguageKeyIdentifierContent(languageKeys);
    tree.write('libs/i18n/src/lib/models/fd-language-key-identifier.ts', content);
}
