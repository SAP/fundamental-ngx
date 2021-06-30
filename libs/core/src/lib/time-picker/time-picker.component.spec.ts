import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { FdDate, FdDatetimeModule } from '../datetime';
import { PopoverModule } from '../popover/popover.module';
import { InputGroupModule } from '../input-group/input-group.module';
import { TimeModule } from '../time/time.module';
import { ButtonModule } from '../button/button.module';

import { TimePickerComponent } from './time-picker.component';
import { ContentDensityService, DEFAULT_CONTENT_DENSITY } from '@fundamental-ngx/core/utils';

describe('TimePickerComponent', () => {
    let component: TimePickerComponent<FdDate>;
    let fixture: ComponentFixture<TimePickerComponent<FdDate>>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [FormsModule, PopoverModule, InputGroupModule, ButtonModule, FdDatetimeModule, TimeModule],
                declarations: [TimePickerComponent],
                providers: [ContentDensityService]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent<TimePickerComponent<FdDate>>(TimePickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create with default values', () => {
        expect(component).toBeTruthy();
    });

    it('should handle content density when compact input is not provided', () => {
        component.ngOnInit();
        expect(component.compact).toBe(DEFAULT_CONTENT_DENSITY !== 'cozy');
    });

    it('should use displayFormat and set to true _displayHours, _displayMinutes, _meridian', () => {
        component.displayFormat = { hour: 'numeric', minute: 'numeric', hour12: true };
        (<any>component)._calculateTimeOptions();
        expect(component._displayHours).toBe(true);
        expect(component._displayMinutes).toBe(true);
        expect(component._displaySeconds).toBe(false);
        expect(component._meridian).toBe(true);
    });

    it('should use displayFormat and set to true _displayHours, _displayMinutes, _displaySeconds', () => {
        component.displayFormat = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false };
        (<any>component)._calculateTimeOptions();
        expect(component._displayHours).toBe(true);
        expect(component._displayMinutes).toBe(true);
        expect(component._displaySeconds).toBe(true);
        expect(component._meridian).toBe(false);
    });

    it('should get time', () => {
        const newTime = new FdDate().setTime(1, 0, 0);
        component.time = newTime;
        const retVal = component.getTime();
        expect(retVal).toEqual(newTime);
    });

    it('should set isInvalidTimeInput to true if time format can not be parsed', () => {
        const newTime = new FdDate().setTime(1, 0, 0);
        component.time = newTime;
        component.allowNull = false;
        component.timeInputChanged('hello');
        expect(component.isInvalidTimeInput).toBeTruthy();
    });

    it('should handle input group click', () => {
        component.isOpen = false;
        component.disabled = false;
        const event = { stopPropagation: function (): void {} };
        spyOn(event, 'stopPropagation').and.callThrough();
        component.inputGroupClicked(<any>event);
        expect(event.stopPropagation).toHaveBeenCalled();
        expect(component.isOpen).toBe(true);
    });

    it('should handle addon button click', () => {
        component.disabled = false;
        component.addOnButtonClicked();
        expect(component.isOpen).toBe(true);
    });

    it('should handle popover close', () => {
        component.isOpen = true;
        component.popoverClosed();
        expect(component.isOpen).toBe(false);
    });

    it('should get the placeholder', () => {
        component.displayHours = true;
        component.displayMinutes = true;
        component.displaySeconds = true;
        component.meridian = true;
        (<any>component)._calculateTimeOptions();
        let retVal = component.getPlaceholder();
        expect(retVal).toBe('hh:mm:ss am/pm');

        component.displayHours = true;
        component.displayMinutes = true;
        component.displaySeconds = true;
        component.meridian = false;
        (<any>component)._calculateTimeOptions();
        retVal = component.getPlaceholder();
        expect(retVal).toBe('hh:mm:ss');

        component.displayHours = true;
        component.displayMinutes = true;
        component.displaySeconds = false;
        component.meridian = true;
        (<any>component)._calculateTimeOptions();
        retVal = component.getPlaceholder();
        expect(retVal).toBe('hh:mm am/pm');

        component.displayHours = true;
        component.displayMinutes = true;
        component.displaySeconds = false;
        component.meridian = false;
        (<any>component)._calculateTimeOptions();
        retVal = component.getPlaceholder();
        expect(retVal).toBe('hh:mm');
    });

    it('should call onChange when time from time picker changes', () => {
        const time = new FdDate().setTime(12, 0, 0);
        spyOn(component, 'onChange');
        component.timeFromTimeComponentChanged(time);
        expect(component.onChange).toHaveBeenCalledWith(time);
    });

    it('should hide message on open', () => {
        const hideSpy = spyOn((<any>component)._popoverFormMessage, 'hide');
        component.handleIsOpenChange(true);
        expect(hideSpy).toHaveBeenCalled();
    });

    it('should show message on close', () => {
        component.isOpen = true;

        const showSpy = spyOn((<any>component)._popoverFormMessage, 'show');
        component.handleIsOpenChange(false);
        expect(showSpy).toHaveBeenCalled();
    });
});
