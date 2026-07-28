import { vol } from 'memfs';
import { validatePropertiesFile, validatePropertiesFiles } from './properties-validator';

// Mock fs module
jest.mock('fs', () => {
    const memfs = require('memfs');
    return {
        ...memfs.fs,
        promises: memfs.fs.promises
    };
});

describe('PropertiesValidator', () => {
    beforeEach(() => {
        vol.reset();
    });

    describe('validatePropertiesFile', () => {
        describe('valid files', () => {
            it('should pass validation for well-formed properties file', () => {
                vol.fromJSON({
                    '/test.properties': `# Comment
coreButton.save=Save
coreButton.cancel=Cancel
core.dialog.title=Confirmation Dialog`
                });

                const result = validatePropertiesFile('/test.properties');

                expect(result.valid).toBe(true);
                expect(result.errors).toHaveLength(0);
            });

            it('should allow empty lines', () => {
                vol.fromJSON({
                    '/test.properties': `coreButton.save=Save

coreButton.cancel=Cancel`
                });

                const result = validatePropertiesFile('/test.properties');

                expect(result.valid).toBe(true);
            });

            it('should allow comment lines', () => {
                vol.fromJSON({
                    '/test.properties': `# Main comment
coreButton.save=Save
# Another comment
coreButton.cancel=Cancel`
                });

                const result = validatePropertiesFile('/test.properties');

                expect(result.valid).toBe(true);
            });

            it('should allow ICU MessageFormat patterns', () => {
                vol.fromJSON({
                    '/test.properties': `coreTable.itemsSelected={count, plural, =0 {No items} one {# item} other {# items}} selected`
                });

                const result = validatePropertiesFile('/test.properties');

                expect(result.valid).toBe(true);
            });

            it('should allow special characters in values', () => {
                vol.fromJSON({
                    '/test.properties': `coreButton.label=Save & Close
coreMessage.text=Items (1-10)`
                });

                const result = validatePropertiesFile('/test.properties');

                expect(result.valid).toBe(true);
            });

            it('should allow hyphens and underscores in keys', () => {
                vol.fromJSON({
                    '/test.properties': `core_button.save-action=Save
core-dialog.close_button=Close`
                });

                const result = validatePropertiesFile('/test.properties');

                expect(result.valid).toBe(true);
            });
        });

        describe('invalid key validation', () => {
            it('should reject empty keys', () => {
                vol.fromJSON({
                    '/test.properties': `=Some Value`
                });

                const result = validatePropertiesFile('/test.properties');

                expect(result.valid).toBe(false);
                expect(result.errors).toHaveLength(1);
                expect(result.errors[0].type).toBe('empty-key');
            });

            it('should reject keys with spaces', () => {
                vol.fromJSON({
                    '/test.properties': `core button.save=Save`
                });

                const result = validatePropertiesFile('/test.properties');

                expect(result.valid).toBe(false);
                expect(result.errors[0].type).toBe('invalid-key-chars');
                expect(result.errors[0].message).toContain('invalid characters');
            });

            it('should reject keys with special characters', () => {
                vol.fromJSON({
                    '/test.properties': `core@button.save=Save
core$button.cancel=Cancel
core#button.submit=Submit`
                });

                const result = validatePropertiesFile('/test.properties');

                expect(result.valid).toBe(false);
                expect(result.errors).toHaveLength(3);
                result.errors.forEach((error) => {
                    expect(error.type).toBe('invalid-key-chars');
                });
            });
        });

        describe('code injection prevention', () => {
            it('should reject script tags in values', () => {
                vol.fromJSON({
                    '/test.properties': `coreButton.label=Click <script>alert('xss')</script> here`
                });

                const result = validatePropertiesFile('/test.properties');

                expect(result.valid).toBe(false);
                expect(result.errors[0].type).toBe('suspicious-content');
                expect(result.errors[0].message).toContain('script tag');
            });

            it('should reject javascript: protocol', () => {
                vol.fromJSON({
                    '/test.properties': `coreLink.url=javascript:alert('xss')`
                });

                const result = validatePropertiesFile('/test.properties');

                expect(result.valid).toBe(false);
                expect(result.errors[0].type).toBe('suspicious-content');
                expect(result.errors[0].message).toContain('javascript: protocol');
            });

            it('should reject event handler attributes', () => {
                vol.fromJSON({
                    '/test.properties': `coreButton.label=<img src=x onerror=alert('xss')>`
                });

                const result = validatePropertiesFile('/test.properties');

                expect(result.valid).toBe(false);
                expect(result.errors[0].type).toBe('suspicious-content');
                expect(result.errors[0].message).toContain('event handler');
            });

            it('should reject shell command substitution', () => {
                vol.fromJSON({
                    '/test.properties': `coreMessage.text=Value is \`whoami\``
                });

                const result = validatePropertiesFile('/test.properties');

                expect(result.valid).toBe(false);
                expect(result.errors[0].type).toBe('suspicious-content');
                expect(result.errors[0].message).toContain('shell command substitution');
            });

            it('should reject template literals with ${}', () => {
                vol.fromJSON({
                    '/test.properties': `coreMessage.text=Hello \${process.env.SECRET}`
                });

                const result = validatePropertiesFile('/test.properties');

                expect(result.valid).toBe(false);
                expect(result.errors[0].type).toBe('suspicious-content');
                expect(result.errors[0].message).toContain('template literal');
            });

            it('should reject path traversal sequences', () => {
                vol.fromJSON({
                    '/test.properties': `corePath.value=../../etc/passwd`
                });

                const result = validatePropertiesFile('/test.properties');

                expect(result.valid).toBe(false);
                expect(result.errors[0].type).toBe('suspicious-content');
                expect(result.errors[0].message).toContain('path traversal');
            });

            it('should reject null bytes', () => {
                vol.fromJSON({
                    '/test.properties': `coreMessage.text=Value\x00Injection`
                });

                const result = validatePropertiesFile('/test.properties');

                expect(result.valid).toBe(false);
                expect(result.errors[0].type).toBe('suspicious-content');
                expect(result.errors[0].message).toContain('null byte');
            });

            it('should reject prototype pollution attempts', () => {
                vol.fromJSON({
                    '/test.properties': `__proto__.isAdmin=true
constructor.prototype.isAdmin=true
prototype.isAdmin=true`
                });

                const result = validatePropertiesFile('/test.properties');

                expect(result.valid).toBe(false);
                expect(result.errors.length).toBeGreaterThanOrEqual(2);
                const suspiciousErrors = result.errors.filter((e) => e.type === 'suspicious-content');
                expect(suspiciousErrors.length).toBeGreaterThan(0);
            });
        });

        describe('DoS prevention', () => {
            it('should reject oversized values', () => {
                const largeValue = 'A'.repeat(10001);
                vol.fromJSON({
                    '/test.properties': `coreMessage.text=${largeValue}`
                });

                const result = validatePropertiesFile('/test.properties');

                expect(result.valid).toBe(false);
                expect(result.errors[0].type).toBe('oversized-value');
                expect(result.errors[0].message).toContain('exceeds maximum length');
            });

            it('should allow values up to max length', () => {
                const largeValue = 'A'.repeat(10000);
                vol.fromJSON({
                    '/test.properties': `coreMessage.text=${largeValue}`
                });

                const result = validatePropertiesFile('/test.properties');

                expect(result.valid).toBe(true);
            });
        });

        describe('syntax validation', () => {
            it('should reject lines without equals sign', () => {
                vol.fromJSON({
                    '/test.properties': `coreButton.save Save Button`
                });

                const result = validatePropertiesFile('/test.properties');

                expect(result.valid).toBe(false);
                expect(result.errors[0].type).toBe('invalid-syntax');
                expect(result.errors[0].message).toContain('does not follow key=value format');
            });

            it('should handle file read errors', () => {
                const result = validatePropertiesFile('/nonexistent.properties');

                expect(result.valid).toBe(false);
                expect(result.errors[0].type).toBe('invalid-syntax');
                expect(result.errors[0].message).toContain('Failed to read file');
            });
        });

        describe('warning cases', () => {
            it('should warn about control characters in values', () => {
                vol.fromJSON({
                    '/test.properties': `coreMessage.text=Value\x01WithControlChar`
                });

                const result = validatePropertiesFile('/test.properties');

                expect(result.valid).toBe(true);
                expect(result.warnings).toHaveLength(1);
                expect(result.warnings[0].type).toBe('invalid-value-chars');
                expect(result.warnings[0].severity).toBe('warning');
            });
        });

        describe('line number tracking', () => {
            it('should report correct line numbers for errors', () => {
                vol.fromJSON({
                    '/test.properties': `coreButton.save=Save
# Comment
coreButton.invalid key=Value
coreButton.cancel=Cancel`
                });

                const result = validatePropertiesFile('/test.properties');

                expect(result.valid).toBe(false);
                expect(result.errors[0].line).toBe(3);
            });

            it('should track multiple errors with correct line numbers', () => {
                vol.fromJSON({
                    '/test.properties': `coreButton.save=Save
coreButton.bad key=Value
coreButton.cancel=Cancel
coreButton.another bad=Value`
                });

                const result = validatePropertiesFile('/test.properties');

                expect(result.valid).toBe(false);
                expect(result.errors).toHaveLength(2);
                expect(result.errors[0].line).toBe(2);
                expect(result.errors[1].line).toBe(4);
            });
        });
    });

    describe('validatePropertiesFiles', () => {
        it('should validate multiple files and aggregate results', () => {
            vol.fromJSON({
                '/file1.properties': `coreButton.save=Save`,
                '/file2.properties': `coreButton.invalid key=Value`,
                '/file3.properties': `coreButton.cancel=Cancel`
            });

            const result = validatePropertiesFiles(['/file1.properties', '/file2.properties', '/file3.properties']);

            expect(result.valid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0].file).toBe('/file2.properties');
        });

        it('should pass when all files are valid', () => {
            vol.fromJSON({
                '/file1.properties': `coreButton.save=Save`,
                '/file2.properties': `coreButton.cancel=Cancel`,
                '/file3.properties': `coreButton.submit=Submit`
            });

            const result = validatePropertiesFiles(['/file1.properties', '/file2.properties', '/file3.properties']);

            expect(result.valid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });

        it('should handle empty file list', () => {
            const result = validatePropertiesFiles([]);

            expect(result.valid).toBe(true);
            expect(result.errors).toHaveLength(0);
        });
    });
});
