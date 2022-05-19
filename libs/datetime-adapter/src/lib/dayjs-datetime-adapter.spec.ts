import { Platform } from '@angular/cdk/platform';
import { LOCALE_ID } from '@angular/core';
import { waitForAsync, inject, TestBed } from '@angular/core/testing';
import dayjs from 'dayjs';

import { DatetimeAdapter } from '@fundamental-ngx/core/datetime';

import { DayjsDatetimeAdapter } from './dayjs-datetime-adapter';
import { DayjsDatetimeAdapterModule } from './dayjs-datetime-adapter.module';

// preload locales that are used in tests
import 'dayjs/locale/ja';
import 'dayjs/locale/da';
import 'dayjs/locale/ar-ma';

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

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [DayjsDatetimeAdapterModule]
            }).compileComponents();
        })
    );

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
        expect(adapter.createDate(2017, JAN, 1).format()).toEqual(dayjs(new Date(2017, JAN, 1)).format());
    });

    it('should get year name for low year numbers', () => {
        const createAndFormat = (year: number): string => adapter.getYearName(adapter.createDate(year, JAN, 1));

        expect(createAndFormat(50)).toEqual('1950');
        expect(createAndFormat(99)).toEqual('1999');
        expect(createAndFormat(100)).toEqual('100');
    });

    it('should create Date with low year number', () => {
        expect(adapter.createDate(-1, JAN, 1).year()).toBe(-1);
        expect(adapter.createDate(0, JAN, 1).year()).toBe(1900);
        expect(adapter.createDate(50, JAN, 1).year()).toBe(1950);
        expect(adapter.createDate(99, JAN, 1).year()).toBe(1999);
        expect(adapter.createDate(100, JAN, 1).year()).toBe(100);
    });

    it('should format Date with low year number', () => {
        const createAndFormat = (year: number): string => adapter.format(adapter.createDate(year, JAN, 1), 'L');

        expect(createAndFormat(50)).toBe('01/01/1950');
        expect(createAndFormat(99)).toBe('01/01/1999');
        expect(createAndFormat(100)).toBe('01/01/100');
    });

    it(`should get today's date`, () => {
        expect(adapter.datesEqual(adapter.today(), dayjs().startOf('day'))).toBe(
            true,
            `should be equal to today's date`
        );
    });

    it(`should get now date`, () => {
        expect(adapter.datesEqual(adapter.now(), dayjs())).toBe(true, `should be equal to now date moment`);
    });

    it('should parse "en" date string', () => {
        expect(adapter.parse('1/3/2017', 'M/D/YYYY')?.format()).toEqual(dayjs(new Date(2017, JAN, 3)).format());
    });

    it('should parse "en" datetime string with localized format', () => {
        expect(adapter.parse('1/3/2017', 'L HH:mm:ss A')?.format()).toEqual(dayjs(new Date(2017, JAN, 3)).format());
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
        expect(date?.isValid()).toBeFalse();
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
        expect(adapter.getDayPeriodNames()).toEqual(['م', 'ص']);
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
});

describe('MomentDatetimeAdapter with LOCALE_ID override', () => {
    let adapter: DayjsDatetimeAdapter;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [DayjsDatetimeAdapterModule],
                providers: [{ provide: LOCALE_ID, useValue: 'da' }]
            }).compileComponents();
        })
    );

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
});
