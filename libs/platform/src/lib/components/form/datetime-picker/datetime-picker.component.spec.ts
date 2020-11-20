import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DatetimePickerComponent, TimeObject } from '@fundamental-ngx/core';
import {
    ButtonModule,
    CalendarModule,
    DatetimePickerModule,
    FdDate,
    FdDatetime,
    FormModule,
    IconModule,
    InputGroupModule,
    PopoverModule
} from '@fundamental-ngx/core';
import { FormFieldComponent, FdpFormGroupModule } from '@fundamental-ngx/platform';

import { PlatformDatetimePickerComponent } from './datetime-picker.component';
@Component({
    selector: 'fdp-test-datetime-picker',
    template: `
        <form [formGroup]="datetimePickerForm" (ngSubmit)="onSubmit()">
            <fdp-form-group #ffg [formGroup]="datetimePickerForm" [object]="datetimePickerFormData">
                <fdp-form-field
                    #ffl1
                    id="datetimePicker"
                    zone="zLeft"
                    rank="1"
                    required="true"
                    hint="This is a hint"
                    placeholder="Enter a date"
                    label="Date:"
                >
                    <fdp-datetime-picker name="datetimePicker" allowNull="false" formControlName="datetimePicker">
                    </fdp-datetime-picker>
                </fdp-form-field>
                <ng-template #i18n let-errors>
                    <ng-container *ngIf="errors.required">
                        <span>Value is required</span>
                    </ng-container>
                </ng-template>
            </fdp-form-group>
            <button type="submit" #submitButton>Submit</button>
        </form>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
class TestDatetimePickerComponent {
    @ViewChild(PlatformDatetimePickerComponent)
    datetimePickerComponent: PlatformDatetimePickerComponent;

    @ViewChild('ffl1') datetimePickerFormField: FormFieldComponent;
    @ViewChild('submitButton') submitButton: ElementRef<HTMLElement>;

    datetimePicker: FdDatetime = new FdDatetime(new FdDate(2008, 2, 11), new TimeObject());

    datetimePickerForm: FormGroup;

    datetimePickerFormData = { datetimePicker: this.datetimePicker };
    constructor() {
        this.datetimePicker = new FdDatetime(new FdDate(2008, 2, 11), this.datetimePicker.time);
        this.datetimePickerForm = new FormGroup({
            datetimePicker: new FormControl(this.datetimePicker)
        });
    }

    result: any = null;

    onSubmit(): void {
        this.result = this.datetimePickerForm.value;
    }
}

describe('PlatformDatetimePickerComponent', () => {
    let host: TestDatetimePickerComponent;
    let fixture: ComponentFixture<TestDatetimePickerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PlatformDatetimePickerComponent, TestDatetimePickerComponent, DatetimePickerComponent],
            imports: [
                CalendarModule,
                DatetimePickerModule,
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
        fixture = TestBed.createComponent(TestDatetimePickerComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
    });

    async function wait(componentFixture: ComponentFixture<any>): Promise<void> {
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }

    it('should create', () => {
        expect(host).toBeTruthy();
    });

    it('should have a label, placeholder and default value', async () => {
        await wait(fixture);
        host.datetimePickerComponent.ngAfterViewInit();

        const datetimePickerLabel = host.datetimePickerFormField.label;
        expect(datetimePickerLabel).toBe('Date:');

        const datetimePickerPlaceholder = host.datetimePickerFormField.placeholder;
        expect(datetimePickerPlaceholder).toBe('Enter a date');

        const datetimePickerHint = host.datetimePickerFormField.hint;
        expect(datetimePickerHint).toBe('This is a hint');

        const datetimePickerDefaultValue = host.datetimePickerForm.get('datetimePicker').value.day;
        expect(datetimePickerDefaultValue).toBe(11);
    });

    it('should submit the value', async () => {
        const submitButton = host.submitButton.nativeElement;
        submitButton.click();

        await wait(fixture);

        expect(host.result.datetimePicker.year).toEqual(2008);
    });

    it('should call handleDatetime method', async () => {
        const datetimePicker = host.datetimePickerComponent;
        spyOn(datetimePicker, '_handleDatetimeChange');
        datetimePicker.value = '11/26/2020, 18:32:01';
        await wait(fixture);

        expect(datetimePicker._handleDatetimeChange).toHaveBeenCalled();
    });

    it('should call disabled state method', async () => {
        const datetimePicker = host.datetimePickerComponent;
        datetimePicker.disabled = true;
        host.datetimePickerForm.get('datetimePicker').disable();

        await wait(fixture);
        expect(host.datetimePickerForm.get('datetimePicker').disabled).toBe(true);
    });

    it('should be in an error state if value is empty and touched', async () => {
        const datetimePicker = host.datetimePickerComponent;
        datetimePicker.allowNull = false;
        const formControl = host.datetimePickerForm.get('datetimePicker');
        const inputEl = fixture.debugElement.query(By.css('input'));

        expect(inputEl.nativeElement.classList.contains('is-error')).not.toBeTrue();

        formControl.markAsTouched();
        await wait(fixture);
        datetimePicker.value = '';
        await wait(fixture);

        expect(formControl.value).toBe('');
    });
});
