import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { Component, DebugElement, ElementRef, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';

import { ContentDensity, RtlService } from '@fundamental-ngx/core/utils';
import { FdpFormGroupModule } from '../../form-group/fdp-form.module';
import { FormFieldComponent } from '../../form-group/form-field/form-field.component';
import { PlatformStepInputModule } from '../step-input.module';
import { NumberStepInputComponent } from './number-step-input.component';
import { runValueAccessorTests } from 'ngx-cva-test-suite';
import { StepInputChangeEvent } from '../base.step-input';

@Component({
    template: `<fdp-number-step-input name="number"></fdp-number-step-input>`
})
class NumberStepInputDefaultValuesHostComponent {
    @ViewChild(NumberStepInputComponent) stepInputCmp: NumberStepInputComponent;
}
describe('NumberStepInputComponent default values', () => {
    let component: NumberStepInputDefaultValuesHostComponent;
    let fixture: ComponentFixture<NumberStepInputDefaultValuesHostComponent>;
    let stepInputComponent: NumberStepInputComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [CommonModule, PlatformStepInputModule],
                declarations: [NumberStepInputDefaultValuesHostComponent],
                providers: [RtlService]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(NumberStepInputDefaultValuesHostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        stepInputComponent = component.stepInputCmp;
    });

    it('should render "0" by default', () => {
        const inputEl: HTMLInputElement = fixture.debugElement.query(By.css('.fd-step-input__input')).nativeElement;
        expect(inputEl.value).toBe('0');
    });

    it('should have default value of incrementLabel as "Increment"', () => {
        expect(stepInputComponent.incrementLabel).toBe('Increment');
    });

    it('should have default value of decrementLabel as "Decrement"', () => {
        expect(stepInputComponent.decrementLabel).toBe('Decrement');
    });

    it('should have default step = 1', () => {
        expect(stepInputComponent.step).toBe(1);
    });

    it('should have default largerStep = 2', () => {
        expect(stepInputComponent.largerStep).toBe(2);
    });

    it('should show increase/decrease buttons', () => {
        const buttons = fixture.debugElement.queryAll(By.css('.fd-step-input__button'));
        expect(buttons.length).toBe(2);
    });
});

@Component({
    template: `
        <fdp-number-step-input
            name="qty"
            [value]="value"
            [min]="min"
            [max]="max"
            [step]="step"
            [largerStep]="largerStep"
            [stepFn]="stepFn"
            [precision]="precision"
            [description]="description"
            [contentDensity]="contentDensity"
            (valueChange)="onValueChanged($event)"
        ></fdp-number-step-input>
    `
})
class NumberStepInputMainFunctionalityHostComponent {
    @ViewChild(NumberStepInputComponent) stepInputCmp: NumberStepInputComponent;

    value = 50;
    min = 0;
    max = 100;
    step = 1;
    largerStep = 2;
    precision = 0;
    description: string;
    contentDensity: ContentDensity = 'cozy';

    stepFn: (value: number, action: 'increase' | 'decrease') => number;

    onValueChanged(event: StepInputChangeEvent): void {
        this.value = event.payload;
    }
}
describe('NumberStepInputComponent main functionality', () => {
    let component: NumberStepInputMainFunctionalityHostComponent;
    let fixture: ComponentFixture<NumberStepInputMainFunctionalityHostComponent>;
    let stepInputComponent: NumberStepInputComponent;

    const getInputDebugElement = (): DebugElement => fixture.debugElement.query(By.css('.fd-step-input__input'));

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [CommonModule, PlatformStepInputModule],
                declarations: [NumberStepInputMainFunctionalityHostComponent],
                providers: [RtlService]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(NumberStepInputMainFunctionalityHostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        stepInputComponent = component.stepInputCmp;
    });

    it('should be created', () => {
        expect(stepInputComponent).toBeTruthy();
    });

    it('should handle "value" input assignment', () => {
        component.value = 10;
        fixture.detectChanges();
        expect(stepInputComponent.value).toEqual(10);

        const inputEl: HTMLInputElement = getInputDebugElement().nativeElement;
        expect(inputEl.value).toBe('10');
    });

    it('should not allow value be less than minimum', () => {
        const nativeElement: HTMLInputElement = getInputDebugElement().nativeElement;

        nativeElement.value = (component.min - 1).toString();
        nativeElement.dispatchEvent(new InputEvent('input'));
        nativeElement.dispatchEvent(new InputEvent('change'));

        fixture.detectChanges();

        expect(stepInputComponent.value).toEqual(component.min);
    });

    it('should not allow value be more than maximum', () => {
        const nativeElement: HTMLInputElement = getInputDebugElement().nativeElement;

        nativeElement.value = (component.max + 1).toString();
        nativeElement.dispatchEvent(new InputEvent('input'));
        nativeElement.dispatchEvent(new InputEvent('change'));

        fixture.detectChanges();

        expect(stepInputComponent.value).toEqual(component.max);
    });

    it('should use stepFn if provided to calculate increase step value', () => {
        component.stepFn = (value: number, action: 'increase' | 'decrease'): number => (action === 'decrease' ? -1 : 1);
        const stepFnSpy = spyOn(component, 'stepFn').and.returnValue(10);
        component.value = 30;
        fixture.detectChanges();

        stepInputComponent.increase();
        fixture.detectChanges();

        expect(stepFnSpy).toHaveBeenCalledWith(30, 'increase');

        expect(stepInputComponent.value).toEqual(40);
    });

    it('should use stepFn if provided to calculate decrease step value', () => {
        component.stepFn = (value: number, action: 'increase' | 'decrease'): number => (action === 'decrease' ? -1 : 1);
        const stepFnSpy = spyOn(component, 'stepFn').and.returnValue(10);
        component.value = 30;
        fixture.detectChanges();

        stepInputComponent.decrease();
        fixture.detectChanges();

        expect(stepFnSpy).toHaveBeenCalledWith(30, 'decrease');

        expect(stepInputComponent.value).toEqual(20);
    });

    it('should apply decimal precision to format number', () => {
        component.value = 25;
        fixture.detectChanges();

        let inputEl: HTMLInputElement = getInputDebugElement().nativeElement;

        expect(inputEl.value).toEqual('25');

        component.precision = 3;
        fixture.detectChanges();
        component.value = 26;
        fixture.detectChanges();

        inputEl = getInputDebugElement().nativeElement;

        expect(inputEl.value).toEqual('26.000');
    });

    it('should show description if provided', () => {
        let descriptionEl = fixture.debugElement.query(By.css('.fd-form-label--unit-description'));

        expect(descriptionEl).toBeNull();

        component.description = 'PC';
        fixture.detectChanges();

        descriptionEl = fixture.debugElement.query(By.css('.fd-form-label--unit-description'));

        expect(descriptionEl).not.toBeNull();
        expect((descriptionEl.nativeElement as HTMLElement).innerText.trim()).toEqual('PC');
    });

    it('should handle "compact" mode', () => {
        const hostEl = fixture.debugElement.query(By.css('.fd-step-input'));
        const input = fixture.debugElement.query(By.css('.fd-step-input__input'));

        component.contentDensity = 'cozy';
        fixture.detectChanges();

        expect(hostEl.nativeElement.className.includes('fd-step-input--compact')).not.toBeTrue();
        expect(input.nativeElement.className.includes('fd-input--compact')).not.toBeTrue();

        component.contentDensity = 'compact';
        fixture.detectChanges();

        expect(hostEl.nativeElement.className.includes('fd-step-input--compact')).toBeTrue();
        expect(input.nativeElement.className.includes('fd-input--compact')).toBeTrue();
    });

    it('should decrement by 1 clicking "decrease" button', () => {
        const value = 10;
        component.value = value;
        fixture.detectChanges();

        const decreaseBtn: HTMLButtonElement = fixture.debugElement.queryAll(By.css('.fd-step-input__button'))[0]
            .nativeElement;

        decreaseBtn.dispatchEvent(new MouseEvent('mousedown'));
        fixture.detectChanges();
        decreaseBtn.dispatchEvent(new MouseEvent('mouseup'));
        fixture.detectChanges();

        expect(component.value).toEqual(value - 1);
    });

    it('should increment by 1 clicking "increase" button', () => {
        const value = 10;
        component.value = value;
        fixture.detectChanges();

        const increaseBtn: HTMLButtonElement = fixture.debugElement.queryAll(By.css('.fd-step-input__button'))[1]
            .nativeElement;

        increaseBtn.dispatchEvent(new MouseEvent('mousedown'));
        fixture.detectChanges();
        increaseBtn.dispatchEvent(new MouseEvent('mouseup'));
        fixture.detectChanges();

        expect(component.value).toEqual(value + 1);
    });

    it('should increment by step if press "ArrowUp" key', () => {
        const value = 10;
        const step = 2;

        component.value = value;
        component.step = step;
        fixture.detectChanges();

        const inputEl: HTMLInputElement = getInputDebugElement().nativeElement;
        inputEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
        fixture.detectChanges();

        expect(component.value).toEqual(value + step);
    });

    it('should decrement by step if press "ArrowDown" key', () => {
        const value = 10;
        const step = 2;

        component.value = value;
        component.step = step;
        fixture.detectChanges();

        const inputEl: HTMLInputElement = getInputDebugElement().nativeElement;
        inputEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        fixture.detectChanges();

        expect(component.value).toEqual(value - step);
    });

    it('should increment by largeStep if press "PageUp" key', () => {
        const value = 10;
        const step = 2;
        const largeStep = 4;

        component.value = value;
        component.step = step;
        component.largerStep = largeStep;
        fixture.detectChanges();

        const inputEl: HTMLInputElement = getInputDebugElement().nativeElement;
        inputEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageUp' }));
        fixture.detectChanges();

        expect(component.value).toEqual(value + step * largeStep);
    });

    it('should decrement by largeStep if press "PageDown" key', () => {
        const value = 10;
        const step = 2;
        const largeStep = 4;

        component.value = value;
        component.step = step;
        component.largerStep = largeStep;
        fixture.detectChanges();

        const inputEl: HTMLInputElement = getInputDebugElement().nativeElement;
        inputEl.dispatchEvent(new KeyboardEvent('keydown', { key: 'PageDown' }));
        fixture.detectChanges();

        expect(component.value).toEqual(value - step * largeStep);
    });

    it('should not handle mouse wheel if control not focused', () => {
        const value = 10;
        const step = 2;

        component.value = value;
        component.step = step;
        fixture.detectChanges();

        const inputEl: HTMLInputElement = getInputDebugElement().nativeElement;

        inputEl.dispatchEvent(new WheelEvent('wheel', { deltaY: -15 }));
        fixture.detectChanges();

        expect(component.value).toEqual(value);
    });

    it('should handle mouse wheel once control in focus state', () => {
        const value = 10;
        const step = 2;

        component.value = value;
        component.step = step;
        fixture.detectChanges();

        const inputEl: HTMLInputElement = getInputDebugElement().nativeElement;

        const wheelEventUp = new WheelEvent('wheel', { deltaY: -15 });
        const wheelEventDown = new WheelEvent('wheel', { deltaY: 15 });

        inputEl.dispatchEvent(new Event('focus'));
        fixture.detectChanges();

        inputEl.dispatchEvent(wheelEventUp);
        fixture.detectChanges();

        expect(component.value).toEqual(value + step);

        inputEl.dispatchEvent(wheelEventDown);
        fixture.detectChanges();

        expect(component.value).toEqual(value);
    });

    it('should catch changes on "input" event and apply them on "change" event', () => {
        const value = 10;
        const step = 2;

        component.value = value;
        component.step = step;
        fixture.detectChanges();

        const inputEl: HTMLInputElement = getInputDebugElement().nativeElement;

        inputEl.focus();
        inputEl.value = '25';
        inputEl.dispatchEvent(new InputEvent('input'));
        inputEl.dispatchEvent(new InputEvent('change'));
        fixture.detectChanges();

        expect(component.value).toEqual(25);
    });
});

/** Usage with form */
@Component({
    template: `
        <form [formGroup]="form" (ngSubmit)="onSubmit()">
            <fdp-form-group #fg1 [formGroup]="form" [object]="initialFormModel">
                <fdp-form-field
                    #ff
                    id="qty"
                    label="Basic Number Step-Input with Platform Forms"
                    placeholder="Start entering qty"
                    hint="This is tooltip help"
                    zone="zLeft"
                    rank="10"
                    hintPlacement="left"
                    [validators]="stepInputValidators"
                >
                    <fdp-number-step-input name="qty" [formControl]="ff.formControl"></fdp-number-step-input>
                </fdp-form-field>
                <ng-template #i18n let-errors>
                    <span *ngIf="errors && errors.required" class="error">This field is required.</span>
                </ng-template>
            </fdp-form-group>
            <button type="submit" #submitButton>Submit</button>
        </form>
    `
})
class NumberStepInputFormTestWrapperComponent {
    @ViewChild(NumberStepInputComponent)
    stepInputComponent: NumberStepInputComponent;
    @ViewChild('ff') stepInputFormField: FormFieldComponent;

    @ViewChild('submitButton') submitButton: ElementRef<HTMLElement>;

    form: FormGroup = new FormGroup({});

    initialFormModel = { qty: 100 };

    stepInputValidators: ValidatorFn[] = [Validators.required];

    public result: any = null;

    onSubmit(): void {
        this.result = this.form.value;
    }
}

describe('Basic number Step Input withing platforms form', () => {
    let fixture: ComponentFixture<NumberStepInputFormTestWrapperComponent>;
    let host: NumberStepInputFormTestWrapperComponent;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [ReactiveFormsModule, FdpFormGroupModule, PlatformStepInputModule],
                declarations: [NumberStepInputFormTestWrapperComponent],
                providers: [RtlService]
            }).compileComponents();
        })
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(NumberStepInputFormTestWrapperComponent);
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

    it('should have a label, hint, placeholder and default value', async () => {
        await wait(fixture);

        const controlLabel = host.stepInputFormField.label;
        expect(controlLabel).toBe('Basic Number Step-Input with Platform Forms');

        const controlPlaceholder = host.stepInputFormField.placeholder;
        expect(controlPlaceholder).toBe('Start entering qty');

        const controlHint = host.stepInputFormField.hint;
        expect(controlHint).toBe('This is tooltip help');

        const controlDefaultValue = host.form.get('qty')?.value;
        expect(controlDefaultValue).toBe(host.initialFormModel.qty);
    });

    it('should propagate control value to a form instance', async () => {
        const stepInputComponent = host.stepInputComponent;
        stepInputComponent.value = 25;
        await wait(fixture);
        expect(host.form.get('qty')?.value).toBe(25);

        stepInputComponent.value = 50;
        await wait(fixture);

        expect(host.form.get('qty')?.value).toBe(50);
    });

    it('should be in an error state if value is empty and touched', async () => {
        const stepInputComponent = host.stepInputComponent;
        const formControl = host.form.get('qty') as FormControl;
        const stepInputEl = fixture.debugElement.query(By.css('.fd-step-input'));

        expect(formControl.value).toBe(100);
        expect(stepInputEl.nativeElement.className.includes('is-error')).not.toBeTrue();

        formControl.markAsTouched();
        await wait(fixture);
        stepInputComponent.value = null;
        await wait(fixture);

        expect(formControl.value).toBe(null);
        expect(stepInputEl.nativeElement.className.includes('is-error')).toBeTrue();
    });

    it('should be in an error state if entered number cannot be parsed', async () => {
        const stepInputComponent = host.stepInputComponent;
        const formControl = host.form.get('qty') as FormControl;
        const stepInputEl = fixture.debugElement.query(By.css('.fd-step-input'));

        expect(formControl.value).toBe(100);

        formControl.markAsTouched();
        await wait(fixture);

        expect(stepInputEl.nativeElement.className.includes('is-error')).not.toBeTrue();

        stepInputComponent.onEnterValue('not a valid number');
        stepInputComponent.commitEnteredValue();
        await wait(fixture);

        expect(formControl.value).toBe(null);
        expect(stepInputEl.nativeElement.className.includes('is-error')).toBeTrue();
    });

    it('should submit the value', async () => {
        const submitButton = host.submitButton.nativeElement;
        submitButton.click();

        await wait(fixture);

        expect(host.result).toEqual({ qty: 100 });
    });
});

const STEP_INPUT_IDENTIFIER = 'platform-step-input-unit-test';

runValueAccessorTests({
    component: NumberStepInputComponent,
    testModuleMetadata: {
        imports: [PlatformStepInputModule]
    },
    additionalSetup: (fixture, done) => {
        fixture.componentInstance.id = STEP_INPUT_IDENTIFIER;
        fixture.componentInstance.name = STEP_INPUT_IDENTIFIER;
        done();
    },
    supportsOnBlur: true,
    nativeControlSelector: `input[id="${STEP_INPUT_IDENTIFIER}"]`,
    internalValueChangeSetter: (fixture, value) => {
        fixture.componentInstance.value = value;
    },
    getComponentValue: (fixture) => fixture.componentInstance.value
});
