import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePickerComponent } from './date-picker.component';
import { PopoverModule } from '../popover/popover.module';
import { IconModule } from '../icon/icon.module';
import { FormsModule } from '@angular/forms';
import { FdDate } from '../calendar/models/fd-date';
import { CalendarModule } from '../calendar/calendar.module';

describe('DatePickerComponent', () => {
    let component: DatePickerComponent;
    let fixture: ComponentFixture<DatePickerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DatePickerComponent],
            imports: [CalendarModule, PopoverModule, FormsModule, IconModule]
        }).compileComponents();

    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DatePickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open the calendar', () => {
        component.isOpen = false;
        component.isInvalidDateInput = true;
        component.openCalendar();
        expect(component.isOpen).toBeTruthy();
        expect(component.inputFieldDate).toBeNull();
    });

    it('should not open the calendar if the component is disabled', () => {
        component.isOpen = false;
        component.disabled = true;
        component.openCalendar();
        expect(component.isOpen).toBeFalsy();
    });

    it('should close the calendar', () => {
        component.isOpen = true;
        component.isInvalidDateInput = true;
        component.closeCalendar();
        expect(component.inputFieldDate).toBeNull();
        expect(component.isOpen).not.toBeTruthy();
    });

    it('Should handle single date change and update input', () => {
        spyOn(component, 'onChange');
        spyOn(component.selectedDateChange, 'emit');
        const date = FdDate.getToday();
        const dateStr = component.dateAdapter.format(date);
        component.inputFieldDate = '';
        component.handleSingleDateChange(date);
        expect(component.inputFieldDate).toBe(dateStr);
        expect(component.onChange).toHaveBeenCalledWith(date);
        expect(component.selectedDateChange.emit).toHaveBeenCalledWith(date);
    });

    it('Should handle range date change and update input', () => {
        spyOn(component, 'onChange');
        spyOn(component.selectedRangeDateChange, 'emit');
        const dateStart = FdDate.getToday();
        const dateLast = FdDate.getToday(); dateLast.month = 12;
        const dateStrStart = component.dateAdapter.format(dateStart);
        const dateStrLast = component.dateAdapter.format(dateLast);
        component.inputFieldDate = '';
        component.handleRangeDateChange({start: dateStart, end: dateLast});
        expect(component.inputFieldDate).toBe(
            dateStrStart + component.dateAdapter.rangeDelimiter + dateStrLast
        );
        expect(component.onChange).toHaveBeenCalledWith({start: dateStart, end: dateLast});
        expect(component.selectedRangeDateChange.emit).toHaveBeenCalledWith( { start: dateStart, end: dateLast });
    });

    it('Should handle correct write value for single mode', () => {
        const date = FdDate.getToday();
        const dateStr = component.dateAdapter.format(date);
        component.writeValue( date);
        expect(component.selectedDate).toEqual(date);
        expect(component.inputFieldDate).toBe(dateStr)
    });

    it('Should handle null write value for single mode', () => {
        component.writeValue(null);
        expect(component.selectedDate).toBeUndefined();
        expect(component.inputFieldDate).toBe('')
    });

    it('Should handle correct write value for range mode', () => {
        component.type = 'range';
        const dateStart = FdDate.getToday();
        const dateStrStart = component.dateAdapter.format(dateStart);
        const dateEnd = FdDate.getToday(); dateEnd.month = 12;
        const dateStrEnd = component.dateAdapter.format(dateEnd);
        component.writeValue({start: dateStart, end: dateEnd});
        expect(component.selectedRangeDate).toEqual({start: dateStart, end: dateEnd});
        expect(component.inputFieldDate).toBe(
            dateStrStart + component.dateAdapter.rangeDelimiter + dateStrEnd
        );
    });

    it('Should handle null write value for range mode', () => {
        component.type = 'range';
        const dateStart = null;
        const dateEnd = null;
        component.writeValue({start: dateStart, end: dateEnd});
        expect(component.selectedRangeDate).toEqual({start: dateStart, end: dateEnd});
        expect(component.inputFieldDate).toBe('');
    });

    it('Should register invalid string date and not call event for single mode', () => {
        spyOn(component.selectedDateChange, 'emit');
        component.type = 'single';
        component.dateStringUpdate('33333333');
        expect(component.isInvalidDateInput).toBe(true);
        expect(component.selectedDateChange.emit).not.toHaveBeenCalled();
    });

    it('Should register invalid string date and not call event for range mode', () => {
        spyOn(component.selectedRangeDateChange, 'emit');
        component.type = 'range';
        component.dateStringUpdate('33333333 - 3000000');
        expect(component.isInvalidDateInput).toBe(true);
        expect(component.selectedRangeDateChange.emit).not.toHaveBeenCalled();
    });

    it('Should handle valid string date', () => {
        spyOn(component.selectedDateChange, 'emit');
        const date = new FdDate(2000, 10, 10);
        const strDate = component.dateAdapter.format(date);
        component.type = 'single';
        component.dateStringUpdate(strDate);
        expect(component.isInvalidDateInput).toBe(false);
        expect(component.selectedDateChange.emit).toHaveBeenCalledWith(date);
    });

    it('Should handle valid string date', () => {
        spyOn(component.selectedDateChange, 'emit');
        spyOn(component, 'onChange');
        const date = new FdDate(2000, 10, 10);
        const strDate = component.dateAdapter.format(date);
        component.type = 'single';
        component.dateStringUpdate(strDate);
        expect(component.isInvalidDateInput).toBe(false);
        expect(component.calendarComponent.currentlyDisplayed.month).toBe(date.month);
        expect(component.calendarComponent.currentlyDisplayed.year).toBe(date.year);
        expect(component.selectedDateChange.emit).toHaveBeenCalledWith(date);
        expect(component.onChange).toHaveBeenCalledWith(date);
    });

    it('Should handle valid range string date', () => {
        spyOn(component.selectedRangeDateChange, 'emit');
        spyOn(component, 'onChange');
        const date1 = new FdDate(2000, 10, 10);
        const date2 = new FdDate(2011, 10, 10);
        const strDate1 = component.dateAdapter.format(date1);
        const strDate2 = component.dateAdapter.format(date2);
        component.type = 'range';
        component.dateStringUpdate(strDate1 + component.dateAdapter.rangeDelimiter + strDate2);
        expect(component.isInvalidDateInput).toBe(false);
        expect(component.calendarComponent.currentlyDisplayed.month).toBe(date1.month);
        expect(component.calendarComponent.currentlyDisplayed.year).toBe(date1.year);
        expect(component.selectedRangeDateChange.emit).toHaveBeenCalledWith({ start: date1, end: date2 });
        expect(component.onChange).toHaveBeenCalledWith({ start: date1, end: date2 });
    });

    it('Should handle valid reversed range string date', () => {
        spyOn(component.selectedRangeDateChange, 'emit');
        spyOn(component, 'onChange');
        const date1 = new FdDate(2011, 10, 10);
        const date2 = new FdDate(2000, 10, 10);
        const strDate1 = component.dateAdapter.format(date1);
        const strDate2 = component.dateAdapter.format(date2);
        component.type = 'range';
        component.dateStringUpdate(strDate1 + component.dateAdapter.rangeDelimiter + strDate2);
        expect(component.isInvalidDateInput).toBe(false);
        expect(component.calendarComponent.currentlyDisplayed.month).toBe(date2.month);
        expect(component.calendarComponent.currentlyDisplayed.year).toBe(date2.year);
        expect(component.selectedRangeDateChange.emit).toHaveBeenCalledWith({ start: date2, end: date1 });
        expect(component.onChange).toHaveBeenCalledWith({ start: date2, end: date1 });
    });
});
