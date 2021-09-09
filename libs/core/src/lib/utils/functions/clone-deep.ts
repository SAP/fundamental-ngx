export function cloneDeep(value: any): any {
    if (!value || typeof value !== 'object') {
        return value;
    }

    const newObj = Array.isArray(value) ? [] : {};
    for (const key in value) {
        if (value.hasOwnProperty(key)) {
            const buffer = value[key];
            newObj[key] = (buffer !== null && typeof buffer === 'object')
                ? cloneDeep(buffer)
                : buffer;
        }
    }

    return newObj;
}
