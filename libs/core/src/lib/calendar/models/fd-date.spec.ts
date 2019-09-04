import { FdDate } from './fd-date';

describe('FdDateSpec', () => {
    it('should handle next day', () => {
        const fdDate = new FdDate(2018, 12, 31);
        expect(fdDate.nextDay()).toEqual(new FdDate(2019, 1, 1));
    });

    it('should handle previous day', () => {
        const fdDate = new FdDate(2019, 1, 1);
        expect(fdDate.previousDay()).toEqual(new FdDate(2018, 12, 31));
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
});
