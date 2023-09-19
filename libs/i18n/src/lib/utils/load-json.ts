import { FdLanguage } from '../models/lang';

interface RecursiveRecord {
    [key: string]: string | RecursiveRecord;
}

const set = (obj: RecursiveRecord, path: string, value: string): void => {
    const pathParts = path.split('.');
    let pathValue = obj;
    for (let i = 0; i < pathParts.length - 1; i++) {
        const part = pathParts[i];
        pathValue[part] = pathValue[part] || {};
        pathValue = pathValue[part] as RecursiveRecord;
    }
    pathValue[pathParts[pathParts.length - 1]] = value;
};

/**
 * Converts a flat object to a hierarchy object
 * in source object { 'key1.key2': value } will be converted to { key1: { key2: value } }
 *
 * @param source
 */
export function loadJson(source: Record<string, any>): FdLanguage {
    const result = {};
    Object.entries(source).forEach(([key, value]) => {
        set(result, key, value);
    });
    return result as FdLanguage;
}
