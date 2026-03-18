import { Nullable } from '@fundamental-ngx/cdk/utils';
import { FdLanguageKey, FdLanguageKeyCtx, FdLanguageKeyIdentifier, FdLanguagePatch, FlatFdLanguage } from '../models';

/**
 * Top-level FdLanguage keys that carry metadata, not translations.
 * These must be skipped during flattening so they don't pollute the
 * flat translation map.
 */
const FD_LANGUAGE_METADATA_KEYS: ReadonlySet<string> = new Set(['locale', 'name']);

/**
 * Transforms hierarchical object into object with flat keys
 * every {parent: { child: 'value' } } becomes { 'parent.child': 'value' }
 * @param translations
 * @param prefix
 * @param translationValueTransformer
 */
export function flattenTranslations(
    translations: FdLanguagePatch,
    prefix?: Nullable<string>,
    translationValueTransformer?: <Key extends FdLanguageKeyIdentifier>(
        value: FdLanguageKey<FdLanguageKeyCtx<Key>>
    ) => FdLanguageKey<FdLanguageKeyCtx<Key>>
): Partial<FlatFdLanguage> {
    if (!translations) {
        return {};
    }
    return Object.keys(translations).reduce((acc: Partial<FlatFdLanguage>, key: string) => {
        // Skip FdLanguage metadata fields (e.g. `locale`, `name`) that are not translation keys.
        if (!prefix && FD_LANGUAGE_METADATA_KEYS.has(key)) {
            return acc;
        }
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
