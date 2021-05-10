/**
 * Deep copy of an object
 * @param object to copy deeply
 * @returns copied object
 */
export const deepCopy = function deepCopy<T>(object: T): T {
    return JSON.parse(JSON.stringify(object));
};
