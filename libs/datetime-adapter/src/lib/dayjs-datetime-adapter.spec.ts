import { Platform } from '@angular/cdk/platform';
import { LOCALE_ID } from '@angular/core';
import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import dayjs from 'dayjs';

import { DatetimeAdapter } from '@fundamental-ngx/core/datetime';

import { DayjsDatetimeAdapter } from './dayjs-datetime-adapter';
import { DayjsDatetimeAdapterModule } from './dayjs-datetime-adapter.module';

// preload locales that are used in tests
import 'dayjs/locale/ar-ma';
import 'dayjs/locale/da';
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

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [DayjsDatetimeAdapterModule]
        }).compileComponents();
    }));

    beforeEach(inject([DatetimeAdapter, Platform], (dateAdapter: DayjsDatetimeAdapter, _platform: Platform) => {
        adapter = dateAdapter;
        platform = _platform;
    }));

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
        expect(adapter._prepareFormat('L')).toBe('MM/DD/YYYY');
        expect(adapter._prepareFormat('L LT')).toBe('MM/DD/YYYY h:mm A');
        expect(adapter._prepareFormat('L LT MMMM.D.YY hh:mm:ss')).toBe('MM/DD/YYYY h:mm A MMMM.D.YY hh:mm:ss');
        expect(adapter._prepareFormat('L LT randomtext')).toBe('MM/DD/YYYY h:mm A randomtext');
    });

    it('should parse longDateFormats in other locales', () => {
        adapter.setLocale('ja');
        expect(adapter._prepareFormat('L')).toBe('YYYY/MM/DD');
        expect(adapter._prepareFormat('L LT')).toBe('YYYY/MM/DD HH:mm');
        expect(adapter._prepareFormat('L LT MMMM.D.YY hh:mm:ss')).toBe('YYYY/MM/DD HH:mm MMMM.D.YY hh:mm:ss');
        expect(adapter._prepareFormat('L LT randomtext')).toBe('YYYY/MM/DD HH:mm randomtext');
        adapter.setLocale('ar-ma');
        expect(adapter._prepareFormat('L')).toBe('DD/MM/YYYY');
        expect(adapter._prepareFormat('L LT')).toBe('DD/MM/YYYY HH:mm');
        expect(adapter._prepareFormat('L LT MMMM.D.YY hh:mm:ss')).toBe('DD/MM/YYYY HH:mm MMMM.D.YY hh:mm:ss');
        expect(adapter._prepareFormat('L LT randomtext')).toBe('DD/MM/YYYY HH:mm randomtext');
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

        it('should return 5 weeks for a typical month', () => {
            // October 2017 starts on Sunday, 31 days => 5 weeks (firstDayOfWeek=0)
            expect(adapter.getAmountOfWeeks(2017, 10, 0)).toBe(5);
        });

        it('should return 6 weeks when month starts on Saturday with 31 days', () => {
            // BUG: getAmountOfWeeks uses (day - firstDay + 8) % 7 instead of +7 in the dayOffset
            // formula. July 2017 starts on Saturday (day 6), 31 days, firstDayOfWeek=0.
            // Correct answer is 6 rows, but returns 5 due to dayOffset being 0 instead of 6.
            expect(adapter.getAmountOfWeeks(2017, 7, 0)).toBe(6);
        });

        it('should return 4 weeks for February starting on Monday in non-leap year', () => {
            // BUG: Same +8 off-by-one. February 2021 starts on Monday, 28 days, firstDayOfWeek=1.
            // Correct answer is 4 weeks (perfect alignment), but returns 5.
            expect(adapter.getAmountOfWeeks(2021, 2, 1)).toBe(4);
        });

        it('should account for different firstDayOfWeek values', () => {
            // July 2017: 31 days, starts on Saturday
            // Both firstDayOfWeek=0 and firstDayOfWeek=1 should yield 6 weeks
            expect(adapter.getAmountOfWeeks(2017, 7, 0)).toBe(6);
            expect(adapter.getAmountOfWeeks(2017, 7, 1)).toBe(6);
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
            // dayjs.toISOString() returns UTC with Z suffix
            expect(iso).toBe(date.toISOString());
        });

        it('should include time component in ISO 8601 string', () => {
            const date = dayjs(new Date(2017, JAN, 1, 14, 30, 45));
            const iso = adapter.toIso8601(date);
            expect(iso).toBe(date.toISOString());
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
    });

    // Group 9: Bug Exposure Tests
    describe('bug exposure tests', () => {
        it('should return date names 1-31 (verifying no rollover to wrong month)', () => {
            // BUG: getDateNames() uses month 0 (line 176) which Day.js maps to December of previous year.
            // This works because December has 31 days, but documents the bug for awareness.
            const names = adapter.getDateNames();
            expect(names.length).toBe(31);
            expect(names[0]).toBe('1');
            expect(names[30]).toBe('31');
            // Verify sequential order with no gaps
            for (let i = 0; i < 31; i++) {
                expect(names[i]).toBe(String(i + 1));
            }
        });

        it('should parse an FdDate instance by converting to string', () => {
            // BUG: DayjsDatetimeAdapter has direct dependency on FdDate (line 255-258).
            // This documents the coupling between the two.
            const { FdDate } = require('@fundamental-ngx/core/datetime');
            const fdDate = new FdDate(2017, 1, 15, 10, 30, 0);
            const result = adapter.parse(fdDate);
            expect(result).not.toBeNull();
            expect(result!.isValid()).toBe(true);
            expect(result!.year()).toBe(2017);
            expect(result!.month()).toBe(0); // dayjs month is 0-based
            expect(result!.date()).toBe(15);
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

    // Group 10e: localeChanges observable emission
    describe('localeChanges', () => {
        it('should emit on localeChanges when setLocale is called', (done) => {
            adapter.localeChanges.subscribe(() => {
                done();
            });
            adapter.setLocale('ja');
        });
    });
});

describe('MomentDatetimeAdapter with LOCALE_ID override', () => {
    let adapter: DayjsDatetimeAdapter;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [DayjsDatetimeAdapterModule],
            providers: [{ provide: LOCALE_ID, useValue: 'da' }]
        }).compileComponents();
    }));

    beforeEach(inject([DatetimeAdapter], (_adapter: DayjsDatetimeAdapter) => {
        adapter = _adapter;
    }));

    it('should take the default locale from the MOMENT_DATE_TIME_ADAPTER_OPTIONS injection token', () => {
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

    it('should throw an error if locale is not preloaded', async () => {
        expect(() => adapter.setLocale('en-au')).toThrow();
        await import('dayjs/locale/en-au');
        expect(() => adapter.setLocale('en-au')).not.toThrow();
    });

    it('should parse date string even when time is missing and format expects time', () => {
        // simulate the input field edited by the user, with missing time
        const result = adapter['_createDayjsDate']('10/07/2025', 'L hh:mm A');
        adapter.setLocale('fr');
        expect(result.isValid()).toBeTruthy();
        expect(result.year()).toBe(2025);
        expect(result.month()).toBe(JUL); // month is 0-based
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
    });
});
