import { Component, QueryList, ViewChildren } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { FormModule } from '@fundamental-ngx/core/form';
import { CheckboxComponent } from './checkbox.component';
import { FdpFormGroupModule } from './../form-group/fdp-form.module';
import { runValueAccessorTests } from 'ngx-cva-test-suite';
import { PlatformCheckboxModule } from './checkbox.module';

@Component({
    selector: 'fdp-test-checkbox',
    template: `
        <fdp-form-group [formGroup]="customForm">
            <fdp-form-field id="checkbox-0">
                <fdp-checkbox
                    [name]="'checkbox-0'"
                    [label]="'checkbox0'"
                    fdCompact
                    [tristate]="true"
                    [tristateSelectable]="true"
                    [values]="{ trueValue: 'Yes' }"
                    formControlName="example1"
                ></fdp-checkbox>
            </fdp-form-field>

            <fdp-form-field id="checkbox-1">
                <fdp-checkbox
                    [name]="'checkbox-1'"
                    [label]="'Checkbox1'"
                    [values]="{ trueValue: 'Checkbox1' }"
                    fdCompact
                    formControlName="example2"
                ></fdp-checkbox>
            </fdp-form-field>

            <fdp-form-field id="checkbox-2">
                <fdp-checkbox
                    [name]="'checkbox-2'"
                    [label]="'Checkbox2'"
                    [values]="{ trueValue: 'Checkbox2' }"
                    fdCompact
                    formControlName="example3"
                ></fdp-checkbox>
            </fdp-form-field>

            <fdp-form-field id="checkbox-3">
                <fdp-checkbox
                    [name]="'checkbox-3'"
                    [label]="'Checkbox3'"
                    [values]="{ trueValue: 'Checkbox3' }"
                    formControlName="disabledcheckbox"
                ></fdp-checkbox>
            </fdp-form-field>

            <fdp-form-field id="checkbox-4">
                <fdp-checkbox
                    [name]="'checkbox-4'"
                    [label]="'Checkbox4'"
                    [values]="{ trueValue: 'Checkbox4' }"
                    fdCompact
                    formControlName="example5"
                ></fdp-checkbox>
            </fdp-form-field>
        </fdp-form-group>
    `
})
class TestCheckboxComponent {
    @ViewChildren(CheckboxComponent)
    fdpCheckboxes: QueryList<CheckboxComponent>;

    customForm = new FormGroup({
        example1: new FormControl('Yes'),
        example2: new FormControl('Checkbox1'),
        example3: new FormControl(false),
        disabledcheckbox: new FormControl({ value: false, disabled: true }),
        example5: new FormControl(null)
    });
}

describe('Checkbox test Component', () => {
    let host: TestCheckboxComponent;
    let fixture: ComponentFixture<TestCheckboxComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [FdpFormGroupModule, FormModule, FormsModule, ReactiveFormsModule, PlatformCheckboxModule],
                declarations: [TestCheckboxComponent]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(TestCheckboxComponent);
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

    it('should have classes applied', () => {
        const checkboxInput = fixture.debugElement.query(By.css('input'));
        const checkboxLabel = fixture.debugElement.query(By.css('.fd-checkbox__label'));

        // Input Element
        expect(checkboxInput.nativeElement.getAttribute('type')).toEqual('checkbox');
        expect(checkboxInput.nativeElement.getAttribute('id')).toEqual('checkbox-0');
        expect(checkboxLabel.nativeElement.classList.contains('fd-checkbox__label--compact')).toBeTruthy();
        expect(checkboxInput.nativeElement.classList.contains('fd-checkbox--compact')).toBeTruthy();
        expect(checkboxLabel.nativeElement.classList.contains('fd-checkbox__label')).toBeTruthy();
        expect(checkboxInput.nativeElement.classList.contains('fd-checkbox')).toBeTruthy();
    });

    it('should change checkbox state on click', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const checkboxes = host.fdpCheckboxes.toArray();

        // default value
        expect(checkboxes[0].value).toEqual('Yes');
        expect(host.customForm.get('example1')?.value).toEqual('Yes');

        const checkboxLabel = fixture.debugElement.query(By.css('.fd-checkbox__label'));

        checkboxLabel.nativeElement.click();
        fixture.detectChanges();

        expect(checkboxes[0].value).toBeFalsy();
        expect(host.customForm.get('example1')?.value).toBeFalsy();

        checkboxLabel.nativeElement.click();
        fixture.detectChanges();

        expect(checkboxes[0].value).toEqual(null);
        expect(host.customForm.get('example1')?.value).toEqual(null);

        checkboxLabel.nativeElement.click();
        fixture.detectChanges();

        expect(checkboxes[0].value).toEqual('Yes');
        expect(host.customForm.get('example1')?.value).toEqual('Yes');
    });

    it('should apply is-error style on form Error', async () => {
        await wait(fixture);
        fixture.detectChanges();
        const inputElem = fixture.debugElement.query(By.css('input'));
        expect(inputElem.nativeElement.classList.contains('is-error')).toBeFalsy();
        expect(inputElem.nativeElement.classList.contains('is-warning')).toBeFalsy();

        host.customForm.get('example1')?.setErrors({ 'has error': true });
        host.customForm.get('example1')?.markAsTouched();

        fixture.detectChanges();

        expect(host.customForm.status).toEqual('INVALID');
    });

    it('should select multiple checkboxes in one formcontrol', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const checkboxes = host.fdpCheckboxes.toArray();
        const checkboxLabels = fixture.debugElement.queryAll(By.css('.fd-checkbox__label'));

        expect(checkboxes[1].value).toEqual('Checkbox1');
        expect(checkboxes[2].value).toEqual(false);
        expect(checkboxes[3].value).toBeFalsy();

        // click on checkbox3
        checkboxLabels[2].nativeElement.click();
        fixture.detectChanges();

        expect(checkboxes[1].value).toEqual('Checkbox1');
        expect(checkboxes[2].value).toEqual('Checkbox2');
        expect(checkboxes[3].value).toBeFalsy();

        // click on checkbox1
        checkboxLabels[1].nativeElement.click();
        fixture.detectChanges();

        expect(checkboxes[1].value).toBeFalsy();
        expect(checkboxes[2].value).toEqual('Checkbox2');
        expect(checkboxes[3].value).toBeFalsy();
    });

    it('should not be able to change disabled checkbox value on click, ', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const checkboxes = host.fdpCheckboxes.toArray();
        const checkboxLabels = fixture.debugElement.queryAll(By.css('.fd-checkbox__label'));

        fixture.detectChanges();

        expect(checkboxes[3].value).toBeFalsy();

        // click on disabled checkbox
        checkboxLabels[3].nativeElement.click();
        fixture.detectChanges();

        expect(checkboxes[3].value).toBeFalsy();
    });

    it('should create tristate checkbox without value', async () => {
        await wait(fixture);
        fixture.detectChanges();

        expect(host.customForm.get('example5')?.value).toBe(null);

        const checkboxes = host.fdpCheckboxes.toArray();
        const checkboxLabels = fixture.debugElement.queryAll(By.css('.fd-checkbox__label'));

        // fisrt click to unchecked state
        checkboxLabels[4].nativeElement.click();
        fixture.detectChanges();
        expect(host.customForm.get('example5')?.value).toBe('Checkbox4');
        expect(checkboxes[4].value).toEqual('Checkbox4');

        // second click to intermediate state
        checkboxLabels[4].nativeElement.click();
        fixture.detectChanges();
        expect(host.customForm.get('example5')?.value).toBe(false);
        expect(checkboxes[4].value).toEqual(false);
    });
});

const CHECKBOX_IDENTIFIER = 'platform-checkbox-unit-test';

runValueAccessorTests({
    component: CheckboxComponent,
    testModuleMetadata: {
        imports: [PlatformCheckboxModule]
    },
    additionalSetup: (fixture, done) => {
        fixture.componentInstance.id = CHECKBOX_IDENTIFIER;
        done();
    },
    supportsOnBlur: true,
    nativeControlSelector: `input[type="checkbox"][id="${CHECKBOX_IDENTIFIER}"]`,
    internalValueChangeSetter: (fixture, value) => {
        fixture.componentInstance.value = value;
    },
    getComponentValue: (fixture) => fixture.componentInstance.value,
    getValues: () => [true, false, true]
});
