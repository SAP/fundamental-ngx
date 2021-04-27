import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { DateLocale, MonthLocaleType } from './datetime-formats';

export function monthLocale(type: MonthLocaleType = 'long'): OperatorFunction<DateLocale, string[]> {
    return map((dateLocale: DateLocale) => {
        switch (type) {
            case 'narrow':
                return dateLocale.narrowMonths;
            case 'short':
                return dateLocale.shortMonths;
            case 'long':
            default:
                return dateLocale.longMonths;
        }
    })
}

export function daysOfWeekLocale(type: MonthLocaleType = 'long'): OperatorFunction<DateLocale, string[]> {
    return map((dateLocale: DateLocale) => {
        switch (type) {
            case 'narrow':
                return dateLocale.narrowDaysOfWeek;
            case 'short':
                return dateLocale.shortDaysOfWeek;
            case 'long':
            default:
                return dateLocale.longDaysOfWeek;
        }
    })

}

export function monthNameByIndex(monthIndex: number): OperatorFunction<string[], string> {
    return map((monthData: string[]) => monthData[monthIndex]);
}
