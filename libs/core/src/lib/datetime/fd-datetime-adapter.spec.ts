import { Platform } from '@angular/cdk/platform';
import { LOCALE_ID } from '@angular/core';
import { waitForAsync, inject, TestBed } from '@angular/core/testing';

import { DatetimeAdapter, FdDatetimeAdapter, FdDatetimeAdapterModule, FdDate } from './index';

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
