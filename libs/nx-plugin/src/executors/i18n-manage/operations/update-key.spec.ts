import { vol } from 'memfs';
import { updateKey } from './update-key';

jest.mock('fs', () => {
    const memfs = require('memfs');
    return { ...memfs.fs, promises: memfs.fs.promises };
});

jest.mock('fast-glob', () => ({ sync: jest.fn() }));
jest.mock('@nx/devkit', () => ({ workspaceRoot: '/test-workspace' }));

// Mock prettier
jest.mock('prettier', () => ({
    format: jest.fn((code) => code),
    resolveConfig: jest.fn().mockResolvedValue({})
}));

import { sync as fastGlobSync } from 'fast-glob';

describe('UpdateKey Operation', () => {
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
                '/test-workspace/libs/i18n/translations/translations.ts': 'export default {}'
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
            (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations.ts']);
            vol.fromJSON({
                '/test-workspace/libs/i18n/translations/translations.properties': `
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
        it('should update key value in translations.properties and regenerate TS files', async () => {
            (fastGlobSync as jest.Mock).mockReturnValue([
                'libs/i18n/translations/translations.ts',
                'libs/i18n/translations/translations_de.ts'
            ]);
            vol.fromJSON({
                '/test-workspace/libs/i18n/translations/translations.properties': `
#XBUT: Save button
coreButton.save=Save
#XBUT: Cancel button
coreButton.cancel=Cancel
                `.trim(),
                '/test-workspace/libs/i18n/translations/translations.ts': 'export default {}',
                '/test-workspace/libs/i18n/translations/translations_de.ts': 'export default {}',
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
            expect(result.filesModified).toContain('libs/i18n/src/lib/translations/translations.properties');

            // Check translations.properties was updated
            const propertiesContent = vol.readFileSync(
                '/test-workspace/libs/i18n/translations/translations.properties',
                'utf-8'
            ) as string;
            expect(propertiesContent).toContain('coreButton.save = Save Changes'); // Normalized spacing
            expect(propertiesContent).toContain('#XBUT: Save button');
            expect(propertiesContent).toContain('coreButton.cancel=Cancel'); // Other keys unchanged, original spacing
            expect(propertiesContent).toContain('#XBUT: Cancel button');

            // Check English TS file was regenerated with new value
            const enContent = vol.readFileSync(
                '/test-workspace/libs/i18n/translations/translations.ts',
                'utf-8'
            ) as string;
            expect(enContent).toContain('"save": "Save Changes"');

            // German TS file regenerated from _de.properties (still has old German value)
            const deContent = vol.readFileSync(
                '/test-workspace/libs/i18n/translations/translations_de.ts',
                'utf-8'
            ) as string;
            expect(deContent).toContain('"save": "Speichern"'); // Unchanged in _de.properties
        });

        it('should preserve comment when updating', async () => {
            (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations.ts']);
            vol.fromJSON({
                '/test-workspace/libs/i18n/translations/translations.properties': `
#XBUT: Save button with icon
coreButton.save=Save
                `.trim(),
                '/test-workspace/libs/i18n/translations/translations.ts': 'export default {}'
            });

            const result = await updateKey({
                key: 'coreButton.save',
                value: 'Save Changes',
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(true);

            const content = vol.readFileSync(
                '/test-workspace/libs/i18n/translations/translations.properties',
                'utf-8'
            ) as string;
            expect(content).toContain('#XBUT: Save button with icon');
            expect(content).toContain('coreButton.save = Save Changes');
        });

        it('should handle keys with spaces around equals sign', async () => {
            (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations.ts']);
            vol.fromJSON({
                '/test-workspace/libs/i18n/translations/translations.properties': `
#XBUT: Save button
coreButton.save = Save
                `.trim(),
                '/test-workspace/libs/i18n/translations/translations.ts': 'export default {}'
            });

            const result = await updateKey({
                key: 'coreButton.save',
                value: 'Save All',
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(true);

            const content = vol.readFileSync(
                '/test-workspace/libs/i18n/translations/translations.properties',
                'utf-8'
            ) as string;
            expect(content).toContain('coreButton.save = Save All');
        });

        it('should update nested key value', async () => {
            (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations.ts']);
            vol.fromJSON({
                '/test-workspace/libs/i18n/translations/translations.properties': `
#XTIT: Dialog title
coreDialog.headerTitle=Old Title
                `.trim(),
                '/test-workspace/libs/i18n/translations/translations.ts': 'export default {}'
            });

            const result = await updateKey({
                key: 'coreDialog.headerTitle',
                value: 'New Title',
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(true);

            const content = vol.readFileSync(
                '/test-workspace/libs/i18n/translations/translations.properties',
                'utf-8'
            ) as string;
            expect(content).toContain('#XTIT: Dialog title');
            expect(content).toContain('coreDialog.headerTitle = New Title');
        });
    });

    describe('error handling', () => {
        it('should fail if translations.properties does not exist', async () => {
            (fastGlobSync as jest.Mock).mockReturnValue([]);
            vol.fromJSON({});

            const result = await updateKey({
                key: 'coreButton.save',
                value: 'Save',
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

            const result = await updateKey({
                key: 'coreButton.save',
                value: 'Save Changes',
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(false);
            expect(result.error).toContain('No TypeScript translation files found');
        });
    });
});
