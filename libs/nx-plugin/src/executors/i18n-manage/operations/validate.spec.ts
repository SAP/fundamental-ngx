import { vol } from 'memfs';
import { validate } from './validate';

jest.mock('fs', () => {
    const memfs = require('memfs');
    return { ...memfs.fs, promises: memfs.fs.promises };
});

jest.mock('fast-glob', () => ({ sync: jest.fn() }));
jest.mock('@nx/devkit', () => ({ workspaceRoot: '/test-workspace' }));

import { sync as fastGlobSync } from 'fast-glob';

describe('Validate Operation', () => {
    beforeEach(() => {
        vol.reset();
        jest.clearAllMocks();
    });

    it('should pass validation for valid files', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue([
            'libs/i18n/translations/translations.properties',
            'libs/i18n/translations/translations_de.properties'
        ]);
        vol.fromJSON({
            '/test-workspace/libs/i18n/translations/translations.properties': `
#XBUT: Save button
coreButton.save=Save

#XFLD: Name field
coreInput.name=Name
            `.trim(),
            '/test-workspace/libs/i18n/translations/translations_de.properties': `
#XBUT: Save button
coreButton.save=Speichern

#XFLD: Name field
coreInput.name=Name
            `.trim()
        });

        const result = await validate('libs/i18n/translations');

        expect(result.success).toBe(true);
        expect(result.errors).toHaveLength(0);
        expect(result.summary).toContain('✅');
    });

    it('should detect missing comment headers', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations.properties']);
        vol.fromJSON({
            '/test-workspace/libs/i18n/translations/translations.properties': `
#XBUT: Save button
coreButton.save=Save

coreButton.cancel=Cancel
            `.trim()
        });

        const result = await validate('libs/i18n/translations');

        expect(result.success).toBe(false);
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].type).toBe('missing-comment');
        expect(result.errors[0].message).toContain('coreButton.cancel');
    });

    it('should detect invalid comment format', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations.properties']);
        vol.fromJSON({
            '/test-workspace/libs/i18n/translations/translations.properties': `
# Invalid comment without type
coreButton.save=Save
            `.trim()
        });

        const result = await validate('libs/i18n/translations');

        expect(result.success).toBe(false);
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].type).toBe('invalid-comment');
        expect(result.errors[0].message).toContain('Invalid comment format');
    });

    it('should detect invalid comment type', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations.properties']);
        vol.fromJSON({
            '/test-workspace/libs/i18n/translations/translations.properties': `
#XINVALID: Save button
coreButton.save=Save
            `.trim()
        });

        const result = await validate('libs/i18n/translations');

        expect(result.success).toBe(false);
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].type).toBe('invalid-comment');
        expect(result.errors[0].message).toContain('XINVALID');
        expect(result.errors[0].message).toContain('Valid types');
    });

    it('should detect missing keys across files', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue([
            'libs/i18n/translations/translations.properties',
            'libs/i18n/translations/translations_de.properties'
        ]);
        vol.fromJSON({
            '/test-workspace/libs/i18n/translations/translations.properties': `
#XBUT: Save button
coreButton.save=Save

#XBUT: Cancel button
coreButton.cancel=Cancel
            `.trim(),
            '/test-workspace/libs/i18n/translations/translations_de.properties': `
#XBUT: Save button
coreButton.save=Speichern
            `.trim()
        });

        const result = await validate('libs/i18n/translations');

        expect(result.success).toBe(false);
        const missingKeyError = result.errors.find((e) => e.type === 'missing-keys');
        expect(missingKeyError).toBeDefined();
        expect(missingKeyError?.keys).toContain('coreButton.cancel');
    });

    it('should detect extra keys in files', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue([
            'libs/i18n/translations/translations.properties',
            'libs/i18n/translations/translations_de.properties'
        ]);
        vol.fromJSON({
            '/test-workspace/libs/i18n/translations/translations.properties': `
#XBUT: Save button
coreButton.save=Save
            `.trim(),
            '/test-workspace/libs/i18n/translations/translations_de.properties': `
#XBUT: Save button
coreButton.save=Speichern

#XBUT: Extra key
coreButton.extra=Extra
            `.trim()
        });

        const result = await validate('libs/i18n/translations');

        expect(result.success).toBe(false);
        const extraKeyError = result.errors.find((e) => e.type === 'extra-keys');
        expect(extraKeyError).toBeDefined();
        expect(extraKeyError?.keys).toContain('coreButton.extra');
    });

    it('should detect unbalanced curly braces in ICU syntax', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations.properties']);
        vol.fromJSON({
            '/test-workspace/libs/i18n/translations/translations.properties': `
#XMSG: Message with parameter
coreMessage.greeting=Hello {name
            `.trim()
        });

        const result = await validate('libs/i18n/translations');

        expect(result.success).toBe(false);
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0].type).toBe('icu-syntax');
        expect(result.errors[0].message).toContain('unbalanced curly braces');
        expect(result.errors[0].message).toContain('coreMessage.greeting');
    });

    it('should return error if no properties files found', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue([]);

        const result = await validate('libs/i18n/translations');

        expect(result.success).toBe(false);
        expect(result.summary).toContain('No .properties files found');
    });

    it('should detect multiple validation errors', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations.properties']);
        vol.fromJSON({
            '/test-workspace/libs/i18n/translations/translations.properties': `
#XBUT: Save button
coreButton.save=Save {count

coreButton.cancel=Cancel
            `.trim()
        });

        const result = await validate('libs/i18n/translations');

        expect(result.success).toBe(false);
        expect(result.errors.length).toBeGreaterThan(1);
        expect(result.errors.some((e) => e.type === 'icu-syntax')).toBe(true);
        expect(result.errors.some((e) => e.type === 'missing-comment')).toBe(true);
    });

    it('should include line numbers in comment validation errors', async () => {
        (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations.properties']);
        vol.fromJSON({
            '/test-workspace/libs/i18n/translations/translations.properties': `
#XBUT: Save button
coreButton.save=Save

coreButton.cancel=Cancel
            `.trim()
        });

        const result = await validate('libs/i18n/translations');

        expect(result.success).toBe(false);
        const commentError = result.errors.find((e) => e.type === 'missing-comment');
        expect(commentError?.line).toBeDefined();
        expect(commentError?.line).toBeGreaterThan(0);
    });
});
