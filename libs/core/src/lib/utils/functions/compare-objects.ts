/** Function used for object comparision
 * source: https://stackoverflow.com/a/1144249/8245136
 * */
export function compareObjects(obj1: any, obj2: any): boolean {
    const leftChain = [];
    const rightChain = [];

    // remember that NaN === NaN returns false
    // and isNaN(undefined) returns true
    if (isNaN(obj1) && isNaN(obj2) && typeof obj1 === 'number' && typeof obj2 === 'number') {
        return true;
    }

    // Compare primitives and functions.
    // Check if both arguments link to the same object.
    // Especially useful on the step where we compare prototypes
    if (obj1 === obj2) {
        return true;
    }

    // Works in case when functions are created in constructor.
    // Comparing dates is a common scenario. Another built-ins?
    // We can even handle functions passed across iframes
    if (
        (typeof obj1 === 'function' && typeof obj2 === 'function') ||
        (obj1 instanceof Date && obj2 instanceof Date) ||
        (obj1 instanceof RegExp && obj2 instanceof RegExp) ||
        (obj1 instanceof String && obj2 instanceof String) ||
        (obj1 instanceof Number && obj2 instanceof Number)
    ) {
        return obj1.toString() === obj2.toString();
    }

    // At last checking prototypes as good as we can
    if (!(obj1 instanceof Object && obj2 instanceof Object)) {
        return false;
    }

    if (Object.prototype.isPrototypeOf.call(obj1, obj2) || Object.prototype.isPrototypeOf.call(obj2, obj1)) {
        return false;
    }

    if (obj1.constructor !== obj2.constructor) {
        return false;
    }

    if (obj1.prototype !== obj2.prototype) {
        return false;
    }

    // Check for infinitive linking loops
    if (leftChain.indexOf(obj1) > -1 || rightChain.indexOf(obj2) > -1) {
        return false;
    }

    // Quick checking of one object being a subset of another.
    for (const p in obj2) {
        if (Object.prototype.hasOwnProperty.call(obj2, p) !== Object.prototype.hasOwnProperty.call(obj1, p)) {
            return false;
        } else if (typeof obj2[p] !== typeof obj1[p]) {
            return false;
        }
    }

    for (const p of Object.keys(obj1)) {
        if (Object.prototype.hasOwnProperty.call(obj2, p) !== Object.prototype.hasOwnProperty.call(obj1, p)) {
            return false;
        } else if (typeof obj2[p] !== typeof obj1[p]) {
            return false;
        }

        switch (typeof obj1[p]) {
            case 'object':
            case 'function':
                leftChain.push(obj1);
                rightChain.push(obj2);

                if (!compareObjects(obj1[p], obj2[p])) {
                    return false;
                }

                leftChain.pop();
                rightChain.pop();
                break;

            default:
                if (obj1[p] !== obj2[p]) {
                    return false;
                }
                break;
        }
    }

    return true;
}
