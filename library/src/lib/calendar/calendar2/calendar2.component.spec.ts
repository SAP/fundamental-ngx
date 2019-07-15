import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Calendar2Component } from './calendar2.component';
import { CalendarModule } from '../calendar.module';
import { FdDate } from './models/fd-date';


describe('Calendar2Component', () => {
    let component: Calendar2Component;
    let fixture: ComponentFixture<Calendar2Component>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CalendarModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(Calendar2Component);
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
        expect(component.onChange).toHaveBeenCalledWith({ date: date });
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
        component.writeValue({ date: date });
        expect(component.selectedDate).toEqual(date);
        expect(component.currentlyDisplayed.month).toBe(date.month);
        expect(component.currentlyDisplayed.year).toBe(date.year);
        expect(component.isValidDateChange.emit).toHaveBeenCalledWith(true);
    });

    it('Should handle write value for single mode when not correct', () => {
        spyOn(component.isValidDateChange, 'emit');
        const invalidDate = new FdDate(2000, 50, 50);
        component.writeValue({ date: invalidDate });
        expect(component.isValidDateChange.emit).toHaveBeenCalledWith(false);
        expect(component.selectedDate).not.toBe(invalidDate);
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
        const invalidDate = new FdDate(2000, 50, 50);
        component.calType = 'range';
        component.writeValue({ start: invalidDate, end: validDate });
        expect(component.isValidDateChange.emit).toHaveBeenCalledWith(false);
        expect(component.selectedDate).not.toBe(invalidDate);
    });

    it('Should handle write value for range mode when end date not correct', () => {
        spyOn(component.isValidDateChange, 'emit');
        const validDate = new FdDate(2000, 10, 10);
        const invalidDate = new FdDate(2000, 50, 50);
        component.calType = 'range';
        component.writeValue({ start: validDate, end: invalidDate });
        expect(component.isValidDateChange.emit).toHaveBeenCalledWith(false);
        expect(component.selectedDate).not.toBe(invalidDate);
    });

    it('Should handle write value for range mode when end date not correct', () => {
        spyOn(component.isValidDateChange, 'emit');
        const invalidDate = new FdDate(2000, 50, 50);
        const invalidDate2 = new FdDate(2000, 50, 50);
        component.calType = 'range';
        component.writeValue({ start: invalidDate, end: invalidDate2 });
        expect(component.isValidDateChange.emit).toHaveBeenCalledWith(false);
        expect(component.selectedDate).not.toBe(invalidDate);
    });
});
