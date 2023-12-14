/**
 * Transforms hierarchical object into object with flat keys
 * every {parent: { child: 'value' } } becomes { 'parent.child': 'value' }
 * @param obj
 * @param prefix
 */
export function flattenTranslations(obj: Record<string, any>, prefix?: string | null): Record<string, string> {
    if (!obj) {
        return {};
    }
    return Object.keys(obj).reduce((acc: Record<string, string>, key: string) => {
        const translationValue = obj[key];
        const globalKey = prefix ? `${prefix}.${key}` : key;
        if (typeof translationValue === 'string' || typeof translationValue === 'function') {
            acc[globalKey] = translationValue;
        } else {
            Object.assign(acc, flattenTranslations(translationValue, globalKey));
        }
        return acc;
    }, {});
}
