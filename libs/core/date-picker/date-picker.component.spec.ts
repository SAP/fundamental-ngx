import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { FormStates } from '@fundamental-ngx/cdk/forms';
import { CalendarType, DateRange } from '@fundamental-ngx/core/calendar';
import { DatetimeAdapter, FdDate, FdDatetimeAdapter, FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { runValueAccessorTests } from 'ngx-cva-test-suite';

import { By } from '@angular/platform-browser';
import { FD_LANGUAGE, FD_LANGUAGE_ENGLISH } from '@fundamental-ngx/i18n';
import { of } from 'rxjs';
import { DatePickerComponent } from './date-picker.component';
import { DatePickerModule } from './date-picker.module';

describe('DatePickerComponent', () => {
    let component: DatePickerComponent<FdDate>;
    let fixture: ComponentFixture<DatePickerComponent<FdDate>>;
    let adapter: FdDatetimeAdapter;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [FdDatetimeModule, FormsModule, DatePickerComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent<DatePickerComponent<FdDate>>(DatePickerComponent);
        component = fixture.componentInstance;
        component.isOpen = true;
        component._showPopoverContents = true;
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
        jest.spyOn(component, 'onChange');
        jest.spyOn(component.selectedDateChange, 'emit');
        const date = adapter.today();
        const dateStr = (<any>component)._formatDate(date);
        component._inputFieldDate = '';
        component.handleSingleDateChange(date);
        expect(component._inputFieldDate).toEqual(dateStr);
        expect(component.onChange).toHaveBeenCalledWith(date);
        expect(component.selectedDateChange.emit).toHaveBeenCalledWith(date);
    });

    it('should handle multiple dates change and update input', () => {
        component.allowMultipleSelection = true;
        jest.spyOn(component, 'onChange');
        jest.spyOn(component.selectedMultipleDatesChange, 'emit');
        const dates = [new FdDate(2000, 10, 10), new FdDate(2000, 10, 11), new FdDate(2000, 10, 12)];
        const datesStr = dates.map((date) => (<any>component)._formatDate(date)).join(', ');
        component._inputFieldDate = '';
        component.handleMultipleDatesChange(dates);
        expect(component._inputFieldDate).toEqual(datesStr);
        expect(component.onChange).toHaveBeenCalledWith(dates);
        expect(component.selectedMultipleDatesChange.emit).toHaveBeenCalledWith(dates);
    });

    it('should handle range date change and update input', () => {
        jest.spyOn(component, 'onChange');
        jest.spyOn(component.selectedRangeDateChange, 'emit');
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
        jest.spyOn(component, 'onChange');
        jest.spyOn(component.selectedRangeDateChange, 'emit');
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

    it('should handle correct write value for multiple dates mode', () => {
        component.allowMultipleSelection = true;
        const dates = [new FdDate(2000, 10, 10), new FdDate(2000, 10, 11), new FdDate(2000, 10, 12)];
        const datesStr = dates.map((date) => (<any>component)._formatDate(date)).join(', ');
        component.writeValue(dates);
        expect(component.selectedMultipleDates).toEqual(dates);
        expect(component._inputFieldDate).toBe(datesStr);
    });

    it('should handle null write value for multiple dates mode', () => {
        component.allowMultipleSelection = true;
        component.writeValue(null);
        expect(component.selectedMultipleDates).toEqual([]);
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
        jest.spyOn(component.selectedDateChange, 'emit');
        component.type = 'single';
        component.dateStringUpdate('hello');
        const date = adapter.parse('hello');
        expect(component._isInvalidDateInput).toBe(true);
        expect(component.selectedDateChange.emit).toHaveBeenCalledWith(date);
        expect(component.isModelValid()).toBe(false);
    });

    it('should register invalid string date and not call event for multiple dates mode', () => {
        component.allowMultipleSelection = true;
        jest.spyOn(component.selectedMultipleDatesChange, 'emit');
        component.type = 'single';

        const invalidDate = new FdDate(NaN, NaN, NaN);
        jest.spyOn(adapter, 'parse').mockImplementation((str) => {
            if (str === 'hello') {
                return invalidDate;
            }
            return null;
        });

        component.dateStringUpdate('hello');
        expect(component._isInvalidDateInput).toBe(true);
        // Ensure that the array passed to the emit method contains only valid FdDate instances
        expect(component.selectedMultipleDatesChange.emit).toHaveBeenCalledWith(
            [invalidDate].filter((date) => date instanceof FdDate)
        );
        expect(component.isModelValid()).toBe(false);
    });

    it('should register invalid string date and not call event for range mode', () => {
        jest.spyOn(component.selectedRangeDateChange, 'emit');
        component.type = 'range';
        component.dateStringUpdate('start - end');
        const start = adapter.parse('start');
        const end = adapter.parse('end');
        expect(component._isInvalidDateInput).toBe(true);
        expect(component.selectedRangeDateChange.emit).toHaveBeenCalledWith({ start, end });
        expect(component.isModelValid()).toBe(false);
    });

    it('should handle valid reversed range string date', () => {
        jest.spyOn(component.selectedRangeDateChange, 'emit');
        jest.spyOn(component, 'onChange');
        const date1 = new FdDate(2011, 10, 10);
        const date2 = new FdDate(2000, 10, 10);
        const strDate1 = (<any>component)._formatDate(date1);
        const strDate2 = (<any>component)._formatDate(date2);

        jest.spyOn(adapter, 'parse').mockImplementation((str) => {
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
        jest.spyOn(component.selectedDateChange, 'emit');
        jest.spyOn(component, 'onChange');
        component.disableFunction = () => true;
        const todayDate = new FdDate();
        const date = new FdDate(2000, 10, 10);
        const strDate = (<any>component)._formatDate(date);
        component.type = 'single';
        jest.spyOn(adapter, 'parse').mockReturnValue(date);
        component.dateStringUpdate(strDate);
        expect(component._isInvalidDateInput).toBe(true);
        expect(component._calendarComponent._currentlyDisplayed.month).toBe(todayDate.month);
        expect(component._calendarComponent._currentlyDisplayed.year).toBe(todayDate.year);
        expect(component.selectedDateChange.emit).toHaveBeenCalledWith(date);
        expect(component.onChange).toHaveBeenCalledWith(date);
    });

    it('should handle multiple dates blocked by disable function and set invalid', () => {
        component.allowMultipleSelection = true;
        jest.spyOn(component.selectedMultipleDatesChange, 'emit');
        jest.spyOn(component, 'onChange');
        component.disableFunction = () => true;
        const todayDate = new FdDate();
        const dates = [new FdDate(2000, 10, 10)];
        const datesStr = (<any>component).formatDateArray(dates);
        component.type = 'single';
        jest.spyOn(adapter, 'parse').mockImplementation((str) => {
            const [day, month, year] = str.split('/').map(Number);
            return new FdDate(year, month, day);
        });
        component.dateStringUpdate(datesStr);
        expect(component._isInvalidDateInput).toBe(true);
        expect(component._calendarComponent._currentlyDisplayed.month).toBe(todayDate.month);
        expect(component._calendarComponent._currentlyDisplayed.year).toBe(todayDate.year);
        expect(component.selectedMultipleDatesChange.emit).toHaveBeenCalledWith(dates);
        expect(component.onChange).toHaveBeenCalledWith(dates);
    });

    it('should handle both range dates blocked by disable function and set invalid', () => {
        jest.spyOn(component.selectedRangeDateChange, 'emit');
        jest.spyOn(component, 'onChange');
        component.type = 'range';
        component.disableRangeStartFunction = () => true;
        component.disableRangeEndFunction = () => true;
        const todayDate = new FdDate();
        const date1 = new FdDate(2011, 10, 10);
        const date2 = new FdDate(2000, 10, 10);
        const strDate1 = (<any>component)._formatDate(date1);
        const strDate2 = (<any>component)._formatDate(date2);
        const rangeDateInvalidObject: DateRange<FdDate> = { start: date2, end: date1 };

        jest.spyOn(adapter, 'parse').mockImplementation((str) => {
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
        jest.spyOn(component.selectedRangeDateChange, 'emit');
        jest.spyOn(component, 'onChange');
        component.type = 'range';
        component.disableRangeEndFunction = (fdDate: FdDate) => adapter.compareDate(fdDate, FdDate.getToday()) > 0;

        const date1 = new FdDate(2010, 10, 10);
        const date2 = adapter.addCalendarDays(new FdDate(), 1);
        const strDate1 = (<any>component)._formatDate(date1);
        const strDate2 = (<any>component)._formatDate(date2);

        const rangeDateInvalidObject: DateRange<FdDate> = { start: date1, end: date2 };
        jest.spyOn(adapter, 'parse').mockImplementation((str) => {
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
        const hideSpy = jest.spyOn((<any>component)._popoverFormMessage, 'hide');
        component.openCalendar();
        fixture.detectChanges();
        expect(hideSpy).toHaveBeenCalled();
    });

    it('should show message on close', () => {
        component.isOpen = true;
        const showSpy = jest.spyOn((<any>component)._popoverFormMessage, 'show');
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

    it('should handle multiple date ranges change and update input', () => {
        jest.spyOn(component, 'onChange');
        jest.spyOn(component.selectedMultipleDateRangesChange, 'emit');
        const dateStart1 = adapter.today();
        const dateEnd1 = adapter.addCalendarDays(dateStart1, 10);
        const dateStart2 = adapter.addCalendarDays(dateEnd1, 5);
        const dateEnd2 = adapter.addCalendarDays(dateStart2, 10);
        const dateRanges = [
            { start: dateStart1, end: dateEnd1 },
            { start: dateStart2, end: dateEnd2 }
        ];
        const dateStr1 = `${(<any>component)._formatDate(dateStart1)}${component._rangeDelimiter}${(<any>(
            component
        ))._formatDate(dateEnd1)}`;
        const dateStr2 = `${(<any>component)._formatDate(dateStart2)}${component._rangeDelimiter}${(<any>(
            component
        ))._formatDate(dateEnd2)}`;
        component._inputFieldDate = '';
        component.handleMultipleDateRangesChange(dateRanges);
        expect(component._inputFieldDate).toBe(`${dateStr1}, ${dateStr2}`);
        expect(component.onChange).toHaveBeenCalledWith(dateRanges);
        expect(component.selectedMultipleDateRangesChange.emit).toHaveBeenCalledWith(dateRanges);
    });

    it('should handle today button click and update input for multiple date ranges', () => {
        jest.spyOn(component, 'onChange');
        jest.spyOn(component.selectedMultipleDateRangesChange, 'emit');
        component.type = 'range';
        component.allowMultipleSelection = true;
        const date = adapter.today();
        const dateStr = (<any>component)._formatDate(date);
        const dateRanges = [{ start: date, end: date }];
        component._inputFieldDate = '';
        component.onTodayButtonClick();
        expect(component._inputFieldDate).toBe(`${dateStr}${component._rangeDelimiter}${dateStr}`);
        expect(component.onChange).toHaveBeenCalledWith(dateRanges);
        expect(component.selectedMultipleDateRangesChange.emit).toHaveBeenCalledWith(dateRanges);
    });

    it('should handle correct write value for multiple date ranges mode', () => {
        component.type = 'range';
        component.allowMultipleSelection = true;
        const dateStart1 = adapter.today();
        const dateEnd1 = adapter.addCalendarDays(dateStart1, 10);
        const dateStart2 = adapter.addCalendarDays(dateEnd1, 5);
        const dateEnd2 = adapter.addCalendarDays(dateStart2, 10);
        const dateRanges = [
            { start: dateStart1, end: dateEnd1 },
            { start: dateStart2, end: dateEnd2 }
        ];
        component.writeValue(dateRanges);
        expect(component.selectedMultipleDateRanges).toEqual(dateRanges);
    });

    it('should handle null write value for multiple date ranges mode', () => {
        component.allowMultipleSelection = true;
        component.writeValue(null);
        expect(component.selectedMultipleDateRanges).toEqual([]);
        expect(component._inputFieldDate).toBe('');
    });

    it('should register invalid string date and not call event for multiple date ranges mode', () => {
        jest.spyOn(component.selectedMultipleDateRangesChange, 'emit');
        component.type = 'range';
        component.allowMultipleSelection = true;
        component.dateStringUpdate('start1 - end1, start2 - end2');
        const start1 = adapter.parse('start1');
        const end1 = adapter.parse('end1');
        const start2 = adapter.parse('start2');
        const end2 = adapter.parse('end2');
        component.selectedMultipleDateRanges = [
            { start: start1, end: end1 },
            { start: start2, end: end2 }
        ];
        expect(component._isInvalidDateInput).toBe(true);
        expect(component.selectedMultipleDateRangesChange.emit).not.toHaveBeenCalled();
        expect(component.isModelValid()).toBe(false);
    });

    it('should toggle the calendar with the f4 key', () => {
        jest.spyOn(component, 'toggleCalendar');
        component._inputElement.nativeElement.dispatchEvent(
            new KeyboardEvent('keydown', {
                key: 'f4'
            })
        );
        expect(component.toggleCalendar).toHaveBeenCalled();
    });
});

describe('DatePickerComponent Accessibility', () => {
    let fixture: ComponentFixture<HostComponent>;

    @Component({
        template: `
            <fd-date-picker [type]="type" [message]="message" [state]="state" [required]="required"></fd-date-picker>
        `,
        standalone: true,
        imports: [FdDatetimeModule, DatePickerModule],
        providers: [
            {
                provide: FD_LANGUAGE,
                useValue: of({
                    ...FD_LANGUAGE_ENGLISH,
                    coreDatePicker: {
                        ...FD_LANGUAGE_ENGLISH.coreDatePicker,
                        dateInputLabel: 'Date input',
                        dateRangeInputLabel: 'Date range input',
                        valueStateSuccessMessage: 'Value state Success',
                        valueStateInformationMessage: 'Value state Information',
                        valueStateWarningMessage: 'Value state Warning',
                        valueStateErrorMessage: 'Value state Error'
                    }
                })
            }
        ]
    })
    class HostComponent {
        @ViewChild(DatePickerComponent) datePicker: DatePickerComponent<FdDate>;

        type: CalendarType = 'single';
        message = 'This is a message';
        required = false;
        state: FormStates | null = null;
    }

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [HostComponent],
            providers: []
        }).compileComponents();
    }));

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
    template: `<fd-date-picker></fd-date-picker>`,
    standalone: true,
    imports: [DatePickerModule, FdDatetimeModule]
})
class DateTimePickerHostComponent {
    @ViewChild(DatePickerComponent) picker: DatePickerComponent<FdDate>;
}

runValueAccessorTests<DatePickerComponent<FdDate>, DateTimePickerHostComponent>({
    component: DatePickerComponent,
    name: 'Date picker',
    testModuleMetadata: {
        imports: [DateTimePickerHostComponent]
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
