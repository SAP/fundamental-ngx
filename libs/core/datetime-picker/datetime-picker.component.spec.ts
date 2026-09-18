import { Component } from '@angular/core';
import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { INVALID_DATE_ERROR } from '@fundamental-ngx/cdk/utils';
import { DATE_TIME_FORMATS, DateTimeFormats, FdDate, FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { runValueAccessorTests } from 'ngx-cva-test-suite';
import { DatetimePickerComponent } from './datetime-picker.component';
import { DatetimePickerModule } from './datetime-picker.module';

@Component({
    template: '<fd-datetime-picker [date]="date" (dateChange)="dateChanges.push($event)"></fd-datetime-picker>',
    imports: [DatetimePickerModule]
})
class DatetimePickerDateChangeHostComponent {
    date = new FdDate(2024, 5, 15, 9, 30);
    dateChanges: Array<FdDate | null> = [];
}

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

    describe('customDateTimeFormat parsing (fix #14250)', () => {
        it('should use customDateTimeFormat as the parse format when typing into the input', () => {
            const adapter = (component as any)._dateTimeAdapter;
            const parseSpy = jest.spyOn(adapter, 'parse').mockReturnValue(new FdDate(2025, 5, 25, 15, 30));

            component.customDateTimeFormat = 'YYYY-MM-DD HH:mm';
            component.handleInputChange('2025-05-25 15:30', true);

            expect(parseSpy).toHaveBeenCalledWith('2025-05-25 15:30', 'YYYY-MM-DD HH:mm');
        });

        it('should fall back to the provider parse format when customDateTimeFormat is not set', () => {
            const adapter = (component as any)._dateTimeAdapter;
            const parseSpy = jest.spyOn(adapter, 'parse').mockReturnValue(new FdDate(2025, 5, 25));

            component.customDateTimeFormat = undefined;
            component.handleInputChange('5/25/2025', true);

            expect(parseSpy).toHaveBeenCalledWith('5/25/2025', datetimeFormats.parse.dateTimeInput);
        });
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

        it('should notify the CVA on submit', () => {
            jest.spyOn(component, 'onChange');
            const date = new FdDate(2024, 5, 15, 10, 30);
            component._tempDate = date;
            component._tempTime = date;

            component.submit();

            expect(component.onChange).toHaveBeenCalled();
            expect(component.date).toBeDefined();
        });

        it('should update _calendarPendingDate on submit so reopening shows the selected month', () => {
            // Simulate: picker opened with June date, user navigates to August and selects Aug 15
            const juneDate = new FdDate(2024, 6, 5);
            const augustDate = new FdDate(2024, 8, 15);

            component.date = juneDate;
            component._tempDate = augustDate;
            component._tempTime = augustDate;

            component.submit();

            // _calendarPendingDate must reflect the newly submitted date so that
            // when the ViewChild setter calls setCurrentlyDisplayed(_calendarPendingDate)
            // after reopening, it shows August, not June.
            expect((component as any)._calendarPendingDate?.month).toBe(augustDate.month);
            expect((component as any)._calendarPendingDate?.day).toBe(augustDate.day);
        });
    });

    describe('dateChange output', () => {
        let host: DatetimePickerDateChangeHostComponent;
        let hostFixture: ComponentFixture<DatetimePickerDateChangeHostComponent>;
        let hostPicker: DatetimePickerComponent<FdDate>;

        beforeEach(() => {
            hostFixture = TestBed.createComponent(DatetimePickerDateChangeHostComponent);
            hostFixture.detectChanges();
            host = hostFixture.componentInstance;
            hostPicker = hostFixture.debugElement.query(By.directive(DatetimePickerComponent)).componentInstance;
        });

        it('should emit the combined calendar date and time when a selection is submitted', () => {
            hostPicker.date = new FdDate(2024, 5, 15, 9, 30);
            hostPicker._tempDate = new FdDate(2024, 6, 20);
            hostPicker._tempTime = new FdDate(2024, 1, 1, 14, 45, 30);

            hostPicker.submit();

            expect(host.dateChanges).toEqual([new FdDate(2024, 6, 20, 14, 45, 30)]);
        });

        it('should emit when only the time changes on submit', () => {
            const initialDate = new FdDate(2024, 5, 15, 9, 30);
            hostPicker.date = initialDate;
            hostPicker._tempDate = new FdDate(2024, 5, 15);
            hostPicker._tempTime = new FdDate(2024, 1, 1, 14, 45);

            hostPicker.submit();

            expect(host.dateChanges).toEqual([new FdDate(2024, 5, 15, 14, 45)]);
        });

        it('should not emit when submit does not change the date or time', () => {
            const initialDate = new FdDate(2024, 5, 15, 9, 30);
            hostPicker.date = initialDate;
            hostPicker._tempDate = new FdDate(2024, 5, 15);
            hostPicker._tempTime = new FdDate(2024, 1, 1, 9, 30);

            hostPicker.submit();

            expect(host.dateChanges).toEqual([]);
        });

        describe('without a footer', () => {
            beforeEach(() => {
                hostPicker.showFooter = false;
            });

            it('should emit when a changed calendar day is selected', () => {
                hostPicker.date = new FdDate(2024, 5, 15, 9, 30);
                hostPicker._tempTime = new FdDate(2024, 1, 1, 14, 45);

                hostPicker.handleDateChange(new FdDate(2024, 6, 20));

                expect(host.dateChanges).toEqual([new FdDate(2024, 6, 20, 14, 45)]);
            });

            it('should not emit when the selected calendar date has the same effective date-time', () => {
                hostPicker.date = new FdDate(2024, 5, 15, 9, 30);
                hostPicker._tempTime = new FdDate(2024, 1, 1, 9, 30);

                hostPicker.handleDateChange(new FdDate(2024, 5, 15));

                expect(host.dateChanges).toEqual([]);
            });

            it('should emit when a changed time is selected on the same day', () => {
                hostPicker.date = new FdDate(2024, 5, 15, 9, 30);
                hostPicker._tempDate = new FdDate(2024, 5, 15);

                hostPicker.handleTimeChange(new FdDate(2024, 1, 1, 14, 45));

                expect(host.dateChanges).toEqual([new FdDate(2024, 5, 15, 14, 45)]);
            });

            it('should not emit when the selected time has the same effective date-time', () => {
                hostPicker.date = new FdDate(2024, 5, 15, 9, 30);
                hostPicker._tempDate = new FdDate(2024, 5, 15);

                hostPicker.handleTimeChange(new FdDate(2024, 1, 1, 9, 30));

                expect(host.dateChanges).toEqual([]);
            });
        });

        it('should emit once for accepted typing in the default processing mode', () => {
            hostPicker.handleInputChange('6/20/2024', true);
            hostPicker.handleInputChange('6/20/2024', false);

            expect(host.dateChanges).toEqual([new FdDate(2024, 6, 20)]);
        });

        it('should emit once when Enter and blur accept the same input', () => {
            hostPicker.processInputOnBlur = true;

            hostPicker.handleInputChange('6/20/2024', true);
            hostPicker.handleInputChange('6/20/2024', false);
            hostPicker.handleInputChange('6/20/2024', false);

            expect(host.dateChanges).toEqual([new FdDate(2024, 6, 20)]);
        });

        it('should emit once when the same valid value is accepted twice', () => {
            hostPicker.handleInputChange('6/20/2024', true);
            hostPicker.handleInputChange('6/20/2024', true);

            expect(host.dateChanges).toEqual([new FdDate(2024, 6, 20)]);
        });

        it('should emit null once when an allowed value is cleared', () => {
            hostPicker.allowNull = true;
            hostPicker.date = new FdDate(2024, 5, 15, 9, 30);

            hostPicker.handleInputChange('', true);
            hostPicker.handleInputChange('', true);

            expect(host.dateChanges).toEqual([null]);
        });

        it('should not emit for invalid input when null is disallowed', () => {
            hostPicker.allowNull = false;

            hostPicker.handleInputChange('not a date', true);

            expect(host.dateChanges).toEqual([]);
        });

        it('should not emit for programmatic writeValue updates', () => {
            hostPicker.writeValue(new FdDate(2024, 6, 20, 14, 45));

            expect(host.dateChanges).toEqual([]);
        });

        it('should not emit again when Angular Forms writes back an emitted value', () => {
            hostPicker.handleInputChange('6/20/2024', true);
            hostPicker.writeValue(host.dateChanges[0]);

            expect(host.dateChanges).toEqual([new FdDate(2024, 6, 20)]);
        });

        it('should not emit when a desktop selection is cancelled', () => {
            hostPicker.date = new FdDate(2024, 5, 15, 9, 30);
            hostPicker._tempDate = new FdDate(2024, 6, 20);
            hostPicker._tempTime = new FdDate(2024, 1, 1, 14, 45);

            hostPicker.cancel();

            expect(host.dateChanges).toEqual([]);
        });

        it('should not emit when a mobile selection is dismissed', () => {
            hostPicker.dialogDismiss(new FdDate(2024, 5, 15, 9, 30));

            expect(host.dateChanges).toEqual([]);
        });

        it('should emit once when a mobile selection is approved', () => {
            hostPicker.date = new FdDate(2024, 5, 15, 9, 30);
            hostPicker._tempDate = new FdDate(2024, 6, 20);
            hostPicker._tempTime = new FdDate(2024, 1, 1, 14, 45);

            hostPicker.dialogApprove();

            expect(host.dateChanges).toEqual([new FdDate(2024, 6, 20, 14, 45)]);
        });

        it('should not emit when the adapter fails to combine date and time', () => {
            jest.spyOn((hostPicker as any)._dateTimeAdapter, 'setTime').mockImplementation(() => {
                throw new Error('adapter failure');
            });
            hostPicker._tempDate = new FdDate(2024, 6, 20);
            hostPicker._tempTime = new FdDate(2024, 1, 1, 14, 45);

            hostPicker.submit();

            expect(host.dateChanges).toEqual([]);
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
