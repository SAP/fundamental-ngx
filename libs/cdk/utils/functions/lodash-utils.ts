/**
 * Utility functions to replace lodash-es functionality with native JavaScript.
 */

/**
 * Gets the value at path of object. If the resolved value is undefined, the defaultValue is returned.
 * @param obj The object to query
 * @param path The path of the property to get
 * @param defaultValue The value returned if the resolved value is undefined
 * @returns The resolved value
 */
export function get<TDefault = undefined>(
    obj: any,
    path: string | string[],
    defaultValue?: TDefault
): TDefault extends undefined ? any : TDefault {
    if (obj == null) {
        return defaultValue as any;
    }

    const pathArray = Array.isArray(path) ? path : path.split('.');
    let result: any = obj;

    for (const key of pathArray) {
        if (result == null) {
            return defaultValue as any;
        }
        result = result[key];
    }

    return (result === undefined ? defaultValue : result) as any;
}

/**
 * Sets the value at path of object. If a portion of path doesn't exist, it's created.
 * @param obj The object to modify
 * @param path The path of the property to set
 * @param value The value to set
 * @returns The object
 */
export function set<T = any>(obj: T, path: string | string[], value: any): T {
    const pathArray = Array.isArray(path) ? path : path.split('.');
    const lastIndex = pathArray.length - 1;
    let current: any = obj;

    for (let i = 0; i < lastIndex; i++) {
        const key = pathArray[i];
        if (!(key in current) || current[key] == null) {
            current[key] = {};
        }
        current = current[key];
    }

    current[pathArray[lastIndex]] = value;
    return obj;
}

/**
 * Deep clones an object, handling functions and other non-cloneable values.
 * For objects with functions or class instances, it creates a new object and copies properties.
 * @param obj The object to clone
 * @returns The cloned object
 */
export function cloneDeep<T>(obj: T): T {
    // Handle primitives, null, and undefined
    if (obj == null || typeof obj !== 'object') {
        return obj;
    }

    // Handle Date
    if (obj instanceof Date) {
        return new Date(obj.getTime()) as any;
    }

    // Handle Array
    if (Array.isArray(obj)) {
        return obj.map((item) => cloneDeep(item)) as any;
    }

    // Handle RegExp
    if (obj instanceof RegExp) {
        return new RegExp(obj.source, obj.flags) as any;
    }

    // Handle Map
    if (obj instanceof Map) {
        const clonedMap = new Map();
        obj.forEach((value, key) => {
            clonedMap.set(cloneDeep(key), cloneDeep(value));
        });
        return clonedMap as any;
    }

    // Handle Set
    if (obj instanceof Set) {
        const clonedSet = new Set();
        obj.forEach((value) => {
            clonedSet.add(cloneDeep(value));
        });
        return clonedSet as any;
    }

    // Handle plain objects
    const clonedObj = {} as T;
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];
            // Functions and symbols are copied by reference, not cloned
            if (typeof value === 'function' || typeof value === 'symbol') {
                (clonedObj as any)[key] = value;
            } else {
                (clonedObj as any)[key] = cloneDeep(value);
            }
        }
    }

    return clonedObj;
}

/**
 * Deep merges two or more objects, with properties from source objects overwriting those in the target.
 * @param target The target object
 * @param sources The source objects
 * @returns The merged object
 */
export function merge<T>(target: T, ...sources: Partial<T>[]): T {
    // Handle null or undefined target
    if (target == null) {
        target = {} as T;
    }

    const result = cloneDeep(target);

    for (const source of sources) {
        if (source != null) {
            deepMergeInto(result, source);
        }
    }

    return result;
}

/**
 * Helper function for deep merge
 */
function deepMergeInto<T>(target: T, source: Partial<T>): void {
    // Handle null or undefined target
    if (target == null) {
        return;
    }

    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            const sourceValue = source[key];
            const targetValue = target[key];

            // Handle functions and primitives - copy by reference
            if (typeof sourceValue === 'function' || typeof sourceValue !== 'object' || sourceValue === null) {
                (target as any)[key] = sourceValue;
            } else if (Array.isArray(sourceValue)) {
                // Clone arrays
                (target as any)[key] = cloneDeep(sourceValue);
            } else if (
                sourceValue instanceof Date ||
                sourceValue instanceof RegExp ||
                sourceValue instanceof Map ||
                sourceValue instanceof Set
            ) {
                // Clone special objects
                (target as any)[key] = cloneDeep(sourceValue);
            } else if (targetValue && typeof targetValue === 'object' && !Array.isArray(targetValue)) {
                // Recursively merge plain objects
                deepMergeInto(targetValue, sourceValue as any);
            } else {
                // Clone plain objects
                (target as any)[key] = cloneDeep(sourceValue);
            }
        }
    }
}

/**
 * Merges two objects with a customizer function.
 * @param target The target object
 * @param source The source object
 * @param customizer The function to customize assigned values
 * @returns The merged object
 */
export function mergeWith<T>(
    target: T,
    source: Partial<T>,
    customizer: (targetValue: any, sourceValue: any, key: string) => any
): T {
    // Handle null or undefined target
    if (target == null) {
        target = {} as T;
    }

    const result = cloneDeep(target);

    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            const sourceValue = source[key];
            const targetValue = result[key];
            const customValue = customizer(targetValue, sourceValue, key);

            if (customValue !== undefined) {
                (result as any)[key] = customValue;
            } else if (sourceValue && typeof sourceValue === 'object' && !Array.isArray(sourceValue)) {
                if (targetValue && typeof targetValue === 'object' && !Array.isArray(targetValue)) {
                    (result as any)[key] = mergeWith(targetValue, sourceValue as any, customizer);
                } else {
                    (result as any)[key] = cloneDeep(sourceValue);
                }
            } else {
                (result as any)[key] = cloneDeep(sourceValue);
            }
        }
    }

    return result;
}

/**
 * Creates an array of unique values from the given array.
 * @param array The array to inspect
 * @returns The new array of unique values
 */
export function uniq<T>(array: T[]): T[] {
    return Array.from(new Set(array));
}

/**
 * Creates an array of unique values from an array based on a property.
 * @param array The array to inspect
 * @param iteratee The iteratee invoked per element
 * @returns The new duplicate free array
 */
export function uniqBy<T>(array: T[], iteratee: ((item: T) => any) | string): T[] {
    const seen = new Set();
    const result: T[] = [];
    const getter = typeof iteratee === 'function' ? iteratee : (item: T) => get(item, iteratee);

    for (const item of array) {
        const key = getter(item);
        if (!seen.has(key)) {
            seen.add(key);
            result.push(item);
        }
    }

    return result;
}

/**
 * Flattens an array a single level deep.
 * @param array The array to flatten
 * @returns The new flattened array
 */
export function flatten<T>(array: T[][]): T[] {
    return array.flat();
}

/**
 * Creates an object composed of keys generated from the results of running each element through iteratee.
 * The corresponding value of each key is the number of times the key was returned by iteratee.
 * @param array The array to iterate over
 * @param iteratee The iteratee to transform keys
 * @returns The composed aggregate object
 */
export function countBy<T>(array: T[], iteratee: ((item: T) => any) | string): Record<string, number> {
    const result: Record<string, number> = {};
    const getter = typeof iteratee === 'function' ? iteratee : (item: T) => get(item, iteratee);

    for (const item of array) {
        const key = String(getter(item));
        result[key] = (result[key] || 0) + 1;
    }

    return result;
}

/**
 * Concatenates arrays.
 * @param arrays The arrays to concatenate
 * @returns The new concatenated array
 */
export function concat<T>(...arrays: (T | T[])[]): T[] {
    return ([] as T[]).concat(...arrays);
}

/**
 * Escapes HTML characters in a string.
 * Converts characters like <, >, &, ", and ' to their HTML entity equivalents.
 * @param str The string to escape
 * @returns The escaped string
 */
export function escape(str: string): string {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}
