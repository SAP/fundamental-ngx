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

// Mock transform-translations executor
jest.mock('../../transform-translations/executor', () => ({
    __esModule: true,
    default: jest.fn().mockResolvedValue({ success: true })
}));

import { sync as fastGlobSync } from 'fast-glob';
import transformTranslationsExecutor from '../../transform-translations/executor';

describe('AddKey Operation', () => {
    beforeEach(() => {
        vol.reset();
        jest.clearAllMocks();
        (transformTranslationsExecutor as jest.Mock).mockResolvedValue({ success: true });
    });

    describe('validateKeyFormat', () => {
        it('should accept valid key format', async () => {
            (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations_en.properties']);
            vol.fromJSON({
                '/test-workspace/libs/i18n/translations/translations_en.properties': `
#XBUT: Save button
coreButton.save=Save
                `.trim()
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
            (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations_en.properties']);
            vol.fromJSON({
                '/test-workspace/libs/i18n/translations/translations_en.properties': `
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
        it('should add key to single .properties file', async () => {
            (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations_en.properties']);
            vol.fromJSON({
                '/test-workspace/libs/i18n/translations/translations_en.properties': `
#XBUT: Save button
coreButton.save=Save
                `.trim()
            });

            const result = await addKey({
                key: 'coreButton.cancel',
                value: 'Cancel',
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(true);
            expect(result.filesModified).toHaveLength(1);
            expect(result.filesModified[0]).toBe('libs/i18n/translations/translations_en.properties');

            const content = vol.readFileSync(
                '/test-workspace/libs/i18n/translations/translations_en.properties',
                'utf-8'
            ) as string;
            expect(content).toContain('coreButton.cancel=Cancel');
            expect(content).toContain('#XBUT: Cancel');
        });

        it('should add key to multiple .properties files', async () => {
            (fastGlobSync as jest.Mock).mockReturnValue([
                'libs/i18n/translations/translations_en.properties',
                'libs/i18n/translations/translations_de.properties',
                'libs/i18n/translations/translations_fr.properties'
            ]);

            vol.fromJSON({
                '/test-workspace/libs/i18n/translations/translations_en.properties': `
#XBUT: Save
coreButton.save=Save
                `.trim(),
                '/test-workspace/libs/i18n/translations/translations_de.properties': `
#XBUT: Save
coreButton.save=Save
                `.trim(),
                '/test-workspace/libs/i18n/translations/translations_fr.properties': `
#XBUT: Save
coreButton.save=Save
                `.trim()
            });

            const result = await addKey({
                key: 'coreButton.cancel',
                value: 'Cancel',
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(true);
            expect(result.filesModified).toHaveLength(3);

            // Check all files were updated
            for (const file of result.filesModified) {
                const content = vol.readFileSync(`/test-workspace/${file}`, 'utf-8') as string;
                expect(content).toContain('coreButton.cancel=Cancel');
            }
        });

        it('should use custom comment when provided', async () => {
            (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations_en.properties']);
            vol.fromJSON({
                '/test-workspace/libs/i18n/translations/translations_en.properties': `
#XBUT: Save
coreButton.save=Save
                `.trim()
            });

            const result = await addKey({
                key: 'coreButton.submit',
                value: 'Submit',
                comment: 'Submit button for form submission',
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(true);

            const content = vol.readFileSync(
                '/test-workspace/libs/i18n/translations/translations_en.properties',
                'utf-8'
            ) as string;
            expect(content).toContain('#XBUT: Submit button for form submission');
            expect(content).toContain('coreButton.submit=Submit');
        });

        it('should use custom comment type when provided', async () => {
            (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations_en.properties']);
            vol.fromJSON({
                '/test-workspace/libs/i18n/translations/translations_en.properties': `
#XBUT: Save
coreButton.save=Save
                `.trim()
            });

            const result = await addKey({
                key: 'coreComponent.text',
                value: 'Text',
                commentType: 'XTIT',
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(true);

            const content = vol.readFileSync(
                '/test-workspace/libs/i18n/translations/translations_en.properties',
                'utf-8'
            ) as string;
            expect(content).toContain('#XTIT:');
            expect(content).toContain('coreComponent.text=Text');
        });

        it('should handle keys with parameters', async () => {
            (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations_en.properties']);
            vol.fromJSON({
                '/test-workspace/libs/i18n/translations/translations_en.properties': `
#XBUT: Save
coreButton.save=Save
                `.trim()
            });

            const result = await addKey({
                key: 'corePagination.pageLabel',
                value: 'Page {pageNumber}',
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(true);

            const content = vol.readFileSync(
                '/test-workspace/libs/i18n/translations/translations_en.properties',
                'utf-8'
            ) as string;
            expect(content).toContain('corePagination.pageLabel=Page {pageNumber}');
        });
    });

    describe('error handling', () => {
        it('should handle missing .properties files', async () => {
            (fastGlobSync as jest.Mock).mockReturnValue([]);

            const result = await addKey({
                key: 'coreButton.test',
                value: 'Test',
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(false);
            expect(result.error).toContain('No .properties files found');
        });

        it('should handle transform-translations failure', async () => {
            (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations_en.properties']);
            (transformTranslationsExecutor as jest.Mock).mockResolvedValue({ success: false });
            vol.fromJSON({
                '/test-workspace/libs/i18n/translations/translations_en.properties': `
#XBUT: Save
coreButton.save=Save
                `.trim()
            });

            const result = await addKey({
                key: 'coreButton.test',
                value: 'Test',
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(false);
            expect(result.error).toContain('Failed to generate TypeScript files');
        });
    });

    describe('integration with transform-translations', () => {
        it('should call transform-translations after adding keys', async () => {
            (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations_en.properties']);
            vol.fromJSON({
                '/test-workspace/libs/i18n/translations/translations_en.properties': `
#XBUT: Save
coreButton.save=Save
                `.trim()
            });

            await addKey({
                key: 'coreButton.test',
                value: 'Test',
                propertiesPath: 'libs/i18n/translations'
            });

            expect(transformTranslationsExecutor).toHaveBeenCalledWith({
                properties: ['libs/i18n/translations/*.properties']
            });
        });
    });
});
