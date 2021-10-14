import { Observable } from 'rxjs';

export function objectValues(obj: any): any[] {
    return Object.keys(obj).map((key) => obj[key]);
}

export function objectToName(target: any): string {
    if (isBlank(target) || (!isStringMap(target) && !isType(target))) {
        throw new Error(' Cannot convert. Uknown object');
    }

    return isType(target) ? target.prototype.constructor.name : target.constructor.name;
}

export function isJsObject(o: any): boolean {
    return o !== null && (typeof o === 'function' || typeof o === 'object');
}

export function isPresent(obj: any): boolean {
    return obj !== undefined && obj !== null;
}

export function isBlank(obj: any): boolean {
    return obj === undefined || obj === null;
}

export function isBoolean(obj: any): boolean {
    return typeof obj === 'boolean';
}

export function isNumber(obj: any): boolean {
    return typeof obj === 'number';
}

export function isString(obj: any): obj is string {
    return typeof obj === 'string';
}

export function isFunction(obj: any): boolean {
    return typeof obj === 'function';
}

export function isType(obj: any): boolean {
    return isFunction(obj);
}

export function isStringMap(obj: any): obj is Object {
    return typeof obj === 'object' && obj !== null;
}

export function isObject<T>(item: T): boolean {
    return typeof item === 'object' && !Array.isArray(item) && item !== null;
}

export function isPromise<T = any>(obj: any): obj is Promise<T> {
    // allow any Promise/A+ compliant thenable.
    // It's up to the caller to ensure that obj.then conforms to the spec
    return !!obj && isFunction(obj.then);
}

export function isSubscribable(obj: any | Observable<any>): obj is Observable<any> {
    return !!obj && isFunction(obj.subscribe);
}
