import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { FdDatetimeModule, FdDate } from '../datetime';

import { CalendarComponent } from './calendar.component';
import { CalendarModule } from './calendar.module';
import { ButtonModule } from '../button/button.module';

describe('CalendarComponent', () => {
    let component: CalendarComponent<FdDate>;
    let fixture: ComponentFixture<CalendarComponent<FdDate>>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [FdDatetimeModule, CalendarModule, ButtonModule]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent<CalendarComponent<FdDate>>(CalendarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should handle selected date changed in single mode', () => {
        const date = new FdDate(2000, 10, 10);
        spyOn(component.selectedDateChange, 'emit');
        spyOn(component.closeCalendar, 'emit');
        spyOn(component, 'onChange');
        component.selectedDateChanged(date);
        expect(component.onChange).toHaveBeenCalledWith(date);
        expect(component.selectedDateChange.emit).toHaveBeenCalledWith(date);
        expect(component.closeCalendar.emit).toHaveBeenCalled();
    });

    it('Should handle selected date changed in range mode', () => {
        const date1 = new FdDate(2000, 10, 10);
        const date2 = new FdDate(2011, 10, 10);
        spyOn(component.selectedRangeDateChange, 'emit');
        spyOn(component.closeCalendar, 'emit');
        spyOn(component, 'onChange');
        component.selectedRangeDateChanged({ start: date1, end: date2 });
        expect(component.onChange).toHaveBeenCalledWith({ start: date1, end: date2 });
        expect(component.selectedRangeDateChange.emit).toHaveBeenCalledWith({ start: date1, end: date2 });
        expect(component.closeCalendar.emit).toHaveBeenCalled();
    });

    it('Should handle selected only one date changed in range mode', () => {
        const date1 = new FdDate(2000, 10, 10);
        spyOn(component.selectedRangeDateChange, 'emit');
        spyOn(component.closeCalendar, 'emit');
        spyOn(component, 'onChange');
        component.selectedRangeDateChanged({ start: date1, end: null });
        expect(component.onChange).toHaveBeenCalledWith({ start: date1, end: date1 });
        expect(component.selectedRangeDateChange.emit).toHaveBeenCalledWith({ start: date1, end: date1 });
        expect(component.closeCalendar.emit).toHaveBeenCalled();
    });

    it('Should handle write value for single mode when correct', () => {
        spyOn(component.isValidDateChange, 'emit');
        const date = new FdDate(2000, 10, 10);
        component.writeValue(date);
        expect(component.selectedDate).toEqual(date);
        expect(component.currentlyDisplayed.month).toBe(date.month);
        expect(component.currentlyDisplayed.year).toBe(date.year);
        expect(component.isValidDateChange.emit).toHaveBeenCalledWith(true);
    });

    it('Should handle write value for single mode when not correct', () => {
        spyOn(component.isValidDateChange, 'emit');
        const invalidDate = {} as any;
        component.writeValue(invalidDate);
        expect(component.isValidDateChange.emit).toHaveBeenCalledWith(false);
        expect(component.isModelValid()).toBe(false);
        expect(component.selectedDate).toBe(invalidDate);
    });

    it('Should handle write value for range mode when correct', () => {
        spyOn(component.isValidDateChange, 'emit');
        const date1 = new FdDate(2000, 10, 10);
        const date2 = new FdDate(2012, 10, 10);
        component.calType = 'range';
        component.writeValue({ start: date1, end: date2 });
        expect(component.selectedRangeDate).toEqual({ start: date1, end: date2 });
        expect(component.currentlyDisplayed.month).toBe(date1.month);
        expect(component.currentlyDisplayed.year).toBe(date1.year);
        expect(component.isValidDateChange.emit).toHaveBeenCalledWith(true);
    });

    it('Should handle write value for range mode when start date not correct', () => {
        spyOn(component.isValidDateChange, 'emit');
        const validDate = new FdDate(2000, 10, 10);
        const invalidDate = {} as any;
        component.calType = 'range';
        component.writeValue({ start: invalidDate, end: validDate });
        expect(component.isValidDateChange.emit).toHaveBeenCalledWith(false);
        expect(component.selectedRangeDate.start).toBe(invalidDate);
    });

    it('Should handle write value for range mode when end date not correct', () => {
        spyOn(component.isValidDateChange, 'emit');
        const validDate = new FdDate(2000, 10, 10);
        const invalidDate = {} as any;
        component.calType = 'range';
        component.writeValue({ start: validDate, end: invalidDate });
        expect(component.isValidDateChange.emit).toHaveBeenCalledWith(false);
        expect(component.selectedRangeDate.end).toBe(invalidDate);
    });

    it('Should handle write value for range mode when both dates not correct', () => {
        spyOn(component.isValidDateChange, 'emit');
        const invalidDate: any = {};
        const invalidDate2: any = {};
        component.calType = 'range';
        component.writeValue({ start: invalidDate, end: invalidDate2 });
        expect(component.isValidDateChange.emit).toHaveBeenCalledWith(false);
        expect(component.isModelValid()).toBe(false);
        expect(component.selectedRangeDate.start).toBe(invalidDate);
        expect(component.selectedRangeDate.end).toBe(invalidDate2);
    });

    it('Should change to next month, when on day view an next arrow click', () => {
        component.currentlyDisplayed = { month: 10, year: 2000 };
        component.activeView = 'day';
        component.handleNextArrowClick();
        expect(component.currentlyDisplayed).toEqual({ month: 11, year: 2000 });
    });

    it('Should change to previous month, when on day view an previous arrow click', () => {
        component.currentlyDisplayed = { month: 10, year: 2000 };
        component.activeView = 'day';
        component.handlePreviousArrowClick();
        expect(component.currentlyDisplayed).toEqual({ month: 9, year: 2000 });
    });

    it('Should change to next year, when on month view an next arrow click', () => {
        component.currentlyDisplayed = { month: 10, year: 2000 };
        component.activeView = 'month';
        component.handleNextArrowClick();
        expect(component.currentlyDisplayed).toEqual({ month: 10, year: 2001 });
    });

    it('Should change to previous month, when on month view an previous arrow click', () => {
        component.currentlyDisplayed = { month: 10, year: 2000 };
        component.activeView = 'month';
        component.handlePreviousArrowClick();
        expect(component.currentlyDisplayed).toEqual({ month: 10, year: 1999 });
    });

    it('Should call next year list function, when on year view an next arrow click', () => {
        spyOn(component, 'displayNextYearList');
        component.activeView = 'year';
        component.handleNextArrowClick();
        expect(component.displayNextYearList).toHaveBeenCalled();
    });

    it('Should call previous year list function, when on year view an next arrow click', () => {
        spyOn(component, 'displayPreviousYearList');
        component.activeView = 'year';
        component.handlePreviousArrowClick();
        expect(component.displayPreviousYearList).toHaveBeenCalled();
    });
});
