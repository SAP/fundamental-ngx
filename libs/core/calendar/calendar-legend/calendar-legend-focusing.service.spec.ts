import { TestBed } from '@angular/core/testing';
import { CalendarLegendFocusingService } from './calendar-legend-focusing.service';

describe('CalendarLegendFocusingService', () => {
    let service: CalendarLegendFocusingService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CalendarLegendFocusingService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should set focus on a cell and update the BehaviorSubject', () => {
        const mockElement = document.createElement('div');
        const mockCalIndex = 1;
        const mockSpecialNumber = 5;

        service.setFocusOnCell(mockElement, mockCalIndex, mockSpecialNumber);

        expect(service.focusedElement).toBe(mockElement);
        expect(service.calIndex).toBe(mockCalIndex);
        expect(service.specialNumber).toBe(mockSpecialNumber);

        service.cellSubject$.subscribe((value) => {
            expect(value).toEqual({
                cell: mockElement,
                calIndex: mockCalIndex,
                cellNumber: mockSpecialNumber
            });
        });
    });

    it('should set focus on a cell without a special number', () => {
        const mockElement = document.createElement('div');
        const mockCalIndex = 2;

        service.setFocusOnCell(mockElement, mockCalIndex);

        expect(service.focusedElement).toBe(mockElement);
        expect(service.calIndex).toBe(mockCalIndex);
        expect(service.specialNumber).toBeUndefined();

        service.cellSubject$.subscribe((value) => {
            expect(value).toEqual({
                cell: mockElement,
                calIndex: mockCalIndex,
                cellNumber: null
            });
        });
    });

    it('should get the currently focused special number', () => {
        const mockSpecialNumber = 10;
        const mockElement = document.createElement('div');

        service.setFocusOnCell(mockElement, 0, mockSpecialNumber);
        const focusedSpecialNumber = service.specialNumber;

        expect(focusedSpecialNumber).toBe(mockSpecialNumber);
    });

    it('should clear the focused element and update the BehaviorSubject', () => {
        const mockElement = document.createElement('div');
        const mockCalIndex = 3;
        const mockSpecialNumber = 15;

        service.setFocusOnCell(mockElement, mockCalIndex, mockSpecialNumber);

        service.clearFocusedElement();

        expect(service.focusedElement).toBeNull();
        expect(service.specialNumber).toBeNull();

        service.cellSubject$.subscribe((value) => {
            expect(value).toEqual({
                cell: null,
                calIndex: null,
                cellNumber: null
            });
        });
    });
});
