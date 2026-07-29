import { workspaceRoot } from '@nx/devkit';
import { sync as fastGlobSync } from 'fast-glob';
import { readFileSync } from 'fs';
import { extractKeysFromFdLanguageInterface, updateFdLanguageKeyIdentifier } from '../../shared/update-typings';
import { validatePropertiesFiles } from '../utils/properties-validator';

export interface ValidationError {
    file: string;
    line?: number;
    type:
        | 'missing-keys'
        | 'extra-keys'
        | 'missing-comment'
        | 'invalid-comment'
        | 'icu-syntax'
        | 'interface-mismatch'
        | 'properties-security'
        | 'properties-syntax';
    message: string;
    keys?: string[];
}

export interface ValidateResult {
    success: boolean;
    errors: ValidationError[];
    summary?: string;
}

// Valid SAP UI5 comment types based on official SAP documentation
// Reference: SAP Language Experience Lab (LX Lab) text type classification
const VALID_COMMENT_TYPES = [
    'XACT', // Accessibility text (alt attribute translation)
    'XBUT', // Button
    'XCKL', // Checkbox label
    'XFLD', // Field label
    'XMIT', // Menu header or menu item
    'XMSG', // Message text
    'XRBL', // Radio button label
    'XSEL', // Values in a dropdown list
    'XTIT', // Title (or heading) of a nonactionable UI element
    'XTOL', // Explanatory text (tooltip)
    'XLNK', // Hyperlink
    'YINS', // Instruction for a user
    'NOTR' // No translation - text won't appear in translation worklist
];

/**
 * Validate that all translation files have the same keys
 */
function validateKeyConsistency(files: Map<string, Set<string>>): ValidationError[] {
    const errors: ValidationError[] = [];

    if (files.size === 0) {
        return errors;
    }

    // Use the first file as reference
    const [firstFile, referenceKeys] = Array.from(files.entries())[0];

    // Check each file against the reference
    for (const [file, keys] of files) {
        if (file === firstFile) {
            continue; // Skip comparing with itself
        }

        const missingKeys = [...referenceKeys].filter((k) => !keys.has(k));
        const extraKeys = [...keys].filter((k) => !referenceKeys.has(k));

        if (missingKeys.length > 0) {
            errors.push({
                file,
                type: 'missing-keys',
                message: `Missing ${missingKeys.length} key(s) that exist in other files`,
                keys: missingKeys.slice(0, 10) // Show first 10
            });
        }

        if (extraKeys.length > 0) {
            errors.push({
                file,
                type: 'extra-keys',
                message: `Has ${extraKeys.length} extra key(s) not found in other files`,
                keys: extraKeys.slice(0, 10)
            });
        }
    }

    return errors;
}

/**
 * Validate ICU MessageFormat syntax (basic validation)
 */
function validateICUSyntax(filePath: string, entries: Map<string, string>): ValidationError[] {
    const errors: ValidationError[] = [];

    for (const [key, value] of entries) {
        // Check for balanced curly braces
        const openBraces = (value.match(/{/g) || []).length;
        const closeBraces = (value.match(/}/g) || []).length;

        if (openBraces !== closeBraces) {
            errors.push({
                file: filePath,
                type: 'icu-syntax',
                message: `Key "${key}" has unbalanced curly braces in value: "${value}"`
            });
        }
    }

    return errors;
}

/**
 * Validate that all keys in .properties files have SAP UI5 comment annotations
 */
function validatePropertiesComments(filePath: string): ValidationError[] {
    const errors: ValidationError[] = [];
    const content = readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const relativeFilePath = filePath.replace(`${workspaceRoot}/`, '');

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Skip empty lines and comments
        if (!line || line.startsWith('#')) {
            continue;
        }

        // This is a key=value line
        if (line.includes('=')) {
            const key = line.split('=')[0].trim();

            // Check if the previous non-empty line is a comment
            let commentLine = '';
            let commentLineNum = i;
            for (let j = i - 1; j >= 0; j--) {
                const prevLine = lines[j].trim();
                if (prevLine) {
                    commentLine = prevLine;
                    commentLineNum = j + 1;
                    break;
                }
            }

            // Check if we have a comment for this key
            if (!commentLine.startsWith('#')) {
                errors.push({
                    file: relativeFilePath,
                    line: i + 1,
                    type: 'missing-comment',
                    message: `Key "${key}" is missing a required SAP UI5 comment annotation (e.g., #XACT, #XBUT, #XMSG, etc.)`
                });
                continue;
            }

            // Extract comment type (e.g., XACT from #XACT: description)
            const commentMatch = commentLine.match(/^#([A-Z]{4}):/);
            if (!commentMatch) {
                errors.push({
                    file: relativeFilePath,
                    line: commentLineNum,
                    type: 'invalid-comment',
                    message: `Comment for key "${key}" does not follow SAP UI5 format. Expected format: #TYPE: description (e.g., #XACT: Aria label for...)`
                });
                continue;
            }

            const commentType = commentMatch[1];
            if (!VALID_COMMENT_TYPES.includes(commentType)) {
                errors.push({
                    file: relativeFilePath,
                    line: commentLineNum,
                    type: 'invalid-comment',
                    message: `Comment for key "${key}" uses invalid type "${commentType}". Valid types: ${VALID_COMMENT_TYPES.join(', ')}`
                });
            }
        }
    }

    return errors;
}

/**
 * Validate all TypeScript translation files
 */
export async function validate(propertiesPath: string): Promise<ValidateResult> {
    const allErrors: ValidationError[] = [];

    // Step 1: Validate .properties files for security and syntax (runs first as a security gate)
    console.log('🔒 Validating .properties files for security...');
    const propertiesPattern = `${propertiesPath}/*.properties`;
    const propertiesFiles = fastGlobSync(propertiesPattern, { cwd: workspaceRoot }).map(
        (file) => `${workspaceRoot}/${file}`
    );

    if (propertiesFiles.length > 0) {
        const propertiesValidation = validatePropertiesFiles(propertiesFiles);

        // Convert properties validation errors to our format
        for (const error of propertiesValidation.errors) {
            allErrors.push({
                file: error.file.replace(`${workspaceRoot}/`, ''),
                line: error.line,
                type: error.type === 'suspicious-content' ? 'properties-security' : 'properties-syntax',
                message: error.message
            });
        }

        // Log warnings but don't fail validation
        for (const warning of propertiesValidation.warnings) {
            console.warn(`⚠️  ${warning.file}:${warning.line} - ${warning.message}`);
        }

        if (!propertiesValidation.valid) {
            const summary = `❌ Found ${allErrors.length} security/syntax error(s) in .properties files`;
            return {
                success: false,
                errors: allErrors,
                summary
            };
        }
        console.log('✅ Properties files security validation passed');
    } else {
        console.log('ℹ️  No .properties files found, skipping security validation');
    }

    // Step 2: Validate .properties files have required comments
    console.log('📝 Validating .properties files have comments...');
    if (propertiesFiles.length > 0) {
        for (const propertiesFile of propertiesFiles) {
            const commentErrors = validatePropertiesComments(propertiesFile);
            allErrors.push(...commentErrors);
        }

        if (allErrors.length > 0) {
            const summary = `❌ Found ${allErrors.length} comment error(s) in .properties files`;
            return {
                success: false,
                errors: allErrors,
                summary
            };
        }
        console.log('✅ Properties files comment validation passed');
    }

    // Step 3: Validate TypeScript translation files
    const tsPattern = `${propertiesPath}/translations*.ts`;
    const tsFiles = fastGlobSync(tsPattern, { cwd: workspaceRoot, ignore: ['**/*.spec.ts'] });

    if (tsFiles.length === 0) {
        return {
            success: false,
            errors: allErrors,
            summary: `No TypeScript translation files found at: ${tsPattern}`
        };
    }

    const fileKeysMap = new Map<string, Set<string>>();

    // Validate each file
    for (const tsFile of tsFiles) {
        const filePath = `${workspaceRoot}/${tsFile}`;
        const fileContent = readFileSync(filePath, 'utf-8');

        // Parse the TypeScript default export object to extract keys
        const keys = extractKeysFromTsFile(fileContent);
        if (keys.size === 0) {
            allErrors.push({
                file: tsFile,
                type: 'icu-syntax',
                message: 'Failed to parse TypeScript translation file or file is empty'
            });
            continue;
        }

        fileKeysMap.set(tsFile, keys);

        // Validate ICU syntax by extracting values from the TS file
        const entries = extractEntriesFromTsFile(fileContent);
        const icuErrors = validateICUSyntax(tsFile, entries);
        allErrors.push(...icuErrors);
    }

    // Validate key consistency across files
    const consistencyErrors = validateKeyConsistency(fileKeysMap);
    allErrors.push(...consistencyErrors);

    // Validate fd-language.ts interface matches translations.properties
    const interfaceErrors = await validateInterfaceMatch(propertiesPath);
    allErrors.push(...interfaceErrors);

    const success = allErrors.length === 0;
    const summary = success
        ? `✅ All ${tsFiles.length} TypeScript translation files are valid`
        : `❌ Found ${allErrors.length} validation error(s) across ${tsFiles.length} files`;

    // If validation succeeds, rebuild fd-language-key-identifier.ts from fd-language.ts
    if (success) {
        console.log('🔄 Rebuilding fd-language-key-identifier.ts...');
        try {
            const languageKeys = extractKeysFromFdLanguageInterface();
            updateFdLanguageKeyIdentifier(languageKeys);
            console.log('✅ fd-language-key-identifier.ts updated');
        } catch (error) {
            console.error('⚠️  Warning: Failed to rebuild fd-language-key-identifier.ts:', error);
        }
    }

    return {
        success,
        errors: allErrors,
        summary
    };
}

/**
 * Validate that fd-language.ts interface matches translations.properties
 */
async function validateInterfaceMatch(propertiesPath: string): Promise<ValidationError[]> {
    const errors: ValidationError[] = [];

    try {
        // Extract keys from fd-language.ts interface (returns array)
        const interfaceKeysArray = extractKeysFromFdLanguageInterface();
        const interfaceKeys = new Set(interfaceKeysArray);

        // Extract keys from translations.properties
        const basePropertiesFile = `${workspaceRoot}/${propertiesPath}/translations.properties`;
        const propertiesContent = readFileSync(basePropertiesFile, 'utf-8');
        const propertiesKeys = extractKeysFromTsFile(
            `export default ${JSON.stringify(extractEntriesFromPropertiesFile(propertiesContent), null, 4)};`
        );

        // Check for keys in interface but not in properties
        // (This is the validation that matters - interface is source of truth)
        const missingInProperties: string[] = [];
        for (const key of interfaceKeys) {
            if (!propertiesKeys.has(key)) {
                missingInProperties.push(key);
            }
        }

        if (missingInProperties.length > 0) {
            errors.push({
                file: `${propertiesPath}/translations.properties`,
                type: 'interface-mismatch',
                message: `${missingInProperties.length} key(s) defined in fd-language.ts interface but missing from translations.properties`,
                keys: missingInProperties.slice(0, 10)
            });
        }

        // Check for keys in properties but not in interface
        const missingInInterface: string[] = [];
        for (const key of propertiesKeys) {
            if (!interfaceKeys.has(key)) {
                missingInInterface.push(key);
            }
        }

        if (missingInInterface.length > 0) {
            errors.push({
                file: 'libs/i18n/src/lib/models/fd-language.ts',
                type: 'interface-mismatch',
                message: `${missingInInterface.length} key(s) in translations.properties but missing from fd-language.ts interface`,
                keys: missingInInterface.slice(0, 10)
            });
        }
    } catch (error) {
        errors.push({
            file: 'validation',
            type: 'interface-mismatch',
            message: `Failed to validate interface match: ${error instanceof Error ? error.message : String(error)}`
        });
    }

    return errors;
}

/**
 * Extract keys from a .properties file
 */
function extractEntriesFromPropertiesFile(content: string): Record<string, string> {
    const result: Record<string, string> = {};
    const lines = content.split('\n');

    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
            const equalIndex = trimmed.indexOf('=');
            const key = trimmed.substring(0, equalIndex).trim();
            const value = trimmed.substring(equalIndex + 1).trim();
            if (key) {
                result[key] = value;
            }
        }
    }

    return result;
}

/**
 * Extract keys from a TypeScript translation file
 */
function extractKeysFromTsFile(content: string): Set<string> {
    const keys = new Set<string>();
    try {
        // Extract the object literal from 'export default { ... };'
        const match = content.match(/export default\s+(\{[\s\S]+\});?\s*$/m);
        if (!match) {
            return keys;
        }

        // Use Node's VM to safely evaluate the JavaScript object literal
        // This handles single quotes, multi-line strings, and escaped characters correctly
        const vm = require('vm');
        const obj = vm.runInNewContext(`(${match[1]})`);

        // Recursively extract all keys
        function extractKeys(obj: any, prefix = ''): void {
            for (const key in obj) {
                if (!Object.prototype.hasOwnProperty.call(obj, key)) {
                    continue;
                }
                const fullKey = prefix ? `${prefix}.${key}` : key;
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    extractKeys(obj[key], fullKey);
                } else {
                    keys.add(fullKey);
                }
            }
        }

        extractKeys(obj);
    } catch {
        // Parse failed, return empty set
    }
    return keys;
}

/**
 * Extract key-value entries from a TypeScript translation file
 */
function extractEntriesFromTsFile(content: string): Map<string, string> {
    const entries = new Map<string, string>();
    try {
        const match = content.match(/export default\s+(\{[\s\S]+\});?\s*$/m);
        if (!match) {
            return entries;
        }

        // Use Node's VM to safely evaluate the JavaScript object literal
        const vm = require('vm');
        const obj = vm.runInNewContext(`(${match[1]})`);

        function extractEntries(obj: any, prefix = ''): void {
            for (const key in obj) {
                if (!Object.prototype.hasOwnProperty.call(obj, key)) {
                    continue;
                }
                const fullKey = prefix ? `${prefix}.${key}` : key;
                if (typeof obj[key] === 'object' && obj[key] !== null) {
                    extractEntries(obj[key], fullKey);
                } else {
                    entries.set(fullKey, String(obj[key]));
                }
            }
        }

        extractEntries(obj);
    } catch {
        // Parse failed, return empty map
    }
    return entries;
}
