import { FdDate } from '../calendar/models/fd-date';
import { DateTimeFormatParsers } from './date-time-format-parsers';
import { TimeObject } from '../time/time-object';

describe('DateParsersWithFormat', () => {

    const date: FdDate = new FdDate(2019, 9, 7);
    const time: TimeObject = {hour: 12, minute: 23, second: 34};

    it('Should Work For "dd-mm-yyyy"', () => {
        const dateFormat = 'dd-mm-yyyy';
        expect(DateTimeFormatParsers.isDateFormatValid(dateFormat)).toBeTruthy();
        const dateString = DateTimeFormatParsers.formatDateWithDateFormat(date, dateFormat);
        expect(dateString).toBe('07-09-2019');
        expect(DateTimeFormatParsers.parseDateWithDateFormat(dateString, dateFormat)).toEqual(date);
    });

    it('Should Work For "mm-dd-yyyy"', () => {
        const dateFormat = 'mm-dd-yyyy';
        expect(DateTimeFormatParsers.isDateFormatValid(dateFormat)).toBeTruthy();
        const dateString = DateTimeFormatParsers.formatDateWithDateFormat(date, dateFormat);
        expect(dateString).toBe('09-07-2019');
        expect(DateTimeFormatParsers.parseDateWithDateFormat(dateString, dateFormat)).toEqual(date);
    });

    it('Should Work For "yyyy-dd-mm"', () => {
        const dateFormat = 'yyyy-dd-mm';
        expect(DateTimeFormatParsers.isDateFormatValid(dateFormat)).toBeTruthy();
        const dateString = DateTimeFormatParsers.formatDateWithDateFormat(date, dateFormat);
        expect(dateString).toBe('2019-07-09');
        expect(DateTimeFormatParsers.parseDateWithDateFormat(dateString, dateFormat)).toEqual(date);
    });

    it('Should Work For "yyyy-d-m"', () => {
        const dateFormat = 'yyyy-d-m';
        expect(DateTimeFormatParsers.isDateFormatValid(dateFormat)).toBeTruthy();
        const dateString = DateTimeFormatParsers.formatDateWithDateFormat(date, dateFormat);
        expect(dateString).toBe('2019-7-9');
        expect(DateTimeFormatParsers.parseDateWithDateFormat(dateString, dateFormat)).toEqual(date);
    });

    it('Should Work For "yyyy/d/m"', () => {
        const dateFormat = 'yyyy/d/m';
        expect(DateTimeFormatParsers.isDateFormatValid(dateFormat)).toBeTruthy();
        const dateString = DateTimeFormatParsers.formatDateWithDateFormat(date, dateFormat);
        expect(dateString).toBe('2019/7/9');
        expect(DateTimeFormatParsers.parseDateWithDateFormat(dateString, dateFormat)).toEqual(date);
    });

    it('Should Work For "yyyy/dd/mm"', () => {
        const dateFormat = 'yyyy/dd/mm';
        expect(DateTimeFormatParsers.isDateFormatValid(dateFormat)).toBeTruthy();
        const dateString = DateTimeFormatParsers.formatDateWithDateFormat(date, dateFormat);
        expect(dateString).toBe('2019/07/09');
        expect(DateTimeFormatParsers.parseDateWithDateFormat(dateString, dateFormat)).toEqual(date);
    });

    it('Should not Work For Invalid Format dasdasda', () => {
        const dateFormat = 'dsadasda';
        expect(DateTimeFormatParsers.isDateFormatValid(dateFormat)).not.toBeTruthy();
    });

    it('Should not Work For Invalid Format dddddmmmmmmyyyyyyyy', () => {
        const dateFormat = 'dddddmmmmmmyyyyyy';
        expect(DateTimeFormatParsers.isDateFormatValid(dateFormat)).not.toBeTruthy();
    });

    it('Should work for "HH:MM:SS"', () => {
        const timeFormat = 'HH:MM:SS';
        const timeString = DateTimeFormatParsers.formatTimeWithTimeFormat(time, timeFormat);
        expect(timeString).toBe('12:23:34');
    });

    it('Should work for "MM:HH:SS"', () => {
        const timeFormat = 'MM:HH:SS';
        const timeString = DateTimeFormatParsers.formatTimeWithTimeFormat(time, timeFormat);
        expect(timeString).toBe('23:12:34');
    });

    it('Should work for "HH:MM"', () => {
        const timeFormat = 'HH:MM';
        const timeString = DateTimeFormatParsers.formatTimeWithTimeFormat(time, timeFormat);
        expect(timeString).toBe('12:23');
    });

    it('Should work for "HH"', () => {
        const timeFormat = 'HH';
        const timeString = DateTimeFormatParsers.formatTimeWithTimeFormat(time, timeFormat);
        expect(timeString).toBe('12');
    });
});
