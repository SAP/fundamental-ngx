import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatetimePickerComponent } from './datetime-picker.component';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon/icon.module';
import { PopoverModule } from '../popover/popover.module';
import { CalendarModule } from '../calendar/calendar.module';
import { FormsModule } from '@angular/forms';
import { TimeModule } from '../time/time.module';
import { FdDatetime } from './models/fd-datetime';
import { FdDate } from '../calendar/models/fd-date';
import { ButtonModule } from '../button/button.module';
import { InputGroupModule } from '../input-group/input-group.module';

describe('DatetimePickerComponent', () => {
    let component: DatetimePickerComponent;
    let fixture: ComponentFixture<DatetimePickerComponent>;

    const takeAtLeastTwoDigits = (digit: number): string => {
        return digit < 10 ? '0' + digit : String(digit);
    };

    const internalParser = (date: FdDatetime): string => {
        return takeAtLeastTwoDigits(date.month) + '/' +
            takeAtLeastTwoDigits(date.day) + '/' +
            date.year + ', ' +
            takeAtLeastTwoDigits(date.hour) + ':' +
            takeAtLeastTwoDigits(date.minute) + ':' +
            takeAtLeastTwoDigits(date.second)
        ;
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DatetimePickerComponent],
            imports: [
                CommonModule,
                IconModule,
                PopoverModule,
                CalendarModule,
                FormsModule,
                TimeModule,
                InputGroupModule,
                ButtonModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DatetimePickerComponent);
        component = fixture.componentInstance;
        component.date = new FdDatetime(FdDate.getToday().nextDay(), FdDatetime.getToday().time);
        component.selectedDate = FdDate.getToday().nextDay();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open the popover', () => {
        component.isOpen = false;
        component.isInvalidDateInput = false;
        component.openPopover();
        expect(component.isOpen).toBe(true);
    });

    it('should not open the popover if the component is disabled', () => {
        component.isOpen = false;
        component.disabled = true;
        component.isInvalidDateInput = false;
        component.openPopover();
        expect(component.isOpen).toBe(false);
    });

    it('should close the calendar', () => {
        component.isOpen = true;
        component.isInvalidDateInput = true;
        component.closePopover();
        expect(component.inputFieldDate).toBeNull();
        expect(component.isOpen).toBe(false);
    });

    it('should update from input', () => {
        spyOn(component, 'onChange');
        component.date = FdDatetime.getToday();

        const dateStr = internalParser(component.date);

        component.handleInputChange(dateStr);

        expect(component.calendarComponent.currentlyDisplayed.month).toBe(component.date.month);
        expect(component.calendarComponent.currentlyDisplayed.year).toBe(component.date.year);
        expect(component.onChange).toHaveBeenCalledWith(component.date);
    });

    it('should update from input for null value', () => {
        spyOn(component, 'onChange');
        component.allowNull = true;
        component.handleInputChange('');
        const today = FdDatetime.getToday();
        expect(component.onChange).toHaveBeenCalledWith(null);
        expect(component.date).toEqual(today);
    });

    it('should update input from time but no date', () => {
        spyOn(component, 'onChange');
        component.selectedDate = FdDate.getToday();
        const timeModel = { hour: 12, minute: 30, second: 45 };
        const dateTime = new FdDatetime(component.selectedDate, timeModel);
        component.handleTimeChange(timeModel);

        expect(component.onChange).toHaveBeenCalledWith(dateTime);
        expect(component.inputFieldDate).toEqual((<any>component)
            ._formatDateTime(new FdDatetime(component.selectedDate, timeModel))
        );
    });

    it('should not update input with invalid time', () => {
        spyOn(component, 'onChange');
        const timeModel = { hour: 30, minute: 30, second: 45 };
        const dateTime = new FdDatetime(component.date.date, timeModel);
        const dateStr = internalParser(dateTime);
        component.handleInputChange(dateStr);
        expect(component.isInvalidDateInput).toEqual(true);
    });

    it('should not update input with invalid date', () => {
        spyOn(component, 'onChange');
        const date = new FdDate(2018, 45, 10);
        const dateTime = new FdDatetime(date, component.date.time);
        const dateStr = internalParser(dateTime);
        component.handleInputChange(dateStr);
        expect(component.isInvalidDateInput).toEqual(true);
    });

    it('should update input from calendar', () => {
        spyOn(component, 'onChange');
        component.time = FdDatetime.getToday().time;
        const date = new FdDate(2018, 10, 10);
        const dateTime = new FdDatetime(date, component.time);
        component.handleDateChange(date);

        expect(component.onChange).toHaveBeenCalledWith(dateTime);
        expect(component.inputFieldDate).toEqual((<any>component)._formatDateTime(new FdDatetime(date, component.time)));
    });

    it('should handle correct write value function', () => {
        const dateTime = FdDatetime.getToday();
        component.writeValue(dateTime);
        expect(component.selectedDate).toEqual(dateTime.date);
        expect(component.time).toEqual(dateTime.time);
        expect(component.date).toEqual(dateTime);
        expect(component.calendarComponent.currentlyDisplayed.month).toEqual(dateTime.month);
    });

    it('should handle invalid date picked on time change and show it on input', () => {
        const dateTime = FdDatetime.getToday();
        component.writeValue(dateTime);
        const invalidDate = new FdDatetime(new FdDate(2010, 40, 30), dateTime.time);

        const invalidDateStr = internalParser(invalidDate);
        component.inputFieldDate = invalidDateStr;
        component.handleInputChange(invalidDateStr);
        expect(component.inputFieldDate).toEqual(invalidDateStr);
        expect(component.isInvalidDateInput).toBeTruthy();
    });

    it('should stick to last valid, on invalid string.', () => {
        const dateTime = new FdDatetime(FdDate.getToday(), { hour: 12, minute: 11, second: 10 });
        component.writeValue(dateTime);
        const invalidTime = { hour: 50, minute: 30, second: 20 };
        const invalidDate = new FdDatetime(dateTime.date, invalidTime);
        component.handleInputChange(internalParser(invalidDate));
        expect(component.inputFieldDate).toEqual(internalParser(dateTime));
        expect(component.isInvalidDateInput).toBeTruthy();
    });

    it('should handle other types than FdTimeDate', () => {
        const dateTimeString: any = 'asdsad';
        component.writeValue(dateTimeString);
        expect(component.inputFieldDate).not.toBe(dateTimeString);
    });

});
