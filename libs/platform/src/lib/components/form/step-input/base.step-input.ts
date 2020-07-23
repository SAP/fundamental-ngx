import { ChangeDetectorRef, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';

import { BaseInput } from '../base.input';
import { StepInputConfig } from './step-input.config';
import { ContentDensity } from '../form-control';

/** Change event object emitted by Platform Step Input component */
export class PlatformStepInputChange<T extends StepInputComponent = StepInputComponent, K = number> {
    /** The source Step Input of the event. */
    source: T;
    /** The new value of a control. */
    payload: K;
}

/**
 * StepInputComponent is a base abstract class that should be used
 * to create type specific StepInput components such as number, money, unitOfMeasure
 * This holds main Step Input functionality that can be abstracted
 */

export abstract class StepInputComponent extends BaseInput {
    /** content Density of element. cozy | compact */
    @Input()
    set contentDensity(contentDensity: ContentDensity) {
        this._contentDensity = contentDensity;
        this.isCompact = this._contentDensity === 'compact';
    }

    /** Sets input value */
    @Input()
    get value(): number {
        return super.getValue();
    }

    set value(value: number) {
        super.setValue(value);
        this._updateViewValue();
        this._calculateCanDecrementIncrement();
        this.lastEmittedValue = this._value;
    }

    /** Sets minimum value boundary */
    @Input()
    set min(min: number) {
        this._min = !isNaN(min) ? min : Number.MIN_VALUE;
        this._calculateCanDecrement();
    }

    /** Sets maximum value boundary */
    @Input()
    set max(max: number) {
        this._max = !isNaN(max) ? max : Number.MAX_VALUE;
        this._calculateCanIncrement();
    }

    /** Sets input step value */
    @Input()
    set step(step: number) {
        this._step = step;
        this._calculateCanDecrementIncrement();
    }

    /** Custom function to calculate step dynamically */
    @Input()
    set stepFn(stepFn: (value: number, action: 'increase' | 'decrease') => number) {
        this._stepFn = stepFn;
        this._calculateCanDecrementIncrement();
    }

    /** Sets largeStep multiplier */
    @Input()
    largerStep = 2;

    /** Hides -/+ icons and shows labels */
    @Input()
    showLabels = false;

    /** Horizontally aligns value inside input */
    @Input()
    align: 'left' | 'center' | 'right';

    /** Number of digits after the decimal point */
    @Input()
    precision = 0;

    /**
     * ARIA label for increment button
     */
    @Input()
    incrementLabel = this.config.incrementLabel;

    /**
     * ARIA label for decrement button
     */
    @Input()
    decrementLabel = this.config.decrementLabel;

    /**
     * ARIA label for input element
     */
    @Input()
    ariaLabel = 'Step input';

    /**
     * ARIA labelledby for input element
     */
    @Input()
    ariaLabelledby: string;

    /** Emits new value when control value has changed */
    @Output()
    valueChange: EventEmitter<PlatformStepInputChange> = new EventEmitter<PlatformStepInputChange>();

    /** @hidden */
    lastEmittedValue: number;

    /** @hidden */
    canIncrement = true;

    /** @hidden */
    canDecrement = true;

    /** @hidden */
    _contentDensity = this.config.contentDensity;

    /** @hidden */
    isCompact = this._contentDensity === 'compact';

    /** @hidden */
    private _max = Number.MAX_VALUE;

    /** @hidden */
    private _min = Number.MIN_VALUE;

    /** @hidden */
    private _step = 1;

    /** @hidden */
    private _stepFn: (value: number, action: 'increase' | 'decrease') => number;

    constructor(
        protected _cd: ChangeDetectorRef,
        public ngControl: NgControl,
        public ngForm: NgForm,
        protected config: StepInputConfig,
        private _renderer: Renderer2
    ) {
        super(_cd, ngControl, ngForm);
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
    }

    ngOnInit() {
        super.ngOnInit();
        this._calculateCanDecrementIncrement();
        this._updateViewValue();
    }

    /** Increase value method */
    increase(step = this._getStepValue('increase')) {
        const value = this.value + step;
        this.value = Math.min(value, this._max);
        this._emitChangedValue();
        this._updateViewValue();
    }

    /** Decrease value method */
    decrease(step = this._getStepValue('decrease')) {
        const value = this.value - step;
        this.value = Math.max(value, this._min);
        this._emitChangedValue();
        this._updateViewValue();
    }

    /** Increase value by large step */
    largeStepIncrease() {
        const step = this._getStepValue('increase') * this.largerStep;
        this.increase(step);
    }

    /** Decrease value by large step */
    largeStepDecrease() {
        const step = this._getStepValue('decrease') * this.largerStep;
        this.decrease(step);
    }

    /** @hidden
     * Updates viewValue and conditionally emits new value.
     * This method is called on (change) event, when user leaves input control.
     */
    commitEnteredValue(): void {
        if (this.value !== this.lastEmittedValue) {
            this._emitChangedValue();
        }
        this._updateViewValue();
        this._calculateCanDecrementIncrement();
    }

    /** @hidden Track value when user changes value of input control. */
    onInput(value: string): void {
        const parsedValue = this.parseValue(value);
        if (parsedValue === null) {
            this._value = this.lastEmittedValue;
        } else {
            this._value = Math.min(Math.max(parsedValue, this._min), this._max);
        }
    }

    /** @hidden */
    detectChanges() {
        this._cd.detectChanges();
    }

    /** Create valueChange event */
    abstract createChangeEvent(value: number): PlatformStepInputChange;

    /** Format value to view presentation */
    abstract formatValue(value: number): string;

    /** Format value to view presentation */
    abstract parseValue(value: string): number;

    /** @hidden */
    private _emitChangedValue(): void {
        this.lastEmittedValue = this.value;
        this.valueChange.emit(this.createChangeEvent(this.value));
        this.onChange(this.value);
    }

    /** @hidden
     * get step value base either on "stepFn" or "step"
     */
    private _getStepValue(action: 'increase' | 'decrease'): number {
        if (typeof this._stepFn === 'function') {
            return this._stepFn(this.value, action);
        }
        return this._step;
    }

    /** @hidden */
    private _updateViewValue(): void {
        const formatted = this.formatValue(this.value);
        this._renderer.setProperty(this._elementRef.nativeElement, 'value', formatted);
    }

    /** @hidden */
    _calculateCanIncrement() {
        const step = this._getStepValue('increase');
        this.canIncrement = this.value + step <= this._max;
    }

    /** @hidden */
    _calculateCanDecrement() {
        const step = this._getStepValue('decrease');
        this.canDecrement = this.value - step >= this._min;
    }

    /** @hidden */
    _calculateCanDecrementIncrement() {
        this._calculateCanDecrement();
        this._calculateCanIncrement();
    }
}
