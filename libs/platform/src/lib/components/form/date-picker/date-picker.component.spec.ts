import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule, CalendarModule, FdDate, FdRangeDate } from '@fundamental-ngx/core';
import { DatePickerModule, DatePickerComponent as CoreDatePickerComponent } from '@fundamental-ngx/core';
import { FormModule, IconModule, InputGroupModule, PopoverModule } from '@fundamental-ngx/core';
import { Component, ViewChildren, QueryList } from '@angular/core';
import { DatePickerComponent } from './date-picker.component';
import { FdpFormGroupModule } from './../form-group/fdp-form.module';

@Component({
    selector: 'fdp-test-date-picker',
    template: `
        <fdp-form-group #ffg [formGroup]="datePickerForm">
            <fdp-form-field
                #ffl1
                [id]="'birthday'"
                zone="zLeft"
                rank="1"
                [required]="true"
                [placeholder]="'Enter your birthday'"
                [label]="'Birth Date:'"
            >
                <fdp-date-picker [name]="'birthday'" [type]="'single'" [formControl]="ffl1.formControl">
                </fdp-date-picker>
            </fdp-form-field>

            <fdp-form-field
                #ffl2
                [id]="'journeydate'"
                zone="zRight"
                rank="3"
                [label]="'Journey Date:'"
                [required]="true"
            >
                <fdp-date-picker
                    [name]="'journeydate'"
                    [type]="'range'"
                    [format]="'MM/dd/yyyy'"
                    [allowNull]="false"
                    [contentDensity]="'compact'"
                    [placeholder]="'When are you travelling?'"
                    [formControl]="ffl2.formControl"
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
    datePickerForm = new FormGroup({});

    @ViewChildren(DatePickerComponent)
    datepicker: QueryList<DatePickerComponent>;
}

describe('TestDatePickerComponent', () => {
    let host: TestDatePickerComponent;
    let fixture: ComponentFixture<TestDatePickerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DatePickerComponent, TestDatePickerComponent, CoreDatePickerComponent],
            imports: [
                CalendarModule,
                DatePickerModule,
                PopoverModule,
                FdpFormGroupModule,
                FormsModule,
                FormModule,
                IconModule,
                InputGroupModule,
                ButtonModule,
                ReactiveFormsModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestDatePickerComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
    });

    async function wait(componentFixture: ComponentFixture<any>) {
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }

    it('should create', async () => {
        expect(host).toBeTruthy();
    });

    it('should open the calendar', async () => {
        await wait(fixture);

        const datepicker = host.datepicker.toArray()[0];
        datepicker.coreDatePicker.isOpen = false;
        datepicker.coreDatePicker.isInvalidDateInput = true;
        datepicker.coreDatePicker.openCalendar();
        expect(datepicker.coreDatePicker.isOpen).toBeTruthy();
        expect(datepicker.coreDatePicker.inputFieldDate).toBeFalsy();
    });

    it('should not open the calendar if the component is disabled', async () => {
        await wait(fixture);

        const datepicker = host.datepicker.toArray()[0];
        datepicker.coreDatePicker.isOpen = false;
        datepicker.coreDatePicker.disabled = true;
        datepicker.coreDatePicker.openCalendar();
        expect(datepicker.coreDatePicker.isOpen).toBeFalsy();
    });

    it('should close the calendar', async () => {
        await wait(fixture);

        const datepicker = host.datepicker.toArray()[0];
        datepicker.coreDatePicker.isOpen = true;
        datepicker.coreDatePicker.isInvalidDateInput = true;
        datepicker.coreDatePicker.closeCalendar();
        expect(datepicker.coreDatePicker.inputFieldDate).toBeFalsy();
        expect(datepicker.coreDatePicker.isOpen).not.toBeTruthy();
    });

    it('Should handle single date change and update input', async () => {
        await wait(fixture);
        spyOn(host.datepicker.toArray()[0], 'onChange');

        const datepicker = host.datepicker.toArray()[0];
        spyOn(datepicker.selectedDateChange, 'emit');
        const date = FdDate.getToday();
        const dateStr = (<any>datepicker.coreDatePicker)._formatDate(date);
        datepicker.coreDatePicker.inputFieldDate = '';
        datepicker.coreDatePicker.handleSingleDateChange(date);
        expect(datepicker.coreDatePicker.inputFieldDate).toEqual(dateStr);
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
        const dateStrStart = (<any>datepicker.coreDatePicker)._formatDate(dateStart);
        const dateStrLast = (<any>datepicker.coreDatePicker)._formatDate(dateLast);
        datepicker.coreDatePicker.inputFieldDate = '';

        datepicker.coreDatePicker.handleRangeDateChange({ start: dateStart, end: dateLast });
        await wait(fixture);
        fixture.detectChanges();

        expect(datepicker.coreDatePicker.inputFieldDate).toBe(
            dateStrStart + datepicker.coreDatePicker.dateAdapter.rangeDelimiter + dateStrLast
        );

        expect(datepicker.onChange).toHaveBeenCalledWith({ start: dateStart, end: dateLast });
        expect(datepicker.selectedRangeDateChange.emit).toHaveBeenCalledWith({ start: dateStart, end: dateLast });

        datepicker.writeValue({ start: dateStart, end: dateLast });
        await wait(fixture);
        fixture.detectChanges();
    });

    it('Should handle correct write value for single mode', async () => {
        await wait(fixture);

        const date = FdDate.getToday();

        const datepicker = host.datepicker.toArray()[0];
        const dateStr = (<any>datepicker.coreDatePicker)._formatDate(date);

        datepicker.writeValue(date);
        await wait(fixture);
        fixture.detectChanges();

        expect(datepicker.coreDatePicker.selectedDate).toEqual(date);
        expect(datepicker.coreDatePicker.inputFieldDate).toBe(dateStr);
    });

    it('Should handle null write value for single mode', async () => {
        await wait(fixture);

        const datepicker = host.datepicker.toArray()[0];
        datepicker.writeValue(null);
        expect(datepicker.coreDatePicker.selectedDate).toBeUndefined();
        expect(datepicker.coreDatePicker.inputFieldDate).toBe('');
    });

    it('Should handle correct write value for range mode', async () => {
        await wait(fixture);

        const datepicker = host.datepicker.toArray()[1];
        datepicker.type = 'range';
        const dateStart = FdDate.getToday();
        const dateStrStart = (<any>datepicker.coreDatePicker)._formatDate(dateStart);

        const dateEnd = FdDate.getToday();
        dateEnd.month = 12;
        const dateStrEnd = (<any>datepicker.coreDatePicker)._formatDate(dateEnd);
        datepicker.writeValue({ start: dateStart, end: dateEnd });

        await wait(fixture);
        fixture.detectChanges();
        expect(datepicker.coreDatePicker.selectedRangeDate).toEqual({ start: dateStart, end: dateEnd });
        expect(datepicker.coreDatePicker.inputFieldDate).toBe(
            dateStrStart + datepicker.coreDatePicker.dateAdapter.rangeDelimiter + dateStrEnd
        );
    });

    it('Should handle null write value for range mode', async () => {
        await wait(fixture);

        const datepicker = host.datepicker.toArray()[1];
        const dateStart = null;
        const dateEnd = null;
        datepicker.writeValue({ start: dateStart, end: dateEnd });
        expect(datepicker.coreDatePicker.selectedRangeDate).toEqual({ start: dateStart, end: dateEnd });
        expect(datepicker.coreDatePicker.inputFieldDate).toBe('');
    });

    it('Should register invalid string date and not call event for single mode', async () => {
        await wait(fixture);

        const datepicker = host.datepicker.toArray()[0];
        spyOn(datepicker.selectedDateChange, 'emit');
        datepicker.type = 'single';
        datepicker.coreDatePicker.dateStringUpdate('33333333');
        const date: FdDate = datepicker.coreDatePicker.dateAdapter.parse('33333333');
        expect(datepicker.coreDatePicker.isInvalidDateInput).toBe(true);
        expect(datepicker.selectedDateChange.emit).toHaveBeenCalledWith(date);
        expect(datepicker.coreDatePicker.isModelValid()).toBe(false);
    });

    it('Should register invalid string date and not call event for range mode', async () => {
        await wait(fixture);

        const datepicker = host.datepicker.toArray()[1];
        spyOn(datepicker.selectedRangeDateChange, 'emit');
        datepicker.type = 'range';
        datepicker.coreDatePicker.dateStringUpdate('33333333 - 3000000');
        const start: FdDate = datepicker.coreDatePicker.dateAdapter.parse('33333333');
        const end: FdDate = datepicker.coreDatePicker.dateAdapter.parse('3000000');
        expect(datepicker.coreDatePicker.isInvalidDateInput).toBe(true);
        expect(datepicker.selectedRangeDateChange.emit).toHaveBeenCalledWith({ start: start, end: end });
        expect(datepicker.coreDatePicker.isModelValid()).toBe(false);
    });

    it('Should handle valid string date', async () => {
        await wait(fixture);

        const datepicker = host.datepicker.toArray()[0];
        spyOn(datepicker.selectedDateChange, 'emit');

        datepicker.writeValue(new FdDate(2018, 10, 10));

        await wait(fixture);
        fixture.detectChanges();

        const date = new FdDate(2000, 10, 10);
        const strDate = (<any>datepicker.coreDatePicker)._formatDate(date);
        datepicker.coreDatePicker.dateStringUpdate(strDate);

        await wait(fixture);
        fixture.detectChanges();
        expect(datepicker.coreDatePicker.isInvalidDateInput).toBe(false);
        expect(datepicker.selectedDateChange.emit).toHaveBeenCalledWith(date);
    });

    it('Should handle calendar with valid string date', async () => {
        await wait(fixture);

        const datepicker = host.datepicker.toArray()[0];
        spyOn(datepicker.selectedDateChange, 'emit');
        spyOn(datepicker, 'onChange');

        const date = new FdDate(2000, 10, 10);
        const strDate = (<any>datepicker.coreDatePicker)._formatDate(date);

        datepicker.coreDatePicker.dateStringUpdate(strDate);
        await wait(fixture);
        fixture.detectChanges();

        expect(datepicker.coreDatePicker.isInvalidDateInput).toBe(false);
        expect(datepicker.coreDatePicker.calendarComponent.currentlyDisplayed.month).toBe(date.month);
        expect(datepicker.coreDatePicker.calendarComponent.currentlyDisplayed.year).toBe(date.year);
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

        const strDate1 = (<any>datepicker.coreDatePicker)._formatDate(date1);
        const strDate2 = (<any>datepicker.coreDatePicker)._formatDate(date2);
        datepicker.coreDatePicker.dateStringUpdate(
            strDate1 + datepicker.coreDatePicker.dateAdapter.rangeDelimiter + strDate2
        );
        expect(datepicker.coreDatePicker.isInvalidDateInput).toBe(false);
        expect(datepicker.coreDatePicker.calendarComponent.currentlyDisplayed.month).toBe(date1.month);
        expect(datepicker.coreDatePicker.calendarComponent.currentlyDisplayed.year).toBe(date1.year);
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
        const strDate1 = (<any>datepicker.coreDatePicker)._formatDate(date1);
        const strDate2 = (<any>datepicker.coreDatePicker)._formatDate(date2);

        datepicker.coreDatePicker.dateStringUpdate(
            strDate1 + datepicker.coreDatePicker.dateAdapter.rangeDelimiter + strDate2
        );
        expect(datepicker.coreDatePicker.isInvalidDateInput).toBe(false);
        expect(datepicker.coreDatePicker.calendarComponent.currentlyDisplayed.month).toBe(date2.month);
        expect(datepicker.coreDatePicker.calendarComponent.currentlyDisplayed.year).toBe(date2.year);
        expect(datepicker.selectedRangeDateChange.emit).toHaveBeenCalledWith({ start: date2, end: date1 });
        expect(datepicker.onChange).toHaveBeenCalledWith({ start: date2, end: date1 });
    });

    it('should set form control value on datepicker value change', async () => {
        await wait(fixture);

        const datePickerFormGroup = host.datePickerForm;
        // for single type date picker
        expect(datePickerFormGroup.controls.birthday.valid).toBeFalsy();

        const date = FdDate.getToday();
        const datepicker = host.datepicker.toArray()[0];

        datepicker.value = date;
        fixture.detectChanges();

        expect(datePickerFormGroup.controls.birthday.valid).toBeTruthy();
        expect(datePickerFormGroup.controls.birthday.value).toEqual(date);

        // for single type date picker, set value using control.
        datePickerFormGroup.controls.birthday.setValue(date.nextDay());
        fixture.detectChanges();
        expect(datePickerFormGroup.controls.birthday.valid).toBeTruthy();
        expect(datepicker.value).toEqual(date.nextDay());

        // for range type date picker
        expect(datePickerFormGroup.controls.journeydate.valid).toBeFalsy();

        const rangeDate: FdRangeDate = { start: FdDate.getToday(), end: FdDate.getToday() };
        const rangeDateNextday: FdRangeDate = { start: FdDate.getToday().nextDay(), end: FdDate.getToday().nextDay() };
        const rangeDatepicker = host.datepicker.toArray()[1];

        rangeDatepicker.value = rangeDate;
        fixture.detectChanges();

        expect(datePickerFormGroup.controls.journeydate.valid).toBeTruthy();
        expect(datePickerFormGroup.controls.journeydate.value).toEqual(rangeDate);

        // for range type date picker, set value using control.
        datePickerFormGroup.controls.journeydate.setValue(rangeDateNextday);
        fixture.detectChanges();
        expect(datePickerFormGroup.controls.journeydate.valid).toBeTruthy();
        expect(rangeDatepicker.value).toEqual(rangeDateNextday);
    });

    it('control should be invalid if wrong value set', async () => {
        const datePickerFormGroup = host.datePickerForm;
        // for single type date picker
        expect(datePickerFormGroup.controls.birthday.valid).toBeFalsy();

        const datepicker = host.datepicker.toArray()[0];

        datepicker.value = '';
        fixture.detectChanges();

        expect(datePickerFormGroup.controls.birthday.valid).toBeFalsy();
        expect(datePickerFormGroup.controls.birthday.value).toBeFalsy();

        // for range type date picker
        expect(datePickerFormGroup.controls.journeydate.valid).toBeFalsy();

        const rangeDatepicker = host.datepicker.toArray()[1];

        rangeDatepicker.value = '';
        fixture.detectChanges();

        expect(datePickerFormGroup.controls.journeydate.valid).toBeFalsy();
        expect(datePickerFormGroup.controls.journeydate.value).toBeFalsy();
    });
});
