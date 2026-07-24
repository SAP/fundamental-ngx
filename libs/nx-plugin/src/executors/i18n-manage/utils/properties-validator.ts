import { readFileSync } from 'fs';

export interface PropertiesValidationError {
    file: string;
    line: number;
    type:
        | 'invalid-key-chars'
        | 'empty-key'
        | 'invalid-value-chars'
        | 'suspicious-content'
        | 'invalid-syntax'
        | 'oversized-value';
    message: string;
    severity: 'error' | 'warning';
}

export interface PropertiesValidationResult {
    valid: boolean;
    errors: PropertiesValidationError[];
    warnings: PropertiesValidationError[];
}

// Security: Key pattern - only allow alphanumeric, dots, hyphens, underscores
const VALID_KEY_PATTERN = /^[a-zA-Z0-9._-]+$/;

// Security: Detect potentially dangerous patterns in values
const SUSPICIOUS_PATTERNS = [
    // Script injection attempts
    { pattern: /<script[^>]*>/i, name: 'script tag' },
    { pattern: /javascript:/i, name: 'javascript: protocol' },
    { pattern: /on\w+\s*=/i, name: 'event handler attribute' },

    // Command injection attempts
    { pattern: /`[^`]*`/g, name: 'shell command substitution' },
    { pattern: /\$\([^)]*\)/g, name: 'shell command substitution' },
    { pattern: /\$\{[^}]*\}/g, name: 'template literal' },

    // Path traversal attempts
    // eslint-disable-next-line no-useless-escape
    { pattern: /\.\.[\/\\]/g, name: 'path traversal sequence' },

    // Null byte injection
    { pattern: /\0/g, name: 'null byte' },

    // Prototype pollution attempts
    { pattern: /__proto__/i, name: '__proto__ reference' },
    { pattern: /constructor\s*:/i, name: 'constructor property' },
    { pattern: /prototype\s*:/i, name: 'prototype property' }
];

// Max value length (prevent DoS via extremely large values)
const MAX_VALUE_LENGTH = 10000;

/**
 * Validate a .properties file for security issues and syntax correctness.
 * This validator is designed to prevent code injection attacks via fork PRs
 * that modify translation files processed by the i18n-auto-generate workflow.
 *
 * Security properties:
 * - Keys must only contain alphanumeric characters, dots, hyphens, underscores
 * - Values are checked for suspicious patterns (script tags, command injection, etc.)
 * - Values have a maximum length to prevent DoS
 * - Empty keys are rejected
 * - Lines must follow key=value format or be comments/empty
 *
 * @param filePath - Path to the .properties file to validate
 * @returns Validation result with any errors or warnings found
 */
export function validatePropertiesFile(filePath: string): PropertiesValidationResult {
    const errors: PropertiesValidationError[] = [];
    const warnings: PropertiesValidationError[] = [];

    let content: string;
    try {
        content = readFileSync(filePath, 'utf-8');
    } catch (error) {
        errors.push({
            file: filePath,
            line: 0,
            type: 'invalid-syntax',
            message: `Failed to read file: ${error instanceof Error ? error.message : String(error)}`,
            severity: 'error'
        });
        return { valid: false, errors, warnings };
    }

    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
        const lineNum = i + 1;
        const line = lines[i];
        const trimmed = line.trim();

        // Skip empty lines and comments
        if (!trimmed || trimmed.startsWith('#')) {
            continue;
        }

        // Line must contain '='
        if (!trimmed.includes('=')) {
            errors.push({
                file: filePath,
                line: lineNum,
                type: 'invalid-syntax',
                message: `Line does not follow key=value format: "${line}"`,
                severity: 'error'
            });
            continue;
        }

        const equalIndex = trimmed.indexOf('=');
        const key = trimmed.substring(0, equalIndex).trim();
        const value = trimmed.substring(equalIndex + 1).trim();

        // Validate key is not empty
        if (!key) {
            errors.push({
                file: filePath,
                line: lineNum,
                type: 'empty-key',
                message: 'Key cannot be empty',
                severity: 'error'
            });
            continue;
        }

        // Validate key contains only safe characters
        if (!VALID_KEY_PATTERN.test(key)) {
            errors.push({
                file: filePath,
                line: lineNum,
                type: 'invalid-key-chars',
                message: `Key contains invalid characters: "${key}". Only alphanumeric, dots, hyphens, and underscores are allowed.`,
                severity: 'error'
            });
        }

        // Validate value length (DoS prevention)
        if (value.length > MAX_VALUE_LENGTH) {
            errors.push({
                file: filePath,
                line: lineNum,
                type: 'oversized-value',
                message: `Value exceeds maximum length of ${MAX_VALUE_LENGTH} characters (${value.length} characters)`,
                severity: 'error'
            });
        }

        // Check for suspicious patterns in values (code injection attempts)
        for (const { pattern, name } of SUSPICIOUS_PATTERNS) {
            if (pattern.test(value)) {
                errors.push({
                    file: filePath,
                    line: lineNum,
                    type: 'suspicious-content',
                    message: `Value contains suspicious pattern (${name}): "${value.substring(0, 100)}${value.length > 100 ? '...' : ''}"`,
                    severity: 'error'
                });
            }
        }

        // Check for control characters (excluding valid ones like \n, \t, \r)
        // eslint-disable-next-line no-control-regex
        const controlChars = value.match(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g);
        if (controlChars) {
            warnings.push({
                file: filePath,
                line: lineNum,
                type: 'invalid-value-chars',
                message: `Value contains control characters: "${value.substring(0, 100)}${value.length > 100 ? '...' : ''}"`,
                severity: 'warning'
            });
        }
    }

    return {
        valid: errors.length === 0,
        errors,
        warnings
    };
}

/**
 * Validate multiple .properties files and aggregate results
 */
export function validatePropertiesFiles(filePaths: string[]): PropertiesValidationResult {
    const allErrors: PropertiesValidationError[] = [];
    const allWarnings: PropertiesValidationError[] = [];

    for (const filePath of filePaths) {
        const result = validatePropertiesFile(filePath);
        allErrors.push(...result.errors);
        allWarnings.push(...result.warnings);
    }

    return {
        valid: allErrors.length === 0,
        errors: allErrors,
        warnings: allWarnings
    };
}
