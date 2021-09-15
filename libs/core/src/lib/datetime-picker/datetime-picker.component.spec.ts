import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';

import { DATE_TIME_FORMATS, DateTimeFormats, FdDate, FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { DatetimePickerComponent, DatetimePickerModule } from '@fundamental-ngx/core/datetime-picker';
import { INVALID_DATE_ERROR } from '@fundamental-ngx/core/utils';

describe('DatetimePickerComponent', () => {
    let component: DatetimePickerComponent<FdDate>;
    let fixture: ComponentFixture<DatetimePickerComponent<FdDate>>;
    let datetimeFormats: DateTimeFormats;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [DatetimePickerModule, FdDatetimeModule]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent<DatetimePickerComponent<FdDate>>(DatetimePickerComponent);
        component = fixture.componentInstance;
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
        spyOn(component, 'onChange').and.callThrough();

        component.allowNull = true;
        component.handleInputChange('');

        const today = new FdDate();

        expect(component.onChange).toHaveBeenCalledWith(null);
        expect(component.date).toEqual(today);
    });

    it('should not update input with invalid time', () => {
        component.allowNull = false;
        component.handleInputChange('hello');
        expect(component.isInvalidDateInput).toEqual(true);
    });

    it('should update input from calendar', () => {
        spyOn(component, 'onChange');
        const tempTime = new FdDate();
        component._tempTime = tempTime;
        const date = new FdDate(2018, 10, 10);
        component.handleDateChange(date);
        component.submit();

        expect(component.date.year).toEqual(date.year);
        expect(component.date.hour).toEqual(tempTime.hour);
        expect(component.date.minute).toEqual(tempTime.minute);
    });

    it('should handle correct write value function', () => {
        const dateTime = new FdDate();
        component.writeValue(dateTime);

        expect(component.date).toEqual(dateTime);
        expect(component._calendarComponent.currentlyDisplayed.month).toEqual(dateTime.month);
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
        const hideSpy = spyOn((<any>component)._popoverFormMessage, 'hide');
        component.openPopover();
        expect(hideSpy).toHaveBeenCalled();
    })

    it('should show message on close', () => {
        component.isOpen = true;

        const showSpy = spyOn((<any>component)._popoverFormMessage, 'show');
        component.closePopover();
        expect(showSpy).toHaveBeenCalled();
    });
});
