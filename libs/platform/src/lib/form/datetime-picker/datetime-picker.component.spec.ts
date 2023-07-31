import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { ButtonModule } from '@fundamental-ngx/core/button';
import { CalendarModule } from '@fundamental-ngx/core/calendar';
import { DatetimePickerModule } from '@fundamental-ngx/core/datetime-picker';
import { FdDate, FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { FormModule } from '@fundamental-ngx/core/form';
import { IconModule } from '@fundamental-ngx/core/icon';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { PlatformDatetimePickerModule } from './datetime-picker.module';
import { FdpFormGroupModule } from '../form-group/fdp-form.module';
import { FormFieldComponent } from '../form-group/form-field/form-field.component';
import { PlatformDatetimePickerComponent } from './datetime-picker.component';
import { runValueAccessorTests } from 'ngx-cva-test-suite';

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
    datetimePickerComponent: PlatformDatetimePickerComponent<FdDate>;

    @ViewChild('ffl1') datetimePickerFormField: FormFieldComponent;
    @ViewChild('submitButton') submitButton: ElementRef<HTMLElement>;

    datetimePicker: FdDate = new FdDate(2008, 2, 11, 13, 15);

    datetimePickerFormData = { datetimePicker: this.datetimePicker };

    datetimePickerForm: FormGroup;

    result: any = null;

    constructor() {
        this.datetimePickerForm = new FormGroup({
            datetimePicker: new FormControl(this.datetimePicker)
        });
    }

    onSubmit(): void {
        this.result = this.datetimePickerForm.value;
    }
}

describe('PlatformDatetimePickerComponent', () => {
    let host: TestDatetimePickerComponent;
    let fixture: ComponentFixture<TestDatetimePickerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestDatetimePickerComponent],
            imports: [
                PlatformDatetimePickerModule,
                FdDatetimeModule,
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

        const datetimePickerDefaultValue = host.datetimePickerForm.get('datetimePicker')?.value.day;
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
        jest.spyOn(datetimePicker, 'writeValue');

        datetimePicker.value = new FdDate();
        await wait(fixture);

        expect(datetimePicker.writeValue).toHaveBeenCalled();
    });

    it('should call disabled state method', async () => {
        const datetimePicker = host.datetimePickerComponent;
        datetimePicker.disabled = true;
        host.datetimePickerForm.get('datetimePicker')?.disable();

        await wait(fixture);
        expect(host.datetimePickerForm.get('datetimePicker')?.disabled).toBe(true);
    });

    it('should be in an error state if value is empty and touched', async () => {
        const datetimePicker = host.datetimePickerComponent;
        datetimePicker.allowNull = false;

        const inputGroupEl = fixture.debugElement.query(By.css('.fd-input-group'));

        expect(inputGroupEl.nativeElement.classList.contains('is-error')).not.toBe(true);

        // @ts-expect-error fault tolerance test
        const invalidDate = new FdDate(null);
        datetimePicker.value = invalidDate;
        await wait(fixture);
        datetimePicker.handleDatetimeInputChange(invalidDate);
        await wait(fixture);

        expect(inputGroupEl.nativeElement.classList.contains('is-error')).toBe(true);
    });

    it('should take 100% of container width', () => {
        const customPopoverEl = fixture.debugElement.query(By.css('.fd-datetime .fd-popover-custom'));
        expect(customPopoverEl.nativeElement.style.display).toBe('inline');
    });
});

const DATE_TIME_PICKER_IDENTIFIER = 'platform-date-time-picker-unit-test';

runValueAccessorTests({
    component: PlatformDatetimePickerComponent,
    name: 'Datetime picker',
    testModuleMetadata: {
        imports: [PlatformDatetimePickerModule, FdDatetimeModule]
    },
    additionalSetup: (fixture, done) => {
        fixture.componentInstance.id = DATE_TIME_PICKER_IDENTIFIER;
        fixture.componentInstance.name = DATE_TIME_PICKER_IDENTIFIER;
        done();
    },
    supportsOnBlur: true,
    nativeControlSelector: `input[id="${DATE_TIME_PICKER_IDENTIFIER}"]`,
    internalValueChangeSetter: (fixture, value) => {
        fixture.componentInstance.value = value;
    },
    getValues: () => [new FdDate(2021, 9, 5), new FdDate(2021, 10, 5), new FdDate(2021, 11, 5)],
    getComponentValue: (fixture) => fixture.componentInstance.value
});
