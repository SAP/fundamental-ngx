import { ChangeDetectorRef, Input, Output, EventEmitter, Renderer2 } from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';

import { BaseInput } from '../base.input';
import { StepInputConfig } from './step-input.config';
import { ContentDensity } from '../form-control';
import { takeUntil } from 'rxjs/operators';

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
 * This holds base Step Input functionality that can be abstracted
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
        if (value !== this._value) {
            super.setValue(value);
            this._calculateCanDecrementIncrement();
        }
    }

    /** Sets minimum value boundary */
    @Input()
    set min(min: number) {
        this._min = !isNaN(min) ? min : -Number.MAX_VALUE;
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
        this._checkAndThrowErrorIfStepDoesntMatchPrecision(this._precision, step);
        this._step = step;
        this._calculateCanDecrementIncrement();
    }

    /** Custom function to calculate step dynamically */
    @Input()
    set stepFn(stepFn: (value: number, action: 'increase' | 'decrease') => number) {
        this._stepFn = stepFn;
        this._calculateCanDecrementIncrement();
    }

    /** Number of digits after the decimal point */
    @Input()
    set precision(precision: number) {
        this._checkAndThrowErrorIfStepDoesntMatchPrecision(precision, this._step);
        this._precision = precision;
    }
    get precision(): number {
        return this._precision;
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

    /** Indicates if control has an error */
    isErrorState = false;

    /** @hidden */
    _contentDensity = this.config.contentDensity;

    /** @hidden */
    isCompact = this._contentDensity === 'compact';

    /** @hidden */
    _precision = 0;

    /** @hidden */
    private _max = Number.MAX_VALUE;

    /** @hidden */
    private _min = -Number.MAX_VALUE;

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

    ngOnInit() {
        super.ngOnInit();

        // Validate initial value
        this._value = this._validateValueByLimits(this._value);

        this._calculateCanDecrementIncrement();

        this._updateViewValue();

        this.lastEmittedValue = this._value;

        this.stateChanges
            .asObservable()
            .pipe(takeUntil(this._destroyed))
            .subscribe(() => {
                this.isErrorState = this.status === 'error';
            });
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
    }

    /** @hidden
     * Override writeValue method to keep input view value up to date
     */
    writeValue(value: any) {
        super.writeValue(value);
        this._updateViewValue();
    }

    /** Increase value */
    increase(step = this._getStepValue('increase')) {
        if (!this.canIncrement) {
            return;
        }
        const value = this._value + step;
        this.value = this._validateValueByLimits(value);
        this._emitChangedValue();
    }

    /** Decrease value */
    decrease(step = this._getStepValue('decrease')) {
        if (!this.canDecrement) {
            return;
        }
        const value = this._value - step;
        this.value = this._validateValueByLimits(value);
        this._emitChangedValue();
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

    /**
     * @hidden
     * Commit new entered value from view.
     */
    commitEnteredValue(value: string): void {
        const parsedValue = this.parseValue(value);
        let newValue = parsedValue;

        if (newValue !== null) {
            newValue = this._validateValueByLimits(newValue);
        }

        const needToUpdateView = this._value === newValue;

        this.value = newValue;

        if (needToUpdateView) {
            this._updateViewValue();
        }

        if (this._value !== this.lastEmittedValue) {
            this._emitChangedValue();
        }
    }

    /** @hidden */
    detectChanges() {
        this._cd.detectChanges();
    }

    /** Create valueChange event */
    abstract createChangeEvent(value: number): PlatformStepInputChange;

    /**
     * Format value to view presentation
     */
    abstract formatValue(value: number): string;

    /**
     * Parse value from view.
     */
    abstract parseValue(value: string): number | null;

    /** @hidden */
    private _emitChangedValue(): void {
        const value = this._value;
        this.lastEmittedValue = value;
        this.valueChange.emit(this.createChangeEvent(value));
        this.onChange(value);
    }

    /** @hidden
     * Get step value based either on "stepFn" or "step"
     */
    private _getStepValue(action: 'increase' | 'decrease'): number {
        if (typeof this._stepFn === 'function') {
            return this._stepFn(this._value, action);
        }
        return this._step;
    }

    /** @hidden */
    private _updateViewValue(): void {
        if (this._value === null) {
            return;
        }
        const formatted = this.formatValue(this._value);
        this._renderer.setProperty(this._elementRef.nativeElement, 'value', formatted);
    }

    /** @hidden */
    private _calculateCanIncrement() {
        const step = this._getStepValue('increase');
        this.canIncrement = this._value + step <= this._max;
    }

    /** @hidden */
    private _calculateCanDecrement() {
        const step = this._getStepValue('decrease');
        this.canDecrement = this._value - step >= this._min;
    }

    /** @hidden */
    private _calculateCanDecrementIncrement() {
        this._calculateCanDecrement();
        this._calculateCanIncrement();
    }

    /** @hidden */
    private _validateValueByLimits(value: number): number {
        return Math.min(Math.max(value, this._min), this._max);
    }

    /** @hidden */
    private _getNumberDecimalLength(value: number): number {
        return ((value || 0).toString().split('.')[0] || '').length;
    }

    /** @hidden */
    private _checkAndThrowErrorIfStepDoesntMatchPrecision(precision: number, step: number) {
        // Check if "precision" is valid comparing to "step"
        const stepDecimalLength = this._getNumberDecimalLength(step);
        const precisionDecimalLength = this._getNumberDecimalLength(precision);
        if (stepDecimalLength > precisionDecimalLength) {
            throw Error(
                `Step input: The value of step property can not contain more digits after the decimal point than what is set to the precision property`
            );
        }
    }
}
