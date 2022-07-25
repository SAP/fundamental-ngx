export function pxToNum(stringValue: string): number {
    const numberValue = Number(stringValue.replace(/px/g, ''));
    return isNaN(numberValue) ? 0 : numberValue;
}
