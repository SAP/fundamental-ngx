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

describe('DatetimePickerComponent', () => {
    let component: DatetimePickerComponent;
    let fixture: ComponentFixture<DatetimePickerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DatetimePickerComponent],
            imports: [CommonModule, IconModule, PopoverModule, CalendarModule, FormsModule, TimeModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DatetimePickerComponent);
        component = fixture.componentInstance;
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

        const dateStr = component.dateTimeAdapter.format(component.date);

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
        expect(component.inputFieldDate).toEqual(component.dateTimeAdapter
            .format(new FdDatetime(component.selectedDate, timeModel))
        );
    });

    it('should not update input with invalid time', () => {
        spyOn(component, 'onChange');
        const timeModel = { hour: 30, minute: 30, second: 45 };
        const dateTime = new FdDatetime(component.date.date, timeModel);
        component.handleInputChange(component.dateTimeAdapter.format(dateTime));
        expect(component.onChange).not.toHaveBeenCalled();
        expect(component.isInvalidDateInput).toEqual(true);
    });

    it('should not update input with invalid date', () => {
        spyOn(component, 'onChange');
        const date = new FdDate(2018, 45, 10);
        const dateTime = new FdDatetime(date, component.date.time);
        component.handleInputChange(component.dateTimeAdapter.format(dateTime));
        expect(component.onChange).not.toHaveBeenCalled();
        expect(component.isInvalidDateInput).toEqual(true);
    });

    it('should update input from calendar', () => {
        spyOn(component, 'onChange');
        component.time = FdDatetime.getToday().time;
        const date = new FdDate(2018, 10, 10);
        const dateTime = new FdDatetime(date, component.time);
        component.handleDateChange(date);

        expect(component.onChange).toHaveBeenCalledWith(dateTime);
        expect(component.inputFieldDate).toEqual(component.dateTimeAdapter
            .format(new FdDatetime(date, component.time))
        );
    });

    it('should handle correct write value function', () => {
        const dateTime = FdDatetime.getToday();
        component.writeValue(dateTime);
        expect(component.selectedDate).toEqual(dateTime.date);
        expect(component.time).toEqual(dateTime.time);
        expect(component.date).toEqual(dateTime);
        expect(component.calendarComponent.currentlyDisplayed.month).toEqual(dateTime.month);
    });

    it('should ignore invalid date picked on time change and show valid on input', () => {
        const dateTime = FdDatetime.getToday();
        component.writeValue(dateTime);
        const time = {hour: 10, minute: 30, second: 20};
        const invalidDate = new FdDatetime(new FdDate(2010, 40, 30), dateTime.time);
        component.inputFieldDate = component.dateTimeAdapter.format(invalidDate);
        component.handleInputChange(component.dateTimeAdapter.format(invalidDate));
        component.handleTimeChange(time);
        expect(component.inputFieldDate).toEqual(component.dateTimeAdapter.format(new FdDatetime(dateTime.date, time)));
        expect(component.isInvalidDateInput).not.toBeTruthy();
    });

    it('should reset time on date change and show valid on input', () => {
        const dateTime = FdDatetime.getToday();
        component.writeValue(dateTime);
        const invalidTime = {hour: 50, minute: 30, second: 20};
        const invalidDate = new FdDatetime(dateTime.date, invalidTime);
        component.inputFieldDate = component.dateTimeAdapter.format(invalidDate);
        component.handleInputChange(component.dateTimeAdapter.format(invalidDate));
        component.handleDateChange(dateTime.date);
        expect(component.inputFieldDate).toEqual(
            component.dateTimeAdapter.format(dateTime)
        );
        expect(component.isInvalidDateInput).not.toBeTruthy();
    });

    it('should handle other types than FdTimeDate', () => {
        const dateTimeString: any = 'asdsad';
        component.writeValue(dateTimeString);
        expect(component.inputFieldDate).not.toBe(dateTimeString);
    });

});
