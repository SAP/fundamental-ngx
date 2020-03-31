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
        const keyboardEvent: any = { key: 'Enter', preventDefault: () => {} };
        service.onKeydownHandler(keyboardEvent, 10);
        expect(service.onKeySelect.next).toHaveBeenCalledWith(10);
    });

    it('Keydown handler should handle space key', () => {
        spyOn(service.onKeySelect, 'next');
        const keyboardEvent: any = { key: ' ', preventDefault: () => {} };
        service.onKeydownHandler(keyboardEvent, 10);
        expect(service.onKeySelect.next).toHaveBeenCalledWith(10);
    });

    it('Keydown handler should call onListEndApproach, when arrow down on last row', () => {
        service.rowAmount = 5;
        service.colAmount = 6;
        const idOfLastElement = service.getId(4, 2);
        const idOfElementFocused = service.getId(0, 2);
        spyOn(service.onListEndApproach, 'next');
        const keyboardEvent: any = { key: 'ArrowDown', preventDefault: () => {} };
        service.onKeydownHandler(keyboardEvent, idOfLastElement);
        expect(service.onListEndApproach.next).toHaveBeenCalledWith(idOfElementFocused);
    });

    it('Keydown handler should call onListStartApproach, when arrow up on first row', () => {
        service.rowAmount = 7;
        service.colAmount = 10;
        const idOfFirstElement = service.getId(0, 1);
        const idOfElementFocused = service.getId(6, 1);
        spyOn(service.onListStartApproach, 'next');
        const keyboardEvent: any = { key: 'ArrowUp', preventDefault: () => {} };
        service.onKeydownHandler(keyboardEvent, idOfFirstElement);
        expect(service.onListStartApproach.next).toHaveBeenCalledWith(idOfElementFocused);
    });

    it('Keydown handler should call onListEndApproach, when arrow right on last row', () => {
        service.rowAmount = 7;
        service.colAmount = 4;
        const idOfLastElement = service.getId(6, 3);
        const idOfElementFocused = service.getId(0, 0);
        spyOn(service.onListEndApproach, 'next');
        const keyboardEvent: any = { key: 'ArrowRight', preventDefault: () => {} };
        service.onKeydownHandler(keyboardEvent, idOfLastElement);
        expect(service.onListEndApproach.next).toHaveBeenCalledWith(idOfElementFocused);
    });

    it('Keydown handler should call onListStartApproach, when arrow left on first row', () => {
        service.rowAmount = 7;
        service.colAmount = 4;
        const idOfFirstElement = service.getId(0, 0);
        const idOfElementFocused = service.getId(6, 3);
        spyOn(service.onListStartApproach, 'next');
        const keyboardEvent: any = { key: 'ArrowLeft', preventDefault: () => {} };
        service.onKeydownHandler(keyboardEvent, idOfFirstElement);
        expect(service.onListStartApproach.next).toHaveBeenCalledWith(idOfElementFocused);
    });

    it('Keydown handler should emit changed id to focus on arrow down', () => {
        service.rowAmount = 7;
        service.colAmount = 4;
        const idOfFirstElement = service.getId(3, 3);
        const idOfElementFocused = service.getId(4, 3);
        spyOn(service.onFocusIdChange, 'next');
        const keyboardEvent: any = { key: 'ArrowDown', preventDefault: () => {} };
        service.onKeydownHandler(keyboardEvent, idOfFirstElement);
        expect(service.onFocusIdChange.next).toHaveBeenCalledWith(idOfElementFocused);
    });

    it('Keydown handler should emit changed id to focus on arrow up', () => {
        service.rowAmount = 7;
        service.colAmount = 4;
        const idOfFirstElement = service.getId(3, 3);
        const idOfElementFocused = service.getId(2, 3);
        spyOn(service.onFocusIdChange, 'next');
        const keyboardEvent: any = { key: 'ArrowUp', preventDefault: () => {} };
        service.onKeydownHandler(keyboardEvent, idOfFirstElement);
        expect(service.onFocusIdChange.next).toHaveBeenCalledWith(idOfElementFocused);
    });

    it('Keydown handler should emit changed id to focus on arrow left', () => {
        service.rowAmount = 7;
        service.colAmount = 4;
        const idOfFirstElement = service.getId(3, 0);
        const idOfElementFocused = service.getId(2, 3);
        spyOn(service.onFocusIdChange, 'next');
        const keyboardEvent: any = { key: 'ArrowLeft', preventDefault: () => {} };
        service.onKeydownHandler(keyboardEvent, idOfFirstElement);
        expect(service.onFocusIdChange.next).toHaveBeenCalledWith(idOfElementFocused);
    });

    it('Keydown handler should emit changed id to focus on arrow right', () => {
        service.rowAmount = 7;
        service.colAmount = 4;
        const idOfFirstElement = service.getId(5, 3);
        const idOfElementFocused = service.getId(6, 0);
        spyOn(service.onFocusIdChange, 'next');
        const keyboardEvent: any = { key: 'ArrowRight', preventDefault: () => {} };
        service.onKeydownHandler(keyboardEvent, idOfFirstElement);
        expect(service.onFocusIdChange.next).toHaveBeenCalledWith(idOfElementFocused);
    });
});
