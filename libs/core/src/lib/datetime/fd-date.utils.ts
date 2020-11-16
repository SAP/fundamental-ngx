export function range<T>(length: number, mapFn: (index: number) => T): T[] {
    return Array.from(new Array(length)).map((_, index) => mapFn(index));
}

/** Adds 0 if number is less then 10 */
export function _2digit(value: number): string {
    return ('00' + value).slice(-2);
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
        [fdDate.year, _2digit(fdDate.month), _2digit(fdDate.day)].join('-'),
        'T',
        [_2digit(fdDate.hour), _2digit(fdDate.minute), _2digit(fdDate.second)].join(':')
    ].join('');
}
