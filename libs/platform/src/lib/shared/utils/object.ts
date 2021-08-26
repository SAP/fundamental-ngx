import { isObject } from './lang';

export function getNestedValue(key: string, object: any): any {
    const path = key.split('.');
    const pathLength = path.length;
    let index = 0;

    while (object != null && index < pathLength) {
        object = object[path[index++]];
    }

    return index && index === pathLength ? object : undefined;
}

/**
 * @description Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function mergeDeep(target: Object, ...sources: Object[]): Object {
    if (!sources.length) {
        return target;
    }
    const source = sources.shift();

    if (isObject(target) && isObject(source)) {
        for (const key in source) {
            if (isObject(source[key])) {
                if (!target[key]) {
                    Object.assign(target, { [key]: {} });
                }
                mergeDeep(target[key], source[key]);
            } else if (Array.isArray(source[key]) && Array.isArray(target[key])) {
                Object.assign(target, { [key]: [...new Set([...target[key], ...source[key]])] });
            } else {
                Object.assign(target, { [key]: source[key] });
            }
        }
    }

    return mergeDeep(target, ...sources);
}
