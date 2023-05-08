import { DatePickerPo } from './date-picker.po';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { getElementArrayLength, getElementClass } from '../../../../../e2e';

const { altCalendarItem } = new DatePickerPo();

const date = new Date();
export const currentYear = date.getFullYear();
export const currentDay = date.getDate();
export const currentMonth = date.getMonth() + 1;
export const invalidDate = '99/99/9999';

export function getCurrentMonth(withZero: boolean): string {
    if (withZero) {
        // need to check that month is less than 10 to return with 0, cz not needed to return 010 e.g.
        if (date.getMonth() + 1 < 10) {
            return '0' + (date.getMonth() + 1).toString();
        }
        if (date.getMonth() + 1 >= 10) {
            return (date.getMonth() + 1).toString();
        }
    }
    if (!withZero) {
        return (date.getMonth() + 1).toString();
    }

    return '';
}

export function getNextDay(withZero: boolean): string {
    if (withZero) {
        // need to check that day number is less than 10 to return with 0, cz not needed to return 010 e.g.
        if (date.getDate() < 9) {
            return '0' + (date.getDate() + 1).toString();
        }
        if (date.getDate() >= 9) {
            return (date.getDate() + 1).toString();
        }
    }
    if (!withZero) {
        return (date.getDate() + 1).toString();
    }

    return '';
}

export async function getCurrentItemIndex(): Promise<number> {
    for (let i = 0; i < (await getElementArrayLength(altCalendarItem)); i++) {
        if ((await getElementClass(altCalendarItem, i)).includes('is-active')) {
            return i;
        }
    }

    return -1;
}
