import { Platform } from '@angular/cdk/platform';
import { Injector, LOCALE_ID } from '@angular/core';
import { TestBed, inject, waitForAsync } from '@angular/core/testing';

import { DatetimeAdapter, FdDate, FdDatetimeAdapter, FdDatetimeAdapterModule } from './index';

describe('FdDatetimeAdapter', () => {
    let platform: Platform;
    let adapter: FdDatetimeAdapter;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [FdDatetimeAdapterModule]
        }).compileComponents();
    }));

    beforeEach(inject([DatetimeAdapter, Platform], (dateAdapter: FdDatetimeAdapter, _platform: Platform) => {
        adapter = dateAdapter;
        platform = _platform;
    }));

    it('should get year', () => {
        expect(adapter.getYear(new FdDate(2017, 1, 1))).toBe(2017);
    });

    it('should get month', () => {
        expect(adapter.getMonth(new FdDate(2017, 1, 1))).toBe(1);
    });

    it('should get date', () => {
        expect(adapter.getDate(new FdDate(2017, 1, 1))).toBe(1);
    });

    it('should get day of week', () => {
        expect(adapter.getDayOfWeek(new FdDate(2017, 1, 1))).toBe(1);
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
        adapter.setLocale('ja-JP');
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

    it('should get date names in a different locale', () => {
        adapter.setLocale('ja-JP');
        expect(adapter.getDateNames()).toEqual([
            '1日',
            '2日',
            '3日',
            '4日',
            '5日',
            '6日',
            '7日',
            '8日',
            '9日',
            '10日',
            '11日',
            '12日',
            '13日',
            '14日',
            '15日',
            '16日',
            '17日',
            '18日',
            '19日',
            '20日',
            '21日',
            '22日',
            '23日',
            '24日',
            '25日',
            '26日',
            '27日',
            '28日',
            '29日',
            '30日',
            '31日'
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
        // Edge & IE use two-letter narrow days.
        if (platform.EDGE || platform.TRIDENT) {
            expect(adapter.getDayOfWeekNames('narrow')).toEqual(['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']);
        } else {
            expect(adapter.getDayOfWeekNames('narrow')).toEqual(['S', 'M', 'T', 'W', 'T', 'F', 'S']);
        }
    });

    it('should get day of week names in a different locale', () => {
        adapter.setLocale('ja-JP');
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
        expect(adapter.getYearName(new FdDate(2017, 1, 1))).toBe('2017');
    });

    it('should get year name for low year numbers', () => {
        const createAndFormat = (year: number): string => adapter.getYearName(adapter.createDate(year, 1, 1));

        expect(createAndFormat(50)).toBe('50');
        expect(createAndFormat(99)).toBe('99');
        expect(createAndFormat(100)).toBe('100');
    });

    it('should get year name in a different locale', () => {
        adapter.setLocale('ja-JP');
        expect(adapter.getYearName(new FdDate(2017, 1, 1))).toBe('2017年');
    });

    it('should get first day of week', () => {
        expect(adapter.getFirstDayOfWeek()).toBe(0);
    });

    it('should create Date', () => {
        expect(adapter.createDate(2017, 1, 1)).toEqual(new FdDate(2017, 1, 1));
    });

    it('should be invalid date with month over/under-flow', () => {
        expect(adapter.createDate(2017, 13, 1).isDateValid()).toBe(false);
        expect(adapter.createDate(2017, 0, 1).isDateValid()).toBe(false);
    });

    it('should be invalid date with date over/under-flow', () => {
        expect(adapter.createDate(2017, 2, 32).isDateValid()).toBe(false);
        expect(adapter.createDate(2017, 2, 0).isDateValid()).toBe(false);
    });

    it('should create Date with low year number', () => {
        expect(adapter.createDate(-1, 1, 1).year).toBe(-1);
        expect(adapter.createDate(0, 1, 1).year).toBe(0);
        expect(adapter.createDate(50, 1, 1).year).toBe(50);
        expect(adapter.createDate(99, 1, 1).year).toBe(99);
        expect(adapter.createDate(100, 1, 1).year).toBe(100);
    });

    it('should format Date with low year number', () => {
        const createAndFormat = (year: number): string => adapter.format(adapter.createDate(year, 1, 1), {});

        expect(createAndFormat(50)).toBe('1/1/50');
        expect(createAndFormat(99)).toBe('1/1/99');
        expect(createAndFormat(100)).toBe('1/1/100');
    });

    it(`should get today's date`, () => {
        expect(adapter.datesEqual(adapter.today(), FdDate.getToday())).toBe(true); // `should be equal to today's date`
    });

    it(`should get now date`, () => {
        expect(adapter.datesEqual(adapter.now(), new FdDate())).toBe(true); // `should be equal to now date moment`
    });

    it('should parse "en" date string', () => {
        expect(adapter.parse('1/1/2017')).toEqual(new FdDate(2017, 1, 1));
    });

    it('should parse "en" time string', () => {
        expect(adapter.parse('10:30 PM', { hour: 'numeric', minute: '2-digit', hour12: true })).toEqual(
            FdDate.getNow().setTime(22, 30, 0)
        );
        expect(adapter.parse('10:30', { hour: 'numeric', minute: '2-digit' })).toEqual(
            FdDate.getNow().setTime(10, 30, 0)
        );
    });

    it('should parse number', () => {
        const timestamp = new Date(2017, 0, 1).getTime();
        expect(adapter.parse(timestamp)).toEqual(new FdDate(2017, 1, 1));
    });

    it('should parse Date', () => {
        const date = new FdDate(2017, 1, 1);
        expect(adapter.parse(date)).toEqual(date);
        expect(adapter.parse(date)).not.toBe(date);
    });

    it('should parse invalid value to invalid date', () => {
        const d = adapter.parse('hello');
        expect(d).toBeDefined();
        expect(d?.isDateValid()).toBe(false);
    });
    it('should parse empty value to null', () => {
        expect(adapter.parse('')).toBe(null);
        expect(adapter.parse(null)).toBe(null);
        expect(adapter.parse(undefined)).toBe(null);
    });

    it('should format', () => {
        expect(adapter.format(new FdDate(2017, 1, 1), {})).toEqual('1/1/2017');
    });

    it('should format with custom format', () => {
        expect(
            adapter.format(new FdDate(2017, 1, 1), {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        ).toEqual('January 1, 2017');
    });

    it('should format with a different locale', () => {
        adapter.setLocale('ja-JP');
        // Edge & IE use a different format in Japanese.
        if (platform.EDGE || platform.TRIDENT) {
            expect(adapter.format(new FdDate(2017, 1, 1), {})).toEqual('2017年1月1日');
        } else {
            expect(adapter.format(new FdDate(2017, 1, 1), {})).toEqual('2017/1/1');
        }
    });

    it('should add years', () => {
        expect(adapter.addCalendarYears(new FdDate(2017, 1, 1), 1)).toEqual(new FdDate(2018, 1, 1));
        expect(adapter.addCalendarYears(new FdDate(2017, 1, 1), -1).toDateString()).toEqual(
            new FdDate(2016, 1, 1).toDateString()
        );
    });

    it('should respect leap years when adding years', () => {
        expect(adapter.addCalendarYears(new FdDate(2016, 2, 29), 1)).toEqual(new FdDate(2017, 2, 28));
        expect(adapter.addCalendarYears(new FdDate(2016, 2, 29), -1)).toEqual(new FdDate(2015, 2, 28));
    });

    it('should add months', () => {
        expect(adapter.addCalendarMonths(new FdDate(2017, 1, 1), 1)).toEqual(new FdDate(2017, 2, 1));
        expect(adapter.addCalendarMonths(new FdDate(2017, 1, 1), -1)).toEqual(new FdDate(2016, 12, 1));
    });

    it('should respect month length differences when adding months', () => {
        expect(adapter.addCalendarMonths(new FdDate(2017, 1, 31), 1)).toEqual(new FdDate(2017, 2, 28));
        expect(adapter.addCalendarMonths(new FdDate(2017, 3, 31), -1)).toEqual(new FdDate(2017, 2, 28));
    });

    it('should add days', () => {
        expect(adapter.addCalendarDays(new FdDate(2017, 1, 1), 1)).toEqual(new FdDate(2017, 1, 2));
        expect(adapter.addCalendarDays(new FdDate(2017, 1, 1), -1)).toEqual(new FdDate(2016, 12, 31));
    });

    it('should clone', () => {
        const date = new FdDate(2017, 1, 1);
        expect(adapter.clone(date)).toEqual(date);
        expect(adapter.clone(date)).not.toBe(date);
    });

    it('should preserve time when cloning', () => {
        const date = new FdDate(2017, 1, 1, 4, 5, 6);
        expect(adapter.clone(date)).toEqual(date);
        expect(adapter.clone(date)).not.toBe(date);
    });

    it('should throw when cloning null', () => {
        expect(() => adapter.clone(null as any)).toThrow('FdDatetimeAdapter: Cannot clone a null/undefined date.');
    });

    it('should throw when cloning undefined', () => {
        expect(() => adapter.clone(undefined as any)).toThrow('FdDatetimeAdapter: Cannot clone a null/undefined date.');
    });

    it('should compare dates', () => {
        expect(adapter.compareDate(new FdDate(2017, 1, 1), new FdDate(2017, 1, 2))).toBeLessThan(0);
        expect(adapter.compareDate(new FdDate(2017, 1, 1), new FdDate(2017, 2, 1))).toBeLessThan(0);
        expect(adapter.compareDate(new FdDate(2017, 1, 1), new FdDate(2018, 1, 1))).toBeLessThan(0);
        expect(adapter.compareDate(new FdDate(2017, 1, 1), new FdDate(2017, 1, 1))).toBe(0);
        expect(adapter.compareDate(new FdDate(2018, 1, 1), new FdDate(2017, 1, 1))).toBeGreaterThan(0);
        expect(adapter.compareDate(new FdDate(2017, 2, 1), new FdDate(2017, 1, 1))).toBeGreaterThan(0);
        expect(adapter.compareDate(new FdDate(2017, 1, 2), new FdDate(2017, 1, 1))).toBeGreaterThan(0);
    });

    it('should use UTC for formatting by default', () => {
        expect(adapter.format(new FdDate(1800, 7, 14), { day: 'numeric' })).toBe('14');
    });

    it('should count today as a valid date instance', () => {
        const date = new FdDate();
        expect(adapter.isValid(date)).toBe(true);
    });

    it('should count an invalid date as an invalid date instance', () => {
        expect(adapter.isValid(NaN as unknown as FdDate)).toBe(false);
    });

    it('should not throw when attempting to format a date with a year less than 1', () => {
        expect(() => adapter.format(new FdDate(-1, 1, 1), {})).not.toThrow();
    });

    it('should not throw when attempting to format a date with a year greater than 9999', () => {
        expect(() => adapter.format(new FdDate(10000, 1, 1), {})).not.toThrow();
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

    it('should get hour names 0-23 range in a different locale', () => {
        adapter.setLocale('ar-EG');
        expect(adapter.getHourNames({ meridian: false, twoDigit: false })).toEqual([
            '٠',
            '١',
            '٢',
            '٣',
            '٤',
            '٥',
            '٦',
            '٧',
            '٨',
            '٩',
            '١٠',
            '١١',
            '١٢',
            '١٣',
            '١٤',
            '١٥',
            '١٦',
            '١٧',
            '١٨',
            '١٩',
            '٢٠',
            '٢١',
            '٢٢',
            '٢٣'
        ]);
    });

    it('should get day period names (AM / PM)', () => {
        expect(adapter.getDayPeriodNames()).toEqual(['AM', 'PM']);
    });

    it('should get day period names (AM / PM) in a different locale', () => {
        adapter.setLocale('ar-EG');
        expect(adapter.getDayPeriodNames()).toEqual(['ص', 'م']);
    });

    // Group 1: Time Manipulation
    describe('time manipulation', () => {
        it('should get hours from a date', () => {
            expect(adapter.getHours(new FdDate(2017, 1, 1, 14, 30, 45))).toBe(14);
        });

        it('should get minutes from a date', () => {
            expect(adapter.getMinutes(new FdDate(2017, 1, 1, 14, 30, 45))).toBe(30);
        });

        it('should get seconds from a date', () => {
            expect(adapter.getSeconds(new FdDate(2017, 1, 1, 14, 30, 45))).toBe(45);
        });

        it('should set hours and return a new date', () => {
            const date = new FdDate(2017, 1, 1, 0, 0, 0);
            const result = adapter.setHours(date, 15);
            expect(result.hour).toBe(15);
        });

        it('should set minutes and return a new date', () => {
            const date = new FdDate(2017, 1, 1, 0, 0, 0);
            const result = adapter.setMinutes(date, 45);
            expect(result.minute).toBe(45);
        });

        it('should set seconds and return a new date', () => {
            const date = new FdDate(2017, 1, 1, 0, 0, 0);
            const result = adapter.setSeconds(date, 30);
            expect(result.second).toBe(30);
        });

        it('should not mutate the original date when setting time', () => {
            const date = new FdDate(2017, 1, 1, 10, 20, 30);
            adapter.setHours(date, 15);
            adapter.setMinutes(date, 45);
            adapter.setSeconds(date, 55);
            // setHours/setMinutes/setSeconds create new Date instances internally,
            // so original FdDate fields should remain unchanged
            expect(date.hour).toBe(10);
            expect(date.minute).toBe(20);
            expect(date.second).toBe(30);
        });

        it('should set hours, minutes, and seconds at once via setTime', () => {
            const date = new FdDate(2017, 1, 1, 0, 0, 0);
            const result = adapter.setTime(date, 10, 20, 30);
            expect(adapter.getHours(result)).toBe(10);
            expect(adapter.getMinutes(result)).toBe(20);
            expect(adapter.getSeconds(result)).toBe(30);
        });

        it('should return a new date instance from setTime', () => {
            const date = new FdDate(2017, 1, 1, 0, 0, 0);
            const result = adapter.setTime(date, 10, 20, 30);
            expect(result).not.toBe(date);
        });
    });

    // Group 2: Date Equality and Comparison
    describe('date equality and comparison', () => {
        it('should return true for datesEqual when dates are the same day', () => {
            expect(adapter.datesEqual(new FdDate(2017, 1, 1), new FdDate(2017, 1, 1))).toBe(true);
        });

        it('should return true for datesEqual when same day but different time', () => {
            expect(adapter.datesEqual(new FdDate(2017, 1, 1, 10, 0, 0), new FdDate(2017, 1, 1, 22, 30, 0))).toBe(true);
        });

        it('should return false for datesEqual when dates are different days', () => {
            expect(adapter.datesEqual(new FdDate(2017, 1, 1), new FdDate(2017, 1, 2))).toBe(false);
        });

        it('should return false for datesEqual when either date is null/falsy', () => {
            expect(adapter.datesEqual(new FdDate(2017, 1, 1), null as any)).toBe(false);
            expect(adapter.datesEqual(null as any, new FdDate(2017, 1, 1))).toBe(false);
            expect(adapter.datesEqual(null as any, null as any)).toBe(false);
        });

        it('should return true for dateTimesEqual when date and time are identical', () => {
            expect(adapter.dateTimesEqual(new FdDate(2017, 1, 1, 10, 30, 0), new FdDate(2017, 1, 1, 10, 30, 0))).toBe(
                true
            );
        });

        it('should return false for dateTimesEqual when same date but different time', () => {
            expect(adapter.dateTimesEqual(new FdDate(2017, 1, 1, 10, 30, 0), new FdDate(2017, 1, 1, 10, 30, 1))).toBe(
                false
            );
        });

        it('should return false for dateTimesEqual when either date is null/falsy', () => {
            expect(adapter.dateTimesEqual(new FdDate(2017, 1, 1), null as any)).toBe(false);
            expect(adapter.dateTimesEqual(null as any, new FdDate(2017, 1, 1))).toBe(false);
        });
    });

    // Group 3: Range Checking (isBetween)
    describe('isBetween', () => {
        it('should return true when date is strictly between start and end', () => {
            expect(adapter.isBetween(new FdDate(2017, 1, 15), new FdDate(2017, 1, 1), new FdDate(2017, 1, 31))).toBe(
                true
            );
        });

        it('should return false when date equals start date (exclusive boundary)', () => {
            expect(adapter.isBetween(new FdDate(2017, 1, 1), new FdDate(2017, 1, 1), new FdDate(2017, 1, 31))).toBe(
                false
            );
        });

        it('should return false when date equals end date (exclusive boundary)', () => {
            expect(adapter.isBetween(new FdDate(2017, 1, 31), new FdDate(2017, 1, 1), new FdDate(2017, 1, 31))).toBe(
                false
            );
        });

        it('should return false when date is before the range', () => {
            expect(adapter.isBetween(new FdDate(2016, 12, 31), new FdDate(2017, 1, 1), new FdDate(2017, 1, 31))).toBe(
                false
            );
        });

        it('should return false when date is after the range', () => {
            expect(adapter.isBetween(new FdDate(2017, 2, 1), new FdDate(2017, 1, 1), new FdDate(2017, 1, 31))).toBe(
                false
            );
        });

        it('should return false when any argument is null/falsy', () => {
            const date = new FdDate(2017, 1, 15);
            const start = new FdDate(2017, 1, 1);
            const end = new FdDate(2017, 1, 31);
            // Test with invalid FdDate (acts as falsy-like)
            const invalid = new FdDate(NaN as any, NaN as any, NaN as any);
            expect(adapter.isBetween(invalid, start, end)).toBe(false);
            expect(adapter.isBetween(date, invalid, end)).toBe(false);
            expect(adapter.isBetween(date, start, invalid)).toBe(false);
        });
    });

    // Group 4: Calendar Helpers
    describe('calendar helpers', () => {
        it('should return 31 for January', () => {
            expect(adapter.getNumDaysInMonth(new FdDate(2017, 1, 1))).toBe(31);
        });

        it('should return 28 for February in a non-leap year', () => {
            expect(adapter.getNumDaysInMonth(new FdDate(2017, 2, 1))).toBe(28);
        });

        it('should return 29 for February in a leap year', () => {
            expect(adapter.getNumDaysInMonth(new FdDate(2016, 2, 1))).toBe(29);
        });

        it('should return 30 for April', () => {
            expect(adapter.getNumDaysInMonth(new FdDate(2017, 4, 1))).toBe(30);
        });

        it('should return correct week number for a known date', () => {
            // FdDatetimeAdapter uses ISO week calculation.
            // Jan 1 2017 is a Sunday — ISO week 52 of 2016
            expect(adapter.getWeekNumber(new FdDate(2017, 1, 1))).toBe(52);
            // Jan 5 2017 is a Thursday — ISO week 1 of 2017
            expect(adapter.getWeekNumber(new FdDate(2017, 1, 5))).toBe(1);
        });

        it('should return week name as string for a known date', () => {
            // Week 1 formatted via toLocaleString('en-US')
            expect(adapter.getWeekName(new FdDate(2017, 1, 5))).toBe('1');
        });

        it('should return 5 weeks for a typical month (Sunday-first)', () => {
            // October 2017 starts on Sunday, 31 days, firstDayOfWeek=1 (1=Sunday)
            // S  M  T  W  T  F  S
            // 1  2  3  4  5  6  7
            // 8  9  10 11 12 13 14
            // 15 16 17 18 19 20 21
            // 22 23 24 25 26 27 28
            // 29 30 31
            // = 5 weeks
            expect(adapter.getAmountOfWeeks(2017, 10, 1)).toBe(5);
        });

        it('should return 6 weeks when month starts on Saturday with 31 days', () => {
            // July 2017 starts on Saturday (day 6), 31 days, firstDayOfWeek=1 (1=Sunday)
            // S  M  T  W  T  F  S
            //                   1
            // 2  3  4  5  6  7  8
            // 9  10 11 12 13 14 15
            // 16 17 18 19 20 21 22
            // 23 24 25 26 27 28 29
            // 30 31
            // = 6 weeks
            expect(adapter.getAmountOfWeeks(2017, 7, 1)).toBe(6);
        });

        it('should return 4 weeks for February starting on Monday in non-leap year', () => {
            // February 2021 starts on Monday, 28 days, firstDayOfWeek=2 (2=Monday)
            // M  T  W  T  F  S  S
            // 1  2  3  4  5  6  7
            // 8  9  10 11 12 13 14
            // 15 16 17 18 19 20 21
            // 22 23 24 25 26 27 28
            // = 4 weeks (perfect alignment)
            expect(adapter.getAmountOfWeeks(2021, 2, 2)).toBe(4);
        });

        it('should account for different firstDayOfWeek values', () => {
            // July 2017: 31 days, starts on Saturday
            // Sunday-first (1): 6 weeks (Saturday is last column, day 1 fills it)
            // Monday-first (2): 6 weeks (Saturday is 6th column, day 1 fills it, 30-31 overflow)
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

    // Group 6: Format Introspection (Intl format options)
    describe('format introspection', () => {
        it('should detect day period when hour12 is true', () => {
            expect(adapter.isTimeFormatIncludesDayPeriod({ hour12: true })).toBe(true);
        });

        it('should not detect day period when hour12 is false', () => {
            expect(adapter.isTimeFormatIncludesDayPeriod({ hour12: false })).toBe(false);
        });

        it('should detect hours when hour option is present', () => {
            expect(adapter.isTimeFormatIncludesHours({ hour: 'numeric' })).toBe(true);
        });

        it('should not detect hours when hour option is absent', () => {
            expect(adapter.isTimeFormatIncludesHours({ minute: '2-digit', second: '2-digit' })).toBe(false);
        });

        it('should detect minutes when minute option is present', () => {
            expect(adapter.isTimeFormatIncludesMinutes({ minute: '2-digit' })).toBe(true);
        });

        it('should not detect minutes when minute option is absent', () => {
            expect(adapter.isTimeFormatIncludesMinutes({ hour: 'numeric', second: '2-digit' })).toBe(false);
        });

        it('should detect seconds when second option is present', () => {
            expect(adapter.isTimeFormatIncludesSeconds({ second: '2-digit' })).toBe(true);
        });

        it('should not detect seconds when second option is absent', () => {
            expect(adapter.isTimeFormatIncludesSeconds({ hour: 'numeric', minute: '2-digit' })).toBe(false);
        });
    });

    // Group 7: Serialization (toIso8601)
    describe('toIso8601', () => {
        it('should convert a date to ISO 8601 string', () => {
            const iso = adapter.toIso8601(new FdDate(2017, 1, 1));
            expect(iso).toBe('2017-01-01T00:00:00');
        });

        it('should include time component in ISO 8601 string', () => {
            const iso = adapter.toIso8601(new FdDate(2017, 1, 1, 14, 30, 45));
            expect(iso).toBe('2017-01-01T14:30:45');
        });
    });

    // Group 8: Validity and Edge Cases
    describe('validity edge cases', () => {
        it('should return false for isValid(null)', () => {
            expect(adapter.isValid(null)).toBe(false);
        });

        it('should return INVALID_DATE_ERROR for format with invalid date', () => {
            const result = adapter.format(NaN as unknown as FdDate, {});
            expect(result).toBe('Invalid Date');
        });
    });

    // Group 9: isBetween null safety
    describe('isBetween null safety', () => {
        it('should return false when dateToCheck is null', () => {
            expect(adapter.isBetween(null as any, new FdDate(2017, 1, 1), new FdDate(2017, 12, 31))).toBe(false);
        });

        it('should return false when startDate is null', () => {
            expect(adapter.isBetween(new FdDate(2017, 6, 15), null as any, new FdDate(2017, 12, 31))).toBe(false);
        });

        it('should return false when endDate is null', () => {
            expect(adapter.isBetween(new FdDate(2017, 6, 15), new FdDate(2017, 1, 1), null as any)).toBe(false);
        });
    });

    // Group 10: Regression Tests — FdDatetimeAdapter (previously bugs, now fixed)
    describe('regression tests', () => {
        it('should return locale-appropriate first day of week', () => {
            // Fixed: getFirstDayOfWeek() now uses Intl.Locale.weekInfo to respect locale
            adapter.setLocale('de-DE');
            expect(adapter.getFirstDayOfWeek()).toBe(1);
        });

        it('should correctly set minutes', () => {
            // Fixed: setMinutes parameter renamed from 'hours' to 'minutes'
            const date = new FdDate(2017, 1, 1, 10, 0, 0);
            const result = adapter.setMinutes(date, 45);
            expect(result.minute).toBe(45);
            // Verify hours were not affected
            expect(result.hour).toBe(10);
        });

        it('should correctly set seconds', () => {
            // Fixed: setSeconds parameter renamed from 'hours' to 'seconds'
            const date = new FdDate(2017, 1, 1, 10, 30, 0);
            const result = adapter.setSeconds(date, 55);
            expect(result.second).toBe(55);
            // Verify hours and minutes were not affected
            expect(result.hour).toBe(10);
            expect(result.minute).toBe(30);
        });

        it('should parse time string in en-US format', () => {
            // Known limitation: _parseTimeString only works with en-US format
            const result = adapter.parse('10:30 PM', { hour: 'numeric', minute: '2-digit', hour12: true });
            expect(result).not.toBeNull();
            expect(result!.hour).toBe(22);
            expect(result!.minute).toBe(30);
        });

        it('should have fromNow implemented', () => {
            // FdDatetimeAdapter now implements fromNow using Intl.RelativeTimeFormat
            expect(adapter.fromNow).toBeDefined();
            expect(typeof adapter.fromNow).toBe('function');
        });
    });

    // Group 10e: locale signal update
    describe('locale', () => {
        it('should update locale signal when setLocale is called', () => {
            adapter.setLocale('ja-JP');
            expect(adapter.locale()).toBe('ja-JP');
        });
    });

    // Group 11: compareDate with Time Differences
    describe('compareDate with time differences', () => {
        it('should return 0 for same date and same time', () => {
            expect(adapter.compareDate(new FdDate(2017, 1, 1, 10, 30, 0), new FdDate(2017, 1, 1, 10, 30, 0))).toBe(0);
        });

        it('should return negative when first date has earlier time on same day', () => {
            expect(adapter.compareDate(new FdDate(2017, 1, 1, 8, 0, 0), new FdDate(2017, 1, 1, 14, 0, 0))).toBeLessThan(
                0
            );
        });

        it('should return positive when first date has later time on same day', () => {
            expect(
                adapter.compareDate(new FdDate(2017, 1, 1, 14, 0, 0), new FdDate(2017, 1, 1, 8, 0, 0))
            ).toBeGreaterThan(0);
        });
    });

    // Group 12: fromNow
    describe('fromNow', () => {
        it('should return a string for a past date', () => {
            const pastDate = adapter.addCalendarDays(adapter.today(), -3);
            const result = adapter.fromNow(pastDate);
            expect(typeof result).toBe('string');
            expect(result.length).toBeGreaterThan(0);
        });

        it('should return a string for a future date', () => {
            const futureDate = adapter.addCalendarDays(adapter.today(), 3);
            const result = adapter.fromNow(futureDate);
            expect(typeof result).toBe('string');
            expect(result.length).toBeGreaterThan(0);
        });

        it('should return INVALID_DATE_ERROR for an invalid date', () => {
            const invalid = new FdDate(NaN as any, NaN as any, NaN as any);
            expect(adapter.fromNow(invalid)).toBe('Invalid Date');
        });

        it('should return a relative string for a date far in the past', () => {
            const yearAgo = adapter.addCalendarYears(adapter.today(), -2);
            const result = adapter.fromNow(yearAgo);
            expect(typeof result).toBe('string');
            expect(result.length).toBeGreaterThan(0);
        });

        it('should return a relative string for a date far in the future', () => {
            const yearsAhead = adapter.addCalendarYears(adapter.today(), 2);
            const result = adapter.fromNow(yearsAhead);
            expect(typeof result).toBe('string');
            expect(result.length).toBeGreaterThan(0);
        });

        it('should respect locale when formatting', () => {
            adapter.setLocale('de-DE');
            const pastDate = adapter.addCalendarDays(adapter.today(), -3);
            const result = adapter.fromNow(pastDate);
            expect(typeof result).toBe('string');
            expect(result.length).toBeGreaterThan(0);
        });
    });

    // Group 13: Time Parsing (enhanced _parseTimeString)
    describe('time parsing', () => {
        const parseTime = (val: string): FdDate | null => adapter.parse(val, { hour: 'numeric', minute: '2-digit' });

        it('should parse 24-hour time "14:30"', () => {
            const result = parseTime('14:30');
            expect(result).not.toBeNull();
            expect(result!.hour).toBe(14);
            expect(result!.minute).toBe(30);
        });

        it('should parse 24-hour time with seconds "14:30:45"', () => {
            const result = parseTime('14:30:45');
            expect(result).not.toBeNull();
            expect(result!.hour).toBe(14);
            expect(result!.minute).toBe(30);
            expect(result!.second).toBe(45);
        });

        it('should parse 12-hour time "10:30 PM"', () => {
            const result = parseTime('10:30 PM');
            expect(result).not.toBeNull();
            expect(result!.hour).toBe(22);
            expect(result!.minute).toBe(30);
        });

        it('should parse midnight "12:00 AM"', () => {
            const result = parseTime('12:00 AM');
            expect(result).not.toBeNull();
            expect(result!.hour).toBe(0);
            expect(result!.minute).toBe(0);
        });

        it('should parse noon "12:00 PM"', () => {
            const result = parseTime('12:00 PM');
            expect(result).not.toBeNull();
            expect(result!.hour).toBe(12);
            expect(result!.minute).toBe(0);
        });

        it('should parse European dot separator "14.30"', () => {
            const result = parseTime('14.30');
            expect(result).not.toBeNull();
            expect(result!.hour).toBe(14);
            expect(result!.minute).toBe(30);
        });

        it('should parse case-insensitive AM/PM "10:30 pm"', () => {
            const result = parseTime('10:30 pm');
            expect(result).not.toBeNull();
            expect(result!.hour).toBe(22);
            expect(result!.minute).toBe(30);
        });

        it('should parse no-space AM/PM "10:30PM"', () => {
            const result = parseTime('10:30PM');
            expect(result).not.toBeNull();
            expect(result!.hour).toBe(22);
            expect(result!.minute).toBe(30);
        });

        it('should reject invalid hours "25:00"', () => {
            const result = parseTime('25:00');
            expect(result).not.toBeNull();
            expect(result!.isDateValid()).toBe(false);
        });

        it('should reject invalid 12-hour "13:00 PM"', () => {
            const result = parseTime('13:00 PM');
            expect(result).not.toBeNull();
            expect(result!.isDateValid()).toBe(false);
        });
    });

    // Group 14: Date Parsing (locale-aware fallback)
    describe('date parsing', () => {
        it('should parse ISO-style date via Date.parse (note: UTC interpretation)', () => {
            // Date.parse("2026-03-12") interprets as UTC midnight.
            // The adapter converts via local time, so the day may shift by ±1.
            const result = adapter.parse('2026-03-12');
            expect(result).not.toBeNull();
            expect(result!.year).toBe(2026);
            expect(result!.month).toBe(3);
            expect(result!.day).toBeGreaterThanOrEqual(11);
            expect(result!.day).toBeLessThanOrEqual(12);
            expect(result!.isDateValid()).toBe(true);
        });

        it('should parse US-style "1/15/2026" (en-US)', () => {
            adapter.setLocale('en-US');
            const result = adapter.parse('1/15/2026');
            expect(result).not.toBeNull();
            expect(result!.year).toBe(2026);
            expect(result!.month).toBe(1);
            expect(result!.day).toBe(15);
        });

        it('should parse European dot "31.03.2026" as day-first (de-DE) via fallback', () => {
            // Date.parse fails for "31.03.2026" because 31 is not a valid month
            // so the locale-aware fallback kicks in and uses de-DE day-first ordering
            adapter.setLocale('de-DE');
            const result = adapter.parse('31.03.2026');
            expect(result).not.toBeNull();
            expect(result!.year).toBe(2026);
            expect(result!.month).toBe(3);
            expect(result!.day).toBe(31);
        });

        it('should parse UK slash "15/03/2026" as day-first (en-GB) via fallback', () => {
            // Date.parse fails for "15/03/2026" because 15 is not a valid month
            // so the locale-aware fallback kicks in and uses en-GB day-first ordering
            adapter.setLocale('en-GB');
            const result = adapter.parse('15/03/2026');
            expect(result).not.toBeNull();
            expect(result!.year).toBe(2026);
            expect(result!.month).toBe(3);
            expect(result!.day).toBe(15);
        });

        it('should parse YYYY-first "2026/03/12" in any locale', () => {
            adapter.setLocale('de-DE');
            const result = adapter.parse('2026/03/12');
            expect(result).not.toBeNull();
            expect(result!.year).toBe(2026);
            expect(result!.month).toBe(3);
            expect(result!.day).toBe(12);
        });

        it('should reject overflow dates like Feb 30 via fallback', () => {
            // "30/02/2026" — Date.parse fails (30 not a valid month),
            // fallback tries day=30 month=2, detects overflow, returns null,
            // so _createFdDateFromDateInstance gets NaN → invalid FdDate
            adapter.setLocale('en-GB');
            const result = adapter.parse('30/02/2026');
            expect(result).not.toBeNull();
            expect(result!.isDateValid()).toBe(false);
        });

        it('should reject ambiguous two-digit years via fallback', () => {
            // "31/03/26" — Date.parse fails (31 not a valid month),
            // fallback sees two-digit year and rejects it
            adapter.setLocale('en-GB');
            const result = adapter.parse('31/03/26');
            expect(result).not.toBeNull();
            expect(result!.isDateValid()).toBe(false);
        });

        it('should parse single-digit day and month via fallback', () => {
            // "15/3/2026" — Date.parse fails (15 not a valid month),
            // fallback uses en-GB day-first: day=15, month=3
            adapter.setLocale('en-GB');
            const result = adapter.parse('15/3/2026');
            expect(result).not.toBeNull();
            expect(result!.year).toBe(2026);
            expect(result!.month).toBe(3);
            expect(result!.day).toBe(15);
        });
    });
});

describe('FdDatetimeAdapter with LOCALE_ID override', () => {
    let adapter: FdDatetimeAdapter;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [FdDatetimeAdapterModule],
            providers: [{ provide: LOCALE_ID, useValue: 'da-DK' }]
        }).compileComponents();
    }));

    beforeEach(inject([DatetimeAdapter], (_adapter: FdDatetimeAdapter) => {
        adapter = _adapter;
    }));

    it('should take the default locale id from the injection token', () => {
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
});

describe('FdDatetimeAdapter locale isolation', () => {
    let adapterA: FdDatetimeAdapter;
    let adapterB: FdDatetimeAdapter;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [FdDatetimeAdapterModule]
        }).compileComponents();
    }));

    beforeEach(inject([DatetimeAdapter], (_adapter: FdDatetimeAdapter) => {
        adapterA = _adapter;

        // Create a second independent adapter via a child injector
        const childInjector = Injector.create({
            providers: [
                { provide: DatetimeAdapter, useClass: FdDatetimeAdapter },
                { provide: LOCALE_ID, useValue: 'en' }
            ],
            parent: TestBed.inject(Injector)
        });
        adapterB = childInjector.get(DatetimeAdapter) as FdDatetimeAdapter;
    }));

    it('should not affect another adapter instance when locale is changed on one', () => {
        const date = new FdDate(2026, 3, 12);

        const formatBefore = adapterB.format(date, { month: 'long' });
        expect(formatBefore).toBe('March');

        // Change adapter A to French — adapter B should be unaffected
        adapterA.setLocale('fr');

        const formatAfter = adapterB.format(date, { month: 'long' });
        expect(formatAfter).toBe('March');
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
});
