import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { DATE_TIME_FORMATS, DateTimeFormats, FdDate, FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { INVALID_DATE_ERROR } from '@fundamental-ngx/cdk/utils';
import { runValueAccessorTests } from 'ngx-cva-test-suite';
import { DatetimePickerModule } from './datetime-picker.module';
import { DatetimePickerComponent } from './datetime-picker.component';

describe('DatetimePickerComponent', () => {
    let component: DatetimePickerComponent<FdDate>;
    let fixture: ComponentFixture<DatetimePickerComponent<FdDate>>;
    let datetimeFormats: DateTimeFormats;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [DatetimePickerModule, FdDatetimeModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent<DatetimePickerComponent<FdDate>>(DatetimePickerComponent);
        component = fixture.componentInstance;
        component.isOpen = true;
        component._showPopoverContents = true;
        component.ngOnInit();
        component.date = new FdDate();
        fixture.detectChanges();
    });

    beforeEach(inject([DATE_TIME_FORMATS], (formats: DateTimeFormats) => {
        datetimeFormats = formats;
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open the popover', () => {
        component.isOpen = false;
        component.setInvalidDateInputHandler(false);
        component.openPopover();
        expect(component.isOpen).toBe(true);
    });

    it('should not open the popover if the component is disabled', () => {
        component.isOpen = false;
        component.disabled = true;
        component.setInvalidDateInputHandler(false);
        component.openPopover();
        expect(component.isOpen).toBe(false);
    });

    it('should close the calendar', () => {
        component.isOpen = true;
        component.setInvalidDateInputHandler(true);
        component.closePopover();
        expect(component._inputFieldDate).toBeNull();
        expect(component.isOpen).toBe(false);
    });

    it('should update from input for null value', () => {
        jest.spyOn(component, 'onChange');

        component.allowNull = true;
        component.handleInputChange('', true);

        expect(component.onChange).toHaveBeenCalledWith(null);
        expect(component.date).toBeNull();
    });

    it('should not update input with invalid time', () => {
        component.allowNull = false;
        component.handleInputChange('hello', true);
        expect(component._isInvalidDateInput).toEqual(true);
    });

    it('should update input from calendar', () => {
        jest.spyOn(component, 'onChange');
        const tempTime = new FdDate();
        component._tempTime = tempTime;
        const date = new FdDate(2018, 10, 10);
        component.handleDateChange(date);
        component.submit();

        expect(component.date?.year).toEqual(date.year);
        expect(component.date?.hour).toEqual(tempTime.hour);
        expect(component.date?.minute).toEqual(tempTime.minute);
    });

    it('should handle correct write value function', () => {
        const dateTime = new FdDate();
        component.writeValue(dateTime);

        expect(component.date).toEqual(dateTime);
        expect(component._calendarComponent._currentlyDisplayed.month).toEqual(dateTime.month);
    });

    it('should reset input if time format is invalid', () => {
        component.writeValue('hello' as any);
        expect(component._inputFieldDate).toBe(INVALID_DATE_ERROR);
    });

    it('should use displayFormat and set to true _displayHours, _displayMinutes, _meridian', () => {
        datetimeFormats.display.dateTimeInput = { hour: 'numeric', minute: 'numeric', hour12: true };
        (<any>component)._calculateTimeOptions();
        expect(component._displayHours).toBe(true);
        expect(component._displayMinutes).toBe(true);
        expect(component._displaySeconds).toBe(false);
        expect(component._meridian).toBe(true);
    });

    it('should use displayFormat and set to true _displayHours, _displayMinutes, _displaySeconds', () => {
        datetimeFormats.display.dateTimeInput = {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: false
        };
        (<any>component)._calculateTimeOptions();
        expect(component._displayHours).toBe(true);
        expect(component._displayMinutes).toBe(true);
        expect(component._displaySeconds).toBe(true);
        expect(component._meridian).toBe(false);
    });

    it('should hide message on open', () => {
        component.isOpen = false;
        fixture.detectChanges();
        const hideSpy = jest.spyOn((<any>component)._popoverFormMessage, 'hide');
        component.openPopover();
        expect(hideSpy).toHaveBeenCalled();
    });

    it('should show message on close', () => {
        component.isOpen = true;

        const showSpy = jest.spyOn((<any>component)._popoverFormMessage, 'show');
        component.closePopover();
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

const DATE_TIME_PICKER_IDENTIFIER = 'core-date-time-picker-unit-test';

runValueAccessorTests({
    component: DatetimePickerComponent,
    name: 'Datetime picker',
    testModuleMetadata: {
        imports: [DatetimePickerModule, FdDatetimeModule]
    },
    additionalSetup: (fixture, done) => {
        fixture.componentInstance.inputId = DATE_TIME_PICKER_IDENTIFIER;
        done();
    },
    supportsOnBlur: true,
    nativeControlSelector: `input[id="${DATE_TIME_PICKER_IDENTIFIER}"]`,
    internalValueChangeSetter: (fixture, value) => {
        fixture.componentInstance.handleInputChange(value, true);
    },
    getValues: () => [new FdDate(2021, 9, 5), new FdDate(2021, 10, 5), new FdDate(2021, 11, 5)],
    getComponentValue: (fixture) => fixture.componentInstance.date
});
