import { Nullable } from '@fundamental-ngx/cdk/utils';
import { FdLanguage, FdLanguageKeyFunction, FdLanguageKeyIdentifier, FdLanguagePatch } from '../models';

/**
 * Transforms hierarchical object into object with flat keys
 * every {parent: { child: 'value' } } becomes { 'parent.child': 'value' }
 * @param translations
 * @param prefix
 * @param translationValueTransformer
 */
export function flattenTranslations(
    translations: FdLanguage,
    prefix?: Nullable<string>,
    translationValueTransformer?: (value: string | FdLanguageKeyFunction) => string | FdLanguageKeyFunction
): Record<FdLanguageKeyIdentifier, string | FdLanguageKeyFunction>;
export function flattenTranslations(
    translations: FdLanguagePatch,
    prefix?: Nullable<string>,
    translationValueTransformer?: (value: string | FdLanguageKeyFunction) => string | FdLanguageKeyFunction
): Partial<Record<FdLanguageKeyIdentifier, string | FdLanguageKeyFunction>>;
// eslint-disable-next-line jsdoc/require-jsdoc
export function flattenTranslations(
    translations: FdLanguagePatch | FdLanguage,
    prefix?: Nullable<string>,
    translationValueTransformer?: (value: string | FdLanguageKeyFunction) => string | FdLanguageKeyFunction
):
    | Partial<Record<FdLanguageKeyIdentifier, string | FdLanguageKeyFunction>>
    | Record<FdLanguageKeyIdentifier, string | FdLanguageKeyFunction> {
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
