import { FdDate } from './index';
import { INVALID_DATE_ERROR } from '@fundamental-ngx/core/utils';

describe('FdDate', () => {
    it('should create FdDate instance of now by new with no parameters', () => {
        const date = new Date();
        const fdDate = new FdDate();

        expect(fdDate.year).toEqual(date.getFullYear());
        expect(fdDate.month).toEqual(date.getMonth() + 1);
        expect(fdDate.day).toEqual(date.getDate());
        expect(fdDate.hour).toEqual(date.getHours());
        expect(fdDate.minute).toEqual(date.getMinutes());
        expect(fdDate.second).toEqual(date.getSeconds());
    });

    it('should create FdDate instance only using year info, others parameters uses default values', () => {
        const fdDate = new FdDate(2015);

        expect(fdDate.year).toEqual(2015);
        expect(fdDate.month).toEqual(1);
        expect(fdDate.day).toEqual(1);
        expect(fdDate.hour).toEqual(0);
        expect(fdDate.minute).toEqual(0);
        expect(fdDate.second).toEqual(0);
    });

    it('should create FdDate instance only using year and month data, others parameters uses default values', () => {
        const fdDate = new FdDate(2015, 5);

        expect(fdDate.year).toEqual(2015);
        expect(fdDate.month).toEqual(5);
        expect(fdDate.day).toEqual(1);
        expect(fdDate.hour).toEqual(0);
        expect(fdDate.minute).toEqual(0);
        expect(fdDate.second).toEqual(0);
    });

    it('should create FdDate instance only using year, month and day data, others parameters uses default values', () => {
        const fdDate = new FdDate(2015, 5, 15);

        expect(fdDate.year).toEqual(2015);
        expect(fdDate.month).toEqual(5);
        expect(fdDate.day).toEqual(15);
        expect(fdDate.hour).toEqual(0);
        expect(fdDate.minute).toEqual(0);
        expect(fdDate.second).toEqual(0);
    });

    it('should create FdDate instance using date and time values', () => {
        const fdDate = new FdDate(2015, 5, 15, 12, 35, 10);

        expect(fdDate.year).toEqual(2015);
        expect(fdDate.month).toEqual(5);
        expect(fdDate.day).toEqual(15);
        expect(fdDate.hour).toEqual(12);
        expect(fdDate.minute).toEqual(35);
        expect(fdDate.second).toEqual(10);
    });

    it('should be invalid date if month is not between 1 - 12', () => {
        expect(new FdDate(2020, 1, 1).isDateValid()).toBeTrue();
        expect(new FdDate(2020, 12, 1).isDateValid()).toBeTrue();
        expect(new FdDate(2020, 0, 1).isDateValid()).toBeFalse();
        expect(new FdDate(2020, 13, 1).isDateValid()).toBeFalse();
    });

    it('should be invalid date if day is integer and less than 1', () => {
        expect(new FdDate(2020, 1, 1).isDateValid()).toBeTrue();
        expect(new FdDate(2020, 1, 0).isDateValid()).toBeFalse();
    });

    it('should be invalid date if day is integer and not valid for particular month and year', () => {
        expect(new FdDate(2017, 2, 29).isDateValid()).toBeFalse();
    });

    it('should be invalid date if hour, minute or second is integer and out of range', () => {
        expect(new FdDate(2020, 1, 1, -1).isDateValid()).toBeFalse();
        expect(new FdDate(2020, 1, 1, 24).isDateValid()).toBeFalse();
        expect(new FdDate(2020, 1, 1, 0, -1).isDateValid()).toBeFalse();
        expect(new FdDate(2020, 1, 1, 0, 60).isDateValid()).toBeFalse();
        expect(new FdDate(2020, 1, 1, 0, 0, -1).isDateValid()).toBeFalse();
        expect(new FdDate(2020, 1, 1, 0, 0, 60).isDateValid()).toBeFalse();
    });

    it('should create invalid FdDate', () => {
        expect(new FdDate().isDateValid()).toBeTrue();
        expect(new FdDate(2017, 1, 1).isDateValid()).toBeTrue();
        expect(new FdDate(2017, 1, 1, 6, 30, 40).isDateValid()).toBeTrue();

        expect(new FdDate('date' as any).isDateValid()).not.toBeTrue();
        expect(new FdDate(NaN).isDateValid()).not.toBeTrue();
        expect(new FdDate(null).isDateValid()).not.toBeTrue();
        expect(new FdDate(2020, NaN).isDateValid()).not.toBeTrue();
        expect(new FdDate(2020, null).isDateValid()).not.toBeTrue();
        expect(new FdDate(2020, 1, NaN).isDateValid()).not.toBeTrue();
        expect(new FdDate(2020, 1, null).isDateValid()).not.toBeTrue();
        expect(new FdDate(2020, 1, 1, NaN).isDateValid()).not.toBeTrue();
        expect(new FdDate(2020, 1, 1, 0, NaN).isDateValid()).not.toBeTrue();
        expect(new FdDate(2020, 1, 1, 0, 0, NaN).isDateValid()).not.toBeTrue();
    });

    it('should create FdDate by "getNow()"', () => {
        const date = new Date();
        const fdDate = FdDate.getNow();

        expect(fdDate.year).toEqual(date.getFullYear());
        expect(fdDate.month).toEqual(date.getMonth() + 1);
        expect(fdDate.day).toEqual(date.getDate());
        expect(fdDate.hour).toEqual(date.getHours());
        expect(fdDate.minute).toEqual(date.getMinutes());
        expect(fdDate.second).toEqual(date.getSeconds());
    });

    it('should create FdDate by "getToday()"', () => {
        const date = new Date();
        const fdDate = FdDate.getToday();

        expect(fdDate.year).toEqual(date.getFullYear());
        expect(fdDate.month).toEqual(date.getMonth() + 1);
        expect(fdDate.day).toEqual(date.getDate());
        expect(fdDate.hour).toEqual(0);
        expect(fdDate.minute).toEqual(0);
        expect(fdDate.second).toEqual(0);
    });

    it('should convert native Date instance to FdDate instance by "getFdDateByDate(date)"', () => {
        const date = new Date(2018, 2, 3, 4, 5, 6);
        const fdDate = FdDate.getFdDateByDate(date);

        expect(fdDate.year).toEqual(date.getFullYear());
        expect(fdDate.month).toEqual(date.getMonth() + 1);
        expect(fdDate.day).toEqual(date.getDate());
        expect(fdDate.hour).toEqual(date.getHours());
        expect(fdDate.minute).toEqual(date.getMinutes());
        expect(fdDate.second).toEqual(date.getSeconds());
    });

    it('should convert FdDate to string by "toString()"', () => {
        expect(new FdDate(2020, 5, 6, 3, 5).toString()).toEqual('2020-05-06T03:05:00');
        expect(new FdDate(2020, 11, 21, 13, 25).toString()).toEqual('2020-11-21T13:25:00');
    });

    it('should convert FdDate to string by "toDateString()"', () => {
        expect(new FdDate(2020, 5, 6, 3, 5).toDateString()).toEqual('2020-05-06');
        expect(new FdDate(2020, 11, 21, 13, 25).toDateString()).toEqual('2020-11-21');
    });

    it('should convert FdDate to string by "toTimeString()"', () => {
        expect(new FdDate(2020, 5, 6, 3, 5, 8).toTimeString()).toEqual('03:05:08');
        expect(new FdDate(2020, 11, 21, 13, 25, 15).toTimeString()).toEqual('13:25:15');
    });

    it('should convert FdDate to milliseconds number by "getTimeStamp()"', () => {
        expect(new FdDate(2020, 11, 5, 20, 30, 40).getTimeStamp()).toEqual(new Date(2020, 10, 5, 20, 30, 40).getTime());
    });

    it('should convert FdDate to Date instance by "toDate()"', () => {
        expect(new FdDate(2020, 11, 5, 20, 30, 40).toDate().toUTCString()).toEqual(
            new Date(2020, 10, 5, 20, 30, 40).toUTCString()
        );
    });

    it('should get day of week by "getDayOfWeek()"', () => {
        expect(new FdDate(2020, 11, 21).getDayOfWeek()).toEqual(7 /* Saturday */);
    });

    it('should get invalid date error message for invalid date when we invoke methods which returns string format', () => {
        const invalidFdDate = new FdDate(12312, 24, 44);
        expect(invalidFdDate.toString()).toBe(INVALID_DATE_ERROR);
        expect(invalidFdDate.toDateString()).toBe(INVALID_DATE_ERROR);
        expect(invalidFdDate.toTimeString()).toBe(INVALID_DATE_ERROR);
    });

    it('should get NaN for invalid date when we invoke methods which returns number format', () => {
        const invalidFdDate = new FdDate(12312, 24, 44);
        expect(invalidFdDate.valueOf()).toBeNaN();
        expect(invalidFdDate.getTimeStamp()).toBeNaN();
        expect(invalidFdDate.getDayOfWeek()).toBeNaN();
    });

    it('should change FdDate validation status by setTime()', () => {
        const validDate = new FdDate(2020, 11, 21);
        expect(validDate.setTime(25, 100, 100).isDateValid()).toBeFalse();
    });
});
