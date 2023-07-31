import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FdDate, FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { FormFieldComponent } from '../form-group/form-field/form-field.component';
import { FdpFormGroupModule } from '../form-group/fdp-form.module';
import { PlatformTimePickerModule } from './time-picker.module';
import { PlatformTimePickerComponent } from './time-picker.component';
import { runValueAccessorTests } from 'ngx-cva-test-suite';

@Component({
    selector: 'fdp-test-time-picker',
    template: `
        <form [formGroup]="timePickerForm" (ngSubmit)="onSubmit()">
            <fdp-form-group #ffg [formGroup]="timePickerForm">
                <fdp-form-field
                    #ffl1
                    id="timePicker"
                    zone="zLeft"
                    rank="1"
                    required="true"
                    hint="This is a hint"
                    placeholder="Enter a time"
                    label="Time:"
                >
                    <fdp-time-picker name="timePicker" allowNull="false" formControlName="timePicker">
                    </fdp-time-picker>
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
class TestTimePickerComponent {
    @ViewChild(PlatformTimePickerComponent) timePickerComponent: PlatformTimePickerComponent<FdDate>;

    @ViewChild('ffl1') timePickerFormField: FormFieldComponent;
    @ViewChild('submitButton') submitButton: ElementRef<HTMLElement>;

    timeObject: FdDate = new FdDate().setTime(12, 0, 0);

    timePickerForm: FormGroup = new FormGroup({
        timePicker: new FormControl(this.timeObject)
    });

    result: any = null;

    onSubmit(): void {
        this.result = this.timePickerForm.value;
    }
}

describe('PlatformTimePickerComponent', () => {
    let component: TestTimePickerComponent;
    let fixture: ComponentFixture<TestTimePickerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestTimePickerComponent],
            imports: [PlatformTimePickerModule, FdpFormGroupModule, FormsModule, ReactiveFormsModule, FdDatetimeModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestTimePickerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    async function wait(componentFixture: ComponentFixture<any>): Promise<void> {
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have a label, placeholder and default value', async () => {
        await wait(fixture);
        component.timePickerComponent.ngAfterViewInit();
        const time: FdDate = new FdDate().setTime(12, 0, 0);

        const timePickerLabel = component.timePickerFormField.label;
        expect(timePickerLabel).toBe('Time:');

        const timePickerPlaceholder = component.timePickerFormField.placeholder;
        expect(timePickerPlaceholder).toBe('Enter a time');

        const timePickerHint = component.timePickerFormField.hint;
        expect(timePickerHint).toBe('This is a hint');

        const timePickerDefaultValue = component.timePickerForm.get('timePicker')?.value;
        expect(timePickerDefaultValue).toEqual(time);
    });

    it('should submit the value', async () => {
        const submitButton = component.submitButton.nativeElement;
        const time: FdDate = new FdDate().setTime(12, 0, 0);

        submitButton.click();

        await wait(fixture);

        expect(component.result).toEqual({ timePicker: time });
    });

    it('should call disabled state method', async () => {
        const timePicker = component.timePickerComponent;
        timePicker.disabled = true;
        component.timePickerForm.get('timePicker')?.disable();

        await wait(fixture);
        expect(component.timePickerForm.get('timePicker')?.disabled).toBe(true);
    });

    it('should be in an error state if value is empty and touched', async () => {
        const timePicker = component.timePickerComponent;
        timePicker.allowNull = false;
        const formControl = component.timePickerForm.get('timePicker') as FormControl;
        const inputEl = fixture.debugElement.query(By.css('.fd-input-group'));

        expect(inputEl.nativeElement.classList.contains('is-error')).not.toBe(true);

        formControl.markAsTouched();
        await wait(fixture);
        timePicker.value = null;
        await wait(fixture);

        expect(formControl.value).toBeNull();
        expect(inputEl.nativeElement.classList.contains('is-error')).toBe(true);
    });
});

const TIME_PICKER_IDENTIFIER = 'platform-time-picker-unit-test';

runValueAccessorTests({
    component: PlatformTimePickerComponent,
    name: 'Time picker',
    testModuleMetadata: {
        imports: [PlatformTimePickerModule, FdDatetimeModule]
    },
    additionalSetup: (fixture, done) => {
        fixture.componentInstance.id = TIME_PICKER_IDENTIFIER;
        fixture.componentInstance.name = TIME_PICKER_IDENTIFIER;
        done();
    },
    supportsOnBlur: false,
    internalValueChangeSetter: (fixture, value) => {
        fixture.componentInstance.handleTimeChange(value);
    },
    getComponentValue: (fixture) => fixture.componentInstance.value
});
