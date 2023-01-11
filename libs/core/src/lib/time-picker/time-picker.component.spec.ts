import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from '@fundamental-ngx/core/button';
import { FdDate, FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { FormMessageModule } from '@fundamental-ngx/core/form';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { TimeModule } from '@fundamental-ngx/core/time';
import { runValueAccessorTests } from 'ngx-cva-test-suite';
import { Nullable } from '@fundamental-ngx/cdk/utils';

import { TimePickerComponent } from './time-picker.component';
import { TimePickerModule } from './time-picker.module';

describe('TimePickerComponent', () => {
    let component: TimePickerComponent<FdDate>;
    let fixture: ComponentFixture<TimePickerComponent<FdDate>>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                PopoverModule,
                InputGroupModule,
                ButtonModule,
                FdDatetimeModule,
                TimeModule,
                FormMessageModule,
                TimePickerModule
            ],
            declarations: [TimePickerComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent<TimePickerComponent<FdDate>>(TimePickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create with default values', () => {
        expect(component).toBeTruthy();
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

    describe('handles input field changes', () => {
        it('should be in valid state if input value can be parsed', () => {
            const newTime = new FdDate().setTime(15, 30, 0);
            component.allowNull = false;
            component._timeInputChanged('3:30 PM');
            expect(component.time?.toTimeString()).toEqual(newTime.toTimeString());
            expect(component.time?.isDateValid()).toBeTrue();
            expect(component._isInvalidTimeInput).toBeFalse();
        });
        it('should be in invalid state if input value can not be parsed', () => {
            component.allowNull = false;
            component._timeInputChanged('hello');
            expect(component.time?.isDateValid()).toBeFalse();
            expect(component._isInvalidTimeInput).toBeTrue();
        });

        describe('input field is empty', () => {
            it('should set model to "null"', () => {
                component.time = new FdDate().setTime(15, 40, 0);
                component._timeInputChanged('');
                expect(component.time as Nullable<FdDate>).toBe(null);
            });
            it('should be invalid if "allowNull=false"', () => {
                component.allowNull = false;
                component._timeInputChanged('');
                expect(component._isInvalidTimeInput).toBeTrue();
            });
            it('should be valid if "allowNull=true"', () => {
                component.allowNull = true;
                component._timeInputChanged('');
                expect(component._isInvalidTimeInput).toBeFalse();
            });
        });
    });

    it('should not fire "onChange" if focus has gone but input field stays the same', () => {
        const onChangeSpy = spyOn(component, 'onChange');
        component._timeInputChanged('1:30 PM');
        expect(onChangeSpy).toHaveBeenCalledTimes(1);
        component._timeInputChanged('1:30 PM');
        expect(onChangeSpy).toHaveBeenCalledTimes(1);
    });

    it('should not fire "onChange" if time component change event brings the same model as the current', () => {
        const onChangeSpy = spyOn(component, 'onChange');
        const time = new FdDate().setTime(8, 15, 0);
        component._timeComponentValueChanged(time);
        expect(onChangeSpy).toHaveBeenCalledTimes(1);
        expect(onChangeSpy).toHaveBeenCalledOnceWith(time);
        component._timeComponentValueChanged(new FdDate().setTime(8, 15, 0));
        expect(onChangeSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle input group click', () => {
        component.isOpen = false;
        component.disabled = false;
        const event = {
            stopPropagation(): void {}
        };
        spyOn(event, 'stopPropagation').and.callThrough();
        component._inputGroupClicked(<any>event);
        expect(event.stopPropagation).toHaveBeenCalled();
        expect(component.isOpen).toBe(true);
    });

    it('should handle addon button click', () => {
        component.disabled = false;
        component._addOnButtonClicked();
        expect(component.isOpen).toBe(true);
    });

    it('should handle popover close', () => {
        component.isOpen = true;
        component._popoverClosed();
        expect(component.isOpen).toBe(false);
    });

    it('should get the placeholder', () => {
        component.displayHours = true;
        component.displayMinutes = true;
        component.displaySeconds = true;
        component.meridian = true;
        (<any>component)._calculateTimeOptions();
        let retVal = component._getPlaceholder();
        expect(retVal).toBe('hh:mm:ss am/pm');

        component.displayHours = true;
        component.displayMinutes = true;
        component.displaySeconds = true;
        component.meridian = false;
        (<any>component)._calculateTimeOptions();
        retVal = component._getPlaceholder();
        expect(retVal).toBe('hh:mm:ss');

        component.displayHours = true;
        component.displayMinutes = true;
        component.displaySeconds = false;
        component.meridian = true;
        (<any>component)._calculateTimeOptions();
        retVal = component._getPlaceholder();
        expect(retVal).toBe('hh:mm am/pm');

        component.displayHours = true;
        component.displayMinutes = true;
        component.displaySeconds = false;
        component.meridian = false;
        (<any>component)._calculateTimeOptions();
        retVal = component._getPlaceholder();
        expect(retVal).toBe('hh:mm');
    });

    it('should call onChange when time from time picker changes', () => {
        const time = new FdDate().setTime(12, 0, 0);
        spyOn(component, 'onChange');
        component._timeComponentValueChanged(time);
        expect(component.onChange).toHaveBeenCalledWith(time);
    });

    it('should hide message on open', () => {
        const hideSpy = spyOn((<any>component)._popoverFormMessage, 'hide');
        component._setIsOpen(true);
        expect(hideSpy).toHaveBeenCalled();
    });

    it('should show message on close', () => {
        component.isOpen = true;

        const showSpy = spyOn((<any>component)._popoverFormMessage, 'show');
        component._setIsOpen(false);
        expect(showSpy).toHaveBeenCalled();
    });
});

@Component({
    template: ` <fd-time-picker></fd-time-picker>`
})
class TimePickerHostComponent {
    @ViewChild(TimePickerComponent) picker: TimePickerComponent<FdDate>;
}

runValueAccessorTests<TimePickerComponent<FdDate>, TimePickerHostComponent>({
    component: TimePickerComponent,
    name: 'Time picker',
    testModuleMetadata: {
        imports: [TimePickerModule, FdDatetimeModule],
        declarations: [TimePickerHostComponent]
    },
    hostTemplate: {
        getTestingComponent: (fixture) => fixture.componentInstance.picker,
        hostComponent: TimePickerHostComponent
    },
    supportsOnBlur: true,
    nativeControlSelector: 'fd-time-picker',
    internalValueChangeSetter: (fixture, value) => {
        fixture.componentInstance.picker._timeComponentValueChanged(value);
    },
    getComponentValue: (fixture) => fixture.componentInstance.picker.time,
    getValues: () => [
        new FdDate(2021, 10, 10).setTime(8, 16, 0),
        new FdDate(2021, 10, 10).setTime(8, 17, 0),
        new FdDate(2021, 10, 10).setTime(8, 18, 0)
    ]
});
