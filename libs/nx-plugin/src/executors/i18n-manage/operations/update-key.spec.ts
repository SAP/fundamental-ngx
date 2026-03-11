import { vol } from 'memfs';
import { updateKey } from './update-key';

jest.mock('fs', () => {
    const memfs = require('memfs');
    return { ...memfs.fs, promises: memfs.fs.promises };
});

jest.mock('fast-glob', () => ({ sync: jest.fn() }));
jest.mock('@nx/devkit', () => ({ workspaceRoot: '/test-workspace' }));
jest.mock('../../transform-translations/executor', () => ({
    __esModule: true,
    default: jest.fn().mockResolvedValue({ success: true })
}));

import { sync as fastGlobSync } from 'fast-glob';

describe('UpdateKey Operation', () => {
    beforeEach(() => {
        vol.reset();
        jest.clearAllMocks();
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

            const result = await updateKey({
                key: 'coreButton.save',
                value: 'Save Changes',
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(true);
        });

        it('should reject invalid key format', async () => {
            const result = await updateKey({
                key: 'invalid',
                value: 'Test',
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(false);
            expect(result.error).toContain('Invalid key format');
        });

        it('should reject keys with special characters', async () => {
            const result = await updateKey({
                key: 'core@Button.save',
                value: 'Test',
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(false);
            expect(result.error).toContain('Invalid characters');
        });
    });

    describe('key existence validation', () => {
        it('should reject update if key does not exist', async () => {
            (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations_en.properties']);
            vol.fromJSON({
                '/test-workspace/libs/i18n/translations/translations_en.properties': `
#XBUT: Save button
coreButton.save=Save
                `.trim()
            });

            const result = await updateKey({
                key: 'coreButton.submit',
                value: 'Submit',
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(false);
            expect(result.error).toContain('does not exist');
        });
    });

    describe('updating values', () => {
        it('should update key value across all files', async () => {
            (fastGlobSync as jest.Mock).mockReturnValue([
                'libs/i18n/translations/translations_en.properties',
                'libs/i18n/translations/translations_de.properties'
            ]);
            vol.fromJSON({
                '/test-workspace/libs/i18n/translations/translations_en.properties': `
#XBUT: Save button
coreButton.save=Save
#XBUT: Cancel button
coreButton.cancel=Cancel
                `.trim(),
                '/test-workspace/libs/i18n/translations/translations_de.properties': `
#XBUT: Save button
coreButton.save=Speichern
#XBUT: Cancel button
coreButton.cancel=Abbrechen
                `.trim()
            });

            const result = await updateKey({
                key: 'coreButton.save',
                value: 'Save Changes',
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(true);
            expect(result.filesModified).toHaveLength(2);

            const enContent = vol.readFileSync(
                '/test-workspace/libs/i18n/translations/translations_en.properties',
                'utf-8'
            ) as string;
            const deContent = vol.readFileSync(
                '/test-workspace/libs/i18n/translations/translations_de.properties',
                'utf-8'
            ) as string;

            expect(enContent).toContain('coreButton.save=Save Changes');
            expect(deContent).toContain('coreButton.save=Save Changes');
            expect(enContent).toContain('coreButton.cancel=Cancel'); // Other keys unchanged
        });

        it('should preserve comment when updating', async () => {
            (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations_en.properties']);
            vol.fromJSON({
                '/test-workspace/libs/i18n/translations/translations_en.properties': `
#XBUT: Save button with icon
coreButton.save=Save
                `.trim()
            });

            const result = await updateKey({
                key: 'coreButton.save',
                value: 'Save Changes',
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(true);

            const content = vol.readFileSync(
                '/test-workspace/libs/i18n/translations/translations_en.properties',
                'utf-8'
            ) as string;

            expect(content).toContain('#XBUT: Save button with icon');
            expect(content).toContain('coreButton.save=Save Changes');
        });

        it('should handle keys with spaces around equals sign', async () => {
            (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations_en.properties']);
            vol.fromJSON({
                '/test-workspace/libs/i18n/translations/translations_en.properties': `
#XBUT: Save button
coreButton.save = Save
                `.trim()
            });

            const result = await updateKey({
                key: 'coreButton.save',
                value: 'Save Changes',
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(true);

            const content = vol.readFileSync(
                '/test-workspace/libs/i18n/translations/translations_en.properties',
                'utf-8'
            ) as string;

            expect(content).toContain('coreButton.save = Save Changes');
        });

        it('should handle keys without spaces around equals sign', async () => {
            (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations_en.properties']);
            vol.fromJSON({
                '/test-workspace/libs/i18n/translations/translations_en.properties': `
#XBUT: Save button
coreButton.save=Save
                `.trim()
            });

            const result = await updateKey({
                key: 'coreButton.save',
                value: 'Save Changes',
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(true);

            const content = vol.readFileSync(
                '/test-workspace/libs/i18n/translations/translations_en.properties',
                'utf-8'
            ) as string;

            expect(content).toContain('coreButton.save=Save Changes');
        });
    });

    describe('error handling', () => {
        it('should handle missing properties files', async () => {
            (fastGlobSync as jest.Mock).mockReturnValue([]);

            const result = await updateKey({
                key: 'coreButton.save',
                value: 'Save',
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(false);
            expect(result.error).toContain('No .properties files found');
        });
    });
});
