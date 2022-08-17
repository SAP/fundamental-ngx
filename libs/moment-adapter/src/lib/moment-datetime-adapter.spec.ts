import { Platform } from '@angular/cdk/platform';
import { LOCALE_ID } from '@angular/core';
import { waitForAsync, inject, TestBed } from '@angular/core/testing';
import moment from 'moment';

import { DatetimeAdapter } from '@fundamental-ngx/core/datetime';

import { MomentDatetimeAdapter } from './moment-datetime-adapter';
import { MomentDatetimeModule } from './moment-datetime.module';

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

describe('MomentDatetimeAdapter', () => {
    let platform: Platform;
    let adapter: MomentDatetimeAdapter;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MomentDatetimeModule]
        }).compileComponents();
    }));

    beforeEach(inject([DatetimeAdapter, Platform], (dateAdapter: MomentDatetimeAdapter, _platform: Platform) => {
        adapter = dateAdapter;
        platform = _platform;
    }));

    it('should get year', () => {
        expect(adapter.getYear(moment([2017, JAN, 1]))).toBe(2017);
    });

    it('should get month', () => {
        expect(adapter.getMonth(moment([2017, JAN, 1]))).toBe(1);
    });

    it('should get date', () => {
        expect(adapter.getDate(moment([2017, JAN, 1]))).toBe(1);
    });

    it('should get day of week', () => {
        expect(adapter.getDayOfWeek(moment([2017, JAN, 1]))).toBe(1);
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
        adapter.setLocale('ar-AE');
        expect(adapter.getDateNames()).toEqual([
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
            '٢٣',
            '٢٤',
            '٢٥',
            '٢٦',
            '٢٧',
            '٢٨',
            '٢٩',
            '٣٠',
            '٣١'
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
        expect(adapter.getYearName(moment([2017, JAN, 1]))).toBe('2017');
    });

    it('should get year name in a different locale', () => {
        adapter.setLocale('ar-AE');
        expect(adapter.getYearName(moment([2017, JAN, 1]))).toBe('٢٠١٧');
    });

    it('should get first day of week', () => {
        expect(adapter.getFirstDayOfWeek()).toBe(0);
    });

    it('should create Date', () => {
        expect(adapter.createDate(2017, JAN, 1).format()).toEqual(moment([2017, JAN, 1]).format());
    });

    it('should not create Date with month over/under-flow', () => {
        expect(() => adapter.createDate(2017, 13, 1)).toThrow();
        expect(() => adapter.createDate(2017, -1, 1)).toThrow();
    });

    it('should not create Date with date over/under-flow', () => {
        expect(() => adapter.createDate(2017, FEB, 32)).toThrow();
        expect(() => adapter.createDate(2017, FEB, 0)).toThrow();
    });

    it('should get year name for low year numbers', () => {
        const createAndFormat = (year: number): string => adapter.getYearName(adapter.createDate(year, JAN, 1));

        expect(createAndFormat(50)).toEqual('0050');
        expect(createAndFormat(99)).toEqual('0099');
        expect(createAndFormat(100)).toEqual('0100');
    });

    it('should create Date with low year number', () => {
        expect(adapter.createDate(-1, JAN, 1).year()).toBe(-1);
        expect(adapter.createDate(0, JAN, 1).year()).toBe(0);
        expect(adapter.createDate(50, JAN, 1).year()).toBe(50);
        expect(adapter.createDate(99, JAN, 1).year()).toBe(99);
        expect(adapter.createDate(100, JAN, 1).year()).toBe(100);
    });

    it('should format Date with low year number', () => {
        const createAndFormat = (year: number): string => adapter.format(adapter.createDate(year, JAN, 1), 'L');

        expect(createAndFormat(50)).toBe('01/01/0050');
        expect(createAndFormat(99)).toBe('01/01/0099');
        expect(createAndFormat(100)).toBe('01/01/0100');
    });

    it(`should get today's date`, () => {
        expect(adapter.datesEqual(adapter.today(), moment().startOf('day'))).toBe(
            true,
            `should be equal to today's date`
        );
    });

    it(`should get now date`, () => {
        expect(adapter.datesEqual(adapter.now(), moment())).toBe(true, `should be equal to now date moment`);
    });

    it('should parse "en" date string', () => {
        expect(adapter.parse('1/1/2017', 'M/D/YYYY')?.format()).toEqual(moment([2017, JAN, 1]).format());
    });

    it('should parse "en" time string', () => {
        expect(adapter.parse('10:30 PM', 'HH:mm:ss A')?.format()).toEqual(
            moment({ hours: 22, minutes: 30, seconds: 0 }).format()
        );
        expect(adapter.parse('10:30', 'HH:mm:ss')?.format()).toEqual(
            moment({ hours: 10, minutes: 30, seconds: 0 }).format()
        );
    });

    it('should parse number', () => {
        const timestamp = new Date(2017, JAN, 1).getTime();
        expect(adapter.parse(timestamp)?.format()).toEqual(moment([2017, JAN, 1]).format());
    });

    it('should parse Date', () => {
        const date = moment([2017, JAN, 1]);
        expect(adapter.parse(date)).toEqual(date);
        expect(adapter.parse(date)).not.toBe(date);
    });

    it('should parse invalid value as invalid', () => {
        const date = adapter.parse('hello', 'M/D/YYYY');
        expect(date).not.toBeNull();
        expect(date?.isValid()).toBeFalse();
    });

    it('should format', () => {
        expect(adapter.format(moment([2017, JAN, 1]), 'L')).toEqual('01/01/2017');
    });

    it('should format with custom format', () => {
        expect(adapter.format(moment([2017, JAN, 1]), 'MMMM D, YYYY')).toEqual('January 1, 2017');
    });

    it('should format with a different locale', () => {
        adapter.setLocale('ja-JP');
        expect(adapter.format(moment([2017, JAN, 1]), 'LL')).toEqual('2017年1月1日');
    });

    it('should add years', () => {
        expect(adapter.addCalendarYears(moment([2017, JAN, 1]), 1).format()).toEqual(moment([2018, JAN, 1]).format());
        expect(adapter.addCalendarYears(moment([2017, JAN, 1]), -1).format()).toEqual(moment([2016, JAN, 1]).format());
    });

    it('should respect leap years when adding years', () => {
        expect(adapter.addCalendarYears(moment([2016, FEB, 29]), 1).format()).toEqual(moment([2017, FEB, 28]).format());
        expect(adapter.addCalendarYears(moment([2016, FEB, 29]), -1).format()).toEqual(
            moment([2015, FEB, 28]).format()
        );
    });

    it('should add months', () => {
        expect(adapter.addCalendarMonths(moment([2017, JAN, 1]), 1).format()).toEqual(moment([2017, FEB, 1]).format());
        expect(adapter.addCalendarMonths(moment([2017, JAN, 1]), -1).format()).toEqual(moment([2016, DEC, 1]).format());
    });

    it('should respect month length differences when adding months', () => {
        expect(adapter.addCalendarMonths(moment([2017, JAN, 31]), 1).format()).toEqual(
            moment([2017, FEB, 28]).format()
        );
        expect(adapter.addCalendarMonths(moment([2017, MAR, 31]), -1).format()).toEqual(
            moment([2017, FEB, 28]).format()
        );
    });

    it('should add days', () => {
        expect(adapter.addCalendarDays(moment([2017, JAN, 1]), 1).format()).toEqual(moment([2017, JAN, 2]).format());
        expect(adapter.addCalendarDays(moment([2017, JAN, 1]), -1).format()).toEqual(moment([2016, DEC, 31]).format());
    });

    it('should clone', () => {
        const date = moment([2017, JAN, 1]);
        expect(adapter.clone(date)).toEqual(date);
        expect(adapter.clone(date)).not.toBe(date);
    });

    it('should preserve time when cloning', () => {
        const date = moment([2017, 1, 1, 4, 5, 6]);
        expect(adapter.clone(date).format()).toEqual(moment(date).format());
        expect(adapter.clone(date)).not.toBe(date);
    });

    it('should compare dates', () => {
        expect(adapter.compareDate(moment([2017, JAN, 1]), moment([2017, JAN, 2]))).toBeLessThan(0);
        expect(adapter.compareDate(moment([2017, JAN, 1]), moment([2017, FEB, 1]))).toBeLessThan(0);
        expect(adapter.compareDate(moment([2017, JAN, 1]), moment([2018, JAN, 1]))).toBeLessThan(0);
        expect(adapter.compareDate(moment([2017, JAN, 1]), moment([2017, JAN, 1]))).toBe(0);
        expect(adapter.compareDate(moment([2018, JAN, 1]), moment([2017, JAN, 1]))).toBeGreaterThan(0);
        expect(adapter.compareDate(moment([2017, FEB, 1]), moment([2017, JAN, 1]))).toBeGreaterThan(0);
        expect(adapter.compareDate(moment([2017, JAN, 2]), moment([2017, JAN, 1]))).toBeGreaterThan(0);
    });

    it('should use UTC for formatting by default', () => {
        expect(adapter.format(moment([1800, 7, 14]), 'DD')).toBe('14');
    });

    it('should count today as a valid date instance', () => {
        const date = moment();
        expect(adapter.isValid(date)).toBe(true);
    });

    it('should count an invalid date as an invalid date instance', () => {
        const date = moment(NaN);
        expect(adapter.isValid(date)).toBe(false);
    });

    it('should not throw when attempting to format a date with a year less than 1', () => {
        expect(() => adapter.format(moment([-1, 1, 1]), '')).not.toThrow();
    });

    it('should not throw when attempting to format a date with a year greater than 9999', () => {
        expect(() => adapter.format(moment([10000, 1, 1]), '')).not.toThrow();
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

describe('MomentDatetimeAdapter with LOCALE_ID override', () => {
    let adapter: MomentDatetimeAdapter;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MomentDatetimeModule],
            providers: [{ provide: LOCALE_ID, useValue: 'da-DK' }]
        }).compileComponents();
    }));

    beforeEach(inject([DatetimeAdapter], (_adapter: MomentDatetimeAdapter) => {
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
});
