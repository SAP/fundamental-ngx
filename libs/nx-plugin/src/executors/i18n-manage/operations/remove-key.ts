import { workspaceRoot } from '@nx/devkit';
import { readFileSync, writeFileSync } from 'fs';
import { keyExists, removeKeyFromProperties } from '../utils/properties-parser';
import { regenerateTypeScriptFiles } from './sync';

interface InterfaceLocation {
    startLine: number;
    endLine: number;
}

interface ComponentLocation extends InterfaceLocation {
    componentName: string;
}

/**
 * Find the FdLanguage interface bounds in the file
 */
function findInterfaceBounds(lines: string[]): InterfaceLocation | null {
    let startLine = -1;
    let braceDepth = 0;

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('interface FdLanguage')) {
            startLine = i;
        }
        if (startLine !== -1) {
            for (const char of lines[i]) {
                if (char === '{') {
                    braceDepth++;
                }
                if (char === '}') {
                    braceDepth--;
                }
            }
            if (braceDepth === 0) {
                return { startLine, endLine: i };
            }
        }
    }

    return null;
}

/**
 * Find a component section within interface lines
 */
function findComponentSection(interfaceLines: string[], componentName: string): ComponentLocation | null {
    const componentRegex = new RegExp(`^\\s+${componentName}:\\s*\\{`);
    let startLine = -1;
    let braceDepth = 0;

    for (let i = 0; i < interfaceLines.length; i++) {
        if (interfaceLines[i].match(componentRegex)) {
            startLine = i;
            braceDepth = 1;
            for (let j = i + 1; j < interfaceLines.length; j++) {
                for (const char of interfaceLines[j]) {
                    if (char === '{') {
                        braceDepth++;
                    }
                    if (char === '}') {
                        braceDepth--;
                    }
                }
                if (braceDepth === 0) {
                    return { startLine, endLine: j, componentName };
                }
            }
        }
    }

    return null;
}

/**
 * Check if component section has any content (not just braces and comments)
 */
function hasComponentContent(lines: string[], startLine: number, endLine: number): boolean {
    const componentLines = lines.slice(startLine, endLine + 1);
    return componentLines.slice(1, -1).some((l) => {
        const t = l.trim();
        return t && !t.startsWith('//') && !t.startsWith('/*');
    });
}

/**
 * Remove a key and its component section if empty from fd-language.ts
 */
function removeKeyFromInterface(content: string, componentName: string, keyName: string): string {
    const lines = content.split('\n');
    const interfaceBounds = findInterfaceBounds(lines);

    if (!interfaceBounds) {
        return content;
    }

    const beforeInterface = lines.slice(0, interfaceBounds.startLine);
    const afterInterface = lines.slice(interfaceBounds.endLine + 1);
    const interfaceLines = lines.slice(interfaceBounds.startLine, interfaceBounds.endLine + 1);

    const component = findComponentSection(interfaceLines, componentName);
    if (!component) {
        return content;
    }

    // Find the key line within component
    const keyRegex = new RegExp(`^\\s+${keyName}\\b\\s*:`);
    let keyLineIdx = -1;

    for (let i = component.startLine + 1; i < component.endLine; i++) {
        if (interfaceLines[i].match(keyRegex)) {
            keyLineIdx = i;
            break;
        }
    }

    if (keyLineIdx === -1) {
        return content;
    }

    // Remove JSDoc comment + key line
    let removeStart = keyLineIdx;
    let removeCount = 1;

    if (keyLineIdx > 0 && interfaceLines[keyLineIdx - 1].trim().startsWith('/**')) {
        removeStart = keyLineIdx - 1;
        removeCount = 2;
    }

    interfaceLines.splice(removeStart, removeCount);

    // Check if component section is now empty
    const updatedComponentEnd = component.endLine - removeCount;
    if (!hasComponentContent(interfaceLines, component.startLine, updatedComponentEnd)) {
        interfaceLines.splice(component.startLine, updatedComponentEnd - component.startLine + 1);
    }

    return [...beforeInterface, ...interfaceLines, ...afterInterface].join('\n');
}

export interface RemoveKeyOptions {
    key: string;
    propertiesPath: string;
}

export interface RemoveKeyResult {
    success: boolean;
    filesModified: string[];
    error?: string;
}

/**
 * Validate key format (must be component.keyName)
 */
function validateKeyFormat(key: string): { valid: boolean; error?: string } {
    if (!key || key.trim() === '') {
        return { valid: false, error: 'Key cannot be empty' };
    }

    const parts = key.split('.');
    if (parts.length < 2) {
        return {
            valid: false,
            error: `Invalid key format: "${key}". Expected format: "component.keyName" (e.g., "coreButton.save")`
        };
    }

    if (!/^[a-zA-Z0-9_.]+$/.test(key)) {
        return {
            valid: false,
            error: `Invalid characters in key: "${key}". Only alphanumeric, underscore, and dots are allowed`
        };
    }

    return { valid: true };
}

/**
 * Remove a translation key from all TypeScript translation files
 */
export async function removeKey(options: RemoveKeyOptions): Promise<RemoveKeyResult> {
    const { key, propertiesPath } = options;

    // Step 1: Validate key format
    const validation = validateKeyFormat(key);
    if (!validation.valid) {
        return {
            success: false,
            filesModified: [],
            error: validation.error
        };
    }

    // Step 2: Read the base translations.properties file to check if key exists
    const basePropertiesFile = `${workspaceRoot}/${propertiesPath}/translations.properties`;
    try {
        const baseContent = readFileSync(basePropertiesFile, 'utf-8');
        if (!keyExists(baseContent, key)) {
            return {
                success: false,
                filesModified: [],
                error: `Key "${key}" does not exist in translations.properties. Cannot remove a non-existent key.`
            };
        }
    } catch (error) {
        return {
            success: false,
            filesModified: [],
            error: `Failed to read translations.properties: ${error instanceof Error ? error.message : String(error)}`
        };
    }

    // Step 3: Remove the key from base translations.properties file
    try {
        const baseContent = readFileSync(basePropertiesFile, 'utf-8');
        const updatedContent = removeKeyFromProperties(baseContent, key);
        writeFileSync(basePropertiesFile, updatedContent, 'utf-8');
    } catch (error) {
        return {
            success: false,
            filesModified: [],
            error: `Failed to remove key from translations.properties: ${error instanceof Error ? error.message : String(error)}`
        };
    }

    // Step 4: Remove the key from fd-language.ts interface
    const fdLanguagePath = `${workspaceRoot}/libs/i18n/src/lib/models/fd-language.ts`;
    try {
        const fdLanguageContent = readFileSync(fdLanguagePath, 'utf-8');
        const [componentName, keyName] = key.split('.');
        const updatedFdLanguage = removeKeyFromInterface(fdLanguageContent, componentName, keyName);

        if (updatedFdLanguage !== fdLanguageContent) {
            writeFileSync(fdLanguagePath, updatedFdLanguage, 'utf-8');
        }
    } catch (error) {
        // If fd-language.ts doesn't exist or can't be read, that's OK — it's optional
        // Only fail if it's a different kind of error
        if (!(error instanceof Error && error.message.includes('ENOENT'))) {
            return {
                success: false,
                filesModified: [],
                error: `Failed to update fd-language.ts: ${error instanceof Error ? error.message : String(error)}`
            };
        }
    }

    // Step 5: Regenerate all TypeScript files from .properties files
    const result = await regenerateTypeScriptFiles(propertiesPath);
    if (!result.success) {
        return result;
    }

    // Include the modified files in the list
    return {
        success: true,
        filesModified: [
            `${propertiesPath}/translations.properties`,
            'libs/i18n/src/lib/models/fd-language.ts',
            ...result.filesModified
        ]
    };
}
