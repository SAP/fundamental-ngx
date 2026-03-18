import { FdLanguagePatch } from '../models';
import { flattenTranslations } from './flatten-translations';

describe('flattenTranslations', () => {
    it('should flatten nested translation objects into dot-separated keys', () => {
        const translations: FdLanguagePatch = {
            coreBusyIndicator: {
                defaultAriaValueText: 'Loading',
                defaultTitle: 'Please wait'
            }
        };

        const result = flattenTranslations(translations);

        expect(result['coreBusyIndicator.defaultAriaValueText']).toBe('Loading');
        expect(result['coreBusyIndicator.defaultTitle']).toBe('Please wait');
    });

    it('should return empty object for falsy input', () => {
        expect(flattenTranslations(null as any)).toEqual({});
        expect(flattenTranslations(undefined as any)).toEqual({});
    });

    it('should apply translationValueTransformer when provided', () => {
        const translations: FdLanguagePatch = {
            coreBusyIndicator: {
                defaultAriaValueText: 'Loading'
            }
        };

        const result = flattenTranslations(translations, undefined, (value) => {
            if (typeof value === 'string') {
                return value.toUpperCase();
            }
            return value;
        });

        expect(result['coreBusyIndicator.defaultAriaValueText']).toBe('LOADING');
    });

    it('should preserve function values', () => {
        const fn = (params: { count: number }): string => `${params.count} items`;
        const translations: FdLanguagePatch = {
            coreOverflowLayout: {
                moreItemsButton: fn as any
            }
        };

        const result = flattenTranslations(translations);

        expect(result['coreOverflowLayout.moreItemsButton']).toBe(fn);
    });

    it('should skip locale and name metadata fields from the flattened output', () => {
        const translations: FdLanguagePatch = {
            locale: 'de' as any,
            name: 'Deutsch' as any,
            coreBusyIndicator: {
                defaultAriaValueText: 'Laden',
                defaultTitle: 'Bitte warten'
            }
        };

        const result = flattenTranslations(translations);

        // Metadata keys must not appear in flattened output
        expect(result['locale']).toBeUndefined();
        expect(result['name']).toBeUndefined();
        expect('locale' in result).toBe(false);
        expect('name' in result).toBe(false);

        // Actual translation keys must still be present
        expect(result['coreBusyIndicator.defaultAriaValueText']).toBe('Laden');
        expect(result['coreBusyIndicator.defaultTitle']).toBe('Bitte warten');
    });

    it('should not skip keys named locale or name when they appear in nested objects', () => {
        // A nested object might legitimately have a key called "name" or "locale"
        // (e.g., someComponent: { name: 'translation' }). Only top-level metadata should be skipped.
        const translations: FdLanguagePatch = {
            coreBusyIndicator: {
                defaultAriaValueText: 'Loading'
            }
        };

        // Simulate a nested structure that has a "name" key inside a component group
        const translationsWithNestedName = {
            ...translations,
            someComponent: {
                name: 'Component Name Translation'
            }
        } as any;

        const result = flattenTranslations(translationsWithNestedName);

        expect(result['someComponent.name']).toBe('Component Name Translation');
    });
});
