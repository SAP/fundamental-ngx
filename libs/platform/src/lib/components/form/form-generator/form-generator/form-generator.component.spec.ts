import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { whenStable } from '@fundamental-ngx/core/tests';

import { PlatformInputModule } from '../../input/fdp-input.module';
import { FdpFormGroupModule } from '../../form-group/fdp-form.module';
import { PlatformButtonModule } from '../../../button/button.module';
import { PlatformCheckboxGroupModule } from '../../checkbox-group/checkbox-group.module';
import { PlatformSelectModule } from '../../select';
import { PlatformRadioGroupModule } from '../../radio-group/radio-group.module';
import { PlatformTextAreaModule } from '../../text-area/text-area.module';
import { PlatformDatePickerModule } from '../../date-picker/date-picker.module';
import { PlatformSwitchModule } from '../../switch/switch.module';
import { PlatformFormGeneratorModule } from '../fdp-form-generator.module';
import { DynamicFormItem } from '../interfaces/dynamic-form-item';
import { FormGeneratorComponent } from './form-generator.component';

@Component({
    template: `
    <fdp-form-generator
        [formItems]="formItems"
        [mainTitle]="formTitle"
        (formSubmitted)="onFormSubmitted($event)"
        (formCreated)="onFormCreated($event)"></fdp-form-generator>
    `
})
export class TestComponent {

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

    constructor() {

    }

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

describe('FormGeneratorComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let debugElement: DebugElement;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
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
                PlatformFormGeneratorModule
            ],
            declarations: [ TestComponent ],
        }).compileComponents();


    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        debugElement = fixture.debugElement;
        await whenStable(fixture);
    });

    it('should render form title', async () => {
        await whenStable(fixture);
        expect(debugElement.query(By.css('.fd-form-header__text')).nativeElement.innerText).toEqual(component.formTitle)
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
