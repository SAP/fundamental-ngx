import { deriveSelectorInfo } from './selector-utils';

describe('deriveSelectorInfo', () => {
    it('should classify a plain element selector', () => {
        const result = deriveSelectorInfo('fd-card');
        expect(result).toEqual({
            selectorType: 'element',
            templateUsage: '<fd-card>...</fd-card>'
        });
    });

    it('should classify a combined element+attribute selector as "both"', () => {
        const result = deriveSelectorInfo('button[fd-button], a[fd-button]');
        expect(result).toEqual({
            selectorType: 'both',
            templateUsage: '<button fd-button>...</button>'
        });
    });

    it('should classify a bracketed attribute selector', () => {
        const result = deriveSelectorInfo('[fd-title]');
        expect(result).toEqual({
            selectorType: 'attribute',
            templateUsage: '<element fd-title>...</element>'
        });
    });

    it('should classify a camelCase attribute selector', () => {
        const result = deriveSelectorInfo('[fdOverflowLayout]');
        expect(result).toEqual({
            selectorType: 'attribute',
            templateUsage: '<element fdOverflowLayout>...</element>'
        });
    });

    it('should classify a UI5 element selector', () => {
        const result = deriveSelectorInfo('ui5-button');
        expect(result).toEqual({
            selectorType: 'element',
            templateUsage: '<ui5-button>...</ui5-button>'
        });
    });

    it('should handle an empty string gracefully', () => {
        const result = deriveSelectorInfo('');
        expect(result).toEqual({
            selectorType: 'element',
            templateUsage: '<unknown>...</unknown>'
        });
    });
});
