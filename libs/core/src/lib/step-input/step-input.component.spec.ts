import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { whenStable } from '../utils/tests/when-stable';
import { StepInputComponent } from './step-input.component';
import { StepInputModule } from './step-input.module';

const initialValue = 100;

@Component({
    template: `
        <fd-step-input [(value)]="value"
                       [locale]="locale"
                       [step]="step"
                       [compact]="compact"
                       [state]="state"
                       [inputTitle]="inputTitle"
                       [unit]="unit"
                       [inputId]="inputId"
                       [ariaLabel]="ariaLabel"
                       [incrementButtonIcon]="incrementButtonIcon"
                       [decrementButtonIcon]="decrementButtonIcon"
                       [incrementButtonTitle]="incrementButtonTitle"
                       [decrementButtonTitle]="decrementButtonTitle">
        </fd-step-input>
    `
})
class TestWrapperComponent {
    @ViewChild(StepInputComponent, {static: true})
    stepInputComponent: StepInputComponent;

    @ViewChild(StepInputComponent, {read: ElementRef, static: true})
    stepInputElement: ElementRef;

    step = 1;

    value: number = initialValue;

    compact = false;

    unit: string = null;

    state: string = null;

    inputId: string = null;

    ariaLabel: string = null;

    locale = 'en-US';

    inputTitle: string = null;

    incrementButtonIcon: string = null;

    decrementButtonIcon: string = null;

    incrementButtonTitle: string = null;

    decrementButtonTitle: string = null;
}

describe('StepInputComponent', () => {
    let element: ElementRef;
    let component: StepInputComponent;
    let testComponent: TestWrapperComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [TestWrapperComponent],
            imports: [StepInputModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.componentInstance.stepInputComponent;
        element = fixture.componentInstance.stepInputElement;
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should increment on button click', async () => {
        const valueChangeSpy = spyOn(component.valueChange, 'emit').and.callThrough();
        const desiredValue = initialValue + component.step;

        expect(component.value).toEqual(initialValue);

        component.increment();
        await whenStable(fixture);

        expect(component.value).toEqual(desiredValue);
        expect(valueChangeSpy).toHaveBeenCalledWith(desiredValue);
    });

    it('should decrement on button click', async () => {
        const valueChangeSpy = spyOn(component.valueChange, 'emit').and.callThrough();
        const desiredValue = initialValue - component.step;

        expect(component.value).toEqual(initialValue);

        component.decrement();
        await whenStable(fixture);

        expect(component.value).toEqual(desiredValue);
        expect(valueChangeSpy).toHaveBeenCalledWith(desiredValue);
    });

    it('should increment/decrement with custom step', async () => {
        const valueChangeSpy = spyOn(component.valueChange, 'emit').and.callThrough();

        expect(component.value).toEqual(initialValue);

        component.decrement();
        await whenStable(fixture);

        expect(component.value).toEqual(initialValue - component.step);
        expect(valueChangeSpy).toHaveBeenCalledWith(initialValue - component.step);

        component.increment();
        await whenStable(fixture);

        expect(component.value).toEqual(initialValue);
        expect(valueChangeSpy).toHaveBeenCalledWith(initialValue);
    });

    it('should emit (onFocusIn) and (onFocusOut) events', () => {
        const onTouchedSpy = spyOn(component, 'onTouched');
        const focusInEventSpy = spyOn(component.onFocusIn, 'emit');
        const focusOutEventSpy = spyOn(component.onFocusOut, 'emit');

        component.handleFocusIn();

        expect(component.focused).toBeTrue();
        expect(onTouchedSpy).toHaveBeenCalled();
        expect(focusInEventSpy).toHaveBeenCalled();

        component.handleFocusOut();

        expect(component.focused).toBeFalse();
        expect(focusOutEventSpy).toHaveBeenCalled();
    });

    it('should display in compact mode', async () => {
        testComponent.compact = true;

        await whenStable(fixture);

        expect(element.nativeElement.querySelector('.fd-step-input--compact')).toBeTruthy();
        expect(element.nativeElement.querySelectorAll('.fd-button--compact').length).toEqual(2);
    });

    it('should display in selected semantic state', async () => {
        testComponent.state = 'warning';

        await whenStable(fixture);

        expect(fixture.nativeElement.querySelector('.is-warning')).toBeTruthy();
    });

    it('should add HTML title attributes', async () => {
        const inputTitle = 'Input title';
        const incrementButtonTitle = 'Inc Button Title';
        const decrementButtonTitle = 'Dec Button Title';

        testComponent.inputTitle = inputTitle;
        testComponent.incrementButtonTitle = incrementButtonTitle;
        testComponent.decrementButtonTitle = decrementButtonTitle;

        await whenStable(fixture);

        expect(element.nativeElement.querySelector(`[title="${inputTitle}"]`)).toBeTruthy();
        expect(element.nativeElement.querySelector(`[title="${incrementButtonTitle}"]`)).toBeTruthy();
        expect(element.nativeElement.querySelector(`[title="${decrementButtonTitle}"]`)).toBeTruthy();
    });

    it('should use custom button icons', async () => {
        const incrementButtonIcon = 'arrow-up';
        const decrementButtonIcon = 'arrow-bottom';

        testComponent.incrementButtonIcon = incrementButtonIcon;
        testComponent.decrementButtonIcon = decrementButtonIcon;

        await whenStable(fixture);

        expect(element.nativeElement.querySelector(`.sap-icon--${incrementButtonIcon}`)).toBeTruthy();
        expect(element.nativeElement.querySelector(`.sap-icon--${decrementButtonIcon}`)).toBeTruthy();
    });

    it('should display unit', async () => {
        const unit = 'kg';

        testComponent.unit = unit;

        await whenStable(fixture);

        expect(element.nativeElement.querySelector('.fd-form-label').textContent).toContain(unit);
    });

    it('should set id attribute', async () => {
        const id = 'custom-id';

        testComponent.inputId = id;

        await whenStable(fixture);

        expect(element.nativeElement.querySelector(`#${id}`)).toBeTruthy();
    });

    it('should set aria-label attribute', async () => {
        const ariaLabel = 'Number of elements';

        testComponent.ariaLabel = ariaLabel;

        await whenStable(fixture);

        expect(element.nativeElement.querySelector(`[aria-label="${ariaLabel}"]`)).toBeTruthy();
    });

    it('should properly parse formatted value', () => {
        const formattedValue = '123,456.789';

        expect(component['_parseValue'](formattedValue)).toEqual(123456.789);

        const disruptedFormattedValue = 'ABC123,DEF456.789';

        expect(component['_parseValue'](disruptedFormattedValue)).toEqual(initialValue);

        const emptyFormattedValue = '';

        expect(component['_parseValue'](emptyFormattedValue)).toEqual(null);
    });

    it('should format values according to min max value limits', () => {
        const context = {_max: 10, _min: -10, minFractionDigits: 2 };

        expect(component['_checkValueLimits'].call(context, 12)).toEqual(10);
        expect(component['_checkValueLimits'].call(context, -12)).toEqual(-10);
        expect(component['_checkValueLimits'].call(context, 1.121)).toEqual(1.12);
        expect(component['_checkValueLimits'].call(context, 1.129)).toEqual(1.13);
    });

    it('should add floating point number with proper precision', () => {
        expect(component['_cutFloatingNumberDistortion'](0.1, 0.2)).toEqual(0.3);
        expect(component['_cutFloatingNumberDistortion'](0.1, 0.111)).toEqual(0.211);
        expect(component['_cutFloatingNumberDistortion'](0.1, -0.11)).toEqual(-0.01);
    });

    it('should change value based on mouse wheel events when input is focused', () => {
        const context = { _canChangeValue: true, focused: true, increment: () => {}, decrement: () => {} };
        const wheelEventUp = new WheelEvent('', { deltaY: -15 });
        const wheelEventDown = new WheelEvent('', { deltaY: 15 });

        const incrementSpy = spyOn(context, 'increment');
        const decrementSpy = spyOn(context, 'decrement');

        component.handleScroll.call(context, wheelEventUp);
        expect(incrementSpy).toHaveBeenCalled();

        component.handleScroll.call(context, wheelEventDown);
        expect(decrementSpy).toHaveBeenCalled();
    });

    it('should not change value based on mouse wheel events when input is not focused', () => {
        const context = { _canChangeValue: true, focused: false, increment: () => {}, decrement: () => {} };
        const wheelEventUp = new WheelEvent('', { deltaY: -15 });
        const wheelEventDown = new WheelEvent('', { deltaY: 15 });

        const incrementSpy = spyOn(context, 'increment');
        const decrementSpy = spyOn(context, 'decrement');

        component.handleScroll.call(context, wheelEventUp);
        expect(incrementSpy).not.toHaveBeenCalled();

        component.handleScroll.call(context, wheelEventDown);
        expect(decrementSpy).not.toHaveBeenCalled();
    });

    it('should write only null or valid numeric values [ControlValueAccessor]', () => {
        component.writeValue('12ab34' as any as number);
        expect(component.value).toEqual(initialValue);

        component.writeValue(1234);
        expect(component.value).toEqual(1234);

        component.writeValue(null);
        expect(component.value).toEqual(null);
    });

    it('should set disabled state [ControlValueAccessor]', () => {
        const context = { disabled: false };

        component.setDisabledState.call(context, true);
        expect(context.disabled).toEqual(true);

        component.setDisabledState.call(context, false);
        expect(context.disabled).toEqual(false);
    });

    it('should set disabled state [ControlValueAccessor]', () => {
        const context = { disabled: false };

        component.setDisabledState.call(context, true);
        expect(context.disabled).toEqual(true);

        component.setDisabledState.call(context, false);
        expect(context.disabled).toEqual(false);
    });

    it('should handle ArrowUp and ArrowDown keys', () => {
        const context = { _canChangeValue: false, increment: () => {}, decrement: () => {} };

        const keyUpEvent = new KeyboardEvent('keydown', { key: 'ArrowUp' });
        const keyDownEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });

        const incrementSpy = spyOn(context, 'increment');
        const decrementSpy = spyOn(context, 'decrement');

        component.handleKeyDown.call(context, keyUpEvent);
        expect(incrementSpy).not.toHaveBeenCalled();

        component.handleKeyDown.call(context, keyDownEvent);
        expect(decrementSpy).not.toHaveBeenCalled();

        context._canChangeValue = true;

        component.handleKeyDown.call(context, keyUpEvent);
        expect(incrementSpy).toHaveBeenCalled();

        component.handleKeyDown.call(context, keyDownEvent);
        expect(decrementSpy).toHaveBeenCalled();
    });
});
