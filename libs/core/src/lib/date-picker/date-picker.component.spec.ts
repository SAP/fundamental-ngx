import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Component, ViewChild } from '@angular/core';

import { FormMessageModule } from '@fundamental-ngx/core/form';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { CalendarModule, CalendarType, DateRange } from '@fundamental-ngx/core/calendar';
import { FormStates } from '@fundamental-ngx/core/shared';
import { DatetimeAdapter, FdDate, FdDatetimeAdapter, FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { IconModule } from '@fundamental-ngx/core/icon';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { runValueAccessorTests } from 'ngx-cva-test-suite';

import { DatePickerModule, DatePickerComponent } from './public_api';
import { By } from '@angular/platform-browser';

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
                    ButtonModule,
                    FormMessageModule
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

    it('should handle single date change and update input', () => {
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

    it('should handle range date change and update input', () => {
        spyOn(component, 'onChange');
        spyOn(component.selectedRangeDateChange, 'emit');
        const dateStart = adapter.today();
        const dateLast = adapter.addCalendarDays(dateStart, 10);
        const dateStrStart = (<any>component)._formatDate(dateStart);
        const dateStrLast = (<any>component)._formatDate(dateLast);
        component._inputFieldDate = '';
        component.handleRangeDateChange({ start: dateStart, end: dateLast });
        expect(component._inputFieldDate).toBe(dateStrStart + component._rangeDelimiter + dateStrLast);
        expect(component.onChange).toHaveBeenCalledWith({ start: dateStart, end: dateLast });
        expect(component.selectedRangeDateChange.emit).toHaveBeenCalledWith({ start: dateStart, end: dateLast });
    });

    it('should handle today button click and, change and update input', () => {
        spyOn(component, 'onChange');
        spyOn(component.selectedRangeDateChange, 'emit');
        const date = adapter.today();
        const dateStr = (<any>component)._formatDate(date);

        component.type = 'single';
        component._inputFieldDate = '';
        component.onTodayButtonClick();
        expect(component._inputFieldDate).toEqual(dateStr);
        expect(component.onChange).toHaveBeenCalledWith(date);

        component.type = 'range';
        component._inputFieldDate = '';
        component.onTodayButtonClick();
        expect(component._inputFieldDate).toBe(dateStr + component._rangeDelimiter + dateStr);
        expect(component.onChange).toHaveBeenCalledWith({ start: date, end: date });
        expect(component.selectedRangeDateChange.emit).toHaveBeenCalledWith({ start: date, end: date });
    });

    it('should handle correct write value for single mode', () => {
        const date = adapter.today();
        const dateStr = (<any>component)._formatDate(date);
        component.writeValue(date);
        expect(component.selectedDate).toEqual(date);
        expect(component._inputFieldDate).toBe(dateStr);
    });

    it('should handle null write value for single mode', () => {
        component.writeValue(null);
        expect(component.selectedDate).toBe(null);
        expect(component._inputFieldDate).toBe('');
    });

    it('should handle correct write value for range mode', () => {
        component.type = 'range';
        const dateStart = adapter.today();
        const dateEnd = adapter.addCalendarDays(dateStart, 10);
        component.writeValue({ start: dateStart, end: dateEnd });
        expect(component.selectedRangeDate).toEqual({ start: dateStart, end: dateEnd });
    });

    it('should handle null write value for range mode', () => {
        component.type = 'range';
        const dateStart = null;
        const dateEnd = null;
        component.writeValue({ start: dateStart, end: dateEnd });
        expect(component.selectedRangeDate).toEqual({ start: dateStart, end: dateEnd });
        expect(component._inputFieldDate).toBe('');
    });

    it('should register invalid string date and not call event for single mode', () => {
        spyOn(component.selectedDateChange, 'emit');
        component.type = 'single';
        component.dateStringUpdate('hello');
        const date = adapter.parse('hello');
        expect(component._isInvalidDateInput).toBe(true);
        expect(component.selectedDateChange.emit).toHaveBeenCalledWith(date);
        expect(component.isModelValid()).toBe(false);
    });

    it('should register invalid string date and not call event for range mode', () => {
        spyOn(component.selectedRangeDateChange, 'emit');
        component.type = 'range';
        component.dateStringUpdate('start - end');
        const start = adapter.parse('start');
        const end = adapter.parse('end');
        expect(component._isInvalidDateInput).toBe(true);
        expect(component.selectedRangeDateChange.emit).toHaveBeenCalledWith({ start, end });
        expect(component.isModelValid()).toBe(false);
    });

    it('should handle valid reversed range string date', () => {
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
            return null;
        });

        component.type = 'range';
        component.dateStringUpdate(strDate1 + ' - ' + strDate2);

        expect(component._isInvalidDateInput).toBe(false);
        expect(component._calendarComponent._currentlyDisplayed.month).toBe(date2.month);
        expect(component._calendarComponent._currentlyDisplayed.year).toBe(date2.year);
        expect(component.selectedRangeDateChange.emit).toHaveBeenCalledWith({ start: date2, end: date1 });
        expect(component.onChange).toHaveBeenCalledWith({ start: date2, end: date1 });
    });

    it('should handle single date blocked by disable function and set invalid', () => {
        spyOn(component.selectedDateChange, 'emit');
        spyOn(component, 'onChange');
        component.disableFunction = () => true;
        const todayDate = new FdDate();
        const date = new FdDate(2000, 10, 10);
        const strDate = (<any>component)._formatDate(date);
        component.type = 'single';
        spyOn(adapter, 'parse').and.returnValue(date);
        component.dateStringUpdate(strDate);
        expect(component._isInvalidDateInput).toBe(true);
        expect(component._calendarComponent._currentlyDisplayed.month).toBe(todayDate.month);
        expect(component._calendarComponent._currentlyDisplayed.year).toBe(todayDate.year);
        expect(component.selectedDateChange.emit).toHaveBeenCalledWith(date);
        expect(component.onChange).toHaveBeenCalledWith(date);
    });

    it('should handle both range dates blocked by disable function and set invalid', () => {
        spyOn(component.selectedRangeDateChange, 'emit');
        spyOn(component, 'onChange');
        component.type = 'range';
        component.disableRangeStartFunction = () => true;
        component.disableRangeEndFunction = () => true;
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
            return null;
        });
        component.dateStringUpdate(strDate1 + ' - ' + strDate2);

        expect(component._isInvalidDateInput).toBe(true);
        expect(component._calendarComponent._currentlyDisplayed.month).toBe(todayDate.month);
        expect(component._calendarComponent._currentlyDisplayed.year).toBe(todayDate.year);
        expect(component.selectedRangeDateChange.emit).toHaveBeenCalledWith(rangeDateInvalidObject);
        expect(component.onChange).toHaveBeenCalledWith(rangeDateInvalidObject);
    });

    it('should handle end range date blocked by disable function and set invalid', () => {
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
            return null;
        });
        component.dateStringUpdate(strDate1 + ' - ' + strDate2);

        expect(component._isInvalidDateInput).toBe(true);
        expect(component._calendarComponent._currentlyDisplayed.month).toBe(date1.month);
        expect(component._calendarComponent._currentlyDisplayed.year).toBe(date1.year);
        expect(component.selectedRangeDateChange.emit).toHaveBeenCalledWith(rangeDateInvalidObject);
        expect(component.onChange).toHaveBeenCalledWith(rangeDateInvalidObject);
    });

    it('should hide message on open', () => {
        const hideSpy = spyOn((<any>component)._popoverFormMessage, 'hide').and.callThrough();
        component.openCalendar();
        fixture.detectChanges();
        expect(hideSpy).toHaveBeenCalled();
    });

    it('should show message on close', () => {
        component.isOpen = true;
        const showSpy = spyOn((<any>component)._popoverFormMessage, 'show').and.callThrough();
        component.closeCalendar();
        fixture.detectChanges();
        expect(showSpy).toHaveBeenCalled();
    });

    it('should update value on blur, if "processInputOnBlur" is set to true', () => {
        const nativeInput: HTMLInputElement = fixture.debugElement.query(By.css(`input.fd-input`)).nativeElement;

        nativeInput.value = 'hello';
        nativeInput.dispatchEvent(new Event('input'));
        expect(component._inputFieldDate).toEqual('hello');
        expect(component._isInvalidDateInput).toEqual(true);

        // should ignore blur event at this point
        nativeInput.value = '1/25/2022';
        nativeInput.dispatchEvent(new FocusEvent('blur'));
        expect(component._inputFieldDate).toEqual('hello');
        expect(component._isInvalidDateInput).toEqual(true);

        nativeInput.dispatchEvent(new Event('input'));
        expect(component._inputFieldDate).toEqual('1/25/2022');
        expect(component._isInvalidDateInput).toEqual(false);

        component.processInputOnBlur = true;

        nativeInput.value = 'hello';
        // should ignore input event at this point
        nativeInput.dispatchEvent(new Event('input'));
        expect(component._inputFieldDate).toEqual('1/25/2022');
        expect(component._isInvalidDateInput).toEqual(false);

        nativeInput.dispatchEvent(new FocusEvent('blur'));
        expect(component._inputFieldDate).toEqual('hello');
        expect(component._isInvalidDateInput).toEqual(true);

        nativeInput.value = '1/25/2022';
        nativeInput.dispatchEvent(new Event('blur'));
        expect(component._inputFieldDate).toEqual('1/25/2022');
        expect(component._isInvalidDateInput).toEqual(false);
    });
});

describe('DatePickerComponent Accessibility', () => {
    let fixture: ComponentFixture<HostComponent>;

    @Component({
        template: `
            <fd-date-picker
                [type]="type"
                [dateInputLabel]="dateInputLabel"
                [dateRangeInputLabel]="dateRangeInputLabel"
                [message]="message"
                [state]="state"
                [required]="required"
                [valueStateSuccessMessage]="valueStateSuccessMessage"
                [valueStateInformationMessage]="valueStateInformationMessage"
                [valueStateWarningMessage]="valueStateWarningMessage"
                [valueStateErrorMessage]="valueStateErrorMessage"
            ></fd-date-picker>
        `
    })
    class HostComponent {
        @ViewChild(DatePickerComponent) datePicker: DatePickerComponent<FdDate>;

        type: CalendarType = 'single';
        dateInputLabel = 'Date input';
        dateRangeInputLabel = 'Date range input';
        message = 'This is a message';
        required = false;
        state: FormStates | null = null;
        valueStateSuccessMessage = 'Value state Success';
        valueStateInformationMessage = 'Value state Information';
        valueStateWarningMessage = 'Value state Warning';
        valueStateErrorMessage = 'Value state Error';
    }

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [HostComponent],
                imports: [FdDatetimeModule, DatePickerModule],
                providers: []
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent<HostComponent>(HostComponent);
        fixture.detectChanges();
    });

    function getInputElement(): HTMLInputElement {
        return fixture.nativeElement.querySelector('.fd-input');
    }

    function getToggleElement(): HTMLButtonElement {
        return fixture.nativeElement.querySelector('.fd-button');
    }

    it('adds aria-label for date picker', () => {
        fixture.componentInstance.type = 'single';
        fixture.detectChanges();
        expect(getInputElement().getAttribute('aria-label')).toBe('Date input');
    });

    it('adds aria-label for date range picker', () => {
        fixture.componentInstance.type = 'range';
        fixture.detectChanges();
        expect(getInputElement().getAttribute('aria-label')).toBe('Date range input');
    });

    it('has aria-required property based on required input', () => {
        fixture.componentInstance.required = false;
        fixture.detectChanges();
        expect(getInputElement().getAttribute('aria-required')).toBe('false');
        fixture.componentInstance.required = true;
        fixture.detectChanges();
        expect(getInputElement().getAttribute('aria-required')).toBe('true');
    });

    it('has aria-haspopup property set to "grid"', () => {
        expect(getInputElement().getAttribute('aria-haspopup')).toBe('grid');
    });

    it('has aria-expanded property based on opened/closed state', () => {
        expect(getInputElement().getAttribute('aria-expanded')).toBe('false');
        getToggleElement().click();
        fixture.detectChanges();
        expect(getInputElement().getAttribute('aria-expanded')).toBe('true');
    });

    it('has aria-describedby referencing to "message" prop', () => {
        const messageId = getInputElement().getAttribute('aria-describedby') as string;
        expect(messageId).toBeDefined();
        expect(document.getElementById(messageId)?.textContent).toContain('This is a message');
    });

    it('has aria-describedby referencing to value state message based on "state" prop', () => {
        const messageId = getInputElement().getAttribute('aria-describedby') as string;

        fixture.componentInstance.state = 'error';
        fixture.detectChanges();
        expect(document.getElementById(messageId)?.textContent).toContain('Value state Error');

        fixture.componentInstance.state = 'warning';
        fixture.detectChanges();
        expect(document.getElementById(messageId)?.textContent).toContain('Value state Warning');

        fixture.componentInstance.state = 'information';
        fixture.detectChanges();
        expect(document.getElementById(messageId)?.textContent).toContain('Value state Information');

        fixture.componentInstance.state = 'success';
        fixture.detectChanges();
        expect(document.getElementById(messageId)?.textContent).toContain('Value state Success');
    });
});

@Component({
    template: `<fd-date-picker></fd-date-picker>`
})
class DateTimePickerHostComponent {
    @ViewChild(DatePickerComponent) picker: DatePickerComponent<FdDate>;
}

runValueAccessorTests<DatePickerComponent<FdDate>, DateTimePickerHostComponent>({
    component: DatePickerComponent,
    testModuleMetadata: {
        imports: [DatePickerModule, FdDatetimeModule],
        declarations: [DateTimePickerHostComponent]
    },
    hostTemplate: {
        getTestingComponent: (fixture) => fixture.componentInstance.picker,
        hostComponent: DateTimePickerHostComponent
    },
    nativeControlSelector: 'fd-date-picker',
    supportsOnBlur: true,
    internalValueChangeSetter: (fixture, value) => {
        fixture.componentInstance.picker.handleInputChange(value, true);
    },
    resetCustomValue: { value: null },
    getValues: () => [new FdDate(2021, 9, 5), new FdDate(2021, 10, 5), new FdDate(2021, 11, 5)],
    getComponentValue: (fixture) => fixture.componentInstance.picker.selectedDate
});
