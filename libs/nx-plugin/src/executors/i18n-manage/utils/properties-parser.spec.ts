import {
    addKeyToProperties,
    findInsertionPoint,
    formatPropertiesEntry,
    keyExists,
    parsePropertiesFile,
    removeKeyFromProperties,
    renameKeyInProperties
} from './properties-parser';

describe('PropertiesParser', () => {
    describe('parsePropertiesFile', () => {
        it('should parse simple key-value pairs', () => {
            const content = `
key1=value1
key2=value2
            `.trim();

            const result = parsePropertiesFile(content);

            expect(result.size).toBe(2);
            expect(result.get('key1')).toBe('value1');
            expect(result.get('key2')).toBe('value2');
        });

        it('should handle comments', () => {
            const content = `
#XBUT: Button label
coreButton.save=Save
            `.trim();

            const result = parsePropertiesFile(content);

            expect(result.size).toBe(1);
            expect(result.get('coreButton.save')).toBe('Save');
        });

        it('should handle escaped # characters', () => {
            const content = `key=value with \\# character`;

            const result = parsePropertiesFile(content);

            expect(result.get('key')).toBe('value with # character');
        });

        it('should handle empty file', () => {
            const content = '';

            const result = parsePropertiesFile(content);

            expect(result.size).toBe(0);
        });

        it('should handle values with = sign', () => {
            const content = `key=value=with=equals`;

            const result = parsePropertiesFile(content);

            expect(result.get('key')).toBe('value=with=equals');
        });

        it('should trim whitespace', () => {
            const content = `  key  =  value  `;

            const result = parsePropertiesFile(content);

            expect(result.get('key')).toBe('value');
        });
    });

    describe('keyExists', () => {
        it('should return true if key exists', () => {
            const content = `
#XBUT: Save button
coreButton.save=Save
coreButton.cancel=Cancel
            `.trim();

            expect(keyExists(content, 'coreButton.save')).toBe(true);
            expect(keyExists(content, 'coreButton.cancel')).toBe(true);
        });

        it('should return false if key does not exist', () => {
            const content = `
coreButton.save=Save
            `.trim();

            expect(keyExists(content, 'coreButton.nonexistent')).toBe(false);
        });
    });

    describe('findInsertionPoint', () => {
        it('should insert alphabetically within component group', () => {
            const lines = [
                '#XBUT: Add',
                'coreButton.add=Add',
                '',
                '#XBUT: Save',
                'coreButton.save=Save',
                '',
                '#XFLD: Name',
                'coreInput.name=Name'
            ];

            // Should insert between add and save
            const index = findInsertionPoint(lines, 'coreButton', 'coreButton.cancel');

            expect(index).toBe(3); // Before the #XBUT: Save comment
        });

        it('should insert at end of component group if alphabetically last', () => {
            const lines = [
                '#XBUT: Cancel',
                'coreButton.cancel=Cancel',
                '',
                '#XBUT: Save',
                'coreButton.save=Save',
                '',
                '#XFLD: Name',
                'coreInput.name=Name'
            ];

            const index = findInsertionPoint(lines, 'coreButton', 'coreButton.zzz');

            expect(index).toBe(6); // Before #XFLD comment (after coreButton group)
        });

        it('should insert at beginning of component group if alphabetically first', () => {
            const lines = [
                '#XBUT: Save',
                'coreButton.save=Save',
                '',
                '#XBUT: Submit',
                'coreButton.submit=Submit',
                '',
                '#XFLD: Name',
                'coreInput.name=Name'
            ];

            const index = findInsertionPoint(lines, 'coreButton', 'coreButton.add');

            expect(index).toBe(0); // Before the #XBUT: Save comment
        });

        it('should insert at end if no matching prefix', () => {
            const lines = ['#XBUT: Save', 'coreButton.save=Save', ''];

            const index = findInsertionPoint(lines, 'coreDialog', 'coreDialog.title');

            expect(index).toBe(lines.length);
        });

        it('should handle empty file', () => {
            const lines: string[] = [];

            const index = findInsertionPoint(lines, 'coreButton', 'coreButton.save');

            expect(index).toBe(0);
        });

        it('should handle component group at the end of file', () => {
            const lines = ['#XFLD: Email', 'coreInput.email=Email', '', '#XFLD: Name', 'coreInput.name=Name'];

            const index = findInsertionPoint(lines, 'coreInput', 'coreInput.password');

            expect(index).toBe(5); // After name (alphabetically last in group)
        });
    });

    describe('formatPropertiesEntry', () => {
        it('should format entry with comment', () => {
            const entry = {
                key: 'coreButton.save',
                value: 'Save',
                commentType: 'XBUT' as const,
                commentDescription: 'Save button label'
            };

            const result = formatPropertiesEntry(entry);

            expect(result).toEqual(['#XBUT: Save button label', 'coreButton.save=Save']);
        });
    });

    describe('addKeyToProperties', () => {
        it('should add key to file with proper formatting', () => {
            const content = `
#XBUT: Save button
coreButton.save=Save
            `.trim();

            const result = addKeyToProperties(content, {
                key: 'coreButton.cancel',
                value: 'Cancel',
                commentType: 'XBUT',
                commentDescription: 'Cancel button label'
            });

            expect(result).toContain('#XBUT: Cancel button label');
            expect(result).toContain('coreButton.cancel=Cancel');
            expect(result).toContain('coreButton.save=Save'); // Original key preserved
        });

        it('should insert alphabetically before existing key', () => {
            const content = `
#XBUT: Save
coreButton.save=Save

#XFLD: Name
coreInput.name=Name
            `.trim();

            const result = addKeyToProperties(content, {
                key: 'coreButton.cancel',
                value: 'Cancel',
                commentType: 'XBUT',
                commentDescription: 'Cancel button'
            });

            const lines = result.split('\n');
            const cancelIndex = lines.findIndex((l) => l.includes('coreButton.cancel'));
            const saveIndex = lines.findIndex((l) => l.includes('coreButton.save'));
            const nameIndex = lines.findIndex((l) => l.includes('coreInput.name'));

            // cancel comes before save alphabetically
            expect(cancelIndex).toBeLessThan(saveIndex);
            expect(saveIndex).toBeLessThan(nameIndex);
        });

        it('should insert alphabetically after existing key', () => {
            const content = `
#XBUT: Cancel
coreButton.cancel=Cancel

#XFLD: Name
coreInput.name=Name
            `.trim();

            const result = addKeyToProperties(content, {
                key: 'coreButton.save',
                value: 'Save',
                commentType: 'XBUT',
                commentDescription: 'Save button'
            });

            const lines = result.split('\n');
            const cancelIndex = lines.findIndex((l) => l.includes('coreButton.cancel'));
            const saveIndex = lines.findIndex((l) => l.includes('coreButton.save'));
            const nameIndex = lines.findIndex((l) => l.includes('coreInput.name'));

            // save comes after cancel alphabetically
            expect(cancelIndex).toBeLessThan(saveIndex);
            expect(saveIndex).toBeLessThan(nameIndex);
        });

        it('should handle adding first key for new component', () => {
            const content = `
#XBUT: Save
coreButton.save=Save
            `.trim();

            const result = addKeyToProperties(content, {
                key: 'coreDialog.title',
                value: 'Dialog',
                commentType: 'XTIT',
                commentDescription: 'Dialog title'
            });

            expect(result).toContain('#XTIT: Dialog title');
            expect(result).toContain('coreDialog.title=Dialog');
        });

        it('should insert in correct alphabetical position within group', () => {
            const content = `
#XBUT: Add
coreButton.add=Add

#XBUT: Delete
coreButton.delete=Delete

#XBUT: Save
coreButton.save=Save
            `.trim();

            const result = addKeyToProperties(content, {
                key: 'coreButton.cancel',
                value: 'Cancel',
                commentType: 'XBUT',
                commentDescription: 'Cancel button'
            });

            const lines = result.split('\n');
            const addIndex = lines.findIndex((l) => l.includes('coreButton.add'));
            const cancelIndex = lines.findIndex((l) => l.includes('coreButton.cancel'));
            const deleteIndex = lines.findIndex((l) => l.includes('coreButton.delete'));
            const saveIndex = lines.findIndex((l) => l.includes('coreButton.save'));

            // Should be: add, cancel, delete, save
            expect(addIndex).toBeLessThan(cancelIndex);
            expect(cancelIndex).toBeLessThan(deleteIndex);
            expect(deleteIndex).toBeLessThan(saveIndex);
        });
    });

    describe('removeKeyFromProperties', () => {
        it('should remove key and its comment', () => {
            const content = `
#XBUT: Save button
coreButton.save=Save

#XBUT: Cancel button
coreButton.cancel=Cancel
            `.trim();

            const result = removeKeyFromProperties(content, 'coreButton.save');

            expect(result).not.toContain('coreButton.save');
            expect(result).not.toContain('#XBUT: Save button');
            expect(result).toContain('coreButton.cancel=Cancel');
        });

        it('should handle key without comment', () => {
            const content = `
coreButton.save=Save
coreButton.cancel=Cancel
            `.trim();

            const result = removeKeyFromProperties(content, 'coreButton.save');

            expect(result).not.toContain('coreButton.save');
            expect(result).toContain('coreButton.cancel=Cancel');
        });

        it('should return original content if key not found', () => {
            const content = `
#XBUT: Save
coreButton.save=Save
            `.trim();

            const result = removeKeyFromProperties(content, 'nonexistent.key');

            expect(result).toBe(content);
        });
    });

    describe('renameKeyInProperties', () => {
        it('should rename key while preserving value and comment', () => {
            const content = `
#XBUT: Save button
coreButton.save=Save
            `.trim();

            const result = renameKeyInProperties(content, 'coreButton.save', 'coreButton.submit');

            expect(result).toContain('coreButton.submit=Save');
            expect(result).not.toContain('coreButton.save=');
            expect(result).toContain('#XBUT: Save button'); // Comment preserved
        });

        it('should return original content if key not found', () => {
            const content = `
#XBUT: Save
coreButton.save=Save
            `.trim();

            const result = renameKeyInProperties(content, 'nonexistent.key', 'new.key');

            expect(result).toBe(content);
        });
    });
});
