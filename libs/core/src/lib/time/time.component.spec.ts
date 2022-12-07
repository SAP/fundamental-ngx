import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from '@fundamental-ngx/core/button';
import { FdDate, FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { PipeModule } from '@fundamental-ngx/core/utils';
import { runValueAccessorTests } from 'ngx-cva-test-suite';

import { Meridian } from './models';
import { TimeComponent } from './time.component';
import { TimeModule } from './time.module';

describe('TimeComponent', () => {
    let component: TimeComponent<FdDate>;
    let fixture: ComponentFixture<TimeComponent<FdDate>>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ButtonModule, PipeModule, FdDatetimeModule, TimeModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent<TimeComponent<FdDate>>(TimeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        const time = new FdDate().setTime(0, 0, 0);
        component.time = time;
        expect(component).toBeTruthy();
    });

    it('should construct hours view items', () => {
        expect(component.hourViewItems.length).toBe(24);
        expect(component.hourViewItems[0].value).toBe(0);
        expect(component.hourViewItems[23].value).toBe(23);
    });

    it('should construct minutes view items', () => {
        expect(component.minuteViewItems.length).toBe(60);
        expect(component.minuteViewItems[0].value).toBe(0);
        expect(component.minuteViewItems[59].value).toBe(59);
    });

    it('should construct seconds view items', () => {
        expect(component.secondViewItems.length).toBe(60);
        expect(component.secondViewItems[0].value).toBe(0);
        expect(component.secondViewItems[59].value).toBe(59);
    });

    it('should construct meridian view items', () => {
        expect(component.meridianViewItems.length).toBe(2);
        expect(component.meridianViewItems[0].value).toBe(Meridian.AM);
        expect(component.meridianViewItems[1].value).toBe(Meridian.PM);
    });

    it('should keep active view items up to date', () => {
        component.time = new FdDate().setTime(15, 30, 45);
        (<any>component)._setUpViewGrid();
        expect(component.activeHourViewItem?.value).toBe(15);
        expect(component.activeMinuteViewItem?.value).toBe(30);
        expect(component.activeSecondViewItem?.value).toBe(45);
        expect(component.activeMeridianViewItem?.value).toBe(Meridian.PM);
    });

    it('should set period after hour change', () => {
        component.meridian = true;
        component.handleHourChange(0);
        expect(component.activeMeridianViewItem?.value).toBe(Meridian.AM);

        component.handleHourChange(12);
        expect(component.activeMeridianViewItem?.value).toBe(Meridian.PM);
    });

    it('should set hour after period change', () => {
        component.handleHourChange(15);
        component.handleMeridianChange(Meridian.AM);
        expect(component.time.hour).toBe(3);

        component.handleHourChange(3);
        component.handleMeridianChange(Meridian.PM);
        expect(component.time.hour).toBe(15);
    });
});

@Component({
    template: `<fd-time></fd-time>`
})
class TimePickerHostComponent {
    @ViewChild(TimeComponent) picker: TimeComponent<FdDate>;
}
runValueAccessorTests<TimeComponent<FdDate>, TimePickerHostComponent>({
    component: TimeComponent,
    testModuleMetadata: {
        imports: [TimeModule, FdDatetimeModule],
        declarations: [TimePickerHostComponent]
    },
    supportsOnBlur: true,
    hostTemplate: {
        getTestingComponent: (fixture) => fixture.componentInstance.picker,
        hostComponent: TimePickerHostComponent
    },
    nativeControlSelector: 'fd-time',
    internalValueChangeSetter: (fixture, value: FdDate) => {
        // in this test values are being changed by minute
        fixture.componentInstance.picker.handleMinuteChange(value.minute);
    },
    getComponentValue: (fixture) => fixture.componentInstance.picker.time,
    resetCustomValue: { value: new FdDate().setTime(0, 0, 0) },
    getValues: () => [
        new FdDate(2021, 10, 10).setTime(8, 16, 0),
        new FdDate(2021, 10, 10).setTime(8, 17, 0),
        new FdDate(2021, 10, 10).setTime(8, 18, 0)
    ]
});
