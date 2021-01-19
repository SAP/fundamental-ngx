import { waitForAsync, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { DatetimeAdapter, FdDate, FdDatetimeAdapter, FdDatetimeModule } from '../datetime';
import { DatePickerComponent } from './date-picker.component';
import { PopoverModule } from '../popover/popover.module';
import { IconModule } from '../icon/icon.module';
import { CalendarModule } from '../calendar/calendar.module';
import { ButtonModule } from '../button/button.module';
import { InputGroupModule } from '../input-group/input-group.module';
import { DateRange } from '../calendar/models/date-range';

describe('DatePickerComponent', () => {
    let component: DatePickerComponent<FdDate>;
    let fixture: ComponentFixture<DatePickerComponent<FdDate>>;
    let adapter: FdDatetimeAdapter;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [DatePickerComponent],
                imports: [
                    FdDatetimeModule,
                    CalendarModule,
                    PopoverModule,
                    FormsModule,
                    IconModule,
                    InputGroupModule,
                    ButtonModule
                ]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent<DatePickerComponent<FdDate>>(DatePickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    beforeEach(inject([DatetimeAdapter], (dateAdapter: FdDatetimeAdapter) => {
        adapter = dateAdapter;
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open the calendar', () => {
        component.isOpen = false;
        component._isInvalidDateInput = true;
        component.openCalendar();
        expect(component.isOpen).toBeTruthy();
        expect(component._inputFieldDate).toBeNull();
    });

    it('should not open the calendar if the component is disabled', () => {
        component.isOpen = false;
        component.disabled = true;
        component.openCalendar();
        expect(component.isOpen).toBeFalsy();
    });

    it('should close the calendar', () => {
        component.isOpen = true;
        component._isInvalidDateInput = true;
        component.closeCalendar();
        expect(component._inputFieldDate).toBeNull();
        expect(component.isOpen).not.toBeTruthy();
    });

    it('Should handle single date change and update input', () => {
        spyOn(component, 'onChange');
        spyOn(component.selectedDateChange, 'emit');
        const date = adapter.today();
        const dateStr = (<any>component)._formatDate(date);
        component._inputFieldDate = '';
        component.handleSingleDateChange(date);
        expect(component._inputFieldDate).toEqual(dateStr);
        expect(component.onChange).toHaveBeenCalledWith(date);
        expect(component.selectedDateChange.emit).toHaveBeenCalledWith(date);
    });

    it('Should handle range date change and update input', () => {
        spyOn(component, 'onChange');
        spyOn(component.selectedRangeDateChange, 'emit');
        const dateStart = adapter.today();
        const dateLast = adapter.addCalendarDays(dateStart, 10);
        const dateStrStart = (<any>component)._formatDate(dateStart);
        const dateStrLast = (<any>component)._formatDate(dateLast);
        component._inputFieldDate = '';
        component.handleRangeDateChange({ start: dateStart, end: dateLast });
        expect(component._inputFieldDate).toBe(dateStrStart + component.rangeDelimiter + dateStrLast);
        expect(component.onChange).toHaveBeenCalledWith({ start: dateStart, end: dateLast });
        expect(component.selectedRangeDateChange.emit).toHaveBeenCalledWith({ start: dateStart, end: dateLast });
    });

    it('Should handle correct write value for single mode', () => {
        const date = adapter.today();
        const dateStr = (<any>component)._formatDate(date);
        component.writeValue(date);
        expect(component.selectedDate).toEqual(date);
        expect(component._inputFieldDate).toBe(dateStr);
    });

    it('Should handle null write value for single mode', () => {
        component.writeValue(null);
        expect(component.selectedDate).toBeUndefined();
        expect(component._inputFieldDate).toBe('');
    });

    it('Should handle correct write value for range mode', () => {
        component.type = 'range';
        const dateStart = adapter.today();
        const dateEnd = adapter.addCalendarDays(dateStart, 10);
        component.writeValue({ start: dateStart, end: dateEnd });
        expect(component.selectedRangeDate).toEqual({ start: dateStart, end: dateEnd });
    });

    it('Should handle null write value for range mode', () => {
        component.type = 'range';
        const dateStart = null;
        const dateEnd = null;
        component.writeValue({ start: dateStart, end: dateEnd });
        expect(component.selectedRangeDate).toEqual({ start: dateStart, end: dateEnd });
        expect(component._inputFieldDate).toBe('');
    });

    it('Should register invalid string date and not call event for single mode', () => {
        spyOn(component.selectedDateChange, 'emit');
        component.type = 'single';
        component.dateStringUpdate('hello');
        const date: FdDate = adapter.parse('hello');
        expect(component._isInvalidDateInput).toBe(true);
        expect(component.selectedDateChange.emit).toHaveBeenCalledWith(date);
        expect(component.isModelValid()).toBe(false);
    });

    it('Should register invalid string date and not call event for range mode', () => {
        spyOn(component.selectedRangeDateChange, 'emit');
        component.type = 'range';
        component.dateStringUpdate('start - end');
        const start: FdDate = adapter.parse('start');
        const end: FdDate = adapter.parse('end');
        expect(component._isInvalidDateInput).toBe(true);
        expect(component.selectedRangeDateChange.emit).toHaveBeenCalledWith({ start: start, end: end });
        expect(component.isModelValid()).toBe(false);
    });

    it('Should handle valid reversed range string date', () => {
        spyOn(component.selectedRangeDateChange, 'emit');
        spyOn(component, 'onChange');
        const date1 = new FdDate(2011, 10, 10);
        const date2 = new FdDate(2000, 10, 10);
        const strDate1 = (<any>component)._formatDate(date1);
        const strDate2 = (<any>component)._formatDate(date2);

        spyOn(adapter, 'parse').and.callFake((str) => {
            if (str === strDate1) {
                return date1;
            }
            if (str === strDate2) {
                return date2;
            }
        });

        component.type = 'range';
        component.dateStringUpdate(strDate1 + ' - ' + strDate2);

        expect(component._isInvalidDateInput).toBe(false);
        expect(component._calendarComponent.currentlyDisplayed.month).toBe(date2.month);
        expect(component._calendarComponent.currentlyDisplayed.year).toBe(date2.year);
        expect(component.selectedRangeDateChange.emit).toHaveBeenCalledWith({ start: date2, end: date1 });
        expect(component.onChange).toHaveBeenCalledWith({ start: date2, end: date1 });
    });

    it('Should handle single date blocked by disable function and set invalid', () => {
        spyOn(component.selectedDateChange, 'emit');
        spyOn(component, 'onChange');
        component.disableFunction = (_: FdDate) => true;
        const todayDate = new FdDate();
        const date = new FdDate(2000, 10, 10);
        const strDate = (<any>component)._formatDate(date);
        component.type = 'single';
        spyOn(adapter, 'parse').and.returnValue(date);
        component.dateStringUpdate(strDate);
        expect(component._isInvalidDateInput).toBe(true);
        expect(component._calendarComponent.currentlyDisplayed.month).toBe(todayDate.month);
        expect(component._calendarComponent.currentlyDisplayed.year).toBe(todayDate.year);
        expect(component.selectedDateChange.emit).toHaveBeenCalledWith(date);
        expect(component.onChange).toHaveBeenCalledWith(date);
    });

    it('Should handle both range dates blocked by disable function and set invalid', () => {
        spyOn(component.selectedRangeDateChange, 'emit');
        spyOn(component, 'onChange');
        component.type = 'range';
        component.disableRangeStartFunction = (_: FdDate) => true;
        component.disableRangeEndFunction = (_: FdDate) => true;
        const todayDate = new FdDate();
        const date1 = new FdDate(2011, 10, 10);
        const date2 = new FdDate(2000, 10, 10);
        const strDate1 = (<any>component)._formatDate(date1);
        const strDate2 = (<any>component)._formatDate(date2);
        const rangeDateInvalidObject: DateRange<FdDate> = { start: date2, end: date1 };

        spyOn(adapter, 'parse').and.callFake((str) => {
            if (str === strDate1) {
                return date1;
            }
            if (str === strDate2) {
                return date2;
            }
        });
        component.dateStringUpdate(strDate1 + ' - ' + strDate2);

        expect(component._isInvalidDateInput).toBe(true);
        expect(component._calendarComponent.currentlyDisplayed.month).toBe(todayDate.month);
        expect(component._calendarComponent.currentlyDisplayed.year).toBe(todayDate.year);
        expect(component.selectedRangeDateChange.emit).toHaveBeenCalledWith(rangeDateInvalidObject);
        expect(component.onChange).toHaveBeenCalledWith(rangeDateInvalidObject);
    });

    it('Should handle end range date blocked by disable function and set invalid', () => {
        spyOn(component.selectedRangeDateChange, 'emit');
        spyOn(component, 'onChange');
        component.type = 'range';
        component.disableRangeEndFunction = (fdDate: FdDate) => adapter.compareDate(fdDate, FdDate.getToday()) > 0;

        const date1 = new FdDate(2010, 10, 10);
        const date2 = adapter.addCalendarDays(new FdDate(), 1);
        const strDate1 = (<any>component)._formatDate(date1);
        const strDate2 = (<any>component)._formatDate(date2);

        const rangeDateInvalidObject: DateRange<FdDate> = { start: date1, end: date2 };
        spyOn(adapter, 'parse').and.callFake((str) => {
            if (str === strDate1) {
                return date1;
            }
            if (str === strDate2) {
                return date2;
            }
        });
        component.dateStringUpdate(strDate1 + ' - ' + strDate2);

        expect(component._isInvalidDateInput).toBe(true);
        expect(component._calendarComponent.currentlyDisplayed.month).toBe(date1.month);
        expect(component._calendarComponent.currentlyDisplayed.year).toBe(date1.year);
        expect(component.selectedRangeDateChange.emit).toHaveBeenCalledWith(rangeDateInvalidObject);
        expect(component.onChange).toHaveBeenCalledWith(rangeDateInvalidObject);
    });

    it('should hide message on open', () => {
        const hideSpy = spyOn((<any>component)._popoverFormMessage, 'hide').and.callThrough();
        component.openCalendar();
        fixture.detectChanges();
        expect(hideSpy).toHaveBeenCalled();
    })

    it('should show message on close', () => {
        component.isOpen = true;
        const showSpy = spyOn((<any>component)._popoverFormMessage, 'show').and.callThrough();
        component.closeCalendar();
        fixture.detectChanges();
        expect(showSpy).toHaveBeenCalled();
    });
});
