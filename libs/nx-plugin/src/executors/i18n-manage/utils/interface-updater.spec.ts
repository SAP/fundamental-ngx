import { findComponentSection, formatInterfaceKey, updateFdLanguageInterface } from './interface-updater';

describe('interface-updater', () => {
    describe('formatInterfaceKey', () => {
        it('should format a simple key with JSDoc comment', () => {
            const result = formatInterfaceKey('submit', 'XBUT', 'Submit button');
            expect(result).toContain('/** Submit button */');
            expect(result).toContain('submit: FdLanguageKey;');
        });

        it('should handle generic types', () => {
            const result = formatInterfaceKey('itemsSelected', 'XMSG', 'Items selected count', true);
            expect(result).toContain('itemsSelected: FdLanguageKey<{ count: number }>;');
        });
    });

    describe('findComponentSection', () => {
        it('should find existing component section', () => {
            const content = `
export interface FdLanguage {
    coreButton: {
        /** Submit */
        submit: FdLanguageKey;
    };
}
            `;
            const result = findComponentSection(content, 'coreButton');
            expect(result).toBeDefined();
            expect(result!.startLine).toBeGreaterThanOrEqual(0);
            expect(result!.endLine).toBeGreaterThan(result!.startLine);
        });

        it('should return null if component section not found', () => {
            const content = `
export interface FdLanguage {
    coreButton: {
        submit: FdLanguageKey;
    };
}
            `;
            const result = findComponentSection(content, 'platformTable');
            expect(result).toBeNull();
        });
    });

    describe('updateFdLanguageInterface', () => {
        it('should add key to existing component section', () => {
            const content = `export interface FdLanguage {
    coreButton: {
        /** Submit */
        submit: FdLanguageKey;
    };
}
            `;

            const result = updateFdLanguageInterface(content, 'coreButton', 'cancel', 'XBUT', 'Cancel button', false);

            expect(result).toContain('submit: FdLanguageKey;');
            expect(result).toContain('cancel: FdLanguageKey;');
            expect(result).toContain('/** Cancel button */');
        });

        it('should not add duplicate keys', () => {
            const content = `export interface FdLanguage {
    coreButton: {
        /** Submit */
        submit: FdLanguageKey;
    };
}
            `;

            const result = updateFdLanguageInterface(content, 'coreButton', 'submit', 'XBUT', 'Submit button', false);

            // Should return unchanged content when key already exists
            expect(result).toEqual(content);
        });

        it('should create new component section if it does not exist', () => {
            const content = `export interface FdLanguage {
}
            `;

            const result = updateFdLanguageInterface(content, 'coreNewComponent', 'key1', 'XMSG', 'First key', false);

            expect(result).toContain('coreNewComponent: {');
            expect(result).toContain('key1: FdLanguageKey;');
        });

        it('should preserve existing keys when adding new one', () => {
            const content = `export interface FdLanguage {
    coreButton: {
        /** Submit */
        submit: FdLanguageKey;
        /** Cancel */
        cancel: FdLanguageKey;
    };
}
            `;

            const result = updateFdLanguageInterface(content, 'coreButton', 'delete', 'XBUT', 'Delete button', false);

            expect(result).toContain('submit: FdLanguageKey;');
            expect(result).toContain('cancel: FdLanguageKey;');
            expect(result).toContain('delete: FdLanguageKey;');
        });

        it('should maintain proper indentation', () => {
            const content = `export interface FdLanguage {
    coreButton: {
        /** Submit */
        submit: FdLanguageKey;
    };
}
            `;

            const result = updateFdLanguageInterface(content, 'coreButton', 'confirm', 'XBUT', 'Confirm action', false);

            // Check that indentation is consistent (8 spaces for interface members)
            const lines = result.split('\n');
            const confirmLine = lines.find((l) => l.includes('confirm:'));
            expect(confirmLine?.startsWith('        ')).toBe(true); // 8 spaces
        });
    });
});
