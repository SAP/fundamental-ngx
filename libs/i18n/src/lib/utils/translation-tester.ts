import { TYPE, parse } from '@formatjs/icu-messageformat-parser';
import { FdLanguage } from '../models';
import { flattenTranslations } from './flatten-translations';
import { resolveTranslationSignal } from './resolve-helpers/resolve-translations-signal';

/**
 * Small utility function to test the validity of translations syntax
 * @param translations
 */
export function translationTester(translations: FdLanguage): void {
    const flat = flattenTranslations(translations);
    Object.entries(flat).forEach(([key, value]) => {
        describe(key, () => {
            const usedVariableNames = parse(value as string).reduce((acc: string[], curr) => {
                if (curr.type === TYPE.argument) {
                    acc.push(curr.value);
                }
                if (curr.type === TYPE.plural) {
                    acc.push(curr.value);
                }
                return acc;
            }, []);
            if (usedVariableNames.length > 0) {
                const ctx = usedVariableNames.reduce((acc, curr, currentIndex) => {
                    acc[curr] = currentIndex;
                    return acc;
                }, {});
                it(`should translate key "${key}" with context ${JSON.stringify(ctx)}`, () => {
                    const translationSignal = resolveTranslationSignal(key as any, ctx, {
                        fdLang: translations as unknown as FdLanguage,
                        fdLocale: 'en'
                    });
                    const translation = translationSignal();
                    expect(typeof translation === 'string').toBe(true);
                });
            } else {
                it(`should translate key "${key}"`, () => {
                    const translationSignal = resolveTranslationSignal(key as any, {
                        fdLang: translations as unknown as FdLanguage,
                        fdLocale: 'en'
                    });
                    const translation = translationSignal();
                    expect(typeof translation === 'string').toBe(true);
                });
            }
        });
    });
}
