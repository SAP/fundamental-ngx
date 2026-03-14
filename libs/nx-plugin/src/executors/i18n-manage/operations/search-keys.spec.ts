import { vol } from 'memfs';
import { searchKeys } from './search-keys';

jest.mock('fs', () => {
    const memfs = require('memfs');
    return { ...memfs.fs, promises: memfs.fs.promises };
});

jest.mock('fast-glob', () => ({ sync: jest.fn() }));
jest.mock('@nx/devkit', () => ({ workspaceRoot: '/test-workspace' }));

import { sync as fastGlobSync } from 'fast-glob';

describe('SearchKeys Operation', () => {
    beforeEach(() => {
        vol.reset();
        jest.clearAllMocks();
    });

    it('should search by key name', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations.properties']);
        vol.fromJSON({
            '/test-workspace/libs/i18n/translations/translations.properties': `
#XBUT: Save button
coreButton.save=Save

#XBUT: Cancel button
coreButton.cancel=Cancel

#XFLD: Name label
coreInput.name=Name
            `.trim()
        });

        const result = await searchKeys({
            searchTerm: 'button',
            propertiesPath: 'libs/i18n/translations'
        });

        expect(result.success).toBe(true);
        expect(result.results).toHaveLength(2);
        expect(result.results[0].key).toBe('coreButton.save');
        expect(result.results[1].key).toBe('coreButton.cancel');
    });

    it('should search by value', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations.properties']);
        vol.fromJSON({
            '/test-workspace/libs/i18n/translations/translations.properties': `
#XBUT: Save button
coreButton.save=Save

#XBUT: Submit button
coreButton.submit=Submit

#XFLD: Name label
coreInput.name=Name
            `.trim()
        });

        const result = await searchKeys({
            searchTerm: 'submit',
            propertiesPath: 'libs/i18n/translations'
        });

        expect(result.success).toBe(true);
        expect(result.results).toHaveLength(1);
        expect(result.results[0].key).toBe('coreButton.submit');
        expect(result.results[0].value).toBe('Submit');
    });

    it('should be case-insensitive', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations.properties']);
        vol.fromJSON({
            '/test-workspace/libs/i18n/translations/translations.properties': `
#XBUT: Save button
coreButton.save=Save
            `.trim()
        });

        const result = await searchKeys({
            searchTerm: 'SAVE',
            propertiesPath: 'libs/i18n/translations'
        });

        expect(result.success).toBe(true);
        expect(result.results).toHaveLength(1);
    });

    it('should include comments in results', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations.properties']);
        vol.fromJSON({
            '/test-workspace/libs/i18n/translations/translations.properties': `
#XBUT: Save button label
coreButton.save=Save
            `.trim()
        });

        const result = await searchKeys({
            searchTerm: 'save',
            propertiesPath: 'libs/i18n/translations'
        });

        expect(result.success).toBe(true);
        expect(result.results[0].comment).toBe('#XBUT: Save button label');
    });

    it('should return empty results if no matches', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations.properties']);
        vol.fromJSON({
            '/test-workspace/libs/i18n/translations/translations.properties': `
#XBUT: Save button
coreButton.save=Save
            `.trim()
        });

        const result = await searchKeys({
            searchTerm: 'nonexistent',
            propertiesPath: 'libs/i18n/translations'
        });

        expect(result.success).toBe(true);
        expect(result.results).toHaveLength(0);
    });

    it('should reject empty search term', async () => {
        const result = await searchKeys({
            searchTerm: '',
            propertiesPath: 'libs/i18n/translations'
        });

        expect(result.success).toBe(false);
        expect(result.error).toContain('cannot be empty');
    });

    it('should extract comments for keys with spaced assignment syntax', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations.properties']);
        vol.fromJSON({
            '/test-workspace/libs/i18n/translations/translations.properties': `
#XBUT: Save button label
coreButton.save = Save

#XFLD: Name field with spaces
coreInput.name   =   Name
            `.trim()
        });

        const result = await searchKeys({
            searchTerm: 'button',
            propertiesPath: 'libs/i18n/translations'
        });

        expect(result.success).toBe(true);
        expect(result.results).toHaveLength(1);
        expect(result.results[0].key).toBe('coreButton.save');
        expect(result.results[0].comment).toBe('#XBUT: Save button label');
    });

    it('should handle keys with special regex characters', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations.properties']);
        vol.fromJSON({
            '/test-workspace/libs/i18n/translations/translations.properties': `
#XMSG: Message with special chars
core.message[test]=Test Message
            `.trim()
        });

        const result = await searchKeys({
            searchTerm: 'message',
            propertiesPath: 'libs/i18n/translations'
        });

        expect(result.success).toBe(true);
        expect(result.results).toHaveLength(1);
        expect(result.results[0].comment).toBe('#XMSG: Message with special chars');
    });
});
