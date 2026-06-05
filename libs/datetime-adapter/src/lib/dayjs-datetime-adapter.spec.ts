import { Platform } from '@angular/cdk/platform';
import { Injector, LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import dayjs from 'dayjs';

import { DATE_TIME_FORMATS, DatetimeAdapter } from '@fundamental-ngx/core/datetime';

import { DAYJS_DATE_TIME_ADAPTER_OPTIONS, DayjsDatetimeAdapter } from './dayjs-datetime-adapter';
import { DayjsDatetimeAdapterModule, provideDayjsDatetimeAdapter } from './dayjs-datetime-adapter.module';
import { DAYJS_DATETIME_FORMATS } from './dayjs-datetime-formats';

// preload locales that are used in tests
import 'dayjs/locale/ar-ma';
import 'dayjs/locale/da';
import 'dayjs/locale/de';
import 'dayjs/locale/fr';
import 'dayjs/locale/ja';

export const JAN = 0,
    FEB = 1,
    MAR = 2,
    APR = 3,
    MAY = 4,
    JUN = 5,
    JUL = 6,
    AUG = 7,
    SEP = 8,
    OCT = 9,
    NOV = 10,
    DEC = 11;

describe('DayjsDatetimeAdapter', () => {
    let platform: Platform;
    let adapter: DayjsDatetimeAdapter;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideDayjsDatetimeAdapter()]
        });
    });

    beforeEach(() => {
        adapter = TestBed.inject(DatetimeAdapter) as DayjsDatetimeAdapter;
        platform = TestBed.inject(Platform);
    });

    it('should get year', () => {
        expect(adapter.getYear(dayjs(new Date(2017, JAN, 1)))).toBe(2017);
    });

    it('should get month', () => {
        expect(adapter.getMonth(dayjs(new Date(2017, JAN, 1)))).toBe(1);
    });

    it('should get date', () => {
        expect(adapter.getDate(dayjs(new Date(2017, JAN, 1)))).toBe(1);
    });

    it('should get day of week', () => {
        expect(adapter.getDayOfWeek(dayjs(new Date(2017, JAN, 1)))).toBe(1);
    });

    it('should get long month names', () => {
        expect(adapter.getMonthNames('long')).toEqual([
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ]);
    });

    it('should get short month names', () => {
        expect(adapter.getMonthNames('short')).toEqual([
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ]);
    });

    it('should get narrow month names', () => {
        // Edge & IE use same value for short and narrow.
        if (platform.EDGE || platform.TRIDENT) {
            expect(adapter.getMonthNames('narrow')).toEqual([
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ]);
        } else {
            expect(adapter.getMonthNames('narrow')).toEqual([
                'J',
                'F',
                'M',
                'A',
                'M',
                'J',
                'J',
                'A',
                'S',
                'O',
                'N',
                'D'
            ]);
        }
    });

    it('should get month names in a different locale', () => {
        adapter.setLocale('ja');
        expect(adapter.getMonthNames('long')).toEqual([
            '1月',
            '2月',
            '3月',
            '4月',
            '5月',
            '6月',
            '7月',
            '8月',
            '9月',
            '10月',
            '11月',
            '12月'
        ]);
    });

    it('should get date names', () => {
        expect(adapter.getDateNames()).toEqual([
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
            '19',
            '20',
            '21',
            '22',
            '23',
            '24',
            '25',
            '26',
            '27',
            '28',
            '29',
            '30',
            '31'
        ]);
    });

    it('should get long day of week names', () => {
        expect(adapter.getDayOfWeekNames('long')).toEqual([
            'Sunday',
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday'
        ]);
    });

    it('should get short day of week names', () => {
        expect(adapter.getDayOfWeekNames('short')).toEqual(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
    });

    it('should get narrow day of week names', () => {
        expect(adapter.getDayOfWeekNames('narrow')).toEqual(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']);
    });

    it('should get day of week names in a different locale', () => {
        adapter.setLocale('ja');
        expect(adapter.getDayOfWeekNames('long')).toEqual([
            '日曜日',
            '月曜日',
            '火曜日',
            '水曜日',
            '木曜日',
            '金曜日',
            '土曜日'
        ]);
    });

    it('should get year name', () => {
        expect(adapter.getYearName(dayjs(new Date(2017, JAN, 1)))).toBe('2017');
    });

    it('should get first day of week', () => {
        expect(adapter.getFirstDayOfWeek()).toBe(0);
    });

    // Gap D: getFirstDayOfWeek() should respect locale (fr starts on Monday)
    it('should return locale-aware first day of week for French locale', () => {
        adapter.setLocale('fr');
        // In France, weeks start on Monday (1)
        expect(adapter.getFirstDayOfWeek()).toBe(1);
    });

    it('should create Date', () => {
        expect(adapter.createDate(2017, JAN + 1, 1).format()).toEqual(dayjs(new Date(2017, JAN, 1)).format());
    });

    it('should get year name for low year numbers', () => {
        const createAndFormat = (year: number): string => adapter.getYearName(adapter.createDate(year, JAN + 1, 1));

        expect(createAndFormat(50)).toEqual('1950');
        expect(createAndFormat(99)).toEqual('1999');
        expect(createAndFormat(100)).toEqual('0100');
    });

    it('should create Date with low year number', () => {
        expect(adapter.createDate(-1, JAN + 1, 1).year()).toBe(-1);
        expect(adapter.createDate(0, JAN + 1, 1).year()).toBe(1900);
        expect(adapter.createDate(50, JAN + 1, 1).year()).toBe(1950);
        expect(adapter.createDate(99, JAN + 1, 1).year()).toBe(1999);
        expect(adapter.createDate(100, JAN + 1, 1).year()).toBe(100);
    });

    it('should format Date with low year number', () => {
        const createAndFormat = (year: number): string => adapter.format(adapter.createDate(year, JAN + 1, 1), 'L');

        expect(createAndFormat(50)).toBe('01/01/1950');
        expect(createAndFormat(99)).toBe('01/01/1999');
        expect(createAndFormat(100)).toBe('01/01/0100');
    });

    it(`should get today's date`, () => {
        expect(adapter.datesEqual(adapter.today(), dayjs().startOf('day'))).toBe(true); // `should be equal to today's date`
    });

    it(`should get now date`, () => {
        expect(adapter.datesEqual(adapter.now(), dayjs())).toBe(true); // `should be equal to now date moment`
    });

    it('should parse "en" date string', () => {
        expect(adapter.parse('1/3/2017', 'M/D/YYYY')?.format()).toEqual(dayjs(new Date(2017, JAN, 3)).format());
    });

    it('should parse "en" datetime string with localized format', () => {
        adapter.setLocale('en-us');
        expect(adapter.parse('01/03/2017', 'L HH:mm:ss A')?.format()).toEqual(dayjs(new Date(2017, JAN, 3)).format());
    });

    it('should parse "en" time string', () => {
        expect(adapter.parse('10:30:00 PM', 'HH:mm:ss A')?.format()).toEqual(
            dayjs(new Date().setHours(22, 30, 0)).format()
        );
        expect(adapter.parse('10:30:00', 'HH:mm:ss')?.format()).toEqual(dayjs(new Date().setHours(10, 30, 0)).format());
    });

    it('should parse number', () => {
        const timestamp = new Date(2017, JAN, 1).getTime();
        expect(adapter.parse(timestamp)?.format()).toEqual(dayjs(new Date(2017, JAN, 1)).format());
    });

    it('should parse Date', () => {
        const date = dayjs(new Date(2017, JAN, 1));
        expect(adapter.parse(date)).toEqual(date);
        expect(adapter.parse(date)).not.toBe(date);
    });

    it('should parse invalid value as invalid', () => {
        const date = adapter.parse('hello', 'M/D/YYYY');
        expect(date).not.toBeNull();
        expect(date?.isValid()).toBe(false);
    });

    it('should format', () => {
        expect(adapter.format(dayjs(new Date(2017, JAN, 1)), 'L')).toEqual('01/01/2017');
    });

    it('should format with custom format', () => {
        expect(adapter.format(dayjs(new Date(2017, JAN, 1)), 'MMMM D, YYYY')).toEqual('January 1, 2017');
    });

    it('should format with a different locale', () => {
        adapter.setLocale('ja');
        expect(adapter.format(dayjs(new Date(2017, JAN, 1)), 'LL')).toEqual('2017年1月1日');
    });

    it('should add years', () => {
        expect(adapter.addCalendarYears(dayjs(new Date(2017, JAN, 1)), 1).format()).toEqual(
            dayjs(new Date(2018, JAN, 1)).format()
        );
        expect(adapter.addCalendarYears(dayjs(new Date(2017, JAN, 1)), -1).format()).toEqual(
            dayjs(new Date(2016, JAN, 1)).format()
        );
    });

    it('should respect leap years when adding years', () => {
        expect(adapter.addCalendarYears(dayjs(new Date(2016, FEB, 29)), 1).format()).toEqual(
            dayjs(new Date(2017, FEB, 28)).format()
        );
        expect(adapter.addCalendarYears(dayjs(new Date(2016, FEB, 29)), -1).format()).toEqual(
            dayjs(new Date(2015, FEB, 28)).format()
        );
    });

    it('should add months', () => {
        expect(adapter.addCalendarMonths(dayjs(new Date(2017, JAN, 1)), 1).format()).toEqual(
            dayjs(new Date(2017, FEB, 1)).format()
        );
        expect(adapter.addCalendarMonths(dayjs(new Date(2017, JAN, 1)), -1).format()).toEqual(
            dayjs(new Date(2016, DEC, 1)).format()
        );
    });

    it('should respect month length differences when adding months', () => {
        expect(adapter.addCalendarMonths(dayjs(new Date(2017, MAR, 31)), -1).format()).toEqual(
            dayjs(new Date(2017, FEB, 28)).format()
        );
    });

    it('should add days', () => {
        expect(adapter.addCalendarDays(dayjs(new Date(2017, JAN, 1)), 1).format()).toEqual(
            dayjs(new Date(2017, JAN, 2)).format()
        );
        expect(adapter.addCalendarDays(dayjs(new Date(2017, JAN, 1)), -1).format()).toEqual(
            dayjs(new Date(2016, DEC, 31)).format()
        );
    });

    it('should clone', () => {
        const date = dayjs(new Date(2017, JAN, 1));
        expect(adapter.clone(date)).toEqual(date);
        expect(adapter.clone(date)).not.toBe(date);
    });

    it('should preserve time when cloning', () => {
        const date = dayjs(new Date(2017, 1, 1, 4, 5, 6));
        expect(adapter.clone(date).format()).toEqual(dayjs(date).format());
        expect(adapter.clone(date)).not.toBe(date);
    });

    it('should compare dates', () => {
        expect(adapter.compareDate(dayjs(new Date(2017, JAN, 1)), dayjs(new Date(2017, JAN, 2)))).toBeLessThan(0);
        expect(adapter.compareDate(dayjs(new Date(2017, JAN, 1)), dayjs(new Date(2017, FEB, 1)))).toBeLessThan(0);
        expect(adapter.compareDate(dayjs(new Date(2017, JAN, 1)), dayjs(new Date(2018, JAN, 1)))).toBeLessThan(0);
        expect(adapter.compareDate(dayjs(new Date(2017, JAN, 1)), dayjs(new Date(2017, JAN, 1)))).toBe(0);
        expect(adapter.compareDate(dayjs(new Date(2018, JAN, 1)), dayjs(new Date(2017, JAN, 1)))).toBeGreaterThan(0);
        expect(adapter.compareDate(dayjs(new Date(2017, FEB, 1)), dayjs(new Date(2017, JAN, 1)))).toBeGreaterThan(0);
        expect(adapter.compareDate(dayjs(new Date(2017, JAN, 2)), dayjs(new Date(2017, JAN, 1)))).toBeGreaterThan(0);
    });

    it('should use UTC for formatting by default', () => {
        expect(adapter.format(dayjs(new Date(1800, 7, 14)), 'DD')).toBe('14');
    });

    it('should count today as a valid date instance', () => {
        const date = dayjs();
        expect(adapter.isValid(date)).toBe(true);
    });

    it('should count an invalid date as an invalid date instance', () => {
        const date = dayjs(NaN);
        expect(adapter.isValid(date)).toBe(false);
    });

    it('should not throw when attempting to format a date with a year less than 1', () => {
        expect(() => adapter.format(dayjs(new Date(-1, 1, 1)), '')).not.toThrow();
    });

    it('should not throw when attempting to format a date with a year greater than 9999', () => {
        expect(() => adapter.format(dayjs(new Date(10000, 1, 1)), '')).not.toThrow();
    });

    it('should get hour names 0-23 range', () => {
        expect(adapter.getHourNames({ meridian: false, twoDigit: false })).toEqual([
            '0',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
            '19',
            '20',
            '21',
            '22',
            '23'
        ]);
    });

    it('should get hour names 0-12 range', () => {
        expect(adapter.getHourNames({ meridian: true, twoDigit: false })).toEqual([
            '12',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11'
        ]);
    });

    it('should get day period names (AM / PM)', () => {
        expect(adapter.getDayPeriodNames()).toEqual(['AM', 'PM']);
    });

    it('should get day period names (AM / PM) in a different locale', async () => {
        adapter.setLocale('ar-ma');
        expect(adapter.getDayPeriodNames()).toEqual(['ص', 'م']);
    });

    it('should parse longDateFormats', () => {
        expect(adapter['_prepareFormat']('L')).toBe('MM/DD/YYYY');
        expect(adapter['_prepareFormat']('L LT')).toBe('MM/DD/YYYY h:mm A');
        expect(adapter['_prepareFormat']('L LT MMMM.D.YY hh:mm:ss')).toBe('MM/DD/YYYY h:mm A MMMM.D.YY hh:mm:ss');
        expect(adapter['_prepareFormat']('L LT randomtext')).toBe('MM/DD/YYYY h:mm A randomtext');
    });

    it('should parse longDateFormats in other locales', () => {
        adapter.setLocale('ja');
        expect(adapter['_prepareFormat']('L')).toBe('YYYY/MM/DD');
        expect(adapter['_prepareFormat']('L LT')).toBe('YYYY/MM/DD HH:mm');
        expect(adapter['_prepareFormat']('L LT MMMM.D.YY hh:mm:ss')).toBe('YYYY/MM/DD HH:mm MMMM.D.YY hh:mm:ss');
        expect(adapter['_prepareFormat']('L LT randomtext')).toBe('YYYY/MM/DD HH:mm randomtext');
        adapter.setLocale('ar-ma');
        expect(adapter['_prepareFormat']('L')).toBe('DD/MM/YYYY');
        expect(adapter['_prepareFormat']('L LT')).toBe('DD/MM/YYYY HH:mm');
        expect(adapter['_prepareFormat']('L LT MMMM.D.YY hh:mm:ss')).toBe('DD/MM/YYYY HH:mm MMMM.D.YY hh:mm:ss');
        expect(adapter['_prepareFormat']('L LT randomtext')).toBe('DD/MM/YYYY HH:mm randomtext');
    });

    // Group 1: Time Manipulation
    describe('time manipulation', () => {
        it('should get hours from a date', () => {
            const date = dayjs(new Date(2017, JAN, 1, 14, 30, 45));
            expect(adapter.getHours(date)).toBe(14);
        });

        it('should get minutes from a date', () => {
            const date = dayjs(new Date(2017, JAN, 1, 14, 30, 45));
            expect(adapter.getMinutes(date)).toBe(30);
        });

        it('should get seconds from a date', () => {
            const date = dayjs(new Date(2017, JAN, 1, 14, 30, 45));
            expect(adapter.getSeconds(date)).toBe(45);
        });

        it('should set hours and return a new date', () => {
            const date = dayjs(new Date(2017, JAN, 1, 0, 0, 0));
            const result = adapter.setHours(date, 15);
            expect(result.hour()).toBe(15);
        });

        it('should set minutes and return a new date', () => {
            const date = dayjs(new Date(2017, JAN, 1, 0, 0, 0));
            const result = adapter.setMinutes(date, 45);
            expect(result.minute()).toBe(45);
        });

        it('should set seconds and return a new date', () => {
            const date = dayjs(new Date(2017, JAN, 1, 0, 0, 0));
            const result = adapter.setSeconds(date, 30);
            expect(result.second()).toBe(30);
        });

        it('should not mutate the original date when setting time', () => {
            const date = dayjs(new Date(2017, JAN, 1, 10, 20, 30));
            adapter.setHours(date, 15);
            adapter.setMinutes(date, 45);
            adapter.setSeconds(date, 55);
            // dayjs is immutable, original should be unchanged
            expect(date.hour()).toBe(10);
            expect(date.minute()).toBe(20);
            expect(date.second()).toBe(30);
        });

        it('should set hours, minutes, and seconds at once via setTime', () => {
            const date = dayjs(new Date(2017, JAN, 1, 0, 0, 0));
            const result = adapter.setTime(date, 10, 20, 30);
            expect(adapter.getHours(result)).toBe(10);
            expect(adapter.getMinutes(result)).toBe(20);
            expect(adapter.getSeconds(result)).toBe(30);
        });

        it('should return a new date instance from setTime', () => {
            const date = dayjs(new Date(2017, JAN, 1, 0, 0, 0));
            const result = adapter.setTime(date, 10, 20, 30);
            expect(result).not.toBe(date);
        });
    });

    // Group 2: Date Equality and Comparison
    describe('date equality and comparison', () => {
        it('should return true for datesEqual when dates are the same day', () => {
            const date1 = dayjs(new Date(2017, JAN, 1));
            const date2 = dayjs(new Date(2017, JAN, 1));
            expect(adapter.datesEqual(date1, date2)).toBe(true);
        });

        it('should return true for datesEqual when same day but different time', () => {
            const date1 = dayjs(new Date(2017, JAN, 1, 10, 0, 0));
            const date2 = dayjs(new Date(2017, JAN, 1, 22, 30, 0));
            expect(adapter.datesEqual(date1, date2)).toBe(true);
        });

        it('should return false for datesEqual when dates are different days', () => {
            const date1 = dayjs(new Date(2017, JAN, 1));
            const date2 = dayjs(new Date(2017, JAN, 2));
            expect(adapter.datesEqual(date1, date2)).toBe(false);
        });

        it('should return false for datesEqual when either date is null/falsy', () => {
            const date1 = dayjs(new Date(2017, JAN, 1));
            expect(adapter.datesEqual(date1, null as any)).toBe(false);
            expect(adapter.datesEqual(null as any, date1)).toBe(false);
            expect(adapter.datesEqual(null as any, null as any)).toBe(false);
        });

        it('should return true for dateTimesEqual when date and time are identical', () => {
            const date1 = dayjs(new Date(2017, JAN, 1, 10, 30, 0));
            const date2 = dayjs(new Date(2017, JAN, 1, 10, 30, 0));
            expect(adapter.dateTimesEqual(date1, date2)).toBe(true);
        });

        it('should return false for dateTimesEqual when same date but different time', () => {
            const date1 = dayjs(new Date(2017, JAN, 1, 10, 30, 0));
            const date2 = dayjs(new Date(2017, JAN, 1, 10, 30, 1));
            expect(adapter.dateTimesEqual(date1, date2)).toBe(false);
        });

        it('should return false for dateTimesEqual when either date is null/falsy', () => {
            const date1 = dayjs(new Date(2017, JAN, 1));
            expect(adapter.dateTimesEqual(date1, null as any)).toBe(false);
            expect(adapter.dateTimesEqual(null as any, date1)).toBe(false);
        });
    });

    // Group 3: Range Checking (isBetween)
    describe('isBetween', () => {
        it('should return true when date is strictly between start and end', () => {
            const start = dayjs(new Date(2017, JAN, 1));
            const middle = dayjs(new Date(2017, JAN, 15));
            const end = dayjs(new Date(2017, JAN, 31));
            expect(adapter.isBetween(middle, start, end)).toBe(true);
        });

        it('should return false when date equals start date (exclusive boundary)', () => {
            const start = dayjs(new Date(2017, JAN, 1));
            const end = dayjs(new Date(2017, JAN, 31));
            expect(adapter.isBetween(start, start, end)).toBe(false);
        });

        it('should return false when date equals end date (exclusive boundary)', () => {
            const start = dayjs(new Date(2017, JAN, 1));
            const end = dayjs(new Date(2017, JAN, 31));
            expect(adapter.isBetween(end, start, end)).toBe(false);
        });

        it('should return false when date is before the range', () => {
            const before = dayjs(new Date(2016, DEC, 31));
            const start = dayjs(new Date(2017, JAN, 1));
            const end = dayjs(new Date(2017, JAN, 31));
            expect(adapter.isBetween(before, start, end)).toBe(false);
        });

        it('should return false when date is after the range', () => {
            const start = dayjs(new Date(2017, JAN, 1));
            const end = dayjs(new Date(2017, JAN, 31));
            const after = dayjs(new Date(2017, FEB, 1));
            expect(adapter.isBetween(after, start, end)).toBe(false);
        });

        it('should return false when any argument is null/falsy', () => {
            const date = dayjs(new Date(2017, JAN, 15));
            const start = dayjs(new Date(2017, JAN, 1));
            const end = dayjs(new Date(2017, JAN, 31));
            expect(adapter.isBetween(null as any, start, end)).toBe(false);
            expect(adapter.isBetween(date, null as any, end)).toBe(false);
            expect(adapter.isBetween(date, start, null as any)).toBe(false);
        });
    });

    // Group 4: Calendar Helpers
    describe('calendar helpers', () => {
        it('should return 31 for January', () => {
            expect(adapter.getNumDaysInMonth(dayjs(new Date(2017, JAN, 1)))).toBe(31);
        });

        it('should return 28 for February in a non-leap year', () => {
            expect(adapter.getNumDaysInMonth(dayjs(new Date(2017, FEB, 1)))).toBe(28);
        });

        it('should return 29 for February in a leap year', () => {
            expect(adapter.getNumDaysInMonth(dayjs(new Date(2016, FEB, 1)))).toBe(29);
        });

        it('should return 30 for April', () => {
            expect(adapter.getNumDaysInMonth(dayjs(new Date(2017, APR, 1)))).toBe(30);
        });

        it('should return correct week number for a known date', () => {
            // Jan 5 2017 is a Thursday, definitely ISO week 1
            expect(adapter.getWeekNumber(dayjs(new Date(2017, JAN, 5)))).toBe(1);
            // Jan 1 2017 is a Sunday — dayjs weekOfYear returns week 1
            expect(adapter.getWeekNumber(dayjs(new Date(2017, JAN, 1)))).toBe(1);
        });

        it('should return week name as string for a known date', () => {
            // Week 1 formatted via toLocaleString('en')
            expect(adapter.getWeekName(dayjs(new Date(2017, JAN, 5)))).toBe('1');
        });

        it('should return 5 weeks for a typical month (Sunday-first)', () => {
            // October 2017 starts on Sunday, 31 days, firstDayOfWeek=1 (1=Sunday)
            expect(adapter.getAmountOfWeeks(2017, 10, 1)).toBe(5);
        });

        it('should return 6 weeks when month starts on Saturday with 31 days', () => {
            // July 2017 starts on Saturday, 31 days, firstDayOfWeek=1 (1=Sunday)
            expect(adapter.getAmountOfWeeks(2017, 7, 1)).toBe(6);
        });

        it('should return 4 weeks for February starting on Monday in non-leap year', () => {
            // February 2021 starts on Monday, 28 days, firstDayOfWeek=2 (2=Monday)
            expect(adapter.getAmountOfWeeks(2021, 2, 2)).toBe(4);
        });

        it('should account for different firstDayOfWeek values', () => {
            // July 2017: 31 days, starts on Saturday
            // Sunday-first (1) and Monday-first (2) should both yield 6 weeks
            expect(adapter.getAmountOfWeeks(2017, 7, 1)).toBe(6);
            expect(adapter.getAmountOfWeeks(2017, 7, 2)).toBe(6);
        });
    });

    // Group 5: Time Name Lists
    describe('time name lists', () => {
        it('should return 60 minute names with step 1', () => {
            const names = adapter.getMinuteNames({ twoDigit: false });
            expect(names.length).toBe(60);
            expect(names[0]).toBe('0');
            expect(names[59]).toBe('59');
        });

        it('should return 12 minute names with step 5', () => {
            const names = adapter.getMinuteNames({ twoDigit: false, minuteStep: 5 });
            expect(names.length).toBe(12);
            expect(names[0]).toBe('0');
            expect(names[1]).toBe('5');
            expect(names[11]).toBe('55');
        });

        it('should return 4 minute names with step 15', () => {
            const names = adapter.getMinuteNames({ twoDigit: false, minuteStep: 15 });
            expect(names.length).toBe(4);
            expect(names[0]).toBe('0');
            expect(names[1]).toBe('15');
            expect(names[2]).toBe('30');
            expect(names[3]).toBe('45');
        });

        it('should return two-digit minute names when twoDigit is true', () => {
            const names = adapter.getMinuteNames({ twoDigit: true });
            expect(names[0]).toBe('00');
            expect(names[5]).toBe('05');
            expect(names[10]).toBe('10');
        });

        it('should return 60 second names', () => {
            const names = adapter.getSecondNames({ twoDigit: false });
            expect(names.length).toBe(60);
            expect(names[0]).toBe('0');
            expect(names[59]).toBe('59');
        });

        it('should return two-digit second names when twoDigit is true', () => {
            const names = adapter.getSecondNames({ twoDigit: true });
            expect(names[0]).toBe('00');
            expect(names[5]).toBe('05');
            expect(names[10]).toBe('10');
        });
    });

    // Group 6: Format Introspection
    describe('format introspection', () => {
        it('should detect day period in format "h:mm A"', () => {
            expect(adapter.isTimeFormatIncludesDayPeriod('h:mm A')).toBe(true);
        });

        it('should not detect day period in format "HH:mm"', () => {
            expect(adapter.isTimeFormatIncludesDayPeriod('HH:mm')).toBe(false);
        });

        it('should detect hours in format "HH:mm:ss"', () => {
            expect(adapter.isTimeFormatIncludesHours('HH:mm:ss')).toBe(true);
        });

        it('should not detect hours in format "mm:ss"', () => {
            expect(adapter.isTimeFormatIncludesHours('mm:ss')).toBe(false);
        });

        it('should detect minutes in format "HH:mm:ss"', () => {
            expect(adapter.isTimeFormatIncludesMinutes('HH:mm:ss')).toBe(true);
        });

        it('should not detect minutes in format "HH"', () => {
            expect(adapter.isTimeFormatIncludesMinutes('HH')).toBe(false);
        });

        it('should detect seconds in format "HH:mm:ss"', () => {
            expect(adapter.isTimeFormatIncludesSeconds('HH:mm:ss')).toBe(true);
        });

        it('should not detect seconds in format "HH:mm"', () => {
            expect(adapter.isTimeFormatIncludesSeconds('HH:mm')).toBe(false);
        });
    });

    // Group 7: Serialization (toIso8601)
    describe('toIso8601', () => {
        it('should convert a date to ISO 8601 string', () => {
            const date = dayjs(new Date(2017, JAN, 1));
            const iso = adapter.toIso8601(date);
            // Now uses format() instead of toISOString(), so reflects local date/time
            expect(iso).toBe('2017-01-01T00:00:00');
        });

        it('should include time component in ISO 8601 string', () => {
            const date = dayjs(new Date(2017, JAN, 1, 14, 30, 45));
            const iso = adapter.toIso8601(date);
            expect(iso).toBe('2017-01-01T14:30:45');
            expect(iso).toMatch(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
        });
    });

    // Group 8: Validity and Edge Cases
    describe('validity edge cases', () => {
        it('should return false for isValid(null)', () => {
            expect(adapter.isValid(null)).toBe(false);
        });

        it('should return empty string for format(null, ...)', () => {
            expect(adapter.format(null as any, 'L')).toBe('');
        });

        it('should return null for parse(null)', () => {
            expect(adapter.parse(null)).toBeNull();
        });

        it('should return null for parse(undefined)', () => {
            expect(adapter.parse(undefined)).toBeNull();
        });
    });

    // Group 9: Regression Tests
    describe('regression tests', () => {
        it('should return date names 1-31 (verifying no rollover to wrong month)', () => {
            // Fixed: getDateNames() was using month 0 which Day.js mapped to December.
            // Now uses month 1 (January) which has 31 days.
            const names = adapter.getDateNames();
            expect(names.length).toBe(31);
            expect(names[0]).toBe('1');
            expect(names[30]).toBe('31');
            // Verify sequential order with no gaps
            for (let i = 0; i < 31; i++) {
                expect(names[i]).toBe(String(i + 1));
            }
        });

        it('should parse a native Date via dayjs constructor', () => {
            const result = adapter.parse(new Date(2017, 0, 15, 10, 30, 0));
            expect(result).not.toBeNull();
            expect(result!.isValid()).toBe(true);
            expect(result!.year()).toBe(2017);
            expect(result!.month()).toBe(0);
            expect(result!.date()).toBe(15);
        });

        it('should parse an object with toString() by converting to string first', () => {
            // Objects with a meaningful toString() (e.g. FdDate) are converted to string
            // before passing to dayjs, avoiding objectSupport plugin misinterpretation
            // (0-based month, 'date' vs 'day' field name mismatch).
            const fdDateLike = {
                year: 2017,
                month: 1,
                day: 15,
                hour: 10,
                minute: 30,
                second: 0,
                toString: () => '2017-01-15T10:30:00'
            };
            const result = adapter.parse(fdDateLike);
            expect(result).not.toBeNull();
            expect(result!.isValid()).toBe(true);
            expect(result!.year()).toBe(2017);
            expect(result!.month()).toBe(0); // dayjs month is 0-based
            expect(result!.date()).toBe(15);
            expect(result!.hour()).toBe(10);
            expect(result!.minute()).toBe(30);
        });

        it('should parse ambiguous date string with fallback chain', () => {
            // BUG: Fallback parsing chain (line 420-435) can cause DD/MM vs MM/DD ambiguity.
            // '01/02/2026' is ambiguous: could be Jan 2 or Feb 1 depending on format.
            // With 'L' format (en locale = MM/DD/YYYY), it parses as January 2.
            const result = adapter.parse('01/02/2026', 'L');
            expect(result).not.toBeNull();
            expect(result!.isValid()).toBe(true);
            // In en locale, L = MM/DD/YYYY, so 01/02 = January 2
            expect(result!.month()).toBe(0); // January (0-based)
            expect(result!.date()).toBe(2);
        });
    });

    // Group 11: compareDate with Time Differences
    describe('compareDate with time differences', () => {
        it('should return 0 for same date and same time', () => {
            const date1 = dayjs(new Date(2017, JAN, 1, 10, 30, 0));
            const date2 = dayjs(new Date(2017, JAN, 1, 10, 30, 0));
            expect(adapter.compareDate(date1, date2)).toBe(0);
        });

        it('should return negative when first date has earlier time on same day', () => {
            const date1 = dayjs(new Date(2017, JAN, 1, 8, 0, 0));
            const date2 = dayjs(new Date(2017, JAN, 1, 14, 0, 0));
            expect(adapter.compareDate(date1, date2)).toBeLessThan(0);
        });

        it('should return positive when first date has later time on same day', () => {
            const date1 = dayjs(new Date(2017, JAN, 1, 14, 0, 0));
            const date2 = dayjs(new Date(2017, JAN, 1, 8, 0, 0));
            expect(adapter.compareDate(date1, date2)).toBeGreaterThan(0);
        });
    });

    // Group 10e: locale signal update
    describe('locale', () => {
        it('should update locale signal when setLocale is called', () => {
            adapter.setLocale('ja');
            expect(adapter.locale()).toBe('ja');
        });
    });

    // Bug exposure tests: these expect CORRECT behavior and should FAIL if the bug is present
    describe('bugs that should be fixed', () => {
        // BUG #1: getDateNames() uses month 0 (line 176)
        // createDate(2017, 0, ...) passes month=0 to dayjs which wraps to December of previous year.
        // The correct call should use month=1 (January). This test verifies the method
        // produces dates from a single consistent month (January), not December of the prior year.
        it('should use a valid month (1-based) in getDateNames()', () => {
            const spy = jest.spyOn(adapter, 'createDate');
            adapter.getDateNames();
            expect(spy).toHaveBeenCalled();
            // Every call should use month 1 (January), not month 0
            for (const call of spy.mock.calls) {
                expect(call[1]).toBe(1);
            }
            spy.mockRestore();
        });

        // Fixed: Parse/display format asymmetry — parse.timeInput now includes meridiem.
        it('should parse time string with meridiem when display format includes meridiem', () => {
            // The display format shows 'h:mm A', so parsing should also handle 'A' (meridiem)
            const displayedTime = adapter.format(
                dayjs(new Date(2017, JAN, 1, 14, 30, 0)),
                DAYJS_DATETIME_FORMATS.display.timeInput
            );
            // displayedTime is something like '2:30 PM'
            expect(displayedTime).toContain('PM');

            // Now parse it back using the parse format
            const parsed = adapter.parse(displayedTime, DAYJS_DATETIME_FORMATS.parse.timeInput);
            expect(parsed).not.toBeNull();
            expect(parsed!.isValid()).toBe(true);
            // Fixed: parse format now includes meridiem, so 2:30 PM correctly parses as 14:30
            expect(parsed!.hour()).toBe(14);
        });

        // Fixed: Fallback parsing chain no longer has hardcoded 'DD/MM/YYYY' format.
        // '13/01/2026' in en locale (MM/DD/YYYY): month=13 is invalid and correctly rejected.
        it('should not parse locale-invalid dates via fallback formats', () => {
            // Use 'L' (the standard locale format) — in en that's MM/DD/YYYY.
            // '13/01/2026' has month=13 which is out of range.
            const result = adapter.parse('13/01/2026', 'L');
            expect(result!.isValid()).toBe(false);
        });

        // Fixed: toIso8601() now returns local time without Z suffix
        it('should return ISO string matching the local date components', () => {
            const date = adapter.createDate(2017, 1, 1);
            const withTime = adapter.setTime(date, 14, 30, 45);
            const iso = adapter.toIso8601(withTime);
            // ISO string should reflect the date's local values, not UTC-shifted
            expect(iso).toContain('2017-01-01');
            expect(iso).toContain('14:30:45');
        });

        // Fixed: clone(null) now throws instead of returning null typed as Dayjs
        it('should throw for null input to clone()', () => {
            // clone() return type is Dayjs. Passing null should throw rather than
            // returning null (which would cause runtime errors when callers call .year() etc.)
            expect(() => adapter.clone(null as any)).toThrow();
        });

        it('should parse a Dayjs instance and round-trip correctly', () => {
            const original = dayjs(new Date(2017, JAN, 15, 10, 30, 0));
            const parsed = adapter.parse(original);
            expect(parsed).not.toBeNull();
            expect(parsed!.isValid()).toBe(true);
            expect(parsed!.year()).toBe(2017);
            expect(parsed!.month()).toBe(0);
            expect(parsed!.date()).toBe(15);
        });

        it('should throw for format with invalid date', () => {
            expect(() => adapter.format(dayjs(null), 'YYYY-MM-DD')).toThrow(
                'DayjsDatetimeAdapter: Cannot format invalid date.'
            );
        });

        it('should wrap overflow day in non-UTC mode (Date behavior)', () => {
            // In non-UTC mode, createDate uses native Date which wraps overflow:
            // Feb 30 → March 2. This is native Date behavior, not a bug.
            const result = adapter.createDate(2017, 2, 30);
            expect(result.isValid()).toBe(true);
            expect(result.month()).toBe(2); // March (0-based)
            expect(result.date()).toBe(2);
        });
    });

    // Architectural improvements: tests verifying design fixes
    describe('architectural improvements', () => {
        // Fixed: setLocale() no longer throws for missing locale.
        // Now falls back to 'en' with a console.warn.
        it('should gracefully handle missing locale instead of throwing', () => {
            const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
            expect(() => adapter.setLocale('xx-nonexistent')).not.toThrow();
            // After a failed setLocale, the adapter should still work
            expect(adapter.today().isValid()).toBe(true);
            // Should have warned about the failed locale
            expect(warnSpy).toHaveBeenCalled();
            warnSpy.mockRestore();
        });

        // Fixed: Plugins are now loaded at module level.
        // Creating new adapter instances should NOT call dayjs.extend() again.
        it('should not load plugins multiple times when creating multiple adapters', () => {
            const extendSpy = jest.spyOn(dayjs, 'extend');

            // Create a new adapter instance (simulating what DI does)
            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                providers: [provideDayjsDatetimeAdapter()]
            });

            const newAdapter = TestBed.inject(DatetimeAdapter) as DayjsDatetimeAdapter;
            expect(newAdapter).toBeTruthy();

            // Plugins are loaded at module level, not in the constructor
            // so no extend calls should happen during DI construction
            const extendCallCount = extendSpy.mock.calls.length;
            expect(extendCallCount).toBe(0);

            extendSpy.mockRestore();
        });

        it('should provide adapter via deprecated DayjsDatetimeAdapterModule', () => {
            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                imports: [DayjsDatetimeAdapterModule]
            });
            const moduleAdapter = TestBed.inject(DatetimeAdapter) as DayjsDatetimeAdapter;
            expect(moduleAdapter).toBeInstanceOf(DayjsDatetimeAdapter);
        });

        it('should provide adapter via provideDayjsDatetimeAdapter()', () => {
            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                providers: [provideDayjsDatetimeAdapter()]
            });
            const fnAdapter = TestBed.inject(DatetimeAdapter) as DayjsDatetimeAdapter;
            expect(fnAdapter).toBeInstanceOf(DayjsDatetimeAdapter);
        });

        // Gap C: verify DATE_TIME_FORMATS is co-provided (not split from adapter)
        it('should co-provide DATE_TIME_FORMATS via provideDayjsDatetimeAdapter()', () => {
            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                providers: [provideDayjsDatetimeAdapter()]
            });
            const formats = TestBed.inject(DATE_TIME_FORMATS);
            expect(formats).toBeTruthy();
            expect(formats).toEqual(DAYJS_DATETIME_FORMATS);
        });

        it('should co-provide DATE_TIME_FORMATS via DayjsDatetimeAdapterModule', () => {
            TestBed.resetTestingModule();
            TestBed.configureTestingModule({
                imports: [DayjsDatetimeAdapterModule]
            });
            const formats = TestBed.inject(DATE_TIME_FORMATS);
            expect(formats).toBeTruthy();
            expect(formats).toEqual(DAYJS_DATETIME_FORMATS);
        });
    });

    // Missing features and gaps: tests that expose what's missing
    describe('missing features and gaps', () => {
        // GAP #9: fromNow is now implemented using dayjs relativeTime plugin
        it('should have fromNow implemented', () => {
            expect(typeof adapter.fromNow).toBe('function');
            const pastDate = adapter.addCalendarDays(adapter.now(), -5);
            const result = adapter.fromNow(pastDate);
            expect(result).toBeTruthy();
            expect(typeof result).toBe('string');
        });

        // GAP #10: Fallback chain now uses strict parsing to reject overflow values
        it('should reject dates with out-of-range month/day in default mode', () => {
            const result = adapter.parse('2026-13-45', 'YYYY-MM-DD');
            expect(result).not.toBeNull();
            // Month 13 and day 45 don't exist. Strict parsing in fallback chain rejects this.
            expect(result!.isValid()).toBe(false);
        });

        // GAP #11: narrowMonths now uses Intl.DateTimeFormat instead of charAt(0)
        // This provides proper locale-aware narrow names (important for non-Latin scripts)
        it('should return locale-aware narrow month names from Intl', () => {
            const narrowMonths = adapter.getMonthNames('narrow');
            expect(narrowMonths.length).toBe(12);
            // In English, narrow months from Intl are: J, F, M, A, M, J, J, A, S, O, N, D
            // (duplicates are expected in narrow format — it's inherently compact)
            expect(narrowMonths[0]).toBe('J'); // January
            expect(narrowMonths[1]).toBe('F'); // February
            expect(narrowMonths[8]).toBe('S'); // September
            expect(narrowMonths[11]).toBe('D'); // December
        });

        // Gap A: non-Latin locale where charAt(0) differs from Intl narrow form
        it('should return Intl-based narrow month names for Japanese locale', () => {
            adapter.setLocale('ja');
            const narrowMonths = adapter.getMonthNames('narrow');
            expect(narrowMonths.length).toBe(12);
            // Intl narrow months for 'ja' include the 月 suffix (e.g. '10月', '11月', '12月').
            // Old charAt(0) approach on full names ('10月','11月','12月') would return '1' for all three.
            // Intl preserves the full narrow form, keeping them distinguishable.
            expect(narrowMonths[9]).toBe('10月'); // October — charAt(0) would give '1'
            expect(narrowMonths[10]).toBe('11月'); // November — charAt(0) would give '1'
            expect(narrowMonths[11]).toBe('12月'); // December — charAt(0) would give '1'
        });

        // GAP #13: see dedicated 'DayjsDatetimeAdapter with useUtc: true' describe block below
    });
});

describe('DayjsDatetimeAdapter with LOCALE_ID override', () => {
    let adapter: DayjsDatetimeAdapter;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideDayjsDatetimeAdapter(), { provide: LOCALE_ID, useValue: 'da' }]
        });
    });

    beforeEach(() => {
        adapter = TestBed.inject(DatetimeAdapter) as DayjsDatetimeAdapter;
    });

    it('should take the default locale from the LOCALE_ID injection token', () => {
        expect(adapter.getDayOfWeekNames('long')).toEqual([
            'søndag',
            'mandag',
            'tirsdag',
            'onsdag',
            'torsdag',
            'fredag',
            'lørdag'
        ]);
    });

    it('should warn and fall back to en if locale is not preloaded', async () => {
        const warnSpy = jest.spyOn(console, 'warn').mockImplementation();
        expect(() => adapter.setLocale('en-au')).not.toThrow();
        expect(warnSpy).toHaveBeenCalled();
        warnSpy.mockRestore();
        await import('dayjs/locale/en-au');
        expect(() => adapter.setLocale('en-au')).not.toThrow();
    });

    it('should parse date string even when time is missing and format expects time', () => {
        // simulate the input field edited by the user, with missing time
        const result = adapter['_createDayjsDate']('10/07/2025', 'L hh:mm A');
        expect(result.isValid()).toBeTruthy();
        expect(result.year()).toBe(2025);
        expect(result.month()).toBe(JUL); // month is 0-based in dayjs
        expect(result.date()).toBe(10);
    });

    describe('_createDayjsDate 24h fallback (fix #14250)', () => {
        it('should parse a 24h time typed into a 12h-configured format and preserve the hour', () => {
            // The bug: typing '5/25/2025 15:30' with format 'M/D/YYYY h:mm A' exhausted all
            // sensible fallbacks and landed on YYYY-MM-DD, producing hour=0 and a garbage date.
            const result = adapter['_createDayjsDate']('5/25/2025 15:30', 'M/D/YYYY h:mm A');
            expect(result.isValid()).toBe(true);
            expect(result.year()).toBe(2025);
            expect(result.month()).toBe(MAY);
            expect(result.date()).toBe(25);
            expect(result.hour()).toBe(15);
        });

        it('should not mis-parse a US-locale datetime string via the YYYY-MM-DD fallback', () => {
            // The YYYY-MM-DD fallback used to non-strictly "match" strings like '5/25/2025 15:30',
            // returning isValid()=true with year=2027 and hour=0 — no error shown to the user.
            const result = adapter['_createDayjsDate']('5/25/2025 15:30', 'M/D/YYYY h:mm A');
            expect(result.year()).not.toBe(2027);
            expect(result.hour()).not.toBe(0);
            expect(result.isValid()).toBe(true);
            expect(result.year()).toBe(2025);
            expect(result.month()).toBe(MAY);
            expect(result.date()).toBe(25);
            expect(result.hour()).toBe(15);
        });

        it('should still parse a genuine ISO date string via the YYYY-MM-DD fallback', () => {
            const result = adapter['_createDayjsDate']('2025-05-25', 'M/D/YYYY h:mm A');
            expect(result.isValid()).toBe(true);
            expect(result.year()).toBe(2025);
            expect(result.month()).toBe(MAY);
            expect(result.date()).toBe(25);
        });

        it('should not produce an invalid HHH:mm token when format already uses uppercase HH', () => {
            // Regression: case-insensitive /h:mm ?[aA]/i matched 'H:mm A' inside 'HH:mm A',
            // leaving the first H in place and producing 'HHH:mm' — an unrecognised dayjs token.
            const result = adapter['_createDayjsDate']('05/25/2025 15:30', 'MM/DD/YYYY HH:mm A');
            expect(result.isValid()).toBe(true);
            expect(result.year()).toBe(2025);
            expect(result.month()).toBe(MAY);
            expect(result.date()).toBe(25);
            expect(result.hour()).toBe(15);
        });

        // Gap B: fallback regex must handle two-digit hours (HH) and seconds (:ss)
        it('should strip HH:mm:ss time portion in fallback and parse date-only input', () => {
            // Format expects date + time with 24-hour clock and seconds,
            // but user only typed the date portion.
            // Old regex / ?[Hh]:?mm[aA]?/ couldn't match 'HH:mm:ss' (two-digit hour + seconds).
            const result = adapter['_createDayjsDate']('2025-07-10', 'YYYY-MM-DD HH:mm:ss');
            expect(result.isValid()).toBeTruthy();
            expect(result.year()).toBe(2025);
            expect(result.month()).toBe(JUL);
            expect(result.date()).toBe(10);
        });
    });
});

// Regression tests for https://github.com/SAP/fundamental-ngx/issues/13326
// Bug: In fr locale, deleting the time portion from "03/06/2025 0:00" left "03/06/2025"
// which was re-parsed as June 3 (US MDY order) instead of March 6 (French DMY order).
describe('issue #13326 - deleting time should not swap day/month in non-en locales', () => {
    let adapter: DayjsDatetimeAdapter;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideDayjsDatetimeAdapter()]
        });
        adapter = TestBed.inject(DatetimeAdapter) as DayjsDatetimeAdapter;
    });

    it('should preserve French date after time is deleted (DD/MM/YYYY)', () => {
        adapter.setLocale('fr');
        // French format is DD/MM/YYYY. "06/03/2025" = March 6 in fr locale.
        // Bug #13326: after deleting time, this was re-parsed as MM/DD (US order) → June 3.
        const result = adapter.parse('06/03/2025', 'L h:mm A');
        expect(result).not.toBeNull();
        expect(result!.isValid()).toBeTruthy();
        expect(result!.year()).toBe(2025);
        expect(result!.month()).toBe(MAR); // March (0-based: 2), not June
        expect(result!.date()).toBe(6); // 6th, not 3rd
    });

    it('should preserve English date after time is deleted (MM/DD/YYYY)', () => {
        adapter.setLocale('en');
        // User selected March 6 2025, then deleted the time portion
        const result = adapter.parse('03/06/2025', 'L h:mm A');
        expect(result).not.toBeNull();
        expect(result!.isValid()).toBeTruthy();
        expect(result!.year()).toBe(2025);
        expect(result!.month()).toBe(MAR); // March
        expect(result!.date()).toBe(6);
    });

    it('should preserve Danish date after time is deleted (DD.MM.YYYY)', () => {
        adapter.setLocale('da');
        // Danish uses DD.MM.YYYY with dots, user typed with dots
        const result = adapter.parse('06.03.2025', 'L HH:mm');
        expect(result).not.toBeNull();
        expect(result!.isValid()).toBeTruthy();
        expect(result!.year()).toBe(2025);
        expect(result!.month()).toBe(MAR); // March
        expect(result!.date()).toBe(6);
    });

    it('should preserve Japanese date after time is deleted (YYYY/MM/DD)', () => {
        adapter.setLocale('ja');
        const result = adapter.parse('2025/03/06', 'L h:mm A');
        expect(result).not.toBeNull();
        expect(result!.isValid()).toBeTruthy();
        expect(result!.year()).toBe(2025);
        expect(result!.month()).toBe(MAR);
        expect(result!.date()).toBe(6);
    });

    it('should handle French datetime with time present (no stripping needed)', () => {
        adapter.setLocale('fr');
        // French format DD/MM/YYYY: "06/03/2025 14:30" = March 6, 2:30 PM
        const result = adapter.parse('06/03/2025 14:30', 'L HH:mm');
        expect(result).not.toBeNull();
        expect(result!.isValid()).toBeTruthy();
        expect(result!.year()).toBe(2025);
        expect(result!.month()).toBe(MAR);
        expect(result!.date()).toBe(6);
        expect(result!.hour()).toBe(14);
        expect(result!.minute()).toBe(30);
    });
});

// GAP #13: createDate() ignores useUtc — needs a separate TestBed with useUtc: true
describe('DayjsDatetimeAdapter with useUtc: true', () => {
    let adapter: DayjsDatetimeAdapter;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                provideDayjsDatetimeAdapter(),
                { provide: DAYJS_DATE_TIME_ADAPTER_OPTIONS, useValue: { useUtc: true, strict: false } }
            ]
        });
    });

    beforeEach(() => {
        adapter = TestBed.inject(DatetimeAdapter) as DayjsDatetimeAdapter;
    });

    it('should create dates in UTC mode when useUtc is true', () => {
        const created = adapter.createDate(2017, 1, 1);
        const today = adapter.today();

        // today() uses _createDayjsDate() which respects useUtc → UTC mode
        expect(today.isUTC()).toBe(true);
        // createDate() now also respects useUtc
        expect(created.isUTC()).toBe(true);
        // Verify actual date values are correct (not shifted by timezone offset)
        expect(created.year()).toBe(2017);
        expect(created.month()).toBe(0); // dayjs month is 0-based
        expect(created.date()).toBe(1);
        expect(created.hour()).toBe(0);
        expect(created.minute()).toBe(0);
    });
});

describe('DayjsDatetimeAdapter locale isolation', () => {
    let adapterA: DayjsDatetimeAdapter;
    let adapterB: DayjsDatetimeAdapter;

    beforeEach(() => {
        // Reset global dayjs locale to a known state before each test
        dayjs.locale('en');

        TestBed.configureTestingModule({
            providers: [provideDayjsDatetimeAdapter()]
        });

        // Get the first adapter from the module-level injector
        adapterA = TestBed.inject(DatetimeAdapter) as DayjsDatetimeAdapter;

        // Create a second independent adapter via a child injector
        const childInjector = Injector.create({
            providers: [
                { provide: DatetimeAdapter, useClass: DayjsDatetimeAdapter },
                { provide: DATE_TIME_FORMATS, useValue: DAYJS_DATETIME_FORMATS },
                { provide: LOCALE_ID, useValue: 'en' }
            ],
            parent: TestBed.inject(Injector)
        });
        adapterB = childInjector.get(DatetimeAdapter) as DayjsDatetimeAdapter;
    });

    afterEach(() => {
        // Restore global dayjs locale after each test
        dayjs.locale('en');
    });

    it('should not affect another adapter instance when locale is changed on one', () => {
        // Both adapters start in English
        const date = dayjs(new Date(2026, MAR, 12));

        const formatBefore = adapterB.format(date, 'MMMM');
        expect(formatBefore).toBe('March');

        // Change adapter A to French — adapter B should be unaffected
        adapterA.setLocale('fr');

        const formatAfter = adapterB.format(date, 'MMMM');
        expect(formatAfter).toBe('March');
    });

    it('should not mutate global dayjs locale when setLocale is called', () => {
        expect(dayjs.locale()).toBe('en');

        adapterA.setLocale('fr');

        // The adapter's own locale should be French
        expect(adapterA.locale()).toBe('fr');
        // But the global dayjs locale should remain English
        expect(dayjs.locale()).toBe('en');
    });

    it('should not affect another adapter instance getMonthNames when locale is changed on one', () => {
        adapterA.setLocale('fr');

        // Adapter B should still return English month names
        expect(adapterB.getMonthNames('long')[0]).toBe('January');
    });

    it('should not affect another adapter instance getDayOfWeekNames when locale is changed on one', () => {
        adapterA.setLocale('fr');

        // Adapter B should still return English day names
        expect(adapterB.getDayOfWeekNames('long')[0]).toBe('Sunday');
    });

    it('should share locale when two consumers use the same global adapter instance', () => {
        // Simulate two components both injecting the same global adapter (no component-level providers).
        // They both get adapterA from the TestBed (environment) injector.
        const globalConsumer1 = adapterA;
        const globalConsumer2 = TestBed.inject(DatetimeAdapter) as DayjsDatetimeAdapter;

        // They should be the exact same instance
        expect(globalConsumer1).toBe(globalConsumer2);

        const date = dayjs(new Date(2026, MAR, 12));

        // Change locale via one consumer — the other should see the change too
        globalConsumer1.setLocale('fr');

        expect(globalConsumer2.locale()).toBe('fr');
        expect(globalConsumer2.format(date, 'MMMM')).toBe('mars');
        expect(globalConsumer2.getMonthNames('long')[0]).toBe('janvier');

        // The component-level adapter (adapterB) should remain unaffected
        expect(adapterB.locale()).toBe('en');
        expect(adapterB.format(date, 'MMMM')).toBe('March');
    });
});

/**
 * M-4 round-trip regression specs (PR #14016)
 *
 * Mike O'Donnell's reproduction steps (CHANGES_REQUESTED review):
 *   1. Open <fd-datetime-picker> and click the input.
 *   2. Pick a date+time via the picker UI (e.g. May 20 2026, 4:33 PM).
 *   3. Picker closes; input renders the chosen value cleanly.
 *   4. Manually edit the input text to a different valid datetime
 *      (e.g. change "05/20/2026 4:33 PM" → "05/21/2026 4:33 PM").
 *   5. BUG: input gains an error border even though the typed value is valid
 *      and is in the exact same format the picker wrote moments before.
 *
 * NOTE: DayjsDatetimeAdapter already handles round-trips correctly via its
 * _createDayjsDate() multi-format fallback strategy.  These specs serve as a
 * regression guard to ensure future changes do not regress this behaviour.
 * The M-4 bug is isolated to FdDatetimeAdapter (see fd-datetime-adapter.spec.ts).
 */
describe('DayjsDatetimeAdapter — M-4 round-trip regression (PR #14016)', () => {
    let adapter: DayjsDatetimeAdapter;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [provideDayjsDatetimeAdapter()]
        });
        adapter = TestBed.inject(DatetimeAdapter) as DayjsDatetimeAdapter;
    });

    const dateTimeInputFormat = DAYJS_DATETIME_FORMATS.parse.dateTimeInput; // 'L h:mm A'

    for (const locale of ['en', 'fr', 'de']) {
        it(`round-trips a picker-formatted value through parse() — ${locale} locale`, () => {
            adapter.setLocale(locale);
            const picked = dayjs.utc
                ? dayjs('2026-05-20T16:33:00Z')
                : dayjs(new Date(Date.UTC(2026, MAY, 20, 16, 33, 0)));
            const formatted = adapter.format(picked, dateTimeInputFormat);
            const reparsed = adapter.parse(formatted, dateTimeInputFormat);
            expect(adapter.isValid(reparsed)).toBe(true, `parse("${formatted}") returned invalid date for ${locale}`);
            expect(adapter.format(reparsed!, dateTimeInputFormat)).toBe(formatted);
        });
    }

    it("parses a manually-typed valid datetime in en locale (Mike's step 4)", () => {
        adapter.setLocale('en');
        // en picker writes "05/20/2026 4:33 PM"; user edits day to 21
        const parsed = adapter.parse('05/21/2026 4:33 PM', dateTimeInputFormat);
        expect(adapter.isValid(parsed)).toBe(true);
    });

    it('parses a manually-typed valid datetime in fr locale', () => {
        adapter.setLocale('fr');
        // fr picker writes "20/05/2026 4:33 PM"; user edits day to 21
        const parsed = adapter.parse('21/05/2026 4:33 PM', dateTimeInputFormat);
        expect(adapter.isValid(parsed)).toBe(true);
    });

    it('parses a manually-typed valid datetime in de locale', () => {
        adapter.setLocale('de');
        // de picker writes "20.05.2026 4:33 PM"; user edits day to 21
        const parsed = adapter.parse('21.05.2026 4:33 PM', dateTimeInputFormat);
        expect(adapter.isValid(parsed)).toBe(true);
    });
});
