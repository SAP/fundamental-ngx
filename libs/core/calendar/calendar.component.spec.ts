import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FdDate, FdDatetimeModule } from '@fundamental-ngx/core/datetime';

import { CalendarComponent } from './calendar.component';
import { CalendarModule } from './calendar.module';

describe('CalendarComponent', () => {
    let component: CalendarComponent<FdDate>;
    let fixture: ComponentFixture<CalendarComponent<FdDate>>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [FdDatetimeModule, CalendarModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent<CalendarComponent<FdDate>>(CalendarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => jest.restoreAllMocks());

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Should handle selected date changed in single mode', () => {
        const date = new FdDate(2000, 10, 10);
        jest.spyOn(component.selectedDateChange, 'emit');
        jest.spyOn(component.closeCalendar, 'emit');
        jest.spyOn(component, 'onChange');
        component.selectedDateChanged(date);
        expect(component.onChange).toHaveBeenCalledWith(date);
        expect(component.selectedDateChange.emit).toHaveBeenCalledWith(date);
        expect(component.closeCalendar.emit).toHaveBeenCalled();
    });

    it('Should handle selected dates changed in multiple mode', () => {
        const week = [
            new FdDate(2023, 7, 10),
            new FdDate(2023, 7, 11),
            new FdDate(2023, 7, 12),
            new FdDate(2023, 7, 13),
            new FdDate(2023, 7, 14),
            new FdDate(2023, 7, 15),
            new FdDate(2023, 7, 16)
        ];

        jest.spyOn(component.selectedMultipleDatesChange, 'emit');
        jest.spyOn(component.closeCalendar, 'emit');
        jest.spyOn(component, 'onChange');
        component.selectedMultipleDatesChanged(week);
        expect(component.onChange).toHaveBeenCalledWith(week);
        expect(component.selectedMultipleDatesChange.emit).toHaveBeenCalledWith(week);
        expect(component.closeCalendar.emit).toHaveBeenCalled();
    });

    it('Should handle selected date changed in range mode', () => {
        const date1 = new FdDate(2000, 10, 10);
        const date2 = new FdDate(2011, 10, 10);
        jest.spyOn(component.selectedRangeDateChange, 'emit');
        jest.spyOn(component.closeCalendar, 'emit');
        jest.spyOn(component, 'onChange');
        component.selectedRangeDateChanged({ start: date1, end: date2 });
        expect(component.onChange).toHaveBeenCalledWith({ start: date1, end: date2 });
        expect(component.selectedRangeDateChange.emit).toHaveBeenCalledWith({ start: date1, end: date2 });
        expect(component.closeCalendar.emit).toHaveBeenCalled();
    });

    it('Should handle selected only one date changed in range mode', () => {
        const date1 = new FdDate(2000, 10, 10);
        jest.spyOn(component.selectedRangeDateChange, 'emit');
        jest.spyOn(component.closeCalendar, 'emit');
        jest.spyOn(component, 'onChange');
        component.selectedRangeDateChanged({ start: date1, end: null });
        expect(component.onChange).toHaveBeenCalledWith({ start: date1, end: null });
        expect(component.selectedRangeDateChange.emit).toHaveBeenCalledWith({ start: date1, end: null });
        expect(component.closeCalendar.emit).toHaveBeenCalled();
    });

    it('Should handle write value for single mode when correct', () => {
        jest.spyOn(component.isValidDateChange, 'emit');
        const date = new FdDate(2000, 10, 10);
        component.writeValue(date);
        expect(component.selectedDate).toEqual(date);
        expect(component._currentlyDisplayed.month).toBe(date.month);
        expect(component._currentlyDisplayed.year).toBe(date.year);
        expect(component.isValidDateChange.emit).toHaveBeenCalledWith(true);
    });

    it('Should handle write value for single mode when not correct', () => {
        jest.spyOn(component.isValidDateChange, 'emit');
        const invalidDate = {} as any;
        component.writeValue(invalidDate);
        expect(component.isValidDateChange.emit).toHaveBeenCalledWith(false);
        expect(component.isModelValid()).toBe(false);
        expect(component.selectedDate).toBe(invalidDate);
    });

    it('Should handle write value for multiple mode when correct', () => {
        jest.spyOn(component.isValidDateChange, 'emit');
        const dates = [new FdDate(2000, 10, 10), new FdDate(2000, 10, 11), new FdDate(2000, 10, 12)];
        component.allowMultipleSelection = true;
        component.writeValue(dates);
        expect(component.selectedMultipleDates).toEqual(dates);
        expect(component._currentlyDisplayed.month).toBe(dates[0].month);
        expect(component._currentlyDisplayed.year).toBe(dates[0].year);
        expect(component.isValidDateChange.emit).toHaveBeenCalledWith(true);
    });

    it('Should handle write value for multiple mode when not correct', () => {
        jest.spyOn(component.isValidDateChange, 'emit');
        const invalidDate = [{}] as any;
        component.allowMultipleSelection = true;
        component.writeValue(invalidDate);
        expect(component.isValidDateChange.emit).toHaveBeenCalledWith(false);
        expect(component.isModelValid()).toBe(false);
        expect(component.selectedMultipleDates).toBe(invalidDate);
    });

    it('Should handle write value for range mode when correct', () => {
        jest.spyOn(component.isValidDateChange, 'emit');
        const date1 = new FdDate(2000, 10, 10);
        const date2 = new FdDate(2012, 10, 10);
        component.calType = 'range';
        component.writeValue({ start: date1, end: date2 });
        expect(component.selectedRangeDate).toEqual({ start: date1, end: date2 });
        expect(component._currentlyDisplayed.month).toBe(date1.month);
        expect(component._currentlyDisplayed.year).toBe(date1.year);
        expect(component.isValidDateChange.emit).toHaveBeenCalledWith(true);
    });

    it('Should handle write value for range mode when start date not correct', () => {
        jest.spyOn(component.isValidDateChange, 'emit');
        const validDate = new FdDate(2000, 10, 10);
        const invalidDate = {} as any;
        component.calType = 'range';
        component.writeValue({ start: invalidDate, end: validDate });
        expect(component.isValidDateChange.emit).toHaveBeenCalledWith(false);
        expect(component.selectedRangeDate.start).toBe(invalidDate);
    });

    it('Should handle write value for range mode when end date not correct', () => {
        jest.spyOn(component.isValidDateChange, 'emit');
        const validDate = new FdDate(2000, 10, 10);
        const invalidDate = {} as any;
        component.calType = 'range';
        component.writeValue({ start: validDate, end: invalidDate });
        expect(component.isValidDateChange.emit).toHaveBeenCalledWith(false);
        expect(component.selectedRangeDate.end).toBe(invalidDate);
    });

    it('Should handle write value for range mode when both dates not correct', () => {
        jest.spyOn(component.isValidDateChange, 'emit');
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
        component._currentlyDisplayed = { month: 10, year: 2000 };
        component.activeView = 'day';
        component.handleNextArrowClick();
        expect(component._currentlyDisplayed).toEqual({ month: 11, year: 2000 });
    });

    it('Should change to previous month, when on day view an previous arrow click', () => {
        component._currentlyDisplayed = { month: 10, year: 2000 };
        component.activeView = 'day';
        component.handlePreviousArrowClick();
        expect(component._currentlyDisplayed).toEqual({ month: 9, year: 2000 });
    });

    it('Should change to next year, when on month view an next arrow click', () => {
        component._currentlyDisplayed = { month: 10, year: 2000 };
        component.activeView = 'month';
        component.handleNextArrowClick();
        expect(component._currentlyDisplayed).toEqual({ month: 10, year: 2001 });
    });

    it('Should change to previous month, when on month view an previous arrow click', () => {
        component._currentlyDisplayed = { month: 10, year: 2000 };
        component.activeView = 'month';
        component.handlePreviousArrowClick();
        expect(component._currentlyDisplayed).toEqual({ month: 10, year: 1999 });
    });

    it('Should call next year list function, when on year view an next arrow click', () => {
        jest.spyOn(component, 'displayNextYearList').mockImplementation(() => {});
        component.activeView = 'year';
        component.handleNextArrowClick();
        expect(component.displayNextYearList).toHaveBeenCalled();
    });

    it('Should call previous year list function, when on year view an next arrow click', () => {
        jest.spyOn(component, 'displayPreviousYearList').mockImplementation(() => {});
        component.activeView = 'year';
        component.handlePreviousArrowClick();
        expect(component.displayPreviousYearList).toHaveBeenCalled();
    });

    it('Should handle selected multiple date ranges changed', () => {
        const dateRange1 = { start: new FdDate(2000, 10, 10), end: new FdDate(2000, 10, 15) };
        const dateRange2 = { start: new FdDate(2010, 5, 5), end: new FdDate(2010, 5, 10) };
        jest.spyOn(component.selectedMultipleDateRangesChange, 'emit');
        jest.spyOn(component.closeCalendar, 'emit');
        jest.spyOn(component, 'onChange');
        component.selectedMultipleDateRangesChanged([dateRange1, dateRange2]);
        expect(component.onChange).toHaveBeenCalledWith([dateRange1, dateRange2]);
        expect(component.selectedMultipleDateRangesChange.emit).toHaveBeenCalledWith([dateRange1, dateRange2]);
        expect(component.closeCalendar.emit).toHaveBeenCalled();
    });

    it('Should handle selected only one date range changed in multiple ranges mode', () => {
        const dateRange = { start: new FdDate(2000, 10, 10), end: null };
        jest.spyOn(component.selectedMultipleDateRangesChange, 'emit');
        jest.spyOn(component.closeCalendar, 'emit');
        jest.spyOn(component, 'onChange');
        component.selectedMultipleDateRangesChanged([dateRange]);
        expect(component.onChange).toHaveBeenCalledWith([dateRange]);
        expect(component.selectedMultipleDateRangesChange.emit).toHaveBeenCalledWith([dateRange]);
        expect(component.closeCalendar.emit).toHaveBeenCalled();
    });

    it('Should handle write value for multiple date ranges mode when correct', () => {
        jest.spyOn(component.isValidDateChange, 'emit');
        const dateRange1 = { start: new FdDate(2000, 10, 10), end: new FdDate(2000, 10, 15) };
        const dateRange2 = { start: new FdDate(2010, 5, 5), end: new FdDate(2010, 5, 10) };
        component.allowMultipleSelection = true;
        component.calType = 'range';
        component.writeValue([dateRange1, dateRange2]);
        expect(component.selectedMultipleDateRanges).toEqual([dateRange1, dateRange2]);
        expect(component._currentlyDisplayed.month).toBe(dateRange1.start.month);
        expect(component._currentlyDisplayed.year).toBe(dateRange1.start.year);
        expect(component.isValidDateChange.emit).toHaveBeenCalledWith(true);
    });

    it('Should handle write value for multiple date ranges mode when start date not correct', () => {
        jest.spyOn(component.isValidDateChange, 'emit');
        const validDate = new FdDate(2000, 10, 10);
        const invalidDate = {} as any;
        component.allowMultipleSelection = true;
        component.calType = 'range';
        component.writeValue([{ start: invalidDate, end: validDate }]);
        expect(component.isValidDateChange.emit).toHaveBeenCalledWith(false);
        expect(component.selectedMultipleDateRanges[0].start).toBe(invalidDate);
    });

    it('Should handle write value for multiple date ranges mode when end date not correct', () => {
        jest.spyOn(component.isValidDateChange, 'emit');
        const validDate = new FdDate(2000, 10, 10);
        const invalidDate = {} as any;
        component.allowMultipleSelection = true;
        component.calType = 'range';
        component.writeValue([{ start: validDate, end: invalidDate }]);
        expect(component.isValidDateChange.emit).toHaveBeenCalledWith(false);
        expect(component.selectedMultipleDateRanges[0].end).toBe(invalidDate);
    });

    it('Should handle write value for multiple date ranges mode when both dates not correct', () => {
        jest.spyOn(component.isValidDateChange, 'emit');
        const invalidDate: any = {};
        const invalidDate2: any = {};
        component.allowMultipleSelection = true;
        component.calType = 'range';
        component.writeValue([{ start: invalidDate, end: invalidDate2 }]);
        expect(component.isValidDateChange.emit).toHaveBeenCalledWith(false);
        expect(component.isModelValid()).toBe(false);
        expect(component.selectedMultipleDateRanges[0].start).toBe(invalidDate);
        expect(component.selectedMultipleDateRanges[0].end).toBe(invalidDate2);
    });
});
