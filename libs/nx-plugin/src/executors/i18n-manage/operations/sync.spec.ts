import { vol } from 'memfs';
import { sync } from './sync';

// Mock fs module
jest.mock('fs', () => {
    const memfs = require('memfs');
    return {
        ...memfs.fs,
        promises: memfs.fs.promises
    };
});

// Mock @nx/devkit workspaceRoot
jest.mock('@nx/devkit', () => ({
    workspaceRoot: '/workspace'
}));

// Mock fast-glob
jest.mock('fast-glob', () => ({
    sync: jest.fn()
}));

// Mock prettier
jest.mock('prettier', () => ({
    format: jest.fn((content: string) => Promise.resolve(content)),
    resolveConfig: jest.fn(() => Promise.resolve({}))
}));

// Mock update-typings functions
jest.mock('../../shared/update-typings', () => ({
    extractKeysFromFdLanguageInterface: jest.fn(() => ['coreButton.save', 'coreButton.cancel']),
    updateFdLanguageKeyIdentifier: jest.fn()
}));

import { sync as fastGlobSync } from 'fast-glob';
import { extractKeysFromFdLanguageInterface, updateFdLanguageKeyIdentifier } from '../../shared/update-typings';

describe('Sync Operation', () => {
    beforeEach(() => {
        vol.reset();
        jest.clearAllMocks();
    });

    describe('base functionality', () => {
        it('should regenerate TypeScript files from base properties file', async () => {
            vol.fromJSON({
                '/workspace/libs/i18n/translations/translations.properties': `coreButton.save=Save
coreButton.cancel=Cancel`,
                '/workspace/libs/i18n/translations/translations_en.ts': `export default {};`
            });

            (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations_en.ts']);

            const result = await sync({
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(true);
            expect(result.filesModified).toContain('libs/i18n/translations/translations_en.ts');

            const content = vol.readFileSync('/workspace/libs/i18n/translations/translations_en.ts', 'utf-8') as string;
            expect(content).toContain('coreButton');
            expect(content).toContain('save');
            expect(content).toContain('cancel');
        });

        it('should generate spec files for each translation file', async () => {
            vol.fromJSON({
                '/workspace/libs/i18n/translations/translations.properties': `coreButton.save=Save`,
                '/workspace/libs/i18n/translations/translations_en.ts': `export default {};`
            });

            (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations_en.ts']);

            const result = await sync({
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(true);
            expect(result.filesModified).toContain('libs/i18n/translations/translations_en.spec.ts');

            const specContent = vol.readFileSync(
                '/workspace/libs/i18n/translations/translations_en.spec.ts',
                'utf-8'
            ) as string;
            expect(specContent).toContain('translationTester');
            expect(specContent).toContain('translations_en');
        });

        it('should update fd-language-key-identifier.ts', async () => {
            vol.fromJSON({
                '/workspace/libs/i18n/translations/translations.properties': `coreButton.save=Save`,
                '/workspace/libs/i18n/translations/translations_en.ts': `export default {};`
            });

            (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations_en.ts']);

            const result = await sync({
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(true);
            expect(extractKeysFromFdLanguageInterface).toHaveBeenCalled();
            expect(updateFdLanguageKeyIdentifier).toHaveBeenCalledWith(['coreButton.save', 'coreButton.cancel']);
            expect(result.filesModified).toContain('libs/i18n/src/lib/models/fd-language-key-identifier.ts');
        });
    });

    describe('language-specific files', () => {
        it('should merge language-specific translations with base translations', async () => {
            vol.fromJSON({
                '/workspace/libs/i18n/translations/translations.properties': `coreButton.save=Save
coreButton.cancel=Cancel
coreButton.submit=Submit`,
                '/workspace/libs/i18n/translations/translations_de.properties': `coreButton.save=Speichern
coreButton.cancel=Abbrechen`,
                '/workspace/libs/i18n/translations/translations_de.ts': `export default {};`
            });

            (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations_de.ts']);

            const result = await sync({
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(true);

            const content = vol.readFileSync('/workspace/libs/i18n/translations/translations_de.ts', 'utf-8') as string;

            // Should use German translations where available
            expect(content).toContain('Speichern');
            expect(content).toContain('Abbrechen');

            // Should fall back to English for missing keys
            expect(content).toContain('Submit');
        });

        it('should use base translations when language-specific file does not exist', async () => {
            vol.fromJSON({
                '/workspace/libs/i18n/translations/translations.properties': `coreButton.save=Save
coreButton.cancel=Cancel`,
                '/workspace/libs/i18n/translations/translations_fr.ts': `export default {};`
                // No translations_fr.properties file
            });

            (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations_fr.ts']);

            const result = await sync({
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(true);

            const content = vol.readFileSync('/workspace/libs/i18n/translations/translations_fr.ts', 'utf-8') as string;

            // Should fall back to English for all keys
            expect(content).toContain('Save');
            expect(content).toContain('Cancel');
        });

        it('should only include keys that exist in base properties', async () => {
            vol.fromJSON({
                '/workspace/libs/i18n/translations/translations.properties': `coreButton.save=Save
coreButton.cancel=Cancel`,
                '/workspace/libs/i18n/translations/translations_de.properties': `coreButton.save=Speichern
coreButton.cancel=Abbrechen
coreButton.obsolete=Obsolet`,
                '/workspace/libs/i18n/translations/translations_de.ts': `export default {};`
            });

            (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations_de.ts']);

            const result = await sync({
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(true);

            const content = vol.readFileSync('/workspace/libs/i18n/translations/translations_de.ts', 'utf-8') as string;

            // Should include keys from base
            expect(content).toContain('save');
            expect(content).toContain('cancel');

            // Should NOT include extra keys not in base
            expect(content).not.toContain('obsolete');
        });
    });

    describe('multiple files', () => {
        it('should process multiple translation files', async () => {
            vol.fromJSON({
                '/workspace/libs/i18n/translations/translations.properties': `coreButton.save=Save`,
                '/workspace/libs/i18n/translations/translations_en.ts': `export default {};`,
                '/workspace/libs/i18n/translations/translations_de.ts': `export default {};`,
                '/workspace/libs/i18n/translations/translations_fr.ts': `export default {};`,
                '/workspace/libs/i18n/translations/translations_de.properties': `coreButton.save=Speichern`,
                '/workspace/libs/i18n/translations/translations_fr.properties': `coreButton.save=Enregistrer`
            });

            (fastGlobSync as jest.Mock).mockReturnValue([
                'libs/i18n/translations/translations_en.ts',
                'libs/i18n/translations/translations_de.ts',
                'libs/i18n/translations/translations_fr.ts'
            ]);

            const result = await sync({
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(true);
            expect(result.filesModified).toContain('libs/i18n/translations/translations_en.ts');
            expect(result.filesModified).toContain('libs/i18n/translations/translations_de.ts');
            expect(result.filesModified).toContain('libs/i18n/translations/translations_fr.ts');

            // Verify each file has correct translations
            const enContent = vol.readFileSync(
                '/workspace/libs/i18n/translations/translations_en.ts',
                'utf-8'
            ) as string;
            expect(enContent).toContain('Save');

            const deContent = vol.readFileSync(
                '/workspace/libs/i18n/translations/translations_de.ts',
                'utf-8'
            ) as string;
            expect(deContent).toContain('Speichern');

            const frContent = vol.readFileSync(
                '/workspace/libs/i18n/translations/translations_fr.ts',
                'utf-8'
            ) as string;
            expect(frContent).toContain('Enregistrer');
        });

        it('should generate spec files for all translation files', async () => {
            vol.fromJSON({
                '/workspace/libs/i18n/translations/translations.properties': `coreButton.save=Save`,
                '/workspace/libs/i18n/translations/translations_en.ts': `export default {};`,
                '/workspace/libs/i18n/translations/translations_de.ts': `export default {};`
            });

            (fastGlobSync as jest.Mock).mockReturnValue([
                'libs/i18n/translations/translations_en.ts',
                'libs/i18n/translations/translations_de.ts'
            ]);

            const result = await sync({
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(true);
            expect(result.filesModified).toContain('libs/i18n/translations/translations_en.spec.ts');
            expect(result.filesModified).toContain('libs/i18n/translations/translations_de.spec.ts');
        });
    });

    describe('edge cases', () => {
        it('should handle nested keys', async () => {
            vol.fromJSON({
                '/workspace/libs/i18n/translations/translations.properties': `core.button.primary.label=Primary
core.button.secondary.label=Secondary`,
                '/workspace/libs/i18n/translations/translations_en.ts': `export default {};`
            });

            (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations_en.ts']);

            const result = await sync({
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(true);

            const content = vol.readFileSync('/workspace/libs/i18n/translations/translations_en.ts', 'utf-8') as string;
            expect(content).toContain('core');
            expect(content).toContain('button');
            expect(content).toContain('primary');
            expect(content).toContain('secondary');
        });

        it('should handle empty base properties file', async () => {
            vol.fromJSON({
                '/workspace/libs/i18n/translations/translations.properties': ``,
                '/workspace/libs/i18n/translations/translations_en.ts': `export default {};`
            });

            (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations_en.ts']);

            const result = await sync({
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(true);
        });

        it('should handle special characters in values', async () => {
            vol.fromJSON({
                '/workspace/libs/i18n/translations/translations.properties': `coreMessage.selected={count} item(s) selected
coreButton.label=Save & Close`,
                '/workspace/libs/i18n/translations/translations_en.ts': `export default {};`
            });

            (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations_en.ts']);

            const result = await sync({
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(true);

            const content = vol.readFileSync('/workspace/libs/i18n/translations/translations_en.ts', 'utf-8') as string;
            expect(content).toContain('{count}');
            expect(content).toContain('Save & Close');
        });

        it('should handle properties with escaped hash characters', async () => {
            vol.fromJSON({
                '/workspace/libs/i18n/translations/translations.properties': `coreButton.label=Use \\#hashtag`,
                '/workspace/libs/i18n/translations/translations_en.ts': `export default {};`
            });

            (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations_en.ts']);

            const result = await sync({
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(true);

            const content = vol.readFileSync('/workspace/libs/i18n/translations/translations_en.ts', 'utf-8') as string;
            expect(content).toContain('#hashtag');
        });
    });

    describe('error handling', () => {
        it('should handle missing base translations.properties file', async () => {
            vol.fromJSON({
                '/workspace/libs/i18n/translations/translations_en.ts': `export default {};`
            });

            const result = await sync({
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(false);
            expect(result.error).toContain('Failed to read base translations.properties');
        });

        it('should handle no TypeScript files found', async () => {
            vol.fromJSON({
                '/workspace/libs/i18n/translations/translations.properties': `coreButton.save=Save`
            });

            (fastGlobSync as jest.Mock).mockReturnValue([]);

            const result = await sync({
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(false);
            expect(result.error).toContain('No TypeScript translation files found');
        });

        it('should handle prettier formatting errors', async () => {
            const prettier = require('prettier');
            (prettier.format as jest.Mock).mockRejectedValueOnce(new Error('Prettier failed'));

            vol.fromJSON({
                '/workspace/libs/i18n/translations/translations.properties': `coreButton.save=Save`,
                '/workspace/libs/i18n/translations/translations_en.ts': `export default {};`
            });

            (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations_en.ts']);

            const result = await sync({
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(false);
            expect(result.error).toContain('Prettier failed');
        });

        it('should continue if fd-language-key-identifier update fails', async () => {
            (updateFdLanguageKeyIdentifier as jest.Mock).mockImplementationOnce(() => {
                throw new Error('Update failed');
            });

            vol.fromJSON({
                '/workspace/libs/i18n/translations/translations.properties': `coreButton.save=Save`,
                '/workspace/libs/i18n/translations/translations_en.ts': `export default {};`
            });

            (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations_en.ts']);

            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

            const result = await sync({
                propertiesPath: 'libs/i18n/translations'
            });

            // Should still succeed despite key identifier update failure
            expect(result.success).toBe(true);
            expect(consoleSpy).toHaveBeenCalledWith(
                expect.stringContaining('Failed to rebuild fd-language-key-identifier.ts'),
                expect.any(Error)
            );

            consoleSpy.mockRestore();
        });
    });

    describe('integration behavior', () => {
        it('should respect fast-glob ignore pattern for spec files', async () => {
            vol.fromJSON({
                '/workspace/libs/i18n/translations/translations.properties': `coreButton.save=Save`,
                '/workspace/libs/i18n/translations/translations_en.ts': `export default {};`,
                '/workspace/libs/i18n/translations/translations_en.spec.ts': `describe('test', () => {});`
            });

            (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations_en.ts']);

            const result = await sync({
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(true);
            expect(fastGlobSync).toHaveBeenCalledWith(expect.any(String), {
                cwd: '/workspace',
                ignore: ['**/*.spec.ts']
            });
        });

        it('should write files with correct header comments', async () => {
            vol.fromJSON({
                '/workspace/libs/i18n/translations/translations.properties': `coreButton.save=Save`,
                '/workspace/libs/i18n/translations/translations_de.ts': `export default {};`,
                '/workspace/libs/i18n/translations/translations_de.properties': `coreButton.save=Speichern`
            });

            (fastGlobSync as jest.Mock).mockReturnValue(['libs/i18n/translations/translations_de.ts']);

            const result = await sync({
                propertiesPath: 'libs/i18n/translations'
            });

            expect(result.success).toBe(true);

            const content = vol.readFileSync('/workspace/libs/i18n/translations/translations_de.ts', 'utf-8') as string;
            expect(content).toContain(
                "// Do not modify, it's automatically created. Modify translations_de.properties instead"
            );
        });
    });
});
