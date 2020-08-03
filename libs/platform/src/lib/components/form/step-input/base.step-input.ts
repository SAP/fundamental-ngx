import { ChangeDetectorRef, Input, Output, EventEmitter, Renderer2, Directive, OnInit } from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { takeUntil, switchMap, map } from 'rxjs/operators';

import { RtlService } from '@fundamental-ngx/core';

import { BaseInput } from '../base.input';
import { ContentDensity } from '../form-control';
import { StepInputConfig } from './step-input.config';
import { addAndCutFloatingNumberDistortion, getNumberDecimalLength } from './step-input.util';

/** Change event object emitted by Platform Step Input component */
export class StepInputChangeEvent<T extends StepInputComponent = StepInputComponent, K = number> {
    constructor(
        /** The source Step Input of the event. */
        public source: T,
        /** The new value of a control. */
        public payload: K
    ) {}
}

type AlignInputType = 'left' | 'center' | 'right';

/**
 * StepInputComponent is a base abstract class that should be used
 * to create type specific StepInput components such as number, money, unitOfMeasure
 * This holds base Step Input functionality that can be abstracted
 */
@Directive()
export abstract class StepInputComponent extends BaseInput implements OnInit {
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
    get min(): number {
        return this._min;
    }

    /** Sets maximum value boundary */
    @Input()
    set max(max: number) {
        this._max = !isNaN(max) ? max : Number.MAX_VALUE;
        this._calculateCanIncrement();
    }
    get max(): number {
        return this._max;
    }

    /** Sets input step value */
    @Input()
    set step(step: number) {
        this._checkAndThrowErrorIfStepDoesntMatchPrecision(this.precision, step);
        this._step = step;
        this._calculateCanDecrementIncrement();
    }
    get step(): number {
        return this._step;
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
        this._checkAndThrowErrorIfStepDoesntMatchPrecision(precision, this.step);
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
    set align(align: AlignInputType) {
        this._alignInput$.next(align);
    }

    /**
     * ARIA label for increment button
     */
    @Input()
    incrementLabel: string = this.config.incrementLabel;

    /**
     * ARIA label for decrement button
     */
    @Input()
    decrementLabel: string = this.config.decrementLabel;

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
    valueChange: EventEmitter<StepInputChangeEvent> = new EventEmitter<StepInputChangeEvent>();

    /** @hidden */
    lastEmittedValue: number;

    /** @hidden */
    canIncrement = true;

    /** @hidden */
    canDecrement = true;

    /**@hidden
     * Indicates if control has an error
     */
    isErrorState = false;

    /** @hidden */
    get canChangeValue(): boolean {
        return !(this.disabled || !this.editable);
    }

    /** @hidden */
    _contentDensity: ContentDensity = this.config.contentDensity;

    /** @hidden */
    isCompact: boolean = this._contentDensity === 'compact';

    /** @hidden */
    _align: AlignInputType;

    /** @hidden */
    private _max: number = Number.MAX_VALUE;

    /** @hidden */
    private _min: number = -Number.MAX_VALUE;

    /** @hidden */
    private _step = 1;

    /** @hidden */
    private _stepFn: (value: number, action: 'increase' | 'decrease') => number;

    /** @hidden */
    private _precision: number;

    /** @hidden */
    private _alignInput$: BehaviorSubject<AlignInputType> = new BehaviorSubject<AlignInputType>(null);

    /** @hidden */
    constructor(
        protected _cd: ChangeDetectorRef,
        public ngControl: NgControl,
        public ngForm: NgForm,
        protected config: StepInputConfig,
        private _renderer: Renderer2,
        private _rtlService: RtlService
    ) {
        super(_cd, ngControl, ngForm);
    }

    /** @hidden */
    ngOnInit(): void {
        super.ngOnInit();

        this._calculateCanDecrementIncrement();

        this._updateViewValue();

        this.lastEmittedValue = this._value;

        this.stateChanges
            .asObservable()
            .pipe(takeUntil(this._destroyed))
            .subscribe(() => {
                this.isErrorState = this.status === 'error';
            });

        this._alignInput$
            .asObservable()
            .pipe(
                switchMap((align) =>
                    this._rtlService.rtl.pipe(
                        map(
                            (isRtl): AlignInputType => {
                                if (!(['left', 'center', 'right'] as Array<AlignInputType>).includes(align)) {
                                    return null;
                                }
                                if (isRtl && align === 'left') {
                                    return 'right';
                                }
                                if (isRtl && align === 'right') {
                                    return 'left';
                                }
                                return align;
                            }
                        )
                    )
                ),
                takeUntil(this._destroyed)
            )
            .subscribe((align) => {
                this._align = align;
                this.detectChanges();
            });
    }

    /**@hidden
     * Override writeValue method to keep input view value up to date
     */
    writeValue(value: number): void {
        super.writeValue(value);
        this._updateViewValue();
    }

    /** Increase value */
    increase(step = this._getStepValue('increase')): void {
        if (!this.canIncrement) {
            return;
        }
        const value = addAndCutFloatingNumberDistortion(this._value, step);
        this.value = this._validateValueByLimits(value);
        this._emitChangedValue();
    }

    /** Decrease value */
    decrease(step = this._getStepValue('decrease')): void {
        if (!this.canDecrement) {
            return;
        }
        const value = addAndCutFloatingNumberDistortion(this._value, -step);
        this.value = this._validateValueByLimits(value);
        this._emitChangedValue();
    }

    /** Increase value by large step */
    largeStepIncrease(): void {
        const step = this._getStepValue('increase') * this.largerStep;
        this.increase(step);
    }

    /** Decrease value by large step */
    largeStepDecrease(): void {
        const step = this._getStepValue('decrease') * this.largerStep;
        this.decrease(step);
    }

    /**@hidden
     * Commit new entered value from view.
     */
    commitEnteredValue(value: string): void {
        const parsedValue = this.parseValueInFocusMode(value);
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

    /**@hidden
     * Indicates when input gets focused
     */
    onFocus(): void {
        super._onFocusChanged(true);
        this._updateViewValue(true);
    }

    /**@hidden
     * Indicates when input loses focus
     */
    onBlur(): void {
        super._onFocusChanged(false);
        this._updateViewValue();
    }

    /** @hidden */
    detectChanges(): void {
        this._cd.detectChanges();
    }

    /** Create valueChange event */
    abstract createChangeEvent(value: number): StepInputChangeEvent;

    /** Format value for view presentation */
    abstract formatValue(value: number): string;

    /** Format value for "in focus" mode */
    abstract formatValueInFocusMode(value: number): string;

    /** Parse value entered "in focus" mode */
    abstract parseValueInFocusMode(value: string): number | null;

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
        // steFn has precedence
        if (typeof this._stepFn === 'function') {
            const calculatedStep = this._stepFn(this._value, action);
            return calculatedStep;
        }
        return this.step;
    }

    /** @hidden */
    private _updateViewValue(keepSelection = false): void {
        if (this._value === null) {
            return;
        }
        let formatted = '';
        if (this.focused) {
            formatted = this.formatValueInFocusMode(this._value);
        } else {
            formatted = this.formatValue(this._value);
        }
        this._renderValue(formatted, keepSelection);
    }

    /** @hidden */
    private _renderValue(value: string, keepSelection = false): void {
        const inputEl = this._elementRef.nativeElement as HTMLInputElement | null;
        const startSelectionPos = inputEl?.selectionStart;
        const endSelectionPos = inputEl?.selectionEnd;

        this._renderer.setProperty(this._elementRef.nativeElement, 'value', value);

        if (keepSelection && endSelectionPos - startSelectionPos > 0) {
            inputEl.setSelectionRange(startSelectionPos, endSelectionPos);
        }
    }

    /** @hidden */
    private _calculateCanIncrement(): void {
        const step = this._getStepValue('increase');
        this.canIncrement = (this._value || 0) + step <= this._max;
    }

    /** @hidden */
    private _calculateCanDecrement(): void {
        const step = this._getStepValue('decrease');
        this.canDecrement = (this._value || 0) - step >= this._min;
    }

    /** @hidden */
    private _calculateCanDecrementIncrement(): void {
        this._calculateCanDecrement();
        this._calculateCanIncrement();
    }

    /** @hidden */
    private _validateValueByLimits(value: number): number {
        return Math.min(Math.max(value, this._min), this._max);
    }

    /** @hidden */
    private _checkAndThrowErrorIfStepDoesntMatchPrecision(precision: number, step: number): void {
        // Check if "precision" is valid comparing to "step"
        const stepDecimalLength = getNumberDecimalLength(step);
        const precisionDecimalLength = getNumberDecimalLength(precision);
        if (stepDecimalLength > precisionDecimalLength) {
            throw Error(
                `Step input: The value of step property can not contain more digits after the decimal point than what is set to the precision property`
            );
        }
    }
}
