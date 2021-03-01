import { By } from '@angular/platform-browser';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CheckboxComponent } from './checkbox.component';
import { Component, ViewChildren, QueryList } from '@angular/core';
import { CheckboxModule, FormModule } from '@fundamental-ngx/core';
import { FdpFormGroupModule } from './../form-group/fdp-form.module';

@Component({
    selector: 'fdp-test-checkbox',
    template: `
        <fdp-form-group [formGroup]="customForm">
            <fdp-form-field [id]="'checkbox-0'">
                <fdp-checkbox
                    [id]="'checkbox-0'"
                    [name]="'checkbox-0'"
                    [label]="'checkbox0'"
                    [contentDensity]="'compact'"
                    [tristate]="true"
                    [value]="'Yes'"
                    formControlName="example1"
                ></fdp-checkbox>
            </fdp-form-field>

            <fdp-form-field [id]="'checkbox-1'">
                <fdp-checkbox
                    [name]="'checkbox-1'"
                    [label]="'Checkbox1'"
                    [value]="'Checkbox1'"
                    [contentDensity]="'compact'"
                    formControlName="example2"
                ></fdp-checkbox>
            </fdp-form-field>

            <fdp-form-field [id]="'checkbox-2'">
                <fdp-checkbox
                    [name]="'checkbox-2'"
                    [label]="'Checkbox2'"
                    [value]="'Checkbox2'"
                    [contentDensity]="'compact'"
                    formControlName="example2"
                ></fdp-checkbox>
            </fdp-form-field>

            <fdp-form-field [id]="'checkbox-3'">
                <fdp-checkbox
                    [name]="'checkbox-3'"
                    [label]="'Checkbox3'"
                    [value]="'Checkbox3'"
                    [contentDensity]="'compact'"
                    formControlName="example2"
                ></fdp-checkbox>
            </fdp-form-field>

            <fdp-form-field [id]="'checkbox-4'">
                <fdp-checkbox
                    [name]="'checkbox-4'"
                    [label]="'Checkbox4'"
                    [value]="'Checkbox4'"
                    formControlName="disabledcheckbox"
                ></fdp-checkbox>
            </fdp-form-field>

            <fdp-form-field [id]="'checkbox-5'">
                <fdp-checkbox
                    [name]="'checkbox-5'"
                    [label]="'Checkbox5'"
                    [isBinary]="true"
                    formControlName="example3"
                ></fdp-checkbox>
            </fdp-form-field>

            <fdp-form-field [id]="'checkbox-6'">
                <fdp-checkbox
                    [name]="'checkbox-6'"
                    [label]="'Checkbox6'"
                    [isBinary]="true"
                    formControlName="example4"
                ></fdp-checkbox>
            </fdp-form-field>

            <fdp-form-field [id]="'checkbox-7'">
                <fdp-checkbox
                    [name]="'checkbox-7'"
                    [label]="'checkbox7'"
                    [tristate]="true"
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
        example2: new FormControl(['Checkbox1', 'Checkbox2']),
        example3: new FormControl(false),
        example4: new FormControl(true),
        example5: new FormControl(true),
        disabledcheckbox: new FormControl({ value: [], disabled: true })
    });
}

describe('Checkbox test Component', () => {
    let host: TestCheckboxComponent;
    let fixture: ComponentFixture<TestCheckboxComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [FdpFormGroupModule, FormModule, CheckboxModule, FormsModule, ReactiveFormsModule],
            declarations: [TestCheckboxComponent, CheckboxComponent]
        }).compileComponents();
    }));

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
        const fdpElem = fixture.debugElement.query(By.css('fdp-checkbox'));
        const fdElem = fixture.debugElement.query(By.css('fd-checkbox'));
        const checkboxInput = fixture.debugElement.query(By.css('input'));
        const checkboxLable = fixture.debugElement.query(By.css('.fd-checkbox__label'));

        // fdp-checkbox
        expect(fdpElem.nativeElement.getAttribute('ng-reflect-name')).toEqual('checkbox-0');
        expect(fdpElem.nativeElement.getAttribute('ng-reflect-label')).toEqual('checkbox0');
        expect(fdpElem.nativeElement.getAttribute('ng-reflect-content-density')).toEqual('compact');
        expect(fdpElem.nativeElement.getAttribute('ng-reflect-id')).toEqual('checkbox-0');
        expect(fdpElem.nativeElement.getAttribute('ng-reflect-tristate')).toBeTruthy();

        // fd-checkbox.
        expect(fdElem.nativeElement.getAttribute('ng-reflect-name')).toEqual('checkbox-0');
        expect(fdElem.nativeElement.getAttribute('ng-reflect-label')).toEqual('checkbox0');
        expect(fdElem.nativeElement.getAttribute('ng-reflect-input-id')).toEqual('checkbox-0');
        expect(fdElem.nativeElement.getAttribute('ng-reflect-compact')).toBeTruthy();
        expect(fdElem.nativeElement.getAttribute('ng-reflect-tristate')).toBeTruthy();

        // Input Element
        expect(checkboxInput.nativeElement.getAttribute('ng-reflect-name')).toEqual('checkbox-0');
        expect(checkboxInput.nativeElement.getAttribute('type')).toEqual('checkbox');
        expect(checkboxInput.nativeElement.getAttribute('id')).toEqual('checkbox-0');
        expect(checkboxLable.nativeElement.classList.contains('fd-checkbox__label--compact')).toBeTruthy();
        expect(checkboxInput.nativeElement.classList.contains('fd-checkbox--compact')).toBeTruthy();
        expect(checkboxLable.nativeElement.classList.contains('fd-checkbox__label')).toBeTruthy();
        expect(checkboxInput.nativeElement.classList.contains('fd-checkbox')).toBeTruthy();
    });

    it('should change checkbox state on click', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const checkboxes = host.fdpCheckboxes.toArray();

        // default value
        expect(checkboxes[0].checkboxCurrentValue).toEqual('Yes');
        expect(host.customForm.get('example1').value).toEqual('Yes');

        const checkboxLable = fixture.debugElement.query(By.css('.fd-checkbox__label'));

        checkboxLable.nativeElement.click();
        fixture.detectChanges();

        expect(checkboxes[0].checkboxCurrentValue).toBeFalsy();
        expect(host.customForm.get('example1').value).toBeFalsy();

        checkboxLable.nativeElement.click();
        fixture.detectChanges();

        expect(checkboxes[0].checkboxCurrentValue).toEqual(null);
        expect(host.customForm.get('example1').value).toEqual(null);

        checkboxLable.nativeElement.click();
        fixture.detectChanges();

        expect(checkboxes[0].checkboxCurrentValue).toEqual('Yes');
        expect(host.customForm.get('example1').value).toEqual('Yes');
    });

    it('should apply is-error style on form Error', async () => {
        await wait(fixture);
        fixture.detectChanges();
        const inputElem = fixture.debugElement.query(By.css('input'));
        expect(inputElem.nativeElement.classList.contains('is-error')).toBeFalsy();
        expect(inputElem.nativeElement.classList.contains('is-warning')).toBeFalsy();

        host.customForm.get('example1').setErrors({ 'has error': true });
        host.customForm.get('example1').markAsTouched();

        fixture.detectChanges();

        expect(host.customForm.status).toEqual('INVALID');
    });

    it('should select multiple checkboxes in one formcontrol', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const checkboxes = host.fdpCheckboxes.toArray();
        const checkboxLables = fixture.debugElement.queryAll(By.css('.fd-checkbox__label'));

        host.customForm.get('example2').value.forEach((checkbox: string) => {
            ['Checkbox1', 'Checkbox2'].includes(checkbox);
        });
        expect(checkboxes[1].checkboxCurrentValue).toEqual('Checkbox1');
        expect(checkboxes[2].checkboxCurrentValue).toEqual('Checkbox2');
        expect(checkboxes[3].checkboxCurrentValue).toBeFalsy();

        // click on checkbox3
        checkboxLables[3].nativeElement.click();
        fixture.detectChanges();

        host.customForm.get('example2').value.forEach((checkbox: string) => {
            ['Checkbox1', 'Checkbox2', 'Checkbox3'].includes(checkbox);
        });
        expect(checkboxes[1].checkboxCurrentValue).toEqual('Checkbox1');
        expect(checkboxes[2].checkboxCurrentValue).toEqual('Checkbox2');
        expect(checkboxes[3].checkboxCurrentValue).toEqual('Checkbox3');

        // click on checkbox1
        checkboxLables[1].nativeElement.click();
        fixture.detectChanges();

        host.customForm.get('example2').value.forEach((checkbox: string) => {
            ['Checkbox2', 'Checkbox3'].includes(checkbox);
        });
        // remove below comment tag, after issue #2866 is resolved.
        // expect(checkboxes[1].checkboxCurrentValue).toBeFalsy();
        expect(checkboxes[2].checkboxCurrentValue).toEqual('Checkbox2');
        expect(checkboxes[3].checkboxCurrentValue).toEqual('Checkbox3');
    });

    it('should not be able to change disabled checkbox value on click, ', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const checkboxes = host.fdpCheckboxes.toArray();
        const checkboxLables = fixture.debugElement.queryAll(By.css('.fd-checkbox__label'));

        fixture.detectChanges();

        expect(checkboxes[4].checkboxCurrentValue).toBeFalsy();

        // click on disabled checkbox
        checkboxLables[4].nativeElement.click();
        fixture.detectChanges();

        expect(checkboxes[4].checkboxCurrentValue).toBeFalsy();
    });

    it('should create binary checkbox and set value', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const checkboxes = host.fdpCheckboxes.toArray();
        const checkboxLables = fixture.debugElement.queryAll(By.css('.fd-checkbox__label'));

        fixture.detectChanges();

        // checkbox 5
        expect(checkboxes[5].checkboxCurrentValue).toBeFalsy();
        expect(host.customForm.get('example3').value).toEqual(false);
        // click on checkboxes 5
        checkboxLables[5].nativeElement.click();
        fixture.detectChanges();

        expect(checkboxes[5].checkboxCurrentValue).toBeTruthy();
        expect(host.customForm.get('example3').value).toEqual(true);

        // checkbox 6
        expect(checkboxes[6].checkboxCurrentValue).toBeTruthy();
        expect(host.customForm.get('example4').value).toEqual(true);

        // click on checkboxes 6
        checkboxLables[6].nativeElement.click();
        fixture.detectChanges();

        // remove below comment tag, after issue #2866 is resolved.
        // expect(checkboxes[6].checkboxCurrentValue).toBeFalsy();
        // expect(host.customForm.get('example4').value).toEqual(false);
    });

    it('should create tristate checkbox without value', async () => {
        await wait(fixture);
        fixture.detectChanges();

        expect(host.customForm.get('example5').value).toBeTruthy();

        const checkboxes = host.fdpCheckboxes.toArray();
        const checkboxLables = fixture.debugElement.queryAll(By.css('.fd-checkbox__label'));
        const inputElem = fixture.debugElement.queryAll(By.css('input'));
        expect(inputElem[7].nativeElement.getAttribute('aria-checked')).toEqual('true');

        // fisrt click to unchecked state
        checkboxLables[7].nativeElement.click();
        fixture.detectChanges();
        expect(host.customForm.get('example5').value).toBeFalsy();
        expect(checkboxes[7].checkboxCurrentValue).toEqual(false);
        expect(inputElem[7].nativeElement.getAttribute('aria-checked')).toEqual('false');

        // second click to intermediate state
        checkboxLables[7].nativeElement.click();
        fixture.detectChanges();
        expect(host.customForm.get('example5').value).toBeFalsy();
        expect(checkboxes[7].checkboxCurrentValue).toEqual(null);
        expect(inputElem[7].nativeElement.getAttribute('aria-checked')).toEqual('mixed');

        // third click to checked state
        checkboxLables[7].nativeElement.click();
        fixture.detectChanges();
        expect(host.customForm.get('example5').value).toBeTruthy();
        expect(checkboxes[7].checkboxCurrentValue).toEqual(true);
        expect(inputElem[7].nativeElement.getAttribute('aria-checked')).toEqual('true');
    });
});

@Component({
    selector: 'fdp-test-checkbox-template',
    template: `
        <fdp-form-group>
            <fdp-form-field [id]="'checkbox-0'">
                <fdp-checkbox
                    [id]="'checkbox-0'"
                    [name]="'checkbox-0'"
                    [label]="'checkbox0'"
                    [contentDensity]="'compact'"
                    [value]="'checkbox0'"
                    [(ngModel)]="example1"
                ></fdp-checkbox>
            </fdp-form-field>

            <fdp-form-field [id]="'checkbox-1'">
                <fdp-checkbox
                    [name]="'checkbox-1'"
                    [label]="'Checkbox1'"
                    [value]="'Checkbox1'"
                    [(ngModel)]="example2"
                ></fdp-checkbox>
            </fdp-form-field>

            <fdp-form-field [id]="'checkbox-2'">
                <fdp-checkbox
                    [name]="'checkbox-2'"
                    [label]="'Checkbox2'"
                    [value]="'Checkbox2'"
                    [(ngModel)]="example2"
                ></fdp-checkbox>
            </fdp-form-field>

            <fdp-form-field [id]="'checkbox-3'">
                <fdp-checkbox
                    [name]="'checkbox-3'"
                    [label]="'Checkbox3'"
                    [value]="'Checkbox3'"
                    [(ngModel)]="example2"
                ></fdp-checkbox>
            </fdp-form-field>

            <fdp-form-field [id]="'checkbox-4'">
                <fdp-checkbox
                    [name]="'checkbox-4'"
                    [label]="'checkbox4'"
                    [tristate]="true"
                    [value]="'Yes'"
                    [(ngModel)]="example3"
                ></fdp-checkbox>
            </fdp-form-field>

            <fdp-form-field [id]="'checkbox-5'">
                <fdp-checkbox
                    [name]="'checkbox-5'"
                    [label]="'checkbox5'"
                    [tristate]="true"
                    [(ngModel)]="example4"
                ></fdp-checkbox>
            </fdp-form-field>
        </fdp-form-group>
    `
})
class TestCheckboxComponentTemplateDriven {
    @ViewChildren(CheckboxComponent)
    fdpCheckboxes: QueryList<CheckboxComponent>;

    example1: string[] = ['checkbox0'];
    example2: string[] = ['Checkbox1', 'Checkbox2'];
    example3 = 'Yes';
    example4 = true;
}

describe('Checkbox test Component with Template driven form', () => {
    let host: TestCheckboxComponentTemplateDriven;
    let fixture: ComponentFixture<TestCheckboxComponentTemplateDriven>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [FdpFormGroupModule, FormModule, CheckboxModule, FormsModule, ReactiveFormsModule],
            declarations: [TestCheckboxComponentTemplateDriven, CheckboxComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestCheckboxComponentTemplateDriven);
        host = fixture.componentInstance;
        fixture.detectChanges();
        fixture.whenStable();
    });

    async function wait(componentFixture: ComponentFixture<any>): Promise<void> {
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }

    it('should create', () => {
        expect(host).toBeTruthy();
    });

    it('should have classes applied', () => {
        const fdpElem = fixture.debugElement.query(By.css('fdp-checkbox'));
        const fdElem = fixture.debugElement.query(By.css('fd-checkbox'));
        const checkboxInput = fixture.debugElement.query(By.css('input'));
        const checkboxLable = fixture.debugElement.query(By.css('.fd-checkbox__label'));

        // fdp-checkbox
        expect(fdpElem.nativeElement.getAttribute('ng-reflect-name')).toEqual('checkbox-0');
        expect(fdpElem.nativeElement.getAttribute('ng-reflect-label')).toEqual('checkbox0');
        expect(fdpElem.nativeElement.getAttribute('ng-reflect-content-density')).toEqual('compact');

        // fd-checkbox.
        expect(fdElem.nativeElement.getAttribute('ng-reflect-name')).toEqual('checkbox-0');
        expect(fdElem.nativeElement.getAttribute('ng-reflect-label')).toEqual('checkbox0');
        expect(fdElem.nativeElement.getAttribute('ng-reflect-compact')).toBeTruthy();

        // Input Element
        expect(checkboxInput.nativeElement.getAttribute('ng-reflect-name')).toEqual('checkbox-0');
        expect(checkboxInput.nativeElement.getAttribute('type')).toEqual('checkbox');
        expect(checkboxLable.nativeElement.classList.contains('fd-checkbox__label--compact')).toBeTruthy();
        expect(checkboxInput.nativeElement.classList.contains('fd-checkbox--compact')).toBeTruthy();
        expect(checkboxLable.nativeElement.classList.contains('fd-checkbox__label')).toBeTruthy();
        expect(checkboxInput.nativeElement.classList.contains('fd-checkbox')).toBeTruthy();
    });

    it('should change checkbox state on click', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const checkboxLable = fixture.debugElement.query(By.css('.fd-checkbox__label'));

        checkboxLable.nativeElement.click();

        fixture.detectChanges();

        expect(host.example1).toEqual([]);
        checkboxLable.nativeElement.click();
        fixture.detectChanges();

        expect(host.example1).toEqual(['checkbox0']);
    });

    it('should select multiple checkboxes in one formcontrol', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const checkboxes = host.fdpCheckboxes.toArray();
        const checkboxLables = fixture.debugElement.queryAll(By.css('.fd-checkbox__label'));

        host.example2.forEach((checkbox: string) => {
            ['Checkbox1', 'Checkbox2'].includes(checkbox);
        });
        expect(checkboxes[1].checkboxCurrentValue).toEqual('Checkbox1');
        expect(checkboxes[2].checkboxCurrentValue).toEqual('Checkbox2');
        expect(checkboxes[3].checkboxCurrentValue).toBeFalsy();

        // click on checkbox3
        checkboxLables[3].nativeElement.click();
        fixture.detectChanges();

        host.example2.forEach((checkbox: string) => {
            ['Checkbox1', 'Checkbox2', 'Checkbox3'].includes(checkbox);
        });
        expect(checkboxes[1].checkboxCurrentValue).toEqual('Checkbox1');
        expect(checkboxes[2].checkboxCurrentValue).toEqual('Checkbox2');
        expect(checkboxes[3].checkboxCurrentValue).toEqual('Checkbox3');

        // click on checkbox1
        checkboxLables[1].nativeElement.click();
        fixture.detectChanges();

        host.example2.forEach((checkbox: string) => {
            ['Checkbox2', 'Checkbox3'].includes(checkbox);
        });
        // remove below comment tag, after issue #2866 is resolved.
        // expect(checkboxes[1].checkboxCurrentValue).toBeFalsy();
        expect(checkboxes[2].checkboxCurrentValue).toEqual('Checkbox2');
        expect(checkboxes[3].checkboxCurrentValue).toEqual('Checkbox3');
    });

    it('should create tristate checkbox with value', async () => {
        await wait(fixture);
        fixture.detectChanges();

        const checkboxes = host.fdpCheckboxes.toArray();

        // default value
        expect(checkboxes[4].checkboxCurrentValue).toEqual('Yes');
        expect(host.example3).toEqual('Yes');

        const checkboxLables = fixture.debugElement.queryAll(By.css('.fd-checkbox__label'));

        checkboxLables[4].nativeElement.click();
        fixture.detectChanges();

        expect(checkboxes[4].checkboxCurrentValue).toBeFalsy();
        expect(host.example3).toBeFalsy();

        checkboxLables[4].nativeElement.click();
        fixture.detectChanges();

        expect(checkboxes[4].checkboxCurrentValue).toEqual(null);
        expect(host.example3).toBeFalsy();

        checkboxLables[4].nativeElement.click();
        fixture.detectChanges();

        expect(checkboxes[4].checkboxCurrentValue).toEqual('Yes');
        expect(host.example3).toEqual('Yes');
    });

    it('should create tristate checkbox without value', async () => {
        await wait(fixture);
        fixture.detectChanges();

        expect(host.example4).toBeTruthy();

        const checkboxes = host.fdpCheckboxes.toArray();
        const checkboxLables = fixture.debugElement.queryAll(By.css('.fd-checkbox__label'));

        // fisrt click to unchecked state
        checkboxLables[5].nativeElement.click();
        fixture.detectChanges();
        expect(host.example4).toBeFalsy();
        expect(checkboxes[5].checkboxCurrentValue).toEqual(false);

        // second click to intermediate state
        checkboxLables[5].nativeElement.click();
        fixture.detectChanges();
        expect(host.example4).toBeFalsy();
        expect(checkboxes[5].checkboxCurrentValue).toEqual(null);

        // third click to checked state
        checkboxLables[5].nativeElement.click();
        fixture.detectChanges();
        expect(host.example4).toBeTruthy();
        expect(checkboxes[5].checkboxCurrentValue).toEqual(true);
    });
});
