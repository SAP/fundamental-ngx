import { isObject } from './lang';

/**
 * @description Deep merge two objects.
 * @param target
 * @param ...sources
 */
export function mergeDeep(target: any, ...sources: any[]): any {
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
