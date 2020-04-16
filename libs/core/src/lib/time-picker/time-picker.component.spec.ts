import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';

import { PopoverModule } from '../popover/popover.module';
import { InputGroupModule } from '../input-group/input-group.module';

import { TimePickerComponent } from './time-picker.component';
import { TimeObject } from '../time/time-object';
import { ButtonModule } from '../button/button.module';
import { TimeModule } from '../time/time.module';

describe('TimePickerComponent', () => {
    let component: TimePickerComponent;
    let fixture: ComponentFixture<TimePickerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, PopoverModule, InputGroupModule, ButtonModule, TimeModule],
            declarations: [TimePickerComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimePickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create with default values', () => {
        expect(component).toBeTruthy();
        expect(component.spinners).toBe(true);
        expect(component.displaySeconds).toBe(true);
    });

    it('should get time', () => {
        const newTime: TimeObject = { hour: 1, minute: 0, second: 0 };
        component.time = newTime;
        const retVal = component.getTime();
        expect(retVal).toEqual(newTime);
    });

    it('should get formatted meridian time, 0:00:00', () => {
        const newTime: TimeObject = { hour: 0, minute: 0, second: 0 };
        component.time = newTime;
        component.meridian = true;
        const retVal = component.getFormattedTime();
        expect(retVal).toBe('12:00:00 am');
    });

    it('should get formatted meridian time, 13:00:00', () => {
        const newTime: TimeObject = { hour: 13, minute: 0, second: 0 };
        component.time = newTime;
        component.meridian = true;
        const retVal = component.getFormattedTime();
        expect(retVal).toBe('1:00:00 pm');
    });

    it('should get formatted non-meridian time, 13:00:00', () => {
        const newTime: TimeObject = { hour: 13, minute: 0, second: 0 };
        component.time = newTime;
        component.meridian = false;
        const retVal = component.getFormattedTime();
        expect(retVal).toBe('13:00:00');
    });

    it('should get formatted meridian time, 12:00:00', () => {
        const newTime: TimeObject = { hour: 12, minute: 0, second: 0 };
        component.time = newTime;
        component.meridian = true;
        const retVal = component.getFormattedTime();
        expect(retVal).toBe('12:00:00 pm');
    });

    it('should get formatted meridian time, 11:00:00', () => {
        const newTime: TimeObject = { hour: 11, minute: 0, second: 0 };
        component.time = newTime;
        component.meridian = true;
        const retVal = component.getFormattedTime();
        expect(retVal).toBe('11:00:00 am');
    });

    it('should append extra zeros when minutes or seconds are < 10', () => {
        const newTime: TimeObject = { hour: 0, minute: 7, second: 9 };
        component.time = newTime;
        component.meridian = true;
        const retVal = component.getFormattedTime();
        expect(retVal).toBe('12:07:09 am');
    });

    it('should not append extra zeros when minutes or seconds are >= 10', () => {
        const newTime: TimeObject = { hour: 0, minute: 10, second: 11 };
        component.time = newTime;
        component.meridian = true;
        const retVal = component.getFormattedTime();
        expect(retVal).toBe('12:10:11 am');
    });

    it('should handle timeInputChanged for 24 hour time picker with seconds', () => {
        const newTime: TimeObject = { hour: 0, minute: 0, second: 0 };
        component.time = newTime;
        component.meridian = false;
        component.displaySeconds = true;
        component.timeInputChanged('12:00:00');
        expect(component.time.hour).toBe(12);
        expect(component.time.minute).toBe(0);
        expect(component.time.second).toBe(0);
    });

    it('should handle timeInputChanged for 24 hour time picker without seconds', () => {
        const newTime: TimeObject = { hour: 0, minute: 0, second: 0 };
        component.time = newTime;
        component.meridian = false;
        component.displaySeconds = false;
        component.timeInputChanged('12:00');
        expect(component.time.hour).toBe(12);
        expect(component.time.minute).toBe(0);
        expect(component.time.second).toBeFalsy();
    });

    it('should handle timeInputChanged for 24 hour time picker without minutes', () => {
        const newTime: TimeObject = { hour: 0, minute: 0, second: 0 };
        component.time = newTime;
        component.meridian = false;
        component.displaySeconds = false;
        component.displayMinutes = false;
        component.timeInputChanged('12');
        expect(component.time.hour).toBe(12);
        expect(component.time.minute).toBeFalsy();
        expect(component.time.second).toBeFalsy();
    });

    it('should handle regexp fail for 24 hour clock', () => {
        const newTime: TimeObject = { hour: 0, minute: 0, second: 0 };
        component.time = newTime;
        component.meridian = false;
        component.displaySeconds = false;
        component.timeInputChanged('asdf');
        expect(component.isInvalidTimeInput).toBeTruthy();
    });

    it('should handle timeInputChanged for meridian time picker with seconds', () => {
        const newTime: TimeObject = { hour: 0, minute: 0, second: 0 };
        component.time = newTime;
        component.meridian = true;
        component.displaySeconds = true;
        component.timeInputChanged('11:59:59 am');
        expect(component.time.hour).toBe(11);
        expect(component.time.minute).toBe(59);
        expect(component.time.second).toBe(59);
    });

    it('should handle timeInputChanged for meridian time picker without seconds', () => {
        const newTime: TimeObject = { hour: 0, minute: 0, second: 0 };
        component.time = newTime;
        component.meridian = true;
        component.displaySeconds = false;
        component.timeInputChanged('11:59 am');
        expect(component.time.hour).toBe(11);
        expect(component.time.minute).toBe(59);
        expect(component.time.second).toBeFalsy();
    });

    it('should handle timeInputChanged for 24 hour time picker without minutes', () => {
        const newTime: TimeObject = { hour: 0, minute: 0, second: 0 };
        component.time = newTime;
        component.meridian = true;
        component.displaySeconds = false;
        component.displayMinutes = false;
        component.timeInputChanged('11 am');
        expect(component.time.hour).toBe(11);
        expect(component.time.minute).toBeFalsy();
        expect(component.time.second).toBeFalsy();
    });

    it('should handle timeInputChanged for meridian time picker with PM/seconds', () => {
        const newTime: TimeObject = { hour: 0, minute: 0, second: 0 };
        component.time = newTime;
        component.meridian = true;
        component.displaySeconds = true;
        component.timeInputChanged('11:59:59 pm');
        expect(component.time.hour).toBe(23);
        expect(component.time.minute).toBe(59);
        expect(component.time.second).toBe(59);
    });

    it('should handle timeInputChanged for meridian time picker without seconds and minutes where hour is 12', () => {
        const newTime: TimeObject = { hour: 0, minute: 0, second: 0 };
        component.time = newTime;
        component.meridian = true;
        component.displaySeconds = false;
        component.displayMinutes = false;
        component.timeInputChanged('12 am');
        expect(component.time.hour).toBe(0);
        expect(component.time.minute).toBeFalsy();
        expect(component.time.second).toBeFalsy();
    });

    it('should handle timeInputChanged for meridian time picker without seconds and minutes where hour is 11', () => {
        const newTime: TimeObject = { hour: 0, minute: 0, second: 0 };
        component.time = newTime;
        component.meridian = true;
        component.displaySeconds = false;
        component.displayMinutes = false;
        component.timeInputChanged('11 pm');
        expect(component.time.hour).toBe(23);
        expect(component.time.minute).toBeFalsy();
        expect(component.time.second).toBeFalsy();
    });

    it('should handle regexp fail for meridian clock', () => {
        const newTime: TimeObject = { hour: 0, minute: 0, second: 0 };
        component.time = newTime;
        component.meridian = false;
        component.displaySeconds = false;
        component.timeInputChanged('asdf');
        expect(component.isInvalidTimeInput).toBeTruthy();
    });

    it('should handle input group click', () => {
        component.isOpen = false;
        component.disabled = false;
        const event = { stopPropagation: function () {} };
        spyOn(event, 'stopPropagation').and.callThrough();
        component.inputGroupClicked(event);
        expect(event.stopPropagation).toHaveBeenCalled();
        expect(component.isOpen).toBe(true);
    });

    it('should handle addon button click', () => {
        component.disabled = false;
        const event = { stopPropagation: function () {} };
        spyOn(event, 'stopPropagation').and.callThrough();
        component.addOnButtonClicked();
        expect(component.isOpen).toBe(true);
    });

    it('should handle popover close', () => {
        component.isOpen = true;
        component.popoverClosed();
        expect(component.isOpen).toBe(false);
    });

    it('should get the placeholder', () => {
        component.displaySeconds = true;
        component.meridian = true;
        let retVal = component.getPlaceholder();
        expect(retVal).toBe('hh:mm:ss am/pm');
        component.displaySeconds = true;
        component.meridian = false;
        retVal = component.getPlaceholder();
        expect(retVal).toBe('hh:mm:ss');
        component.displaySeconds = false;
        component.meridian = true;
        retVal = component.getPlaceholder();
        expect(retVal).toBe('hh:mm am/pm');
        component.displaySeconds = false;
        component.meridian = false;
        retVal = component.getPlaceholder();
        expect(retVal).toBe('hh:mm');
    });

    it('should not format time if hour or minute is null', () => {
        component.time.second = 1;
        component.time.minute = 1;
        component.time.hour = null;
        let retVal = component.getFormattedTime();
        expect(retVal).toBe('');
        component.time.minute = null;
        retVal = component.getFormattedTime();
        expect(retVal).toBe('');
        component.time.hour = 1;
        component.time.minute = 1;
        retVal = component.getFormattedTime();
        expect(retVal).toBeDefined();
    });

    it('should call onChange when time from time picker changes', () => {
        spyOn(component, 'onChange');
        component.time = { hour: 12, minute: 0, second: 0 };
        component.timeFromTimeComponentChanged();
        expect(component.onChange).toHaveBeenCalledWith(component.time);
    });
});
