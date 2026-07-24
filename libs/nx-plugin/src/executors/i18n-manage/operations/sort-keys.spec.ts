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

// Mock prettier
jest.mock('prettier', () => ({
    format: jest.fn((content: string) => Promise.resolve(content)),
    resolveConfig: jest.fn(() => Promise.resolve({}))
}));

describe('SortKeys Operation', () => {
    beforeEach(() => {
        vol.reset();
        jest.clearAllMocks();
    });

    describe('sorting behavior', () => {
        it('should regenerate TypeScript file from properties with sorted keys', async () => {
            vol.fromJSON({
                '/test-path/translations_en.ts': `export default {
    "coreName": { "label": "Name" },
    "coreButton": { "save": "Save" },
    "coreEmail": { "label": "Email" }
};`,
                '/test-path/translations_en.properties': `coreName.label=Name
coreButton.save=Save
coreEmail.label=Email`
            });

            const result = await sortKeys({
                propertiesPath: '/test-path'
            });

            expect(result.success).toBe(true);
            expect(result.filesModified).toContain('translations_en.ts');

            const content = vol.readFileSync('/test-path/translations_en.ts', 'utf-8') as string;

            // Components should be alphabetically sorted: coreButton, coreEmail, coreName
            const buttonPos = content.indexOf('"coreButton"');
            const emailPos = content.indexOf('"coreEmail"');
            const namePos = content.indexOf('"coreName"');

            expect(buttonPos).toBeLessThan(emailPos);
            expect(emailPos).toBeLessThan(namePos);
        });

        it('should alphabetically sort keys within same component', async () => {
            vol.fromJSON({
                '/test-path/translations_en.ts': `export default {
    "coreButton": {
        "submit": "Submit",
        "cancel": "Cancel",
        "save": "Save"
    }
};`,
                '/test-path/translations_en.properties': `coreButton.submit=Submit
coreButton.cancel=Cancel
coreButton.save=Save`
            });

            const result = await sortKeys({
                propertiesPath: '/test-path'
            });

            expect(result.success).toBe(true);
            expect(result.filesModified).toContain('translations_en.ts');

            const content = vol.readFileSync('/test-path/translations_en.ts', 'utf-8') as string;

            // Keys should be alphabetically sorted: cancel, save, submit
            const cancelPos = content.indexOf('"cancel"');
            const savePos = content.indexOf('"save"');
            const submitPos = content.indexOf('"submit"');

            expect(cancelPos).toBeLessThan(savePos);
            expect(savePos).toBeLessThan(submitPos);
        });

        it('should preserve nested structure from dot notation', async () => {
            vol.fromJSON({
                '/test-path/translations_en.ts': `export default {};`,
                '/test-path/translations_en.properties': `coreButton.primary.label=Primary
coreButton.secondary.label=Secondary`
            });

            const result = await sortKeys({
                propertiesPath: '/test-path'
            });

            expect(result.success).toBe(true);

            const content = vol.readFileSync('/test-path/translations_en.ts', 'utf-8') as string;
            expect(content).toContain('primary');
            expect(content).toContain('secondary');
        });

        it('should handle special characters in values', async () => {
            vol.fromJSON({
                '/test-path/translations_en.ts': `export default {};`,
                '/test-path/translations_en.properties': `coreMessage.selected={count} selected
coreButton.save=Save & Close`
            });

            const result = await sortKeys({
                propertiesPath: '/test-path'
            });

            expect(result.success).toBe(true);

            const content = vol.readFileSync('/test-path/translations_en.ts', 'utf-8') as string;
            expect(content).toContain('{count} selected');
            expect(content).toContain('Save & Close');
        });

        it('should not modify file if content is already sorted and matches', async () => {
            const sortedContent = `
// Do not modify, it's automatically created. Modify translations_en.properties instead
export default {
    "coreButton": {
        "cancel": "Cancel",
        "save": "Save"
    },
    "coreName": {
        "label": "Name"
    }
};
`;

            vol.fromJSON({
                '/test-path/translations_en.ts': sortedContent,
                '/test-path/translations_en.properties': `coreButton.cancel=Cancel
coreButton.save=Save
coreName.label=Name`
            });

            const result = await sortKeys({
                propertiesPath: '/test-path'
            });

            expect(result.success).toBe(true);
            expect(result.filesModified).toHaveLength(0);
        });
    });

    describe('multiple files', () => {
        it('should process multiple TypeScript translation files', async () => {
            vol.fromJSON({
                '/test-path/translations_en.ts': `export default {};`,
                '/test-path/translations_en.properties': `coreButton.save=Save`,
                '/test-path/translations_de.ts': `export default {};`,
                '/test-path/translations_de.properties': `coreButton.save=Speichern`,
                '/test-path/translations_fr.ts': `export default {};`,
                '/test-path/translations_fr.properties': `coreButton.save=Enregistrer`
            });

            const result = await sortKeys({
                propertiesPath: '/test-path'
            });

            expect(result.success).toBe(true);
            expect(result.filesModified).toHaveLength(3);
            expect(result.filesModified).toContain('translations_en.ts');
            expect(result.filesModified).toContain('translations_de.ts');
            expect(result.filesModified).toContain('translations_fr.ts');
        });

        it('should only report files that actually changed', async () => {
            const unchangedContent = `
// Do not modify, it's automatically created. Modify translations_en.properties instead
export default {
    "coreButton": {
        "save": "Save"
    }
};
`;

            vol.fromJSON({
                '/test-path/translations_en.ts': `export default {};`,
                '/test-path/translations_en.properties': `coreButton.save=Save`,
                '/test-path/translations_de.ts': unchangedContent,
                '/test-path/translations_de.properties': `coreButton.save=Speichern`
            });

            const result = await sortKeys({
                propertiesPath: '/test-path'
            });

            expect(result.success).toBe(true);
            expect(result.filesModified.length).toBeGreaterThan(0);
            expect(result.filesModified).toContain('translations_en.ts');
        });

        it('should skip files without corresponding properties file', async () => {
            vol.fromJSON({
                '/test-path/translations_en.ts': `export default {};`,
                '/test-path/translations_en.properties': `coreButton.save=Save`,
                '/test-path/translations_de.ts': `export default {};`
                // Missing translations_de.properties
            });

            const result = await sortKeys({
                propertiesPath: '/test-path'
            });

            expect(result.success).toBe(true);
            expect(result.filesModified).toContain('translations_en.ts');
            expect(result.filesModified).not.toContain('translations_de.ts');
        });

        it('should ignore spec files', async () => {
            vol.fromJSON({
                '/test-path/translations_en.ts': `export default {};`,
                '/test-path/translations_en.properties': `coreButton.save=Save`,
                '/test-path/translations_en.spec.ts': `describe('test', () => {});`
            });

            const result = await sortKeys({
                propertiesPath: '/test-path'
            });

            expect(result.success).toBe(true);
            expect(result.filesModified).not.toContain('translations_en.spec.ts');
        });
    });

    describe('edge cases', () => {
        it('should handle file with single key', async () => {
            vol.fromJSON({
                '/test-path/translations_en.ts': `export default { "coreButton": { "save": "Save" } };`,
                '/test-path/translations_en.properties': `coreButton.save=Save`
            });

            const result = await sortKeys({
                propertiesPath: '/test-path'
            });

            expect(result.success).toBe(true);
        });

        it('should handle deeply nested keys', async () => {
            vol.fromJSON({
                '/test-path/translations_en.ts': `export default {};`,
                '/test-path/translations_en.properties': `core.button.primary.label=Primary
core.button.secondary.label=Secondary
core.button.action.submit=Submit
core.button.action.cancel=Cancel`
            });

            const result = await sortKeys({
                propertiesPath: '/test-path'
            });

            expect(result.success).toBe(true);

            const content = vol.readFileSync('/test-path/translations_en.ts', 'utf-8') as string;

            // At the "button" level, "action" should come before "primary" and "secondary"
            const actionPos = content.indexOf('"action"');
            const primaryPos = content.indexOf('"primary"');
            const secondaryPos = content.indexOf('"secondary"');

            expect(actionPos).toBeLessThan(primaryPos);
            expect(primaryPos).toBeLessThan(secondaryPos);

            // Within "action", "cancel" should come before "submit"
            const cancelPos = content.indexOf('"cancel"');
            const submitPos = content.indexOf('"submit"');

            expect(cancelPos).toBeLessThan(submitPos);
        });

        it('should handle empty properties file', async () => {
            vol.fromJSON({
                '/test-path/translations_en.ts': `export default {};`,
                '/test-path/translations_en.properties': ``
            });

            const result = await sortKeys({
                propertiesPath: '/test-path'
            });

            expect(result.success).toBe(true);
        });

        it('should handle properties with escaped hash characters', async () => {
            vol.fromJSON({
                '/test-path/translations_en.ts': `export default {};`,
                '/test-path/translations_en.properties': `coreButton.label=Use \\#hashtag`
            });

            const result = await sortKeys({
                propertiesPath: '/test-path'
            });

            expect(result.success).toBe(true);

            const content = vol.readFileSync('/test-path/translations_en.ts', 'utf-8') as string;
            expect(content).toContain('#hashtag');
        });
    });

    describe('error handling', () => {
        it('should handle no TypeScript files', async () => {
            vol.fromJSON({
                '/test-path/some-file.txt': 'not a ts file'
            });

            const result = await sortKeys({
                propertiesPath: '/test-path'
            });

            expect(result.success).toBe(false);
            expect(result.filesModified).toHaveLength(0);
            expect(result.error).toContain('No TypeScript translation files found');
        });

        it('should handle invalid properties syntax gracefully', async () => {
            vol.fromJSON({
                '/test-path/translations_en.ts': `export default {};`,
                '/test-path/translations_en.properties': `invalid syntax without equals sign`
            });

            const result = await sortKeys({
                propertiesPath: '/test-path'
            });

            // Should still succeed, just with empty or minimal content
            expect(result.success).toBe(true);
        });

        it('should handle prettier errors', async () => {
            const prettier = require('prettier');
            (prettier.format as jest.Mock).mockRejectedValueOnce(new Error('Prettier failed'));

            vol.fromJSON({
                '/test-path/translations_en.ts': `export default {};`,
                '/test-path/translations_en.properties': `coreButton.save=Save`
            });

            const result = await sortKeys({
                propertiesPath: '/test-path'
            });

            expect(result.success).toBe(false);
            expect(result.error).toContain('Prettier failed');
        });
    });
});
