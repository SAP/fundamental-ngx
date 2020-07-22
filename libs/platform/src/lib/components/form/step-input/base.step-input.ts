import { ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';

import { BaseInput } from '../base.input';
import { PlatformStepInputConfig } from './step-input.config';

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
    /** Sets input value */
    @Input()
    get value(): number {
        return super.getValue();
    }

    set value(value: number) {
        super.setValue(value);
        this._updateViewValue();
        this.lastEmittedValue = this._value;
    }

    /** Sets minimum value boundary */
    @Input()
    min: number;

    /** Sets maximum value boundary */
    @Input()
    max: number;

    /** Sets input step value */
    @Input()
    step: number = 1;

    /** Custom function to calculate step dynamically */
    @Input()
    stepFn: (value: number, action: 'increase' | 'decrease') => number;

    /** Sets largeStep multiplier */
    @Input()
    largerStep: number = 2;

    /** Hides -/+ icons and shows labels */
    @Input()
    showLabels: boolean = false;

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
    incrementLabel: string;

    /**
     * ARIA label for decrement button
     */
    @Input()
    decrementLabel: string;

    /**
     * ARIA label for input element
     */
    @Input()
    ariaLabel: string;

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
    get compact() {
        return this.contentDensity === 'compact';
    }

    /** @hidden */
    get canIncrement(): boolean {
        return this.value + this.step <= this._max;
    }

    /** @hidden */
    get canDecrement(): boolean {
        return this.value - this.step >= this._min;
    }

    /** @hidden */
    private get _max(): number {
        return !isNaN(this.max) ? this.max : Number.MAX_VALUE;
    }

    /** @hidden */
    private get _min(): number {
        return !isNaN(this.min) ? this.min : -Number.MAX_VALUE;
    }

    constructor(
        protected _cd: ChangeDetectorRef,
        public ngControl: NgControl,
        public ngForm: NgForm,
        protected config: PlatformStepInputConfig
    ) {
        super(_cd, ngControl, ngForm);
        // Initiate default options
        this.decrementLabel = this.config.decrementLabel;
        this.incrementLabel = this.config.incrementLabel;
        this.contentDensity = this.config.contentDensity;
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
    }

    ngOnInit() {
        super.ngOnInit();
        this._updateViewValue();
    }

    /** Increase value method */
    increase(step = this._getStepValue('increase')) {
        const value = this.value + step;
        this._value = Math.min(value, this._max);
        this._emitChangedValue();
        this._updateViewValue();
    }

    /** Decrease value method */
    decrease(step = this._getStepValue('decrease')) {
        const value = this.value - step;
        this._value = Math.max(value, this._min);
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

    /** @hidden Updates viewValue and conditionally emits new value.
     * This method is called on (change) event, when user leaves input control. */
    commitEnteredValue(): void {
        if (this.value !== this.lastEmittedValue) {
            this._emitChangedValue();
        }
        this._updateViewValue();
    }

    /** @hidden Track value when user changes value of input control. */
    onInput(value: string): void {
        const parsedValue = this.parseValue(value);
        if (parsedValue === null) {
            this._value = this.lastEmittedValue;
        } else {
            this._value = Math.max(parsedValue, this._min);
            this._value = Math.min(parsedValue, this._max);
        }
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

    /**@hidden get step value base either on "stepFn" or "step" */
    private _getStepValue(action: 'increase' | 'decrease'): number {
        if (typeof this.stepFn === 'function') {
            return this.stepFn(this.value, action);
        }
        return this.step;
    }

    /** @hidden */
    private _updateViewValue(): void {
        this._elementRef.nativeElement.value = this.formatValue(this.value);
    }
}
