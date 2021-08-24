import { DatePickerPo } from '../../pages/date-picker.po'
const {
    altCalendarItem
} = new DatePickerPo();
import {
    getElementArrayLength,
    getElementClass,
} from '../../../driver/wdio';

const date = new Date();
export const currentYear = date.getFullYear();
export let currentDay = date.getDate();
export const currentMonth = date.getMonth() + 1;
export const invalidDate = '99/99/9999';

export function getCurrentMonth(withZero: boolean): string {
    if (withZero) {
        // need to check that month is less than 10 to return with 0, cz not needed to return 010 e.g.
        if ((date.getMonth() + 1) < 10) {
            return '0' + (date.getMonth() + 1).toString();
        }
        if ((date.getMonth() + 1) >= 10) {
            return (date.getMonth() + 1).toString();
        }

    }
    if (!withZero) {
        return (date.getMonth() + 1).toString();
    }

}

export function getNextDay(withZero: boolean): string {
    if (withZero) {
        // need to check that day number is less than 10 to return with 0, cz not needed to return 010 e.g.
        if ((date.getDate() + 1) < 10) {
            return '0' + (date.getDate() + 1).toString();
        }
        if ((date.getDate() + 1) >= 10) {
            return (date.getDate() + 1).toString();
        }

    }
    if (!withZero) {
        return (date.getDate() + 1).toString();
    }

}

export function getCurrentItemIndex(): number {
    for (let i = 0; i < getElementArrayLength(altCalendarItem) - 1; i++) {
        if (getElementClass(altCalendarItem, i).includes('is-active')) {
            return i;
        }
    }
}
