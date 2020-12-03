import { TestBed } from '@angular/core/testing';

import { CalendarService } from './calendar.service';

describe('CalendarService', () => {
    let service: CalendarService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CalendarService]
        });
        service = TestBed.inject(CalendarService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
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
