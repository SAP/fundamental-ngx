import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeObject } from '@fundamental-ngx/core';
import { FormFieldComponent, FdpFormGroupModule, PlatformTimePickerModule } from '@fundamental-ngx/platform';
import { PlatformTimePickerComponent } from './time-picker.component';

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
    @ViewChild(PlatformTimePickerComponent) timePickerComponent: PlatformTimePickerComponent;

    @ViewChild('ffl1') timePickerFormField: FormFieldComponent;
    @ViewChild('submitButton') submitButton: ElementRef<HTMLElement>;

    timeObject: TimeObject = { hour: 12, minute: 0, second: 0 };

    timePickerForm: FormGroup = new FormGroup({
        timePicker: new FormControl(this.timeObject)
    });

    result: any = null;

    onSubmit(): void {
        this.result = this.timePickerForm.value;
    }
}

fdescribe('PlatformTimePickerComponent', () => {
    let component: TestTimePickerComponent;
    let fixture: ComponentFixture<TestTimePickerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TestTimePickerComponent],
            imports: [
                PlatformTimePickerModule,
                FdpFormGroupModule,
                FormsModule,
                ReactiveFormsModule
            ]
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

        const timePickerLabel = component.timePickerFormField.label;
        expect(timePickerLabel).toBe('Time:');

        const timePickerPlaceholder = component.timePickerFormField.placeholder;
        expect(timePickerPlaceholder).toBe('Enter a time');

        const timePickerHint = component.timePickerFormField.hint;
        expect(timePickerHint).toBe('This is a hint');

        const timePickerDefaultValue = component.timePickerForm.get('timePicker').value;
        expect(timePickerDefaultValue).toEqual({ hour: 12, minute: 0, second: 0 });
    });

    it('should submit the value', async () => {
        const submitButton = component.submitButton.nativeElement;
        submitButton.click();

        await wait(fixture);

        console.log(component.result);

        expect(component.result).toEqual({ timePicker: { hour: 12, minute: 0, second: 0 } });
    });

    it('should call disabled state method', async () => {
        const timePicker = component.timePickerComponent;
        timePicker.disabled = true;
        component.timePickerForm.get('timePicker').disable();

        await wait(fixture);
        expect(component.timePickerForm.get('timePicker').disabled).toBe(true);
    });

    it('should be in an error state if value is empty and touched', async () => {
        const timePicker = component.timePickerComponent;
        timePicker.allowNull = false;
        const formControl = component.timePickerForm.get('timePicker');
        const inputEl = fixture.debugElement.query(By.css('.fd-input-group'));

        expect(inputEl.nativeElement.classList.contains('is-error')).not.toBeTrue();

        formControl.markAsTouched();
        await wait(fixture);
        timePicker.value = null;
        await wait(fixture);

        expect(formControl.value).toBeNull();
        expect(inputEl.nativeElement.classList.contains('is-error')).toBeTrue();
    });
});
