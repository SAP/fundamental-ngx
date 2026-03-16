import { vol } from 'memfs';
import { sortKeys } from './sort-keys';

// Mock fs module
jest.mock('fs', () => {
    const memfs = require('memfs');
    return {
        ...memfs.fs,
        promises: memfs.fs.promises
    };
});

// Mock transform-translations executor
jest.mock('../../transform-translations/executor', () => ({
    __esModule: true,
    default: jest.fn().mockResolvedValue({ success: true })
}));

import transformTranslationsExecutor from '../../transform-translations/executor';

describe('SortKeys Operation', () => {
    beforeEach(() => {
        vol.reset();
        jest.clearAllMocks();
        (transformTranslationsExecutor as jest.Mock).mockResolvedValue({ success: true });
    });

    describe('sorting behavior', () => {
        it('should sort keys by component name', async () => {
            vol.fromJSON({
                '/test-path/translations_en.properties': `#XFLD: Name field
coreName.label=Name
#XBUT: Save button
coreButton.save=Save
#XFLD: Email field
coreEmail.label=Email`
            });

            const result = await sortKeys({
                propertiesPath: '/test-path'
            });

            expect(result.success).toBe(true);
            expect(result.filesModified).toContain('translations_en.properties');

            const content = vol.readFileSync('/test-path/translations_en.properties', 'utf-8') as string;
            const lines = content.split('\n');

            // coreButton should come before coreEmail and coreName
            const buttonIndex = lines.findIndex((l) => l.includes('coreButton.save'));
            const emailIndex = lines.findIndex((l) => l.includes('coreEmail.label'));
            const nameIndex = lines.findIndex((l) => l.includes('coreName.label'));

            expect(buttonIndex).toBeLessThan(emailIndex);
            expect(emailIndex).toBeLessThan(nameIndex);
        });

        it('should sort keys alphabetically within same component', async () => {
            vol.fromJSON({
                '/test-path/translations_en.properties': `#XBUT: Submit button
coreButton.submit=Submit
#XBUT: Cancel button
coreButton.cancel=Cancel
#XBUT: Save button
coreButton.save=Save`
            });

            const result = await sortKeys({
                propertiesPath: '/test-path'
            });

            expect(result.success).toBe(true);

            const content = vol.readFileSync('/test-path/translations_en.properties', 'utf-8') as string;
            const lines = content.split('\n');

            const cancelIndex = lines.findIndex((l) => l.includes('coreButton.cancel'));
            const saveIndex = lines.findIndex((l) => l.includes('coreButton.save'));
            const submitIndex = lines.findIndex((l) => l.includes('coreButton.submit'));

            expect(cancelIndex).toBeLessThan(saveIndex);
            expect(saveIndex).toBeLessThan(submitIndex);
        });

        it('should preserve comments with their keys', async () => {
            vol.fromJSON({
                '/test-path/translations_en.properties': `#XFLD: Name field
coreName.label=Name
#XBUT: Save button
coreButton.save=Save`
            });

            const result = await sortKeys({
                propertiesPath: '/test-path'
            });

            expect(result.success).toBe(true);

            const content = vol.readFileSync('/test-path/translations_en.properties', 'utf-8') as string;

            // Comment should be immediately before its key
            expect(content).toContain('#XBUT: Save button\ncoreButton.save=Save');
            expect(content).toContain('#XFLD: Name field\ncoreName.label=Name');
        });

        it('should preserve original line formatting', async () => {
            vol.fromJSON({
                '/test-path/translations_en.properties': `#XBUT: Button with spaces
coreButton.test = Value with spaces
#XBUT: Button without spaces
coreButton.another=NoSpaces`
            });

            const result = await sortKeys({
                propertiesPath: '/test-path'
            });

            expect(result.success).toBe(true);

            const content = vol.readFileSync('/test-path/translations_en.properties', 'utf-8') as string;

            // Should preserve original spacing
            expect(content).toContain('coreButton.another=NoSpaces');
            expect(content).toContain('coreButton.test = Value with spaces');
        });

        it('should not modify already sorted file', async () => {
            const sortedContent = `#XBUT: Cancel button
coreButton.cancel=Cancel
#XBUT: Save button
coreButton.save=Save
#XFLD: Name field
coreName.label=Name
`;

            vol.fromJSON({
                '/test-path/translations_en.properties': sortedContent
            });

            const result = await sortKeys({
                propertiesPath: '/test-path'
            });

            expect(result.success).toBe(true);
            expect(result.filesModified).toHaveLength(0);
        });
    });

    describe('multiple files', () => {
        it('should sort multiple .properties files', async () => {
            vol.fromJSON({
                '/test-path/translations_en.properties': `#XFLD: Name
coreName.label=Name
#XBUT: Save
coreButton.save=Save`,
                '/test-path/translations_de.properties': `#XFLD: Name
coreName.label=Name
#XBUT: Save
coreButton.save=Save`,
                '/test-path/translations_fr.properties': `#XFLD: Name
coreName.label=Name
#XBUT: Save
coreButton.save=Save`
            });

            const result = await sortKeys({
                propertiesPath: '/test-path'
            });

            expect(result.success).toBe(true);
            expect(result.filesModified).toHaveLength(3);
            expect(result.filesModified).toContain('translations_en.properties');
            expect(result.filesModified).toContain('translations_de.properties');
            expect(result.filesModified).toContain('translations_fr.properties');
        });

        it('should only report files that changed', async () => {
            vol.fromJSON({
                '/test-path/translations_en.properties': `#XFLD: Name
coreName.label=Name
#XBUT: Save
coreButton.save=Save`,
                '/test-path/translations_de.properties': `#XBUT: Save
coreButton.save=Save
#XFLD: Name
coreName.label=Name
`
            });

            const result = await sortKeys({
                propertiesPath: '/test-path'
            });

            expect(result.success).toBe(true);
            expect(result.filesModified).toHaveLength(1);
            expect(result.filesModified).toContain('translations_en.properties');
        });
    });

    describe('edge cases', () => {
        it('should handle file with single key', async () => {
            vol.fromJSON({
                '/test-path/translations_en.properties': `#XBUT: Save
coreButton.save=Save
`
            });

            const result = await sortKeys({
                propertiesPath: '/test-path'
            });

            expect(result.success).toBe(true);
            expect(result.filesModified).toHaveLength(0);
        });

        it('should handle keys with ICU parameters', async () => {
            vol.fromJSON({
                '/test-path/translations_en.properties': `#XMSG: Message with params
coreMessage.selected={count} selected
#XBUT: Button
coreButton.save=Save`
            });

            const result = await sortKeys({
                propertiesPath: '/test-path'
            });

            expect(result.success).toBe(true);

            const content = vol.readFileSync('/test-path/translations_en.properties', 'utf-8') as string;
            expect(content).toContain('coreMessage.selected={count} selected');
        });

        it('should skip empty lines', async () => {
            vol.fromJSON({
                '/test-path/translations_en.properties': `#XFLD: Name
coreName.label=Name

#XBUT: Save
coreButton.save=Save

`
            });

            const result = await sortKeys({
                propertiesPath: '/test-path'
            });

            expect(result.success).toBe(true);

            const content = vol.readFileSync('/test-path/translations_en.properties', 'utf-8') as string;
            // Empty lines should be removed
            expect(content).not.toContain('\n\n');
        });
    });

    describe('error handling', () => {
        it('should handle no .properties files', async () => {
            vol.fromJSON({
                '/test-path/some-file.txt': 'not a properties file'
            });

            const result = await sortKeys({
                propertiesPath: '/test-path'
            });

            expect(result.success).toBe(false);
            expect(result.filesModified).toHaveLength(0);
            expect(result.error).toContain('No .properties files found');
        });

        it('should handle transform-translations failure', async () => {
            (transformTranslationsExecutor as jest.Mock).mockRejectedValue(new Error('Transform failed'));

            vol.fromJSON({
                '/test-path/translations_en.properties': `#XFLD: Name
coreName.label=Name
#XBUT: Save
coreButton.save=Save`
            });

            const result = await sortKeys({
                propertiesPath: '/test-path'
            });

            expect(result.success).toBe(false);
            expect(result.error).toBe('Transform failed');
        });
    });

    describe('integration with transform-translations', () => {
        it('should call transform-translations after sorting', async () => {
            vol.fromJSON({
                '/test-path/translations_en.properties': `#XFLD: Name
coreName.label=Name
#XBUT: Save
coreButton.save=Save`
            });

            await sortKeys({
                propertiesPath: '/test-path'
            });

            expect(transformTranslationsExecutor).toHaveBeenCalledWith({
                properties: ['/test-path/*.properties']
            });
        });
    });
});
