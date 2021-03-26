export function getNestedValue(key: string, object: any): any {
    return key
        .split('.')
        .reduce((a, b, i, arr) => {
            // Break loop if we cannot dive inside
            if (!a[b]) {
                // Mutating original array will break reduce
                arr.pop();
            }

            return (a = a[b]);
        }, object);
}
