import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TimeObject } from './time-object';

import { TimeComponent } from './time.component';
import { SimpleChange } from '@angular/core';
import { ButtonModule } from '../button/button.module';
import { PipeModule } from '../utils/pipes/pipe.module';

describe('TimeComponent', () => {
    let component: TimeComponent;
    let fixture: ComponentFixture<TimeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ButtonModule, PipeModule],
            declarations: [TimeComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        const time: TimeObject = { hour: 0, minute: 0, second: 0 };
        component.time = time;
        expect(component).toBeTruthy();
    });

    it('should set the displayed hour', () => {
        component.meridian = true;
        component.time.hour = 0;
        component.setDisplayedHour();
        expect(component.period).toBe('am');
        expect(component.displayedHour).toBe(12);

        component.time.hour = 13;
        component.setDisplayedHour();
        expect(component.period).toBe('pm');
        expect(component.displayedHour).toBe(1);

        component.time.hour = 12;
        component.setDisplayedHour();
        expect(component.period).toBe('pm');
        expect(component.displayedHour).toBe(12);

        component.time.hour = 1;
        component.setDisplayedHour();
        expect(component.period).toBe('am');
        expect(component.displayedHour).toBe(1);
    });

    it('should handle displayedHourChanged', () => {

        component.meridian = true;

        component.period = 'am';
        component.displayedHourChanged(12);
        expect(component.time.hour).toBe(0);

        component.period = 'am';
        component.displayedHourChanged(1);
        expect(component.time.hour).toBe(1);

        component.period = 'pm';
        component.displayedHourChanged(12);
        expect(component.time.hour).toBe(12);

        component.period = 'pm';
        component.displayedHourChanged(1);
        expect(component.time.hour).toBe(13);

        component.meridian = false;

        component.displayedHourChanged(12);
        expect(component.time.hour).toBe(12);

        component.displayedHourChanged(1);
        expect(component.time.hour).toBe(1);
    });

    it('should handle input blur for displayedHour === 0, meridian', () => {
        component.meridian = true;
        component.displayedHour = 0;
        component.inputBlur('hour');
        expect(component.time.hour).toBe(0);
        expect(component.period).toBe('am');
    });

    it('should handle input blur for non-meridian big numbers', () => {
        component.displayedHour = -100.123;
        component.inputBlur('hour');
        expect(component.time.hour).toBe(4);
    });

    it('should handle input blur for displayedHour > 12, < 24', () => {
        spyOn(component, 'setDisplayedHour');
        component.meridian = true;
        component.period = 'pm';
        component.displayedHour = 16;
        component.inputBlur('hour');
        expect(component.time.hour).toBe(16);
        expect(component.displayedHour).toBe(4);
        component.meridian = true;
        component.period = 'am';
        component.displayedHour = 16;
        component.inputBlur('hour');
        expect(component.time.hour).toBe(16);
        expect(component.displayedHour).toBe(4);
        expect(component.period).toBe('pm');
    });

    it('should handle input blur for displayedHour > 24', () => {
        spyOn(component, 'displayedHourChanged');
        spyOn(component, 'setDisplayedHour');
        component.meridian = true;
        component.displayedHour = 37;
        component.inputBlur('hour');
        expect(component.displayedHour).toBe(1);
    });

    it('should handle input blur for displayedHour > 12, pm', () => {
        component.meridian = true;
        component.displayedHour = 13;
        component.time.hour = 13;
        component.period = 'pm';
        component.inputBlur('hour');
        expect(component.displayedHour).toBe(1);
        expect(component.time.hour).toBe(13);
    });

    it('should handle input blur for minute', () => {
        component.time.minute = -1.123;
        component.inputBlur('minute');
        expect(component.time.minute).toBe(1);
    });

    it('should handle input blur for second', () => {
        component.time.second = -1.123;
        component.inputBlur('second');
        expect(component.time.second).toBe(1);
    });

    it('should handle ngOnChanges', () => {
        spyOn(component, 'setDisplayedHour');
        component.meridian = true;
        const meridianChange: SimpleChange = new SimpleChange(false, true, true);
        component.ngOnChanges({meridian: meridianChange});
        expect(component.setDisplayedHour).toHaveBeenCalled();
    });

    it('should increase the hour', () => {
        component.time.hour = null;
        component.increaseHour();
        expect(component.time.hour).toBe(0);
        component.time.hour = 23;
        component.increaseHour();
        expect(component.time.hour).toBe(0);
        component.time.hour = 1;
        component.increaseHour();
        expect(component.time.hour).toBe(2);
        spyOn(component, 'setDisplayedHour');
        component.meridian = true;
        component.increaseHour();
        expect(component.setDisplayedHour).toHaveBeenCalled();
    });

    it('should decrease the hour', () => {
        component.time.hour = null;
        component.decreaseHour();
        expect(component.time.hour).toBe(0);
        component.time.hour = 0;
        component.decreaseHour();
        expect(component.time.hour).toBe(23);
        component.time.hour = 1;
        component.decreaseHour();
        expect(component.time.hour).toBe(0);
        spyOn(component, 'setDisplayedHour');
        component.meridian = true;
        component.increaseHour();
        expect(component.setDisplayedHour).toHaveBeenCalled();
    });

    it('should increase the minute', () => {
        spyOn(component, 'increaseHour');
        component.time.minute = null;
        component.increaseMinute();
        expect(component.time.minute).toBe(0);
        component.time.minute = 59;
        component.increaseMinute();
        expect(component.time.minute).toBe(0);
        expect(component.increaseHour).toHaveBeenCalled();
        component.time.minute = 1;
        component.increaseMinute();
        expect(component.time.minute).toBe(2);
    });

    it('should decrease the minute', () => {
        spyOn(component, 'decreaseHour');
        component.time.minute = null;
        component.decreaseMinute();
        expect(component.time.minute).toBe(0);
        component.time.minute = 0;
        component.decreaseMinute();
        expect(component.time.minute).toBe(59);
        expect(component.decreaseHour).toHaveBeenCalled();
        component.time.minute = 1;
        component.decreaseMinute();
        expect(component.time.minute).toBe(0);
    });

    it('should increase the second', () => {
        spyOn(component, 'increaseMinute');
        component.time.second = null;
        component.increaseSecond();
        expect(component.time.second).toBe(0);
        component.time.second = 59;
        component.increaseSecond();
        expect(component.time.second).toBe(0);
        expect(component.increaseMinute).toHaveBeenCalled();
        component.time.second = 1;
        component.increaseSecond();
        expect(component.time.second).toBe(2);
    });

    it('should decrease the second', () => {
        spyOn(component, 'decreaseMinute');
        component.time.second = null;
        component.decreaseSecond();
        expect(component.time.second).toBe(0);
        component.time.second = 0;
        component.decreaseSecond();
        expect(component.time.second).toBe(59);
        expect(component.decreaseMinute).toHaveBeenCalled();
        component.time.second = 1;
        component.decreaseSecond();
        expect(component.time.second).toBe(0);
    });

    it('should toggle and call period model change the period for am', () => {
        spyOn(component, 'periodModelChange');
        component.time.hour = 13;
        component.period = 'am';
        component.togglePeriod();
        expect(component.periodModelChange).toHaveBeenCalled();
    });

    it('should toggle and change the period for am', () => {
        component.time.hour = 13;
        component.period = 'am';
        component.togglePeriod();
        expect(component.period).toBe('pm');
    });

    it('should toggle and change the period for pm', () => {
        component.time.hour = 13;
        component.period = 'pm';
        component.togglePeriod();
        expect(component.period).toBe('am');
        expect(component.time.hour).toBe(1);
    });

    it('should toggle and call period model change the period for pm', () => {
        spyOn(component, 'periodModelChange');
        component.time.hour = 13;
        component.period = 'pm';
        component.togglePeriod();
        expect(component.periodModelChange).toHaveBeenCalled();
    });

    it('should handle period model change', () => {
        component.meridian = true;

        component.period = 'am';
        component.time.hour = 0;
        component.period = 'pm';
        component.periodModelChange();
        expect(component.period).toBe('pm');
        expect(component.time.hour).toBe(12);

        component.time.hour = null;
        component.period = 'am';
        component.periodModelChange();
        expect(component.period).toBe('am');
        expect(component.time.hour).toBe(0);

        component.period = 'pm';
        component.time.hour = 16;
        component.period = 'am';
        component.periodModelChange();
        expect(component.period).toBe('am');
        expect(component.time.hour).toBe(4);

        component.period = 'asdf';
        component.periodModelChange();
        component.inputBlur('period');
        expect(component.period).toBe('am');

        component.time.hour = 16;
        component.period = 'asdf';
        component.periodModelChange();
        component.inputBlur('period');
        expect(component.period).toBe('pm');
    });
});
