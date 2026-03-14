import { vol } from 'memfs';
import { removeKey } from './remove-key';

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

describe('RemoveKey Operation', () => {
    beforeEach(() => {
        vol.reset();
        jest.clearAllMocks();
    });

    it('should remove key successfully', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations_en.properties']);
        vol.fromJSON({
            '/test-workspace/libs/i18n/translations/translations_en.properties': `
#XBUT: Save button
coreButton.save=Save

#XBUT: Cancel button
coreButton.cancel=Cancel
            `.trim()
        });

        const result = await removeKey({
            key: 'coreButton.save',
            propertiesPath: 'libs/i18n/translations'
        });

        expect(result.success).toBe(true);
        const content = vol.readFileSync(
            '/test-workspace/libs/i18n/translations/translations_en.properties',
            'utf-8'
        ) as string;
        expect(content).not.toContain('coreButton.save');
        expect(content).toContain('coreButton.cancel=Cancel');
    });

    it('should reject if key does not exist', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations_en.properties']);
        vol.fromJSON({
            '/test-workspace/libs/i18n/translations/translations_en.properties': `
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

    it('should remove key from multiple files', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue([
            'libs/i18n/translations/translations_en.properties',
            'libs/i18n/translations/translations_de.properties'
        ]);
        vol.fromJSON({
            '/test-workspace/libs/i18n/translations/translations_en.properties': `
#XBUT: Save
coreButton.save=Save
            `.trim(),
            '/test-workspace/libs/i18n/translations/translations_de.properties': `
#XBUT: Save
coreButton.save=Save
            `.trim()
        });

        const result = await removeKey({
            key: 'coreButton.save',
            propertiesPath: 'libs/i18n/translations'
        });

        expect(result.success).toBe(true);
        expect(result.filesModified).toHaveLength(2);

        const contentEn = vol.readFileSync(
            '/test-workspace/libs/i18n/translations/translations_en.properties',
            'utf-8'
        ) as string;
        const contentDe = vol.readFileSync(
            '/test-workspace/libs/i18n/translations/translations_de.properties',
            'utf-8'
        ) as string;

        expect(contentEn).not.toContain('coreButton.save');
        expect(contentDe).not.toContain('coreButton.save');
    });

    it('should remove key with spaces around equals sign', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations.properties']);
        vol.fromJSON({
            '/test-workspace/libs/i18n/translations/translations.properties': `
#XFLD: Navigation path
coreNavigation.navigationPath = Navigation Path

#XBUT: Save button
coreButton.save = Save
            `.trim()
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
        expect(content).toContain('coreButton.save = Save');
    });
});
