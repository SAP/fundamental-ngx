import {
    async,
    ComponentFixture,
    TestBed
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TimeObject } from './time-object';

import { TimeComponent } from './time.component';
import { ButtonModule } from '../button/button.module';
import { PipeModule } from '../utils/pipes/pipe.module';
import { SimpleChange } from '@angular/core';

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
        component.displayedHourChanged({
            value: 12,
            after: true
        });
        expect(component.time.hour).toBe(0);

        component.period = 'am';
        component.displayedHourChanged({
            value: 1,
            after: false
        });
        expect(component.time.hour).toBe(1);

        component.period = 'pm';
        component.displayedHourChanged({
            value: 12,
            after: true
        });
        expect(component.time.hour).toBe(12);

        component.period = 'pm';
        component.displayedHourChanged({
            value: 1,
            after: false
        });
        expect(component.time.hour).toBe(13);

        component.meridian = false;

        component.displayedHourChanged({
            value: 12,
            after: false
        });
        expect(component.time.hour).toBe(12);

        component.displayedHourChanged({
            value: 1,
            after: false
        });
        expect(component.time.hour).toBe(1);
    });

    it('should handle input blur for displayedHour === 0, meridian', () => {
        component.meridian = true;
        component.displayedHourChanged({
            value: 12,
            after: true
        });
        expect(component.time.hour).toBe(0);
        expect(component.period).toBe('am');
    });

    it('should handle input blur for displayedHour > 12, < 24', () => {
        component.meridian = true;
        component.period = 'pm';
        component.time.hour = 16;
        component.setDisplayedHour();
        fixture.detectChanges();
        expect(component.time.hour).toBe(16);
        expect(component.displayedHour).toBe(4);
        component.meridian = true;
        component.period = 'am';
        component.time.hour = 16;
        component.setDisplayedHour();
        fixture.detectChanges();
        expect(component.time.hour).toBe(16);
        expect(component.displayedHour).toBe(4);
        expect(component.period).toBe('pm');
    });

    it('should handle input blur for displayedHour > 24', () => {
        spyOn(component, 'displayedHourChanged');
        spyOn(component, 'setDisplayedHour');
        component.meridian = true;
        component.time.hour = 37;
        component.setDisplayedHour();
        expect(component.displayedHour).toBe(0);
    });

    it('should handle input blur for displayedHour > 12, pm', () => {
        component.meridian = true;
        component.period = 'pm';
        component.time.hour = 13;
        component.setDisplayedHour();
        expect(component.displayedHour).toBe(1);
        expect(component.time.hour).toBe(13);
    });

    it('should handle ngOnChanges', () => {
        spyOn(component, 'setDisplayedHour');
        component.meridian = true;
        const meridianChange: SimpleChange = new SimpleChange(false, true, true);
        component.ngOnChanges({ meridian: meridianChange });
        expect(component.setDisplayedHour).toHaveBeenCalled();
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
    });

    it('should change period to pm, depending on new later hour', () => {
        component.displayedHour = 5;

        component.period = 'am';

        (<any>component)._periodByHoursChange(3, true);

        expect(component.period).toBe('pm');
    });

    it('should change period to am, depending on new later hour', () => {
        component.displayedHour = 7;

        component.period = 'pm';

        (<any>component)._periodByHoursChange(5, true);

        expect(component.period).toBe('am');
    });

    it('should change period to am, depending on new previous hour', () => {
        component.displayedHour = 10;

        component.period = 'pm';

        (<any>component)._periodByHoursChange(11, false);

        expect(component.period).toBe('am');
    });

    it('should change period to pm, depending on new previous hour', () => {
        component.displayedHour = 10;

        component.period = 'am';

        (<any>component)._periodByHoursChange(11, false);

        expect(component.period).toBe('pm');
    });

});
