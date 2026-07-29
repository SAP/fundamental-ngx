import { vol } from 'memfs';
import { addKey } from './add-key';

// Mock fs module
jest.mock('fs', () => {
    const memfs = require('memfs');
    return {
        ...memfs.fs,
        promises: memfs.fs.promises
    };
});

// Mock fast-glob
jest.mock('fast-glob', () => ({
    sync: jest.fn()
}));

// Mock @nx/devkit
jest.mock('@nx/devkit', () => ({
    workspaceRoot: '/test-workspace'
}));

// Mock prettier
jest.mock('prettier', () => ({
    format: jest.fn((code) => code),
    resolveConfig: jest.fn().mockResolvedValue({})
}));

import { sync as fastGlobSync } from 'fast-glob';

describe('AddKey Operation', () => {
    beforeEach(() => {
        vol.reset();
        jest.clearAllMocks();
    });

    describe('validateKeyFormat', () => {
        it('should accept valid key format', async () => {
            (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations.ts']);
            vol.fromJSON({
                '/test-workspace/libs/i18n/translations/translations.properties': `
#XBUT: Save button
coreButton.save=Save
                `.trim(),
                '/test-workspace/libs/i18n/translations/translations.ts': 'export default {}',
                '/test-workspace/libs/i18n/src/lib/models/fd-language-key-identifier.ts': '// placeholder'
            });

            const result = await addKey({
                key: 'coreButton.submit',
                value: 'Submit',
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(true);
        });

        it('should reject empty key', async () => {
            (fastGlobSync as jest.Mock).mockReturnValue([]);

            const result = await addKey({
                key: '',
                value: 'Test',
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(false);
            expect(result.error).toContain('cannot be empty');
        });

        it('should reject key without dot separator', async () => {
            (fastGlobSync as jest.Mock).mockReturnValue([]);

            const result = await addKey({
                key: 'invalidkey',
                value: 'Test',
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(false);
            expect(result.error).toContain('Invalid key format');
            expect(result.error).toContain('component.keyName');
        });

        it('should reject key with invalid characters', async () => {
            (fastGlobSync as jest.Mock).mockReturnValue([]);

            const result = await addKey({
                key: 'core-button.save',
                value: 'Test',
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(false);
            expect(result.error).toContain('Invalid characters');
        });
    });

    describe('key existence check', () => {
        it('should reject if key already exists', async () => {
            (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations.ts']);
            vol.fromJSON({
                '/test-workspace/libs/i18n/translations/translations.properties': `
#XBUT: Save button
coreButton.save=Save
                `.trim()
            });

            const result = await addKey({
                key: 'coreButton.save',
                value: 'Save',
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(false);
            expect(result.error).toContain('already exists');
        });
    });

    describe('adding keys', () => {
        it('should add key to translations.properties and regenerate .ts files', async () => {
            (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations.ts']);
            vol.fromJSON({
                '/test-workspace/libs/i18n/translations/translations.properties': `
#XBUT: Save button
coreButton.save=Save
                `.trim(),
                '/test-workspace/libs/i18n/translations/translations.ts': 'export default {}',
                '/test-workspace/libs/i18n/src/lib/models/fd-language-key-identifier.ts': '// placeholder'
            });

            const result = await addKey({
                key: 'coreButton.cancel',
                value: 'Cancel',
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(true);
            expect(result.filesModified).toContain('libs/i18n/translations/translations.properties');

            const content = vol.readFileSync(
                '/test-workspace/libs/i18n/translations/translations.properties',
                'utf-8'
            ) as string;
            expect(content).toContain('coreButton.cancel = Cancel');
        });

        it('should regenerate all TypeScript translation files', async () => {
            (fastGlobSync as jest.Mock).mockReturnValue([
                'libs/i18n/translations/translations.ts',
                'libs/i18n/translations/translations_de.ts'
            ]);
            vol.fromJSON({
                '/test-workspace/libs/i18n/translations/translations.properties': `
#XBUT: Save button
coreButton.save=Save
                `.trim(),
                '/test-workspace/libs/i18n/translations/translations.ts': 'export default {}',
                '/test-workspace/libs/i18n/translations/translations_de.ts': 'export default {}',
                '/test-workspace/libs/i18n/translations/translations_de.properties': `
#XBUT: Save button
coreButton.save=Speichern
                `.trim(),
                '/test-workspace/libs/i18n/src/lib/models/fd-language-key-identifier.ts': '// placeholder'
            });

            const result = await addKey({
                key: 'coreButton.cancel',
                value: 'Cancel',
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(true);

            // Check translations.ts was regenerated with new key
            const enContent = vol.readFileSync(
                '/test-workspace/libs/i18n/translations/translations.ts',
                'utf-8'
            ) as string;
            expect(enContent).toContain('"cancel": "Cancel"');

            // Check translations_de.ts was regenerated - falls back to English for new key
            const deContent = vol.readFileSync(
                '/test-workspace/libs/i18n/translations/translations_de.ts',
                'utf-8'
            ) as string;
            expect(deContent).toContain('"save": "Speichern"'); // Has existing German translation
            expect(deContent).toContain('"cancel": "Cancel"'); // Falls back to English
        });

        it('should auto-generate comment when not provided', async () => {
            (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations.ts']);
            vol.fromJSON({
                '/test-workspace/libs/i18n/translations/translations.properties': `
#XBUT: Save button
coreButton.save=Save
                `.trim(),
                '/test-workspace/libs/i18n/translations/translations.ts': 'export default {}',
                '/test-workspace/libs/i18n/src/lib/models/fd-language-key-identifier.ts': '// placeholder'
            });

            const result = await addKey({
                key: 'coreButton.submit',
                value: 'Submit',
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(true);

            const content = vol.readFileSync(
                '/test-workspace/libs/i18n/translations/translations.properties',
                'utf-8'
            ) as string;
            // Should have some comment
            expect(content).toMatch(/#X[A-Z]+:/);
        });

        it('should use provided comment and type', async () => {
            (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations.ts']);
            vol.fromJSON({
                '/test-workspace/libs/i18n/translations/translations.properties': `
#XBUT: Save button
coreButton.save=Save
                `.trim(),
                '/test-workspace/libs/i18n/translations/translations.ts': 'export default {}',
                '/test-workspace/libs/i18n/src/lib/models/fd-language-key-identifier.ts': '// placeholder'
            });

            const result = await addKey({
                key: 'coreButton.delete',
                value: 'Delete',
                comment: 'Custom delete button',
                commentType: 'XBUT',
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(true);

            const content = vol.readFileSync(
                '/test-workspace/libs/i18n/translations/translations.properties',
                'utf-8'
            ) as string;
            expect(content).toContain('#XBUT: Custom delete button');
        });

        it('should handle nested key structure', async () => {
            (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations.ts']);
            vol.fromJSON({
                '/test-workspace/libs/i18n/translations/translations.properties': `
#XBUT: Save button
coreButton.save=Save
                `.trim(),
                '/test-workspace/libs/i18n/translations/translations.ts': 'export default {}',
                '/test-workspace/libs/i18n/src/lib/models/fd-language-key-identifier.ts': '// placeholder'
            });

            const result = await addKey({
                key: 'coreDialog.headerTitle',
                value: 'Dialog Title',
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(true);

            const tsContent = vol.readFileSync(
                '/test-workspace/libs/i18n/translations/translations.ts',
                'utf-8'
            ) as string;
            // Should generate nested structure
            expect(tsContent).toContain('coreDialog');
        });
    });

    describe('error handling', () => {
        it('should fail if translations.properties does not exist', async () => {
            (fastGlobSync as jest.Mock).mockReturnValue([]);
            vol.fromJSON({});

            const result = await addKey({
                key: 'coreButton.test',
                value: 'Test',
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(false);
            expect(result.error).toContain('Failed to read translations.properties');
        });

        it('should fail if no TypeScript files found', async () => {
            (fastGlobSync as jest.Mock).mockReturnValue([]);
            vol.fromJSON({
                '/test-workspace/libs/i18n/translations/translations.properties': `
#XBUT: Save button
coreButton.save=Save
                `.trim()
            });

            const result = await addKey({
                key: 'coreButton.test',
                value: 'Test',
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(false);
            expect(result.error).toContain('No TypeScript translation files found');
        });
    });
});
