export function getNestedValue(key: string, object: any): any {
    return key
        .split('.')
        .reduce((a, b, i, arr) => {
            // Break loop if we cannot dive inside
            if (!a[b]) {
                arr.splice(1);
            }

            return (a = a[b])
        }, object);
}
