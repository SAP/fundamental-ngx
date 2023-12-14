export interface RecursiveRecord<V = string> {
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
export function loadJson(source: Partial<Record<string, string>>): Record<string, any> {
    const result = {};
    Object.entries(source).forEach(([key, value]) => {
        set(result, key, value);
    });
    return result;
}
