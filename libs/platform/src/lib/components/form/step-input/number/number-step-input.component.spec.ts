import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule, formatNumber } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

import { PlatformStepInputModule, ContentDensity } from '@fundamental-ngx/platform';

import { NumberStepInputComponent, PlatformNumberStepInputChange } from './number-step-input.component';

@Component({
    template: `<fdp-number-step-input name="number" [placeholder]="'test'"></fdp-number-step-input>`
})
class NumberStepInputDefaultValuesHostComponent {
    @ViewChild(NumberStepInputComponent) stepInputCmp: NumberStepInputComponent;
}
describe('NumberStepInputComponent default values', () => {
    let component: NumberStepInputDefaultValuesHostComponent;
    let fixture: ComponentFixture<NumberStepInputDefaultValuesHostComponent>;
    let stepInputComponent: NumberStepInputComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, PlatformStepInputModule],
            declarations: [NumberStepInputDefaultValuesHostComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NumberStepInputDefaultValuesHostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        stepInputComponent = component.stepInputCmp;
    });

    it('Should render "0" by default', () => {
        const inputEl: HTMLInputElement = fixture.debugElement.query(By.css('.fd-step-input__input')).nativeElement;
        expect(inputEl.value).toBe('0');
    });

    it('Should have default value of incrementLabel as "Increment"', () => {
        expect(stepInputComponent.incrementLabel).toBe('Increment');
    });

    it('Should have default value of decrementLabel as "Decrement"', () => {
        expect(stepInputComponent.decrementLabel).toBe('Decrement');
    });

    it('Should have default step = 1', () => {
        expect(stepInputComponent.step).toBe(1);
    });

    it('Should show increase/decrease buttons', () => {
        const buttons = fixture.debugElement.queryAll(By.css('.fd-step-input__button'));
        expect(buttons.length).toBe(2);
    });
});

@Component({
    template: ` <fdp-number-step-input
        [value]="value"
        [min]="min"
        [max]="max"
        [step]="step"
        [stepFn]="stepFn"
        [precision]="precision"
        (valueChange)="onValueChanged($event)"
        name="qty"
        id="qty"
    ></fdp-number-step-input>`
})
class NumberStepInputMainFunctionalityHostComponent {
    @ViewChild(NumberStepInputComponent) stepInputCmp: NumberStepInputComponent;

    value = 50;
    min = 0;
    max = 100;
    step = 1;
    precision = 0;

    stepFn: (value: number, action: 'increase' | 'decrease') => number;

    onValueChanged(event: PlatformNumberStepInputChange) {
        this.value = event.payload;
    }
}
describe('NumberStepInputComponent main functionality', () => {
    let component: NumberStepInputMainFunctionalityHostComponent;
    let fixture: ComponentFixture<NumberStepInputMainFunctionalityHostComponent>;
    let stepInputComponent: NumberStepInputComponent;

    const getInputDebugElement = () => {
        return fixture.debugElement.query(By.css('.fd-step-input__input'));
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, PlatformStepInputModule],
            declarations: [NumberStepInputMainFunctionalityHostComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NumberStepInputMainFunctionalityHostComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        stepInputComponent = component.stepInputCmp;
    });

    async function wait() {
        fixture.detectChanges();
        await fixture.whenStable();
    }

    it('Should be created', () => {
        expect(stepInputComponent).toBeTruthy();
    });

    it('Should handle "value" input assignment', () => {
        component.value = 10;
        fixture.detectChanges();
        expect(stepInputComponent.value).toEqual(10);

        const inputEl: HTMLInputElement = getInputDebugElement().nativeElement;
        expect(inputEl.value).toBe('10');
    });

    it('Should not allow value be less than minimum', () => {
        const nativeElement: HTMLInputElement = getInputDebugElement().nativeElement;
        const commitEnteredValueSpy = spyOn(stepInputComponent, 'commitEnteredValue').and.callThrough();
        const enteredValue = (component.min - 1).toString();
        nativeElement.value = enteredValue;
        nativeElement.dispatchEvent(new InputEvent('change'));

        fixture.detectChanges();

        expect(commitEnteredValueSpy).toHaveBeenCalledWith(enteredValue);

        expect(stepInputComponent.value).toEqual(component.min);
    });

    it('Should not allow value be more than maximum', () => {
        const nativeElement: HTMLInputElement = getInputDebugElement().nativeElement;
        const commitEnteredValueSpy = spyOn(stepInputComponent, 'commitEnteredValue').and.callThrough();
        const enteredValue = (component.max + 1).toString();
        nativeElement.value = enteredValue;
        nativeElement.dispatchEvent(new InputEvent('change'));

        fixture.detectChanges();

        expect(commitEnteredValueSpy).toHaveBeenCalledWith(enteredValue);

        expect(stepInputComponent.value).toEqual(component.max);
    });

    it('Should use stepFn if provided to calculate increase step value', () => {
        component.stepFn = (value: number, action: 'increase' | 'decrease'): number => {
            return action === 'decrease' ? -1 : 1;
        };
        const stepFnSpy = spyOn(component, 'stepFn').and.returnValue(10);
        component.value = 30;
        fixture.detectChanges();

        stepInputComponent.increase();
        fixture.detectChanges();

        expect(stepFnSpy).toHaveBeenCalledWith(30, 'increase');

        expect(stepInputComponent.value).toEqual(40);
    });

    it('Should use stepFn if provided to calculate decrease step value', () => {
        component.stepFn = (value: number, action: 'increase' | 'decrease'): number => {
            return action === 'decrease' ? -1 : 1;
        };
        const stepFnSpy = spyOn(component, 'stepFn').and.returnValue(10);
        component.value = 30;
        fixture.detectChanges();

        stepInputComponent.decrease();
        fixture.detectChanges();

        expect(stepFnSpy).toHaveBeenCalledWith(30, 'decrease');

        expect(stepInputComponent.value).toEqual(20);
    });

    it('Should apply decimal precision to format number', () => {
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
});
