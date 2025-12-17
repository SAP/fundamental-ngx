import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { INVALID_DATE_ERROR } from '@fundamental-ngx/cdk/utils';
import { DATE_TIME_FORMATS, DateTimeFormats, FdDate, FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { runValueAccessorTests } from 'ngx-cva-test-suite';
import { DatetimePickerComponent } from './datetime-picker.component';
import { DatetimePickerModule } from './datetime-picker.module';

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

    it('should toggle the popover with the f4 key', () => {
        jest.spyOn(component, 'togglePopover');
        component._inputElement.nativeElement.dispatchEvent(
            new KeyboardEvent('keydown', {
                key: 'f4'
            })
        );
        expect(component.togglePopover).toHaveBeenCalled();
    });

    describe('Calendar Legend Feature', () => {
        beforeEach(() => {
            component.isOpen = true;
            component._showPopoverContents = true;
        });

        it('should pass showCalendarLegend to calendar component', () => {
            fixture.componentRef.setInput('showCalendarLegend', true);
            fixture.detectChanges();

            const calendarElement = fixture.debugElement.query(By.css('fd-calendar'));
            expect(calendarElement).toBeTruthy();
            expect(calendarElement.componentInstance.showCalendarLegend).toBe(true);
        });

        it('should pass legendCol to calendar component', () => {
            fixture.componentRef.setInput('legendCol', true);
            fixture.detectChanges();

            const calendarElement = fixture.debugElement.query(By.css('fd-calendar'));
            expect(calendarElement).toBeTruthy();
            expect(calendarElement.componentInstance.legendCol).toBe(true);
        });

        it('should pass specialDaysRules to calendar component', () => {
            const rules = [
                { specialDayNumber: 1, rule: () => true, legendText: 'Day 1' },
                { specialDayNumber: 2, rule: () => false, legendText: 'Day 2' }
            ];
            fixture.componentRef.setInput('specialDaysRules', rules);
            fixture.componentRef.setInput('showCalendarLegend', true);
            fixture.detectChanges();

            const calendarElement = fixture.debugElement.query(By.css('fd-calendar'));
            expect(calendarElement.componentInstance.specialDaysRules).toEqual(rules);
        });

        it('should render legend inside calendar when showCalendarLegend is true', () => {
            fixture.componentRef.setInput('specialDaysRules', [
                { specialDayNumber: 1, rule: () => true, legendText: 'Special Day' }
            ]);
            fixture.componentRef.setInput('showCalendarLegend', true);
            fixture.detectChanges();

            const calendarElement = fixture.debugElement.query(By.css('fd-calendar'));
            expect(calendarElement).toBeTruthy();
            expect(calendarElement.componentInstance.showCalendarLegend).toBe(true);
        });

        it('should not render separate legend in DatetimePicker template', () => {
            fixture.componentRef.setInput('specialDaysRules', [
                { specialDayNumber: 1, rule: () => true, legendText: 'Special Day' }
            ]);
            fixture.componentRef.setInput('showCalendarLegend', true);
            fixture.detectChanges();

            // DatetimePicker should not render legend separately - Calendar does it
            const dateTimePickerLegends = fixture.debugElement.queryAll(
                By.css('fd-datetime-picker fd-calendar-legend')
            );
            expect(dateTimePickerLegends.length).toBe(0);
        });

        it('should default showCalendarLegend to false', () => {
            fixture.detectChanges();

            expect(component.showCalendarLegend()).toBe(false);
        });

        it('should default legendCol to false', () => {
            fixture.detectChanges();

            expect(component.legendCol()).toBe(false);
        });
    });

    describe('Date and Time Integration', () => {
        it('should combine date from calendar and time from time component on submit', () => {
            const date = new FdDate(2024, 5, 15);
            const time = new FdDate(2024, 1, 1, 14, 30, 45);

            component._tempDate = date;
            component._tempTime = time;
            component.submit();

            expect(component.date?.year).toBe(2024);
            expect(component.date?.month).toBe(5);
            expect(component.date?.day).toBe(15);
            expect(component.date?.hour).toBe(14);
            expect(component.date?.minute).toBe(30);
            expect(component.date?.second).toBe(45);
        });

        it('should use current date if tempDate is invalid on submit', () => {
            component._tempDate = null;
            component._tempTime = new FdDate(2024, 1, 1, 10, 20, 30);

            const today = new FdDate();
            component.submit();

            expect(component.date?.year).toBe(today.year);
            expect(component.date?.month).toBe(today.month);
            expect(component.date?.day).toBe(today.day);
            expect(component.date?.hour).toBe(10);
            expect(component.date?.minute).toBe(20);
        });

        it('should emit dateChange on submit', () => {
            jest.spyOn(component, 'onChange');
            const date = new FdDate(2024, 5, 15, 10, 30);
            component._tempDate = date;
            component._tempTime = date;

            component.submit();

            expect(component.onChange).toHaveBeenCalled();
            expect(component.date).toBeDefined();
        });
    });

    describe('Validation', () => {
        it('should validate as invalid when date is invalid and allowNull is false', () => {
            component.allowNull = false;
            component._isInvalidDateInput = true;

            const validationResult = component.validate();

            expect(validationResult).toEqual({ dateValidation: { valid: false } });
        });

        it('should validate as valid when date is valid', () => {
            component.date = new FdDate(2024, 5, 15);
            component._isInvalidDateInput = false;

            const validationResult = component.validate();

            expect(validationResult).toBeNull();
        });

        it('should set isInvalidDateInput to true for invalid input', () => {
            component.allowNull = false;
            component.handleInputChange('invalid-date', true);

            expect(component._isInvalidDateInput).toBe(true);
        });
    });

    describe('Footer Behavior', () => {
        it('should close popover on submit when showFooter is true', () => {
            component.showFooter = true;
            component.isOpen = true;
            jest.spyOn(component, 'closePopover');

            component.submit();

            expect(component.closePopover).toHaveBeenCalled();
        });

        it('should not close popover on date change when showFooter is false', () => {
            component.showFooter = false;
            jest.spyOn(component, 'closePopover');

            component.handleDateChange(new FdDate());

            expect(component.closePopover).not.toHaveBeenCalled();
        });

        it('should restore date on cancel', () => {
            const originalDate = new FdDate(2024, 5, 15);
            component.date = originalDate;
            component._tempDate = new FdDate(2024, 6, 20);

            component.cancel();

            expect(component._tempDate).toEqual(originalDate);
        });
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
