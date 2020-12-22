export function getNestedValue(key: string, object: any): any {
    return key.split('.').reduce((a, b) => a[b], object);
}

export function getObjectValues<T, K extends keyof T>(object: T): T[K][] {
    return (Object.keys(object) as K[]).map((key: K) => object[key]);
}
