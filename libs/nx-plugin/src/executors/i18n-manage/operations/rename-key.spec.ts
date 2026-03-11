import { vol } from 'memfs';
import { renameKey } from './rename-key';

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

describe('RenameKey Operation', () => {
    beforeEach(() => {
        vol.reset();
        jest.clearAllMocks();
    });

    it('should rename key successfully', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations_en.properties']);
        vol.fromJSON({
            '/test-workspace/libs/i18n/translations/translations_en.properties': `
#XBUT: Old label
coreButton.oldKey=Old Value
            `.trim()
        });

        const result = await renameKey({
            oldKey: 'coreButton.oldKey',
            newKey: 'coreButton.newKey',
            propertiesPath: 'libs/i18n/translations'
        });

        expect(result.success).toBe(true);
        const content = vol.readFileSync(
            '/test-workspace/libs/i18n/translations/translations_en.properties',
            'utf-8'
        ) as string;
        expect(content).toContain('coreButton.newKey=Old Value');
        expect(content).not.toContain('coreButton.oldKey');
    });

    it('should reject if old key does not exist', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations_en.properties']);
        vol.fromJSON({
            '/test-workspace/libs/i18n/translations/translations_en.properties': `
#XBUT: Save
coreButton.save=Save
            `.trim()
        });

        const result = await renameKey({
            oldKey: 'coreButton.nonExistent',
            newKey: 'coreButton.newKey',
            propertiesPath: 'libs/i18n/translations'
        });

        expect(result.success).toBe(false);
        expect(result.error).toContain('does not exist');
    });

    it('should reject if new key already exists', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations_en.properties']);
        vol.fromJSON({
            '/test-workspace/libs/i18n/translations/translations_en.properties': `
#XBUT: Save
coreButton.save=Save

#XBUT: Cancel
coreButton.cancel=Cancel
            `.trim()
        });

        const result = await renameKey({
            oldKey: 'coreButton.save',
            newKey: 'coreButton.cancel',
            propertiesPath: 'libs/i18n/translations'
        });

        expect(result.success).toBe(false);
        expect(result.error).toContain('already exists');
    });

    it('should validate old key format', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue([]);

        const result = await renameKey({
            oldKey: 'invalidkey',
            newKey: 'core.valid',
            propertiesPath: 'libs/i18n/translations'
        });

        expect(result.success).toBe(false);
        expect(result.error).toContain('Invalid key format');
    });

    it('should validate new key format', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue([]);

        const result = await renameKey({
            oldKey: 'core.valid',
            newKey: 'invalidkey',
            propertiesPath: 'libs/i18n/translations'
        });

        expect(result.success).toBe(false);
        expect(result.error).toContain('Invalid key format');
    });

    it('should rename key with spaces around equals sign', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations.properties']);
        vol.fromJSON({
            '/test-workspace/libs/i18n/translations/translations.properties': `
#XFLD: Navigation path
coreNavigation.oldPath = Old Navigation Path

#XBUT: Save button
coreButton.save = Save
            `.trim()
        });

        const result = await renameKey({
            oldKey: 'coreNavigation.oldPath',
            newKey: 'coreNavigation.newPath',
            propertiesPath: 'libs/i18n/translations'
        });

        expect(result.success).toBe(true);
        const content = vol.readFileSync(
            '/test-workspace/libs/i18n/translations/translations.properties',
            'utf-8'
        ) as string;
        expect(content).toContain('coreNavigation.newPath = Old Navigation Path');
        expect(content).not.toContain('coreNavigation.oldPath');
        expect(content).toContain('#XFLD: Navigation path');
    });
});
