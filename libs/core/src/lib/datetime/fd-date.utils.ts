export function range<T>(length: number, mapFn: (index: number) => T): T[] {
    return Array.from(new Array(length)).map((_, index) => mapFn(index));
}

/** Adds 0 if number is less then 10 */
export function _leftPad(n: number): string {
    return n === n % 10 ? `0${n}` : `${n}`;
}

export function toIso8601(fdDate: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    second: number;
}): string {
    return [
        [fdDate.year, _leftPad(fdDate.month), _leftPad(fdDate.day)].join('-'),
        'T',
        [_leftPad(fdDate.hour), _leftPad(fdDate.minute), _leftPad(fdDate.second)].join(':')
    ].join('');
}
