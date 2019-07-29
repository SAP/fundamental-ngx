import { TestBed } from '@angular/core/testing';
import { CalendarService } from './calendar.service';
import { FdDate } from './models/fd-date';

describe('CalendarService', () => {
    let service: CalendarService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CalendarService]
        });
        service = TestBed.get(CalendarService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('Should return good day amount for july', () => {
        const amount = CalendarService.getDaysInMonth(7, 2019);
        expect(amount).toBe(31);
    });

    it('Should return good day amount for june', () => {
        const amount = CalendarService.getDaysInMonth(6, 2019);
        expect(amount).toBe(30);
    });

    it('Should return good day amount for pivot year on february ', () => {
        const amount = CalendarService.getDaysInMonth(2, 2016);
        expect(amount).toBe(29);
    });

    it('Should return good day amount for non pivot year on february ', () => {
        const amount = CalendarService.getDaysInMonth(2, 2018);
        expect(amount).toBe(28);
    });

    it('Should detect same dates', () => {
        const date1 = new FdDate(2019, 10, 10);
        const date2 = new FdDate(2019, 10, 10);

        const result = CalendarService.datesEqual(date1, date2);
        expect(result).toBeTruthy();
    });

    it('Should detect other year dates', () => {
        const date1 = new FdDate(2020, 10, 10);
        const date2 = new FdDate(2019, 10, 10);

        const result = CalendarService.datesEqual(date1, date2);
        expect(result).not.toBeTruthy();
    });

    it('Should detect other month dates', () => {
        const date1 = new FdDate(2019, 11, 10);
        const date2 = new FdDate(2019, 10, 10);

        const result = CalendarService.datesEqual(date1, date2);
        expect(result).not.toBeTruthy();
    });

    it('Should detect other day dates', () => {
        const date1 = new FdDate(2019, 10, 11);
        const date2 = new FdDate(2019, 10, 10);

        const result = CalendarService.datesEqual(date1, date2);
        expect(result).not.toBeTruthy();
    });

    it('Validation Should return false, when incorrect date', () => {
        const date = new FdDate(2019, 12, 32);
        expect(date.isDateValid()).not.toBeTruthy();
    });

    it('Validation Should return true, when date', () => {
        const date = new FdDate(2019, 12, 31);
        expect(date.isDateValid()).toBeTruthy();
    });

    it('Keydown handler should handle enter key', () => {
        spyOn(service.onKeySelect, 'next');
        const keyboardEvent: any = { code: 'Enter', preventDefault: () => {} };
        service.onKeydownHandler(keyboardEvent, 10);
        expect(service.onKeySelect.next).toHaveBeenCalledWith(10);
    });

    it('Keydown handler should handle space key', () => {
        spyOn(service.onKeySelect, 'next');
        const keyboardEvent: any = { code: 'Space', preventDefault: () => {} };
        service.onKeydownHandler(keyboardEvent, 10);
        expect(service.onKeySelect.next).toHaveBeenCalledWith(10);
    });

    it('Keydown handler should end of list approach', () => {
        spyOn(service.onListEndApproach, 'next');
        spyOn(service.onFocusIdChange, 'next');
        const keyboardEvent: any = { code: 'ArrowDown', preventDefault: () => {} };
        service.onKeydownHandler(keyboardEvent, 10);
        expect(service.onListEndApproach.next).toHaveBeenCalled();
        expect(service.onFocusIdChange.next).toHaveBeenCalledWith(2);
    });

    it('Keydown handler should start of list approach', () => {
        spyOn(service.onListStartApproach, 'next');
        spyOn(service.onFocusIdChange, 'next');
        const keyboardEvent: any = { code: 'ArrowUp', preventDefault: () => {} };
        service.onKeydownHandler(keyboardEvent, 2);
        expect(service.onListStartApproach.next).toHaveBeenCalled();
        expect(service.onFocusIdChange.next).toHaveBeenCalledWith(10);
    });
});
