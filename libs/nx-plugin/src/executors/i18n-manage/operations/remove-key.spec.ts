import { vol } from 'memfs';
import { removeKey } from './remove-key';

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

describe('RemoveKey Operation', () => {
    beforeEach(() => {
        vol.reset();
        jest.clearAllMocks();
    });

    it('should remove key successfully', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations.ts']);
        vol.fromJSON({
            '/test-workspace/libs/i18n/translations/translations.properties': `
#XBUT: Save button
coreButton.save=Save

#XBUT: Cancel button
coreButton.cancel=Cancel
            `.trim(),
            '/test-workspace/libs/i18n/translations/translations.ts': 'export default {}',
            '/test-workspace/libs/i18n/src/lib/models/fd-language-key-identifier.ts': '// placeholder'
        });

        const result = await removeKey({
            key: 'coreButton.save',
            propertiesPath: 'libs/i18n/translations'
        });

        expect(result.success).toBe(true);
        const content = vol.readFileSync(
            '/test-workspace/libs/i18n/translations/translations.properties',
            'utf-8'
        ) as string;
        expect(content).not.toContain('coreButton.save');
        expect(content).not.toContain('#XBUT: Save button');
        expect(content).toContain('coreButton.cancel');
        expect(content).toContain('#XBUT: Cancel button');
    });

    it('should reject if key does not exist', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations.ts']);
        vol.fromJSON({
            '/test-workspace/libs/i18n/translations/translations.properties': `
#XBUT: Save
coreButton.save=Save
            `.trim()
        });

        const result = await removeKey({
            key: 'coreButton.nonExistent',
            propertiesPath: 'libs/i18n/translations'
        });

        expect(result.success).toBe(false);
        expect(result.error).toContain('does not exist');
    });

    it('should validate key format', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue([]);

        const result = await removeKey({
            key: 'invalidkey',
            propertiesPath: 'libs/i18n/translations'
        });

        expect(result.success).toBe(false);
        expect(result.error).toContain('Invalid key format');
    });

    it('should remove key and regenerate all TypeScript files', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue([
            'libs/i18n/translations/translations.ts',
            'libs/i18n/translations/translations_de.ts'
        ]);
        vol.fromJSON({
            '/test-workspace/libs/i18n/translations/translations.properties': `
#XBUT: Save
coreButton.save=Save

#XBUT: Cancel
coreButton.cancel=Cancel
            `.trim(),
            '/test-workspace/libs/i18n/translations/translations.ts': 'export default {}',
            '/test-workspace/libs/i18n/translations/translations_de.ts': 'export default {}',
            '/test-workspace/libs/i18n/translations/translations_de.properties': `
#XBUT: Save
coreButton.save=Speichern

#XBUT: Cancel
coreButton.cancel=Abbrechen
            `.trim(),
            '/test-workspace/libs/i18n/src/lib/models/fd-language-key-identifier.ts': '// placeholder'
        });

        const result = await removeKey({
            key: 'coreButton.save',
            propertiesPath: 'libs/i18n/translations'
        });

        expect(result.success).toBe(true);
        expect(result.filesModified).toContain('libs/i18n/src/lib/translations/translations.properties');

        // Verify translations.properties was updated
        const propsContent = vol.readFileSync(
            '/test-workspace/libs/i18n/translations/translations.properties',
            'utf-8'
        ) as string;
        expect(propsContent).not.toContain('coreButton.save');
        expect(propsContent).not.toContain('#XBUT: Save');
        expect(propsContent).toContain('coreButton.cancel');
        expect(propsContent).toContain('#XBUT: Cancel');

        // Check both TS files were regenerated
        const contentEn = vol.readFileSync('/test-workspace/libs/i18n/translations/translations.ts', 'utf-8') as string;
        const contentDe = vol.readFileSync(
            '/test-workspace/libs/i18n/translations/translations_de.ts',
            'utf-8'
        ) as string;

        // English TS file should not have the removed key
        expect(contentEn).not.toContain('coreButton.save');
        expect(contentEn).toContain('"cancel": "Cancel"');

        // German TS file also won't have save - it only includes keys from base properties
        expect(contentDe).not.toContain('coreButton.save');
        expect(contentDe).toContain('"cancel": "Abbrechen"');
    });

    it('should remove key with spaces around equals sign', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations.ts']);
        vol.fromJSON({
            '/test-workspace/libs/i18n/translations/translations.properties': `
#XFLD: Navigation path
coreNavigation.navigationPath = Navigation Path

#XBUT: Save button
coreButton.save = Save
            `.trim(),
            '/test-workspace/libs/i18n/translations/translations.ts': 'export default {}',
            '/test-workspace/libs/i18n/src/lib/models/fd-language-key-identifier.ts': '// placeholder'
        });

        const result = await removeKey({
            key: 'coreNavigation.navigationPath',
            propertiesPath: 'libs/i18n/translations'
        });

        expect(result.success).toBe(true);
        const content = vol.readFileSync(
            '/test-workspace/libs/i18n/translations/translations.properties',
            'utf-8'
        ) as string;
        expect(content).not.toContain('coreNavigation.navigationPath');
        expect(content).not.toContain('Navigation Path');
        expect(content).not.toContain('#XFLD: Navigation path');
        expect(content).toContain('coreButton.save');
    });

    it('should fail if translations.properties does not exist', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue([]);
        vol.fromJSON({});

        const result = await removeKey({
            key: 'coreButton.test',
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

        const result = await removeKey({
            key: 'coreButton.save',
            propertiesPath: 'libs/i18n/translations'
        });

        expect(result.success).toBe(false);
        expect(result.error).toContain('No TypeScript translation files found');
    });
});
