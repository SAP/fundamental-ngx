import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';

import { PopoverModule } from '../popover/popover.module';
import { InputGroupModule } from '../input-group/input-group.module';
import { TimeComponent } from '../time/time.component';

import { TimePickerComponent } from './time-picker.component';
import { TimeObject } from '../time/time-object';

describe('TimePickerComponent', () => {
    let component: TimePickerComponent;
    let fixture: ComponentFixture<TimePickerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, PopoverModule, InputGroupModule],
            declarations: [TimeComponent, TimePickerComponent]
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
});
