import {
    Input,
    Output,
    EventEmitter,
    Renderer2,
    Directive,
    OnInit,
    ChangeDetectorRef,
    ElementRef
} from '@angular/core';
import { NgForm, NgControl, ControlContainer } from '@angular/forms';
import { BehaviorSubject, of } from 'rxjs';
import { takeUntil, switchMap, map } from 'rxjs/operators';

import { ContentDensity, RtlService } from '@fundamental-ngx/core/utils';
import { Nullable } from '@fundamental-ngx/core/shared';
import { BaseInput, PlatformFormFieldControl, PlatformFormField } from '@fundamental-ngx/platform/shared';
import { StepInputConfig } from './step-input.config';
import { addAndCutFloatingNumberDistortion, getNumberDecimalLength } from './step-input.util';

/** Change event object emitted by Platform Step Input component */
export class StepInputChangeEvent<T extends StepInputComponent = StepInputComponent, K = number> {
    /**
     * Step input selection change event
     * @param source Step input component
     * @param payload Selected value
     */
    constructor(
        /** The source Step Input of the event. */
        public source: T,
        /** The new value of a control. */
        public payload: K
    ) {}
}

export enum StepInputAlign {
    Left = 'left',
    Center = 'center',
    Right = 'right'
}

export type StepInputStepFunctionAction = 'increase' | 'decrease';
export type StepInputStepFunction = (value: number, action: StepInputStepFunctionAction) => number;

const ALIGN_INPUT_OPTIONS_LIST = [StepInputAlign.Left, StepInputAlign.Center, StepInputAlign.Right];

/**
 * StepInputComponent is a base abstract class that should be used
 * to create type specific StepInput components such as number, money, unitOfMeasure
 * This holds base Step Input functionality that can be abstracted
 */
@Directive()
export abstract class StepInputComponent extends BaseInput implements OnInit {
    /** Sets input value */
    @Input()
    set value(value: Nullable<number>) {
        if (value !== this._value) {
            super.setValue(value);
            this._calculateCanDecrementIncrement();
        }
    }
    get value(): Nullable<number> {
        return super.getValue();
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
    set stepFn(stepFn: StepInputStepFunction) {
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
    set align(align: StepInputAlign) {
        this._align$.next(align);
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

    /** Emits new value when control value has changed */
    @Output()
    valueChange = new EventEmitter<StepInputChangeEvent>();

    /** @hidden */
    lastEmittedValue: number;

    /** @hidden */
    canIncrement = true;

    /** @hidden */
    canDecrement = true;

    /** @hidden
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
    _align: StepInputAlign | null;

    /** @hidden */
    private _max: number = Number.MAX_VALUE;

    /** @hidden */
    private _min: number = -Number.MAX_VALUE;

    /** @hidden */
    private _step = 1;

    /** @hidden */
    private _stepFn: StepInputStepFunction;

    /** @hidden */
    private _precision: number;

    /** @hidden */
    private _align$ = new BehaviorSubject<StepInputAlign | null>(null);

    /** @hidden */
    private _pendingEnteredValue: number | Error | null = null;

    /** @hidden */
    private get _currentValue(): number | null {
        const pendingValue = this._pendingEnteredValue;

        if (pendingValue instanceof Error) {
            return null;
        }

        if (pendingValue === null) {
            return this._value;
        }

        return pendingValue;
    }

    /** @hidden */
    protected constructor(
        cd: ChangeDetectorRef,
        elementRef: ElementRef,
        ngControl: NgControl,
        controlContainer: ControlContainer,
        ngForm: NgForm,
        formField: PlatformFormField,
        formControl: PlatformFormFieldControl,
        protected config: StepInputConfig,
        private _renderer: Renderer2,
        private _rtlService: RtlService
    ) {
        super(cd, elementRef, ngControl, controlContainer, ngForm, formField, formControl);
    }

    /** @hidden */
    ngOnInit(): void {
        super.ngOnInit();

        this._calculateCanDecrementIncrement();

        this._updateViewValue();

        this.lastEmittedValue = this._value;

        this._listenToFormErrorState();

        this._listenToAlign();
    }

    /** @hidden
     * Override writeValue method to keep input view value up to date
     */
    writeValue(value: number): void {
        super.writeValue(value);
        this._updateViewValue();
        this._resetPendingEnteredValue();
    }

    /** Increase value */
    increase(step = this._getStepValueForIncrease()): void {
        if (!this.canIncrement) {
            return;
        }
        const value = addAndCutFloatingNumberDistortion(this._currentValue, step);
        this.value = this._validateValueByLimits(value);
        this._emitChangedValue();
    }

    /** Decrease value */
    decrease(step = this._getStepValueForDecrease()): void {
        if (!this.canDecrement) {
            return;
        }
        const value = addAndCutFloatingNumberDistortion(this._currentValue, -step);
        this.value = this._validateValueByLimits(value);
        this._emitChangedValue();
    }

    /** Increase value by large step */
    largeStepIncrease(): void {
        const step = this._getStepValueForIncrease() * this.largerStep;
        this.increase(step);
    }

    /** Decrease value by large step */
    largeStepDecrease(): void {
        const step = this._getStepValueForDecrease() * this.largerStep;
        this.decrease(step);
    }

    /** @hidden
     * catch value during entering from view.
     */
    onEnterValue(value: string): void {
        const parsedValue = this.parseValueInFocusMode(value);
        let pendingValue = parsedValue;

        if (pendingValue !== null) {
            pendingValue = this._validateValueByLimits(pendingValue);
        }

        // could not parse value, value is invalid
        if (pendingValue === null) {
            this._setPendingEnteredValue(new Error('value is invalid'));
        } else {
            this._setPendingEnteredValue(pendingValue);
        }
    }

    /** @hidden
     * Commit entered value from view.
     */
    commitEnteredValue(): void {
        const newValue = this._currentValue;

        const needToUpdateView = this._value === newValue;

        this.value = newValue;

        if (needToUpdateView) {
            this._updateViewValue();
        }

        if (this._value !== this.lastEmittedValue) {
            this._emitChangedValue();
        }
    }

    /** @hidden
     * Indicates when input gets focused
     */
    onFocus(): void {
        super._onFocusChanged(true);
        // When focus happens by "Tab" key an input field value gets selected by default.
        // In cases when new_formatted_value !== previous_value the selection gets lost.
        // So it's needed to track selection before new value rendering and restore it.
        const { selectionStart, selectionEnd } = this._getValueSelection();
        this._updateViewValue();
        if (selectionEnd - selectionStart > 0) {
            this._setValueSelection(selectionStart, selectionEnd);
        }
    }

    /** @hidden
     * Indicates when input loses focus
     */
    onBlur(): void {
        super._onFocusChanged(false);
        this._updateViewValue();
    }

    /** Create valueChange event */
    abstract createChangeEvent(value: number): StepInputChangeEvent;

    /** Format value for view presentation */
    abstract formatValue(value: number | null): string;

    /** Format value for "in focus" mode */
    abstract formatValueInFocusMode(value: number): string;

    /** Parse value entered "in focus" mode */
    abstract parseValueInFocusMode(value: string): number | null;

    /** @hidden */
    private _listenToFormErrorState(): void {
        this.stateChanges
            .asObservable()
            .pipe(takeUntil(this._destroyed))
            .subscribe(() => {
                const oldValue = this.isErrorState;
                this.isErrorState = this.state === 'error';
                if (this.isErrorState !== oldValue) {
                    this._cd.markForCheck();
                }
            });
    }

    /** @hidden */
    private _listenToAlign(): void {
        this._align$
            .asObservable()
            .pipe(
                switchMap((align) => {
                    if (!this._rtlService) {
                        return of(align);
                    }

                    return this._rtlService.rtl.pipe(
                        map((isRtl): StepInputAlign | null => {
                            if (!ALIGN_INPUT_OPTIONS_LIST.includes(align!)) {
                                return null;
                            }
                            if (isRtl && align === StepInputAlign.Left) {
                                return StepInputAlign.Right;
                            }
                            if (isRtl && align === StepInputAlign.Right) {
                                return StepInputAlign.Left;
                            }
                            return align;
                        })
                    );
                }),
                takeUntil(this._destroyed)
            )
            .subscribe((align) => {
                this._align = align;
                this._cd.markForCheck();
            });
    }

    /** @hidden */
    private _emitChangedValue(): void {
        const value = this._value;
        this.lastEmittedValue = value;
        this.valueChange.emit(this.createChangeEvent(value));
    }

    /** @hidden */
    private _getStepValueForIncrease(): number {
        return this._getStepValue('increase');
    }

    /** @hidden */
    private _getStepValueForDecrease(): number {
        return this._getStepValue('decrease');
    }

    /** @hidden
     * Get step value based either on "stepFn" or "step"
     */
    private _getStepValue(action: StepInputStepFunctionAction): number {
        // steFn has precedence
        if (typeof this._stepFn === 'function') {
            const calculatedStep = this._stepFn(this._currentValue ?? this.min, action);
            return calculatedStep;
        }
        return this.step;
    }

    /** @hidden */
    private _updateViewValue(): void {
        const formatted = this._formatValue();
        this._renderValue(formatted);
    }

    /** @hidden */
    private _formatValue(value = this._value): string {
        if (this.focused) {
            return this.formatValueInFocusMode(value);
        }
        return this.formatValue(value);
    }

    /** @hidden */
    private _renderValue(value: string): void {
        const inputEl = this._getInputNativeElement();
        this._renderer.setProperty(inputEl, 'value', value);
    }

    /** @hidden */
    private _getInputNativeElement(): HTMLInputElement | null {
        return this._elementRef.nativeElement as HTMLInputElement | null;
    }

    /** @hidden */
    private _getValueSelection(): { selectionStart: number; selectionEnd: number } {
        const inputEl = this._getInputNativeElement();
        const selectionStart = inputEl?.selectionStart || 0;
        const selectionEnd = inputEl?.selectionEnd || 0;
        return { selectionStart, selectionEnd };
    }

    /** @hidden */
    private _setValueSelection(selectionStart: number, selectionEnd: number): void {
        const inputEl = this._getInputNativeElement();
        if (!inputEl) {
            return;
        }
        inputEl.setSelectionRange(selectionStart, selectionEnd);
    }

    /** @hidden */
    private _calculateCanIncrement(): void {
        const step = this._getStepValueForIncrease();
        this.canIncrement = (this._value || 0) + step <= this._max;
    }

    /** @hidden */
    private _calculateCanDecrement(): void {
        const step = this._getStepValueForDecrease();
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

    /** @hidden */
    private _setPendingEnteredValue(value: number | Error): void {
        this._pendingEnteredValue = value;
    }

    /** @hidden */
    private _resetPendingEnteredValue(): void {
        this._pendingEnteredValue = null;
    }
}
