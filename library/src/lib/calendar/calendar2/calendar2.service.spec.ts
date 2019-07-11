import { TestBed } from '@angular/core/testing';
import { Calendar2Service } from './calendar2.service';
import { FdDate } from './models/fd-date';

describe('CalendarService', () => {
    let service: Calendar2Service;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [Calendar2Service]
        });
        service = TestBed.get(Calendar2Service);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('Should return good day amount for july', () => {
        const amount = service.getDaysInMonth(7, 2019);
        expect(amount).toBe(31);
    });

    it('Should return good day amount for june', () => {
        const amount = service.getDaysInMonth(6, 2019);
        expect(amount).toBe(30);
    });

    it('Should return good day amount for pivot year on february ', () => {
        const amount = service.getDaysInMonth(2, 2016);
        expect(amount).toBe(29);
    });

    it('Should return good day amount for non pivot year on february ', () => {
        const amount = service.getDaysInMonth(2, 2018);
        expect(amount).toBe(28);
    });

    it('Should detect same dates', () => {
        const date1 = new FdDate(2019, 10, 10);
        const date2 = new FdDate(2019, 10, 10);

        const result = service.datesEqual(date1, date2);
        expect(result).toBeTruthy();
    });

    it('Should detect other year dates', () => {
        const date1 = new FdDate(2020, 10, 10);
        const date2 = new FdDate(2019, 10, 10);

        const result = service.datesEqual(date1, date2);
        expect(result).not.toBeTruthy();
    });

    it('Should detect other month dates', () => {
        const date1 = new FdDate(2019, 11, 10);
        const date2 = new FdDate(2019, 10, 10);

        const result = service.datesEqual(date1, date2);
        expect(result).not.toBeTruthy();
    });

    it('Should detect other day dates', () => {
        const date1 = new FdDate(2019, 10, 11);
        const date2 = new FdDate(2019, 10, 10);

        const result = service.datesEqual(date1, date2);
        expect(result).not.toBeTruthy();
    });

});
