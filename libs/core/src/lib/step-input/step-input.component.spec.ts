import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { whenStable } from '../utils/tests/when-stable';
import { StepInputComponent } from './step-input.component';
import { StepInputModule } from './step-input.module';
import { SelectComponent } from '@fundamental-ngx/core';

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

    step: number = 1;

    value: number = initialValue;

    compact: boolean = false;

    unit: string = null;

    state: string = null;

    inputId: string = null;

    ariaLabel: string = null;

    locale: string = 'en-US';

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

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestWrapperComponent],
            imports: [StepInputModule]
        }).overrideComponent(SelectComponent, {
            set: {changeDetection: ChangeDetectionStrategy.Default}
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

    it('should emit (onFocus) and (onBlur) event', async () => {
        const blurEventSpy = spyOn(component.onBlur, 'emit');
        const focusEventSpy = spyOn(component.onFocus, 'emit');

        component.inputElement.nativeElement.focus();

        await whenStable(fixture);

        expect(focusEventSpy).toHaveBeenCalled();

        component.inputElement.nativeElement.blur();

        await whenStable(fixture);

        expect(blurEventSpy).toHaveBeenCalled();
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

        expect(component['_parseValue'](disruptedFormattedValue)).toEqual(null);

        const emptyFormattedValue = '';

        expect(component['_parseValue'](emptyFormattedValue)).toEqual(0);
    });

    it('should format values according to min max value limits', () => {
        const context = {_max: 10, _min: -10, minFractionDigits: 2 };

        expect(component['_checkValueLimits'].call(context, 12)).toEqual(10);
        expect(component['_checkValueLimits'].call(context, -12)).toEqual(-10);
        expect(component['_checkValueLimits'].call(context, 1.121)).toEqual(1.12);
        expect(component['_checkValueLimits'].call(context, 1.129)).toEqual(1.13);
    });

});
