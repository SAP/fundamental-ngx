import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';

import { DatePickerModule } from '@fundamental-ngx/core/date-picker';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { CalendarModule } from '@fundamental-ngx/core/calendar';
import { DatetimeAdapter, FdDate, FdDatetimeAdapter, FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { FormModule } from '@fundamental-ngx/core/form';
import { IconModule } from '@fundamental-ngx/core/icon';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { PlatformDatePickerModule } from './date-picker.module';
import { PlatformDatePickerComponent } from './date-picker.component';
import { FdpFormGroupModule } from './../form-group/fdp-form.module';
import { runValueAccessorTests } from 'ngx-cva-test-suite';

@Component({
    selector: 'fdp-test-date-picker',
    template: `
        <fdp-form-group #ffg [formGroup]="datePickerForm" [object]="datePickerFormData">
            <fdp-form-field
                #ffl1
                id="birthday"
                zone="zLeft"
                rank="1"
                required="true"
                placeholder="Enter your birthday"
                label="Birth Date:"
            >
                <fdp-date-picker name="birthday" type="single" [allowNull]="false" [formControl]="ffl1.formControl">
                </fdp-date-picker>
            </fdp-form-field>

            <fdp-form-field #ffl2 id="journeydate" zone="zRight" rank="3" label="Journey Date:" required="true">
                <fdp-date-picker
                    name="journeydate"
                    type="range"
                    [allowNull]="false"
                    fdCompact
                    placeholder="When are you travelling?"
                    formControlName="journeydate"
                >
                </fdp-date-picker>
            </fdp-form-field>

            <ng-template #i18n let-errors>
                <ng-container *ngIf="errors.required">
                    <span>Value is required</span>
                </ng-container>
            </ng-template>
        </fdp-form-group>
    `
})
class TestDatePickerComponent {
    @ViewChildren(PlatformDatePickerComponent)
    datepicker: QueryList<PlatformDatePickerComponent<FdDate>>;

    public birthday: FdDate = new FdDate(1990, 1, 2);
    public journeydate = {
        start: new FdDate(2020, 5, 14),
        end: new FdDate(2020, 5, 24)
    };

    datePickerForm = new FormGroup({
        journeydate: new FormControl(this.journeydate)
    });

    datePickerFormData = { birthday: this.birthday };
}

describe('TestDatePickerComponent', () => {
    let host: TestDatePickerComponent;
    let fixture: ComponentFixture<TestDatePickerComponent>;
    let adapter: FdDatetimeAdapter;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [TestDatePickerComponent],
                imports: [
                    PlatformDatePickerModule,
                    CalendarModule,
                    DatePickerModule,
                    PopoverModule,
                    FdDatetimeModule,
                    FdpFormGroupModule,
                    FormsModule,
                    FormModule,
                    IconModule,
                    InputGroupModule,
                    ButtonModule,
                    ReactiveFormsModule
                ]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TestDatePickerComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
    });

    beforeEach(inject([DatetimeAdapter], (dateAdapter: FdDatetimeAdapter) => {
        adapter = dateAdapter;
    }));

    async function wait(componentFixture: ComponentFixture<any>): Promise<void> {
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }

    it('should create', async () => {
        expect(host).toBeTruthy();
    });

    it('should open the calendar', async () => {
        await wait(fixture);

        const datepicker = host.datepicker.toArray()[0];
        datepicker.fdDatePickerComponent.isOpen = false;
        datepicker.fdDatePickerComponent.openCalendar();
        expect(datepicker.fdDatePickerComponent.isOpen).toBeTruthy();
        expect(datepicker.fdDatePickerComponent._inputFieldDate).toBeTruthy();
    });

    it('should not open the calendar if the component is disabled', async () => {
        await wait(fixture);

        const datepicker = host.datepicker.toArray()[0];
        datepicker.fdDatePickerComponent.isOpen = false;
        datepicker.fdDatePickerComponent.disabled = true;
        datepicker.fdDatePickerComponent.openCalendar();
        expect(datepicker.fdDatePickerComponent.isOpen).toBeFalsy();
    });

    it('should close the calendar', async () => {
        await wait(fixture);

        const datepicker = host.datepicker.toArray()[0];
        datepicker.fdDatePickerComponent.isOpen = true;
        datepicker.fdDatePickerComponent._isInvalidDateInput = true;
        datepicker.fdDatePickerComponent.closeCalendar();
        expect(datepicker.fdDatePickerComponent._inputFieldDate).toBeTruthy();
        expect(datepicker.fdDatePickerComponent.isOpen).not.toBeTruthy();
    });

    it('Should handle single date change and update input', async () => {
        await wait(fixture);
        spyOn(host.datepicker.toArray()[0], 'onChange');

        const datepicker = host.datepicker.toArray()[0];
        expect(datepicker.fdDatePickerComponent._inputFieldDate).toEqual('1/2/1990');

        spyOn(datepicker.selectedDateChange, 'emit');
        const date = FdDate.getToday();
        const dateStr = (<any>datepicker.fdDatePickerComponent)._formatDate(date);
        datepicker.fdDatePickerComponent._inputFieldDate = '';
        datepicker.fdDatePickerComponent.handleSingleDateChange(date);
        expect(datepicker.fdDatePickerComponent._inputFieldDate).toEqual(dateStr);
        expect(datepicker.onChange).toHaveBeenCalledWith(date);
        expect(datepicker.selectedDateChange.emit).toHaveBeenCalledWith(date);
    });

    it('Should handle range date change and update input', async () => {
        await wait(fixture);

        spyOn(host.datepicker.toArray()[1], 'onChange');

        const datepicker = host.datepicker.toArray()[1];

        spyOn(datepicker.selectedRangeDateChange, 'emit');
        const dateStart = FdDate.getToday();
        const dateLast = FdDate.getToday();
        dateLast.month = 12;
        const dateStrStart = (<any>datepicker.fdDatePickerComponent)._formatDate(dateStart);
        const dateStrLast = (<any>datepicker.fdDatePickerComponent)._formatDate(dateLast);
        datepicker.fdDatePickerComponent._inputFieldDate = '';

        datepicker.fdDatePickerComponent.handleRangeDateChange({ start: dateStart, end: dateLast });
        await wait(fixture);

        expect(datepicker.fdDatePickerComponent._inputFieldDate).toBe(
            dateStrStart + datepicker.fdDatePickerComponent._rangeDelimiter + dateStrLast
        );

        expect(datepicker.onChange).toHaveBeenCalledWith({ start: dateStart, end: dateLast });
        expect(datepicker.selectedRangeDateChange.emit).toHaveBeenCalledWith({ start: dateStart, end: dateLast });
    });

    it('Should handle correct write value for single mode', async () => {
        await wait(fixture);

        const date = FdDate.getToday();

        const datepicker = host.datepicker.toArray()[0];
        const dateStr = (<any>datepicker.fdDatePickerComponent)._formatDate(date);

        datepicker.writeValue(date);
        await wait(fixture);
        fixture.detectChanges();

        expect(datepicker.fdDatePickerComponent.selectedDate).toEqual(date);
        expect(datepicker.fdDatePickerComponent._inputFieldDate).toBe(dateStr);
    });

    it('Should handle null write value for single mode', async () => {
        await wait(fixture);

        const datepicker = host.datepicker.toArray()[0];
        datepicker.writeValue(null);

        // prevous input date
        expect(datepicker.fdDatePickerComponent.selectedDate).toEqual(new FdDate(1990, 1, 2));
        expect(datepicker.fdDatePickerComponent._inputFieldDate).toBe('1/2/1990');
    });

    it('Should handle correct write value for range mode', async () => {
        await wait(fixture);

        const datepicker = host.datepicker.toArray()[1];
        datepicker.type = 'range';
        const dateStart = FdDate.getToday();
        const dateStrStart = (<any>datepicker.fdDatePickerComponent)._formatDate(dateStart);

        const dateEnd = FdDate.getToday();
        dateEnd.month = 12;
        const dateStrEnd = (<any>datepicker.fdDatePickerComponent)._formatDate(dateEnd);
        datepicker.writeValue({ start: dateStart, end: dateEnd });

        await wait(fixture);
        fixture.detectChanges();
        expect(datepicker.fdDatePickerComponent.selectedRangeDate).toEqual({ start: dateStart, end: dateEnd });
        expect(datepicker.fdDatePickerComponent._inputFieldDate).toBe(
            dateStrStart + datepicker.fdDatePickerComponent._rangeDelimiter + dateStrEnd
        );
    });

    it('Should handle null write value for range mode', async () => {
        await wait(fixture);

        const datepicker = host.datepicker.toArray()[1];
        const dateStart = null;
        const dateEnd = null;
        datepicker.writeValue({ start: dateStart, end: dateEnd });

        // previous input date
        expect(datepicker.fdDatePickerComponent.selectedRangeDate).toEqual({
            start: null,
            end: null
        });
        datepicker.writeValue({
            start: new FdDate(2020, 5, 10),
            end: new FdDate(2020, 5, 24)
        });
        await wait(fixture);
        expect(datepicker.fdDatePickerComponent._inputFieldDate).toBe('5/10/2020 - 5/24/2020');
    });

    it('Should register invalid string date and not call event for single mode', () => {
        const fdpDatePickerComponent = host.datepicker.toArray()[0];
        const fdDatePickerComponent = fdpDatePickerComponent.fdDatePickerComponent;
        spyOn(fdDatePickerComponent.selectedDateChange, 'emit');
        fdDatePickerComponent.type = 'single';
        fdDatePickerComponent.dateStringUpdate('hello');
        const date = adapter.parse('hello');
        expect(fdDatePickerComponent._isInvalidDateInput).toBe(true);
        expect(fdDatePickerComponent.selectedDateChange.emit).toHaveBeenCalledWith(date);
        expect(fdDatePickerComponent.isModelValid()).toBe(false);
    });

    it('Should register invalid string date and not call event for range mode', () => {
        const fdpDatePickerComponent = host.datepicker.toArray()[1];
        const fdDatePickerComponent = fdpDatePickerComponent.fdDatePickerComponent;

        spyOn(fdDatePickerComponent.selectedRangeDateChange, 'emit');
        fdDatePickerComponent.type = 'range';
        fdDatePickerComponent.dateStringUpdate('start - end');
        const start = adapter.parse('start');
        const end = adapter.parse('end');
        expect(fdDatePickerComponent._isInvalidDateInput).toBe(true);
        expect(fdDatePickerComponent.selectedRangeDateChange.emit).toHaveBeenCalledWith({ start, end });
        expect(fdDatePickerComponent.isModelValid()).toBe(false);
    });

    it('Should handle valid string date', async () => {
        await wait(fixture);

        const datepicker = host.datepicker.toArray()[0];
        spyOn(datepicker.selectedDateChange, 'emit');

        datepicker.writeValue(new FdDate(2018, 10, 10));

        await wait(fixture);
        fixture.detectChanges();

        const date = new FdDate(2000, 10, 10);
        const strDate = (<any>datepicker.fdDatePickerComponent)._formatDate(date);
        datepicker.fdDatePickerComponent.dateStringUpdate(strDate);

        await wait(fixture);
        fixture.detectChanges();
        expect(datepicker.fdDatePickerComponent._isInvalidDateInput).toBe(false);
        expect(datepicker.selectedDateChange.emit).toHaveBeenCalledWith(date);
    });

    it('Should handle calendar with valid string date', async () => {
        await wait(fixture);

        const datepicker = host.datepicker.toArray()[0];
        spyOn(datepicker.selectedDateChange, 'emit');
        spyOn(datepicker, 'onChange');

        const date = new FdDate(2000, 10, 10);
        const strDate = (<any>datepicker.fdDatePickerComponent)._formatDate(date);

        datepicker.fdDatePickerComponent.dateStringUpdate(strDate);
        await wait(fixture);
        fixture.detectChanges();

        expect(datepicker.fdDatePickerComponent._isInvalidDateInput).toBe(false);
        expect(datepicker.fdDatePickerComponent._calendarComponent._currentlyDisplayed.month).toBe(date.month);
        expect(datepicker.fdDatePickerComponent._calendarComponent._currentlyDisplayed.year).toBe(date.year);
        expect(datepicker.selectedDateChange.emit).toHaveBeenCalledWith(date);
        expect(datepicker.onChange).toHaveBeenCalledWith(date);
    });

    it('Should handle valid range string date', async () => {
        await wait(fixture);

        const datepicker = host.datepicker.toArray()[1];
        spyOn(datepicker.selectedRangeDateChange, 'emit');
        spyOn(datepicker, 'onChange');
        const date1 = new FdDate(2000, 10, 10);
        const date2 = new FdDate(2011, 10, 10);

        const strDate1 = (<any>datepicker.fdDatePickerComponent)._formatDate(date1);
        const strDate2 = (<any>datepicker.fdDatePickerComponent)._formatDate(date2);
        datepicker.fdDatePickerComponent.dateStringUpdate(
            strDate1 + datepicker.fdDatePickerComponent._rangeDelimiter + strDate2
        );
        expect(datepicker.fdDatePickerComponent._isInvalidDateInput).toBe(false);
        expect(datepicker.fdDatePickerComponent._calendarComponent._currentlyDisplayed.month).toBe(date1.month);
        expect(datepicker.fdDatePickerComponent._calendarComponent._currentlyDisplayed.year).toBe(date1.year);
        expect(datepicker.selectedRangeDateChange.emit).toHaveBeenCalledWith({ start: date1, end: date2 });
        expect(datepicker.onChange).toHaveBeenCalledWith({ start: date1, end: date2 });
    });

    it('Should handle valid reversed range string date', async () => {
        await wait(fixture);

        const datepicker = host.datepicker.toArray()[1];
        spyOn(datepicker.selectedRangeDateChange, 'emit');
        spyOn(datepicker, 'onChange');
        const date1 = new FdDate(2011, 10, 10);
        const date2 = new FdDate(2000, 10, 10);
        const strDate1 = (<any>datepicker.fdDatePickerComponent)._formatDate(date1);
        const strDate2 = (<any>datepicker.fdDatePickerComponent)._formatDate(date2);

        datepicker.fdDatePickerComponent.dateStringUpdate(
            strDate1 + datepicker.fdDatePickerComponent._rangeDelimiter + strDate2
        );
        expect(datepicker.fdDatePickerComponent._isInvalidDateInput).toBe(false);
        expect(datepicker.fdDatePickerComponent._calendarComponent._currentlyDisplayed.month).toBe(date2.month);
        expect(datepicker.fdDatePickerComponent._calendarComponent._currentlyDisplayed.year).toBe(date2.year);
        expect(datepicker.selectedRangeDateChange.emit).toHaveBeenCalledWith({ start: date2, end: date1 });
        expect(datepicker.onChange).toHaveBeenCalledWith({ start: date2, end: date1 });
    });

    it('should set form control value on datepicker value change', async () => {
        await wait(fixture);

        const datePickerFormGroup = host.datePickerForm;
        // for single type date picker
        expect(datePickerFormGroup.controls.birthday.valid).toBeTruthy();

        const date = adapter.today();
        const datepicker = host.datepicker.toArray()[0];

        datepicker.value = date;
        fixture.detectChanges();

        expect(datePickerFormGroup.controls.birthday.valid).toBeTruthy();
        expect(datePickerFormGroup.controls.birthday.value).toEqual(date);

        // for single type date picker, set value using control.
        const d1 = new FdDate(2020, 12, 14);
        datePickerFormGroup.controls.birthday.setValue(d1);
        fixture.detectChanges();
        expect(datePickerFormGroup.controls.birthday.valid).toBeTruthy();
        expect(datepicker.value).toEqual(d1);

        // for range type date picker

        expect(datePickerFormGroup.controls.journeydate.valid).toBeFalsy();

        const rangeDate = { start: FdDate.getToday(), end: FdDate.getToday() };
        const rangeDatepicker = host.datepicker.toArray()[1];

        rangeDatepicker.value = rangeDate;
        fixture.detectChanges();

        expect(datePickerFormGroup.controls.journeydate.valid).toBeTruthy();
        expect(datePickerFormGroup.controls.journeydate.value).toEqual(rangeDate);

        // for range type date picker, set value using control.
        datePickerFormGroup.controls.journeydate.setValue(rangeDate);
        fixture.detectChanges();
        expect(datePickerFormGroup.controls.journeydate.valid).toBeTruthy();
        expect(rangeDatepicker.value).toEqual(rangeDate);
    });
});

const DATE_PICKER_IDENTIFIER = 'platform-date-picker-unit-test';

@Component({
    template: `<fdp-date-picker id="${DATE_PICKER_IDENTIFIER}" name="${DATE_PICKER_IDENTIFIER}"></fdp-date-picker>`
})
class PlatformDatePickerHostComponent {
    @ViewChild(PlatformDatePickerComponent) picker: PlatformDatePickerComponent<FdDate>;
}

runValueAccessorTests<PlatformDatePickerComponent<FdDate>, PlatformDatePickerHostComponent>({
    component: PlatformDatePickerComponent,
    testModuleMetadata: {
        imports: [PlatformDatePickerModule, FdDatetimeModule],
        declarations: [PlatformDatePickerHostComponent]
    },
    hostTemplate: {
        getTestingComponent: (fixture) => fixture.componentInstance.picker,
        hostComponent: PlatformDatePickerHostComponent
    },
    nativeControlSelector: `fdp-date-picker[id="${DATE_PICKER_IDENTIFIER}"]`,
    supportsOnBlur: true,
    internalValueChangeSetter: (fixture, value: FdDate) => {
        fixture.componentInstance.picker.handleDateChange(value);
    },
    resetCustomValue: { value: null },
    getValues: () => [new FdDate(2021, 9, 5), new FdDate(2021, 10, 5), new FdDate(2021, 11, 5)],
    getComponentValue: (fixture) => fixture.componentInstance.picker.value
});
