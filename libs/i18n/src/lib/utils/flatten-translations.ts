import { FdLanguageKeyFunction, FdLanguagePatch } from '../models';

/**
 * Transforms hierarchical object into object with flat keys
 * every {parent: { child: 'value' } } becomes { 'parent.child': 'value' }
 * @param translations
 * @param prefix
 * @param translationValueTransformer
 */
export function flattenTranslations(
    translations: FdLanguagePatch,
    prefix: string | null = null,
    translationValueTransformer?: (value: string | FdLanguageKeyFunction) => string | FdLanguageKeyFunction
): Record<string, string | FdLanguageKeyFunction> {
    if (!translations) {
        return {};
    }
    return Object.keys(translations).reduce((acc: any, key) => {
        const translationValue = translations[key];
        const globalKey = prefix ? `${prefix}.${key}` : key;
        if (typeof translationValue === 'string' || typeof translationValue === 'function') {
            acc[globalKey] = translationValueTransformer
                ? translationValueTransformer(translationValue)
                : translationValue;
        } else {
            Object.assign(acc, flattenTranslations(translationValue, globalKey, translationValueTransformer));
        }
        return acc;
    }, {});
}
