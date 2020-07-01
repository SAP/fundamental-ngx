import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Inject,
    Input,
    isDevMode,
    LOCALE_ID,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormStates } from '../form/form-control/form-states';
import { KeyUtil } from '../..';
import { defer, fromEvent, interval, merge, Observable, Subscription, timer } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import NumberFormat = Intl.NumberFormat;

let stepInputUniqueId: number = 0;

@Component({
    selector: 'fd-step-input',
    templateUrl: './step-input.component.html',
    styleUrls: ['./step-input.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => StepInputComponent),
            multi: true
        }
    ]
})
export class StepInputComponent implements OnInit, AfterViewInit, ControlValueAccessor {

    /** Sets compact mode */
    @Input()
    compact: boolean;

    /** Sets locale used to format numeric value */
    @Input()
    locale: string;

    /** Specifies algorithm used to match locale. Check Intl.NumberFormat documentation for more information */
    @Input()
    localeMatcher: string;

    /** Sets icon displayed in Increment Button */
    @Input()
    incrementButtonIcon: string = 'add';

    /** Sets icon displayed in Decrement Button */
    @Input()
    decrementButtonIcon: string = 'less';

    /** Sets Increment Button title attribute */
    @Input()
    incrementButtonTitle: string = null;

    /** Sets Decrement Button title attribute */
    @Input()
    decrementButtonTitle: string = null;

    /** Sets input aria-label attribute */
    @Input()
    ariaLabel: string = null;

    /** Sets input id */
    @Input()
    inputId: string = `fd-step-input-${stepInputUniqueId++}`;

    /** Sets control value */
    @Input()
    value: number = 0;

    /** Sets minimum value boundary */
    @Input()
    min: number;

    /** Sets maximum value boundary */
    @Input()
    max: number;

    /** Sets input step value */
    @Input()
    step: number = 1;

    /** Sets input name attribute */
    @Input()
    name: boolean = null;

    /** Sets input title attribute */
    @Input()
    inputTitle: string = '';

    /** Sets formatting mode */
    @Input()
    mode: 'decimal' | 'currency' = 'decimal';

    /** Sets state of the control. Can be `success`, `error`, `warning`, `information` or blank for default.*/
    @Input()
    state: FormStates;

    /** Custom unit displayed as a label next to the input */
    @Input()
    unit: string;

    /** Whether to use grouping when formatting value */
    @Input()
    useGrouping: boolean = true;

    /** Defines minimal number of fraction digits for control value */
    @Input()
    minFractionDigits: number;

    /** Defines maximal number of fraction digits for control value */
    @Input()
    maxFractionDigits: number;

    /** Currency used to format value. Check Intl.NumberFormat documentation for more information*/
    @Input()
    currency: string;

    /** Currency used to format value. Check Intl.NumberFormat documentation for more information */
    @Input()
    currencyDisplay: string;

    /** Emits event on input input blur */
    @Output()
    onBlur: EventEmitter<void> = new EventEmitter<void>();

    /** Emits event on input input focus */
    @Output()
    onFocus: EventEmitter<void> = new EventEmitter<void>();

    /** Emits new value when control value has changed */
    @Output()
    valueChange: EventEmitter<number> = new EventEmitter<number>();

    /** @hidden */
    @ViewChild('incrementBtn', {read: ElementRef})
    incrementButton: ElementRef;

    /** @hidden */
    @ViewChild('decrementBtn', {read: ElementRef})
    decrementButton: ElementRef;

    /** @hidden */
    @ViewChild('inputElement', {read: ElementRef, static: true})
    inputElement: ElementRef;

    /** @hidden */
    lastEmittedValue: number;

    /** @hidden */
    currencySign: string;

    /** @hidden */
    viewValue: string;

    /** @hidden */
    private _numerals: RegExp;

    /** @hidden */
    private _decimalSeparator: RegExp;

    /** @hidden */
    private _currency: RegExp;

    /** @hidden */
    private _minusSign: RegExp;

    /** @hidden */
    private _groupSeparator: RegExp;

    /** @hidden */
    private _numberFormat: NumberFormat;

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    private _index: any;

    /** @hidden */
    onChange: Function = () => {};

    /** @hidden */
    onTouched: Function = () => {};

    constructor(@Inject(LOCALE_ID) locale, private _changeDetectorRef: ChangeDetectorRef) {
        this.locale = locale;
    }

    /** @hidden */
    ngOnInit(): void {
        this._numberFormat = this._getNumberFormat();
        this._buildRegExps();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._updateViewValue();
        this._listenOnButtonsClick();
    }

    /** @hidden */
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    /** @hidden */
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    /** @hidden */
    writeValue(value: number): void {
        value = Number(value);
        if (!isNaN(value)) {
            this.value = this._checkValueLimits(value);
            this._updateViewValue();
        }
    }

    /** Increment input value by step value */
    increment(): void {
        if (this.value + this.step <= this._max) {
            this.value += this.step;
            this._emitChangedValue();
            this._updateViewValue();
        }
    }

    /** Decrement input value by step value */
    decrement(): void {
        if (this.value - this.step >= this._min) {
            this.value -= this.step;
            this._emitChangedValue();
            this._updateViewValue();
        }
    }

    /** @hidden */
    onKeyDown(event: KeyboardEvent): void {
        const muteEvent = (evnt: Event) => {
            evnt.stopPropagation();
            evnt.preventDefault();
        };

        if (KeyUtil.isKey(event, 'ArrowUp')) {
            this.increment();
            muteEvent(event);
        } else if (KeyUtil.isKey(event, 'ArrowDown')) {
            this.decrement();
            muteEvent(event);
        }
    }

    /** @hidden */
    onFocusIn(): void {
        this.onFocus.emit();
        this.onTouched();
    }

    /** @hidden */
    onInputValueChange(event: any): void {
        const parsedValue = this._parseValue(event.target.value);
        if (parsedValue !== this.lastEmittedValue) {
            this._emitChangedValue();
            this._updateViewValue();
        }
    }

    /** @hidden */
    trackInputValue(event: any): void {
        const parsedValue = this._parseValue(event.target.value);

        if (parsedValue !== null) {
            this.value = this._checkValueLimits(parsedValue);
        }
    }

    /** @hidden */
    private _checkValueLimits(value: number): number {
        if (value > this._max) {
            return this._max;
        }
        if (value < this._min) {
            return this._min;
        }
        if (!isNaN(this.maxFractionDigits)) {
            value = Number(value.toFixed(this.maxFractionDigits));
        }
        if (!isNaN(this.minFractionDigits)) {
            value = Number(value.toFixed(this.minFractionDigits));
        }
        return value;
    }

    /** @hidden */
    private _emitChangedValue(): void {
        this.lastEmittedValue = this.value;
        this.valueChange.emit(this.value);
        this.onChange(this.value);
    }

    /** @hidden */
    private get _max(): number {
        return !isNaN(this.max) ? this.max : Number.MAX_VALUE;
    }

    /** @hidden */
    private get _min(): number {
        return !isNaN(this.min) ? this.min : -Number.MAX_VALUE;
    }

    /** @hidden */
    private _updateViewValue(): void {
        this.inputElement.nativeElement.value = this._formatViewValue(this.value);
    }

    /** @hidden */
    private _listenOnButtonsClick(): void {
        this._subscriptions.add(
            this._setupButtonListener(this.incrementButton)
                .subscribe(() => {
                    this.increment();
                    this._changeDetectorRef.detectChanges();
                })
        );

        this._subscriptions.add(
            this._setupButtonListener(this.decrementButton)
                .subscribe(() => {
                    this.decrement();
                    this._changeDetectorRef.detectChanges();
                })
        )
    }

    /** @hidden */
    private _setupButtonListener(elementRef: ElementRef): Observable<any> {
        const onMouseDown$ = fromEvent(elementRef.nativeElement, 'mousedown');
        const onMouseUp$ = fromEvent(window, 'mouseup');

        const timerFactory$ = defer(() => {
            return timer(500)
                .pipe(
                    switchMap(() => interval(40)),
                    takeUntil(onMouseUp$)
                )
        });

        return merge(onMouseDown$, onMouseDown$.pipe(switchMap(() => timerFactory$)))
    }

    /** @hidden */
    private _parseValue(text: string): number | null {
        const trimmedText = text.trim();

        if (trimmedText === '') {
            return 0;
        }

        const filteredText = trimmedText
            .replace(/\s/g, '')
            .replace(this._currency, '')
            .replace(this._groupSeparator, '')
            .replace(this._minusSign, '-')
            .replace(this._decimalSeparator, '.')
            .replace(this._numerals, this._index);

        if (filteredText) {
            const parsedValue = Number(filteredText);
            return isNaN(parsedValue) ? null : parsedValue;
        }

        return null;
    }

    /** @hidden */
    private _getNumberFormat(): NumberFormat {
        if (isDevMode() && this.minFractionDigits > this.maxFractionDigits) {
            throw new Error('Range error - minFractionDigits can\'t be bigger than maxFractionDigits');
        }

        return new NumberFormat(this.locale, {
            localeMatcher: this.localeMatcher,
            style: this.mode,
            currency: this.currency,
            currencyDisplay: this.currencyDisplay,
            useGrouping: this.useGrouping,
            minimumFractionDigits: this.minFractionDigits,
            maximumFractionDigits: this.maxFractionDigits
        })
    }

    /** @hidden */
    private _getNumeralsExpressions(): RegExp {
        const numerals = [...new NumberFormat(this.locale, {useGrouping: false}).format(9876543210).split('')].reverse();
        const index = new Map(numerals.map((d, i) => [d, i]));
        this._index = d => index.get(d);

        return new RegExp(`[${numerals.join('')}]`, 'g');
    }

    /** @hidden */
    private _getDecimalSeparator(): RegExp {
        const formatter = new NumberFormat(this.locale, {useGrouping: false});
        return new RegExp(`[${formatter.format(1.1).trim().replace(this._numerals, '')}]`, 'g');
    }

    /** @hidden */
    private _getGroupingSeparator(): RegExp {
        const formatter = new NumberFormat(this.locale, {useGrouping: true});
        return new RegExp(`[${formatter.format(1000).trim().replace(this._numerals, '')}]`, 'g');
    }

    /** @hidden */
    private _getMinusSignExpression(): RegExp {
        const formatter = new NumberFormat(this.locale, {useGrouping: false});
        return new RegExp(`[${formatter.format(-1).trim().replace(this._numerals, '')}]`, 'g');
    }

    /** @hidden */
    private _getCurrencyExpression(): RegExp {
        if (this.currency) {
            const formatter = new NumberFormat(this.locale, {
                style: 'currency',
                currency: this.currency,
                currencyDisplay: this.currencyDisplay
            });
            this.currencySign = `${formatter.format(1)
                .replace(/\s/g, '')
                .replace(this._numerals, '')
                .replace(this._decimalSeparator, '')
                .replace(this._groupSeparator, '')}`;

            return new RegExp(`[${this.currencySign}]`, 'g');
        }

        return new RegExp(`[]`, 'g');
    }

    /** @hidden */
    private _buildRegExps(): void {
        this._numerals = this._getNumeralsExpressions();
        this._decimalSeparator = this._getDecimalSeparator();
        this._minusSign = this._getMinusSignExpression();
        this._groupSeparator = this._getGroupingSeparator();
        this._currency = this._getCurrencyExpression();
    }

    /** @hidden */
    private _formatViewValue(number: number): string {
        return this.currency
            ? this._numberFormat.format(number).replace(this._currency, '')
            : this._numberFormat.format(number)
    }
}
