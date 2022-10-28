/** Generate range of given lengths using given function. */
export function range<T>(length: number, mapFn: (index: number) => T): T[] {
    return Array.from(new Array(length)).map((_, index) => mapFn(index));
}

/** Adds 0 if number is less then 10 */
export function _leftPad(n: number): string {
    return n === n % 10 ? `0${n}` : `${n}`;
}

/** Converts date to ISO8601 */
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

/**
 * @param year e.g. 2020
 * @param month 1 = January, 12 = December
 * @param day 1 - 31
 * @param hour 0 - 23
 * @param minute 0 - 59
 * @param second 0 - 59
 */
export function isValidByParams(params: {
    year: number;
    month: number;
    day?: number;
    hour?: number;
    minute?: number;
    second?: number;
}): boolean {
    const { year, month, day, hour, minute, second } = params;
    if (
        !undefinedOrInRange(month, 1, 12) ||
        !undefinedOrInRange(day, 1, 31) ||
        !undefinedOrInRange(hour, 0, 23) ||
        !undefinedOrInRange(minute, 0, 59) ||
        !undefinedOrInRange(second, 0, 59)
    ) {
        return false;
    }
    if (!isNaN(year) && !isNaN(month) && day != null && !isNaN(day)) {
        const tempDate = new Date(year, month - 1, day);
        if (tempDate.getMonth() + 1 !== month) {
            return false;
        }
    }
    const date = new Date(year, month - 1, day, hour, minute, second);
    return !Number.isNaN(date.getTime());
}

function undefinedOrInRange(value: number | undefined, from: number, to: number): boolean {
    return value == null || (value >= from && value <= to);
}
