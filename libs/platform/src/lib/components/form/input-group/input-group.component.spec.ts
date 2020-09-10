import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

import { ContentDensity, Status } from '../form-control';
import { FormFieldComponent } from '../form-group/form-field/form-field.component';
import { FdpFormGroupModule } from '../form-group/fdp-form.module';

import { PlatformInputGroupModule } from './input-group.module';
import { InputGroupComponent } from './input-group.component';

@Component({
    template: `
        <fdp-input-group name="example" [contentDensity]="contentDensity" [disabled]="disabled">
            <fdp-input-group-addon>$</fdp-input-group-addon>
            <fdp-input-group-input></fdp-input-group-input>
            <fdp-input-group-addon>0.00</fdp-input-group-addon>
            <fdp-input-group-addon>
                <fdp-button>Button</fdp-button>
            </fdp-input-group-addon>
        </fdp-input-group>
    `
})
class InputGroupHostComponent {
    @ViewChild(InputGroupComponent) inputGroupComponent: InputGroupComponent;

    contentDensity: ContentDensity = 'cozy';
    disabled = false;
}
describe('InputGroup component', () => {
    let host: InputGroupHostComponent;
    let fixture: ComponentFixture<InputGroupHostComponent>;
    let inputGroupComponent: InputGroupComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, PlatformInputGroupModule],
            declarations: [InputGroupHostComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InputGroupHostComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
        inputGroupComponent = host.inputGroupComponent;
    });

    it('Should render input group', () => {
        expect(inputGroupComponent).toBeTruthy();
    });

    it('Should render children in the order that they are placed', () => {
        const hostElement = fixture.debugElement.nativeElement as HTMLElement;
        const addons = hostElement.querySelectorAll('fdp-input-group-addon-body');
        const input = hostElement.querySelector('fdp-input');

        expect(addons.length === 3).toBeTrue();

        expect(addons[0].textContent.includes('$')).toBeTruthy();
        expect(addons[1].textContent.includes('0.00')).toBeTruthy();
        expect(addons[2].textContent.includes('Button')).toBeTruthy();
        // input lies among first and second addon
        expect(addons[0].nextElementSibling).toBe(input);
        expect(input.nextElementSibling).toBe(addons[1]);
    });

    it('Should add class to child input', () => {
        const inputElements = fixture.debugElement.queryAll(By.css('input:not([type="button"])'));
        expect(inputElements[0].classes['fd-input-group__input']).toBeTrue();
    });

    it('Should add class when disabled', () => {
        expect(host.disabled).toBeFalsy();
        expect(fixture.debugElement.query(By.css('.is-disabled'))).toBeFalsy();

        host.disabled = true;
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.is-disabled'))).toBeTruthy();
    });
});

/** Usage with form */
@Component({
    template: `
        <fdp-form-group #fg [multiLayout]="true" [formGroup]="form" [object]="initialFormModel">
            <fdp-form-field
                #ff
                id="qty"
                placeholder="Placeholder"
                hint="This is tooltip help"
                zone="zLeft"
                rank="1"
                hintPlacement="left"
                [required]="true"
            >
                <fdp-input-group name="qty" [formControl]="ff.formControl">
                    <fdp-input-group-addon>$</fdp-input-group-addon>
                    <fdp-input-group-input></fdp-input-group-input>
                    <fdp-input-group-addon>0.00</fdp-input-group-addon>
                    <fdp-input-group-addon>
                        <fdp-button>Button</fdp-button>
                    </fdp-input-group-addon>
                </fdp-input-group>
            </fdp-form-field>
            <ng-template #i18n let-errors>
                <span *ngIf="errors?.required" class="error">This field is required.</span>
            </ng-template>
        </fdp-form-group>
    `
})
class InputGroupFormTestWrapperComponent {
    @ViewChild(InputGroupComponent)
    inputGroupComponent: InputGroupComponent;

    @ViewChild('ff')
    formField: FormFieldComponent;

    form: FormGroup = new FormGroup({});

    initialFormModel = { qty: 100 };
}
describe('Input group withing platform form', () => {
    let fixture: ComponentFixture<InputGroupFormTestWrapperComponent>;
    let host: InputGroupFormTestWrapperComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FdpFormGroupModule, PlatformInputGroupModule],
            declarations: [InputGroupFormTestWrapperComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InputGroupFormTestWrapperComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
    });

    async function wait(componentFixture: ComponentFixture<any>): Promise<void> {
        componentFixture.detectChanges();
        await componentFixture.whenStable();
    }

    it('should be created', () => {
        expect(host).toBeTruthy();
    });

    it('should inherit placeholder from form field', async () => {
        await wait(fixture);
        expect(host.inputGroupComponent.placeholder).toBe(host.formField.placeholder);
    });

    it('should have initial value from formGroup', async () => {
        await wait(fixture);
        expect(host.inputGroupComponent.value).toBe(host.initialFormModel.qty);
    });

    it('should propagate new control value to a form instance', async () => {
        const inputGroupComponent = host.inputGroupComponent;
        inputGroupComponent.value = 25;
        await wait(fixture);
        expect(host.form.get('qty').value).toBe(25);

        inputGroupComponent.value = 50;
        await wait(fixture);

        expect(host.form.get('qty').value).toBe(50);
    });

    it('should be in an error state if control is empty and touched', async () => {
        const inputGroupComponent = host.inputGroupComponent;
        const formControl = host.form.get('qty');
        const inputGroupElement = fixture.debugElement.query(By.css('.fd-input-group'));

        expect(inputGroupElement.classes['is-error']).not.toBeTrue();

        formControl.markAsTouched();
        await wait(fixture);
        inputGroupComponent.value = null;
        await wait(fixture);

        expect(formControl.value).toBe(null);
        expect(inputGroupElement.classes['is-error']).toBeTrue();
    });

    it('should mark form field as touched when gets focused', async () => {
        const formControl = host.form.get('qty');
        const inputEl = fixture.debugElement.query(By.css('fdp-input input'));

        expect(formControl.touched).not.toBeTrue();

        inputEl.nativeElement.focus();

        expect(formControl.touched).toBeTrue();
    });
});
