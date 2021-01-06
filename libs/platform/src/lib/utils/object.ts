export function getNestedValue(key: string, object: any): any {
    return key.split('.').reduce((a, b) => a[b], object);
}
