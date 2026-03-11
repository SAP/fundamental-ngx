import { workspaceRoot } from '@nx/devkit';
import { sync as fastGlobSync } from 'fast-glob';
import { readFileSync } from 'fs';
import { parsePropertiesFile } from '../utils/properties-parser';

export interface ValidationError {
    file: string;
    line?: number;
    type: 'missing-keys' | 'extra-keys' | 'missing-comment' | 'invalid-comment' | 'icu-syntax';
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
 * Validate comment headers in properties file
 */
function validateComments(filePath: string, content: string): ValidationError[] {
    const errors: ValidationError[] = [];
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Is this a key=value line?
        if (line && !line.startsWith('#') && line.includes('=')) {
            const key = line.split('=')[0].trim();

            // Check if previous line is a comment
            if (i === 0 || !lines[i - 1].trim().startsWith('#')) {
                errors.push({
                    file: filePath,
                    line: i + 1,
                    type: 'missing-comment',
                    message: `Key "${key}" is missing a comment header`
                });
            } else {
                // Validate comment format
                const comment = lines[i - 1].trim();
                const match = comment.match(/^#([A-Z]+):/);

                if (!match) {
                    errors.push({
                        file: filePath,
                        line: i,
                        type: 'invalid-comment',
                        message: `Invalid comment format for key "${key}". Expected: #XTYPE: Description`
                    });
                } else if (!VALID_COMMENT_TYPES.includes(match[1])) {
                    errors.push({
                        file: filePath,
                        line: i,
                        type: 'invalid-comment',
                        message: `Invalid comment type "${match[1]}" for key "${key}". Valid types: ${VALID_COMMENT_TYPES.join(', ')}`
                    });
                }
            }
        }
    }

    return errors;
}

/**
 * Validate that all .properties files have the same keys
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
 * Validate all .properties files
 */
export async function validate(propertiesPath: string): Promise<ValidateResult> {
    const propertiesPattern = `${propertiesPath}/*.properties`;
    const propertiesFiles = fastGlobSync(propertiesPattern, { cwd: workspaceRoot });

    if (propertiesFiles.length === 0) {
        return {
            success: false,
            errors: [],
            summary: `No .properties files found at: ${propertiesPattern}`
        };
    }

    const allErrors: ValidationError[] = [];
    const fileKeysMap = new Map<string, Set<string>>();

    // Validate each file
    for (const propertiesFile of propertiesFiles) {
        const filePath = `${workspaceRoot}/${propertiesFile}`;
        const fileContent = readFileSync(filePath, 'utf-8');

        // Parse keys
        const entries = parsePropertiesFile(fileContent);
        fileKeysMap.set(propertiesFile, new Set(entries.keys()));

        // Validate comments
        const commentErrors = validateComments(propertiesFile, fileContent);
        allErrors.push(...commentErrors);

        // Validate ICU syntax
        const icuErrors = validateICUSyntax(propertiesFile, entries);
        allErrors.push(...icuErrors);
    }

    // Validate key consistency across files
    const consistencyErrors = validateKeyConsistency(fileKeysMap);
    allErrors.push(...consistencyErrors);

    const success = allErrors.length === 0;
    const summary = success
        ? `✅ All ${propertiesFiles.length} .properties files are valid`
        : `❌ Found ${allErrors.length} validation error(s) across ${propertiesFiles.length} files`;

    return {
        success,
        errors: allErrors,
        summary
    };
}
