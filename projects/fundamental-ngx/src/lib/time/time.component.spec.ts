import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { TimeObject } from './time-object';

import { TimeComponent } from './time.component';

describe('TimeComponent', () => {
    let component: TimeComponent;
    let fixture: ComponentFixture<TimeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
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
        component.time.hour = 0;
        component.setDisplayedHour();
        expect(component.period).toBe('am');
        expect(component.oldPeriod).toBe('am');
        expect(component.displayedHour).toBe(12);

        component.time.hour = 13;
        component.setDisplayedHour();
        expect(component.period).toBe('pm');
        expect(component.oldPeriod).toBe('pm');
        expect(component.displayedHour).toBe(1);

        component.time.hour = 12;
        component.setDisplayedHour();
        expect(component.period).toBe('pm');
        expect(component.oldPeriod).toBe('pm');
        expect(component.displayedHour).toBe(12);

        component.time.hour = 1;
        component.setDisplayedHour();
        expect(component.period).toBe('am');
        expect(component.oldPeriod).toBe('am');
        expect(component.displayedHour).toBe(1);
    });

    it('should handle displayedHourChanged', () => {
        component.displayedHour = null;
        component.displayedHourChanged();
        expect(component.time.hour).toBe(null);

        component.displayedHour = 12;
        component.period = 'am';
        component.displayedHourChanged();
        expect(component.time.hour).toBe(0);

        component.displayedHour = 1;
        component.period = 'am';
        component.displayedHourChanged();
        expect(component.time.hour).toBe(1);

        component.displayedHour = 12;
        component.period = 'pm';
        component.displayedHourChanged();
        expect(component.time.hour).toBe(12);

        component.displayedHour = 1;
        component.period = 'pm';
        component.displayedHourChanged();
        expect(component.time.hour).toBe(13);
    });

    it('should handle input blur for displayedHour === 0, meridian', () => {
        spyOn(component, 'setDisplayedHour').and.callThrough();
        component.meridian = true;
        component.displayedHour = 0;
        component.inputBlur('hour');
        expect(component.time.hour).toBe(0);
        expect(component.setDisplayedHour).toHaveBeenCalled();
    });

    it('should handle input blur for non-meridian big numbers', () => {
        component.time.hour = -100.123;
        component.inputBlur('hour');
        expect(component.time.hour).toBe(4);
    });

    it('should handle input blur for displayedHour > 12, pm', () => {
        spyOn(component, 'setDisplayedHour').and.callThrough();
        component.meridian = true;
        component.displayedHour = 13;
        component.time.hour = 13;
        component.period = 'pm';
        component.inputBlur('hour');
        expect(component.time.hour).toBe(1);
        expect(component.setDisplayedHour).toHaveBeenCalled();
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

    it('should handle input blur for period', () => {
        spyOn(component, 'setDisplayedHour');
        component.period = 'asdf';
        component.inputBlur('period');
        expect(component.setDisplayedHour).toHaveBeenCalled();
    });

    it('should handle ngOnChanges', () => {
        spyOn(component, 'setDisplayedHour');
        component.meridian = true;
        component.ngOnChanges();
        expect(component.setDisplayedHour).toHaveBeenCalled();
    });
});
