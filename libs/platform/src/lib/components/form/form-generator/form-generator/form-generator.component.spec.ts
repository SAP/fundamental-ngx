import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

import { whenStable } from '@fundamental-ngx/core/tests';
import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';
import {
    DynamicFormControlDirective,
    DynamicFormControlFieldDirective,
    DynamicFormGeneratorInputComponent,
    DynamicFormItem,
    FdpFormGroupModule,
    FormGeneratorComponent,
    FormGeneratorService,
    PlatformButtonModule,
    PlatformCheckboxGroupModule,
    PlatformDatePickerModule,
    PlatformInputModule,
    PlatformRadioGroupModule,
    PlatformSelectModule,
    PlatformSwitchModule,
    PlatformTextAreaModule
} from '@fundamental-ngx/platform';

@Component({
    template: `
        <fdp-form-generator
            [formItems]="formItems"
            [mainTitle]="formTitle"
            (formSubmitted)="onFormSubmitted($event)"
            (formCreated)="onFormCreated($event)"></fdp-form-generator>
    `
})
export class HostComponent {

    @ViewChild(FormGeneratorComponent) formGenerator: FormGeneratorComponent;

    formCreated = false;

    form: FormGroup;

    formValue: {[key: string]: any};

    formTitle = 'Test form title';

    formItems: DynamicFormItem[] = [
        {
            name: 'firstQuestion',
            message: 'First question',
            type: 'input',
            validate: (value) => value === 25 ? null : 'Should be 25'
        }
    ]

    onFormCreated(form): void {
        this.formCreated = true;
        this.form = form;
    }

    onFormSubmitted(formValue): void {
        this.formValue = formValue;
    }

    submitForm(): void {
        this.formGenerator.submit();
    }
}

/** TODO: #6318 */
xdescribe('FormGeneratorComponent', () => {
    let component: HostComponent;
    let fixture: ComponentFixture<HostComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                FdpFormGroupModule,
                PlatformInputModule,
                FormsModule,
                ReactiveFormsModule,
                PlatformButtonModule,
                PlatformCheckboxGroupModule,
                PlatformSelectModule,
                PlatformRadioGroupModule,
                PlatformTextAreaModule,
                PlatformInputModule,
                PlatformDatePickerModule,
                PlatformSwitchModule,
                BusyIndicatorModule,
            ],
            declarations: [
                DynamicFormControlDirective,
                DynamicFormControlFieldDirective,
                DynamicFormGeneratorInputComponent,
                FormGeneratorComponent,
                HostComponent
            ],
            providers: [FormGeneratorService]
        })
            .overrideModule(BrowserDynamicTestingModule, {
                set: {
                    entryComponents: [DynamicFormGeneratorInputComponent]
                }
            })
            .compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(HostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await whenStable(fixture);
    });

    it('should render form title', async () => {
        await whenStable(fixture);

        expect(fixture.debugElement.query(By.css('.fd-form-header__text')).nativeElement.innerText)
            .toEqual(component.formTitle)
    });

    it('should create form', async() => {
        await whenStable(fixture);

        expect(component.formCreated).toBeTruthy();
    });

    it('should create form and pass form object', async() => {
        await whenStable(fixture);
        expect(component.form.controls).toBeTruthy();
    });

    it('should submit form programmatically', async () => {
        await whenStable(fixture);

        component.form.controls.firstQuestion.setValue(25);

        await new Promise(resolve => setTimeout(() => resolve(null), 20));

        component.submitForm();

        await new Promise(resolve => setTimeout(() => resolve(null), 200));
        fixture.detectChanges();

        expect(component.formValue).toBeTruthy();
    });

    it('should not emit form value if form is invalid', async () => {
        await whenStable(fixture);
        component.form.controls.firstQuestion.setValue(0);

        await new Promise(resolve => setTimeout(() => resolve(null), 20));

        component.submitForm();

        await new Promise(resolve => setTimeout(() => resolve(null), 200));
        fixture.detectChanges();

        expect(component.formValue).toBeFalsy();
    });
});
