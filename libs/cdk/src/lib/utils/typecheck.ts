import { Observable } from 'rxjs';

/**
 * Helper function check whether passed data is a JS object (including function).
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isJsObject(obj: any): obj is object | Function {
    return obj !== null && (typeof obj === 'function' || typeof obj === 'object');
}

/**
 * Helper function checks whether passed value is not empty.
 */
export function isPresent(obj: any): boolean {
    return obj !== undefined && obj !== null;
}

/**
 * Helper function check whether passed value is empty.
 */
export function isBlank(obj: any): obj is undefined | null {
    return obj === undefined || obj === null;
}

/**
 * Helper function checks whether passed value is a boolean.
 */
export function isBoolean(obj: any): obj is boolean {
    return typeof obj === 'boolean';
}

/**
 * Helper function checks whether passed value is a valid number.
 */
export function isNumber(obj: any): obj is number {
    return typeof obj === 'number';
}

/**
 * Helper function checks whether passed value is a string.
 */
export function isString(obj: any): obj is string {
    return typeof obj === 'string';
}

/**
 * Helper function checks whether passed value is a function
 */
export function isFunction(obj: any): boolean {
    return typeof obj === 'function';
}

/** @hidden */
// eslint-disable-next-line @typescript-eslint/ban-types
export function isType(obj: any): obj is Function {
    return isFunction(obj);
}

/**
 * Helper function checks whether passed value is a record of `T` values.
 */
export function isStringMap<T = any>(obj: any): obj is Record<string, T> {
    return typeof obj === 'object' && obj !== null;
}

/**
 * Helper function checks whether passed value is an `object`.
 */
export function isObject<T>(item: T): boolean {
    return typeof item === 'object' && !Array.isArray(item) && item !== null;
}

/**
 * Helper function checks whether passed value is a promise.
 */
export function isPromise<T = any>(obj: any): obj is Promise<T> {
    // allow any Promise/A+ compliant thenable.
    // It's up to the caller to ensure that obj.then conforms to the spec
    return !!obj && isFunction(obj.then);
}

/**
 * Helper function checks whether passed value is an Observable/Subscribable.
 */
export function isSubscribable<T = any>(obj: any | Observable<T>): obj is Observable<T> {
    return !!obj && isFunction(obj.subscribe);
}
