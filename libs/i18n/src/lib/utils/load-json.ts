import { FdLanguage, FdLanguageKey, FdLanguageKeyIdentifier } from '../models/lang';

interface RecursiveRecord<V = string> {
    [key: string]: V | RecursiveRecord<V>;
}

function set<V = string>(obj: RecursiveRecord<V>, path: string, value: V): void {
    const pathParts = path.split('.');
    let pathValue = obj;
    for (let i = 0; i < pathParts.length - 1; i++) {
        const part = pathParts[i];
        pathValue[part] = pathValue[part] || {};
        pathValue = pathValue[part] as RecursiveRecord<V>;
    }
    pathValue[pathParts[pathParts.length - 1]] = value;
}

/**
 * Converts a flat object to a hierarchy object
 * in source object { 'key1.key2': value } will be converted to { key1: { key2: value } }
 *
 * @param source
 */
export function loadJson(source: Partial<Record<FdLanguageKeyIdentifier, string>>): FdLanguage {
    const result = {};
    Object.entries(source).forEach(([key, value]) => {
        set(result, key, value);
    });
    return result as FdLanguage;
}

/**
 * Converts a flat object to a hierarchy object
 * in source object { 'key1.key2': value } will be converted to { key1: { key2: value } }
 *
 * @param source
 */
export function flatToHierarchy(source: Record<FdLanguageKeyIdentifier, string | FdLanguageKey>): FdLanguage {
    const result = {};
    Object.entries(source).forEach(([key, value]) => {
        set<string | FdLanguageKey>(result, key, value);
    });
    return result as FdLanguage;
}
