/**
 * Deep freeze
 * @param object to freeze
 * @returns frozen object
 */
export const deepFreeze = function deepFreeze<T>(object: T): T {
    Object.freeze(object);
    if (object === undefined) {
        return object;
    }

    Object.getOwnPropertyNames(object).forEach((prop) => {
        if (
            object[prop] !== null &&
            (typeof object[prop] === 'object' || typeof object[prop] === 'function') &&
            !Object.isFrozen(object[prop])
        ) {
            deepFreeze(object[prop]);
        }
    });

    return object;
};
