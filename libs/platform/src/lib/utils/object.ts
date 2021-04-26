export function getNestedValue(key: string, object: any): any {
    const path = key.split('.');
    const pathLength = path.length;
    let index = 0;

    while (object != null && index < pathLength) {
        object = object[path[index++]];
    }

    return index && index === pathLength ? object : undefined;
}
