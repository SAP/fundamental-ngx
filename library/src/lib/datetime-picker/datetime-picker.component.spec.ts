import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatetimePickerComponent } from './datetime-picker.component';
import { CommonModule } from '@angular/common';
import { IconModule } from '../icon/icon.module';
import { UtilsModule } from '../utils/utils.module';
import { PopoverModule } from '../popover/popover.module';
import { CalendarModule } from '../calendar/calendar.module';
import { FormsModule } from '@angular/forms';
import { TimeModule } from '../time/time.module';

describe('DatetimePickerComponent', () => {
    let component: DatetimePickerComponent;
    let fixture: ComponentFixture<DatetimePickerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DatetimePickerComponent],
            imports: [CommonModule, IconModule, UtilsModule, PopoverModule, CalendarModule, FormsModule, TimeModule]
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
        spyOn(component, 'inputValueChange');
        component.isOpen = false;
        component.isInvalidDateInput = true;
        component.openPopover();
        expect(component.inputValueChange).toHaveBeenCalled();
        expect(component.isOpen).toBe(true);
        expect(component.inputFieldDate).toBeNull();
    });

    it('should close the calendar', () => {
        component.isOpen = true;
        component.isInvalidDateInput = true;
        component.closePopover();
        expect(component.inputFieldDate).toBeNull();
        expect(component.isOpen).toBe(false);
    });

    it('should update input from calendar', () => {
        spyOn(component, 'onChange');
        component.date = new Date();
        component.date.setTime(component.date.getTime() - 86400000);
        const dateVal = new Date();
        const d = {
            selectedDay: {
                id: 1,
                date: dateVal
            }
        };
        component.updatePickerInputHandler(d);
        expect(component.onChange).toHaveBeenCalled();
        expect(component.inputFieldDate).toEqual(d.selectedDay.date.toLocaleString());
    });

    it('should update input from calendar for null value', () => {
        spyOn(component, 'onChange');
        component.updatePickerInputHandler('');
        expect(component.selectedDay.date).toBe(null);
        expect(component.selectedDay.selected).toBe(null);
        expect(component.time.second).toBe(null);
        expect(component.time.minute).toBe(null);
        expect(component.time.hour).toBe(null);
        expect(component.timeComponent.displayedHour).toBe(null);
        expect(component.timeComponent.period).toBe('am');
        expect(component.timeComponent.oldPeriod).toBe('am');
        expect(component.inputFieldDate).toBe(null);
        expect(component.onChange).toHaveBeenCalledWith(null);
    });

    it('should update input from time', () => {
        spyOn(component, 'onChange');
        const dateVal = new Date();
        component.time = {hour: dateVal.getHours(), minute: dateVal.getMinutes(), second: dateVal.getSeconds()};
        component.setTime(true);
        expect(component.onChange).toHaveBeenCalled();
        expect(component.inputFieldDate).toEqual(dateVal.toLocaleString());
    });

    it('should handle escape keydown', () => {
        spyOn(component, 'closePopover');
        const keyDownEvent = new KeyboardEvent('keydown', {
            key: 'escape'
        });
        document.dispatchEvent(keyDownEvent);
        expect(component.closePopover).toHaveBeenCalled();
    });

    it('should handle document click', () => {
        spyOn(component, 'closePopover');
        fixture.nativeElement.querySelector('.fd-datetime').click();
        expect(component.closePopover).not.toHaveBeenCalled();
        document.dispatchEvent(new MouseEvent('click'));
        expect(component.closePopover).toHaveBeenCalled();
    });

    it('should write value', () => {
        spyOn(component, 'setTime');
        const dateVal = new Date();
        dateVal.setTime(dateVal.getTime() - 86400000);
        component.writeValue(dateVal);

        expect(component.selectedDay.date.getTime()).toEqual(dateVal.getTime());
        expect(component.date.getTime()).toEqual(dateVal.getTime());
        expect(component.time.hour).toEqual(dateVal.getHours());
        expect(component.time.minute).toEqual(dateVal.getMinutes());
        expect(component.time.second).toEqual(dateVal.getSeconds());
        expect(component.setTime).toHaveBeenCalled();
    });
});
