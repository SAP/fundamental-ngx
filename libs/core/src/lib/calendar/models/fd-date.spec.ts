import { FdDate } from './fd-date';

describe('FdDateSpec', () => {
    it('should handle next day on year end', () => {
        const fdDate = new FdDate(2018, 12, 31);
        expect(fdDate.nextDay()).toEqual(new FdDate(2019, 1, 1));
    });

    it('should handle next day on month end', () => {
        const fdDate = new FdDate(2018, 9, 31);
        expect(fdDate.nextDay()).toEqual(new FdDate(2018, 10, 1));
    });

    it('should handle next day', () => {
        const fdDate = new FdDate(2020, 2, 29);
        expect(fdDate.nextDay()).toEqual(new FdDate(2020, 3, 1));
    });

    it('should handle previous day on year end', () => {
        const fdDate = new FdDate(2019, 1, 1);
        expect(fdDate.previousDay()).toEqual(new FdDate(2018, 12, 31));
    });

    it('should handle previous day on month end', () => {
        const fdDate = new FdDate(2019, 10, 1);
        expect(fdDate.previousDay()).toEqual(new FdDate(2019, 9, 30));
    });

    it('should handle previous day', () => {
        const fdDate = new FdDate(2019, 10, 10);
        expect(fdDate.previousDay()).toEqual(new FdDate(2019, 10, 9));
    });

    it('should handle previous on leap year on feb day', () => {
        const fdDate = new FdDate(2020, 3, 1);
        expect(fdDate.previousDay()).toEqual(new FdDate(2020, 2, 29));
    });

    it('should return sunday (1)', () => {
        const fdDate = new FdDate(2022, 12, 25);
        expect(fdDate.getDay()).toBe(1);
    });

    it('should return monday (2)', () => {
        const fdDate = new FdDate(2019, 7, 15);
        expect(fdDate.getDay()).toBe(2);
    });

    it('should return tuesday (3)', () => {
        const fdDate = new FdDate(2017, 7, 4);
        expect(fdDate.getDay()).toBe(3);
    });

    it('should return wednesday (4)', () => {
        const fdDate = new FdDate(2018, 4, 18);
        expect(fdDate.getDay()).toBe(4);
    });

    it('should return thursday (5)', () => {
        const fdDate = new FdDate(2022, 8, 18);
        expect(fdDate.getDay()).toBe(5);
    });

    it('should return friday (6)', () => {
        const fdDate = new FdDate(2019, 1, 25);
        expect(fdDate.getDay()).toBe(6);
    });

    it('should return saturday (7)', () => {
        const fdDate = new FdDate(2022, 9, 24);
        expect(fdDate.getDay()).toBe(7);
    });

    it('should return good week number for 28.12.2020 (53)', () => {
        const fdDate = new FdDate(2020, 12, 28);
        expect(fdDate.getWeekNumber()).toBe(53);
    });

    it('should return good week number for 01.01.2020 (1)', () => {
        const fdDate = new FdDate(2020, 1, 1);
        expect(fdDate.getWeekNumber()).toBe(1);
    });

    it('should return good week number for 7.03.2016 (10)', () => {
        const fdDate = new FdDate(2016, 3, 7);
        expect(fdDate.getWeekNumber()).toBe(10);
    });

    it('should return good week number for 29.02.2000 (9)', () => {
        const fdDate = new FdDate(2000, 2, 29);
        expect(fdDate.getWeekNumber()).toBe(9);
    });
});
