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
    OnDestroy,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormStates, Nullable } from '@fundamental-ngx/core/shared';
import { defer, fromEvent, interval, merge, Observable, Subscription, timer } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { DOWN_ARROW, ENTER, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { KeyUtil } from '@fundamental-ngx/core/utils';
import { SafeHtml } from '@angular/platform-browser';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ContentDensityConsumer, contentDensityConsumerProviders } from '@fundamental-ngx/core/content-density';
import { FormItemControl, registerFormItemControl } from '@fundamental-ngx/core/form';
import NumberFormat = Intl.NumberFormat;

let stepInputUniqueId = 0;

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
        },
        contentDensityConsumerProviders(),
        registerFormItemControl(StepInputComponent)
    ],
    host: {
        class: 'fd-step-input__container'
    }
})
export class StepInputComponent implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor, FormItemControl {
    /** Sets compact mode */
    @Input()
    compact?: boolean;

    /** Sets control in readonly mode */
    @Input()
    readonly: boolean;

    /** Sets control in disabled mode */
    @Input()
    disabled: boolean;

    /** If it is mandatory field */
    @Input()
    required = false;

    /** Sets locale used to format numeric value */
    @Input()
    locale: string;

    /** Specifies algorithm used to match locale. Check Intl.NumberFormat documentation for more information */
    @Input()
    localeMatcher: Nullable<string>;

    /** Sets icon displayed in Increment Button */
    @Input()
    incrementButtonIcon = 'add';

    /** Sets icon displayed in Decrement Button */
    @Input()
    decrementButtonIcon = 'less';

    /** Sets Increment Button title attribute */
    @Input()
    incrementButtonTitle = 'Increment';

    /** Sets Decrement Button title attribute */
    @Input()
    decrementButtonTitle = 'Decrement';

    /** Sets input aria-label attribute */
    @Input()
    ariaLabel: Nullable<string>;

    /** Sets input aria-labelledby attribute */
    @Input()
    ariaLabelledBy: Nullable<string>;

    /** Aria defines role description for the Step Input. */
    @Input()
    ariaRoleDescription = 'Step Input';

    /** Sets input id */
    @Input()
    inputId = `fd-step-input-${stepInputUniqueId++}`;

    /** Set control value */
    @Input()
    set value(value: Nullable<number>) {
        if (value == null) {
            // cast null or undefined to "null"
            this._value = null;
        } else if (!isNaN(value)) {
            value = Number(value);
            this._value = this._checkValueLimits(value);
        }
        this.lastEmittedValue = this._value;
        if (this._numberFormat) {
            this._updateViewValue();
        }
    }

    /** Control value */
    get value(): number | null {
        return this._value;
    }

    /** Sets minimum value boundary */
    @Input()
    min: number;

    /** Sets maximum value boundary */
    @Input()
    max: number;

    /** Sets input step value */
    @Input()
    step = 1;

    /** Sets input name attribute */
    @Input()
    name: Nullable<string>;

    /** Sets input title attribute */
    @Input()
    inputTitle = '';

    /** Sets formatting mode */
    @Input()
    mode: 'decimal' | 'currency' = 'decimal';

    /** Sets state of the control. Can be `success`, `error`, `warning`, `information` or blank for default. */
    @Input()
    state: FormStates = 'default';

    /** Holds the message with respect to state */
    @Input()
    stateMessage: string | SafeHtml;

    /** Custom unit displayed as a label next to the input */
    @Input()
    unit: string;

    /** Whether to use grouping when formatting value */
    @Input()
    useGrouping = true;

    /** Defines minimal number of fractional digits for control value */
    @Input()
    minFractionDigits: number;

    /** Defines maximal number of fractional digits for control value */
    @Input()
    maxFractionDigits: number;

    /** Currency used to format value. Check Intl.NumberFormat documentation for more information*/
    @Input()
    currency: string;

    /** Currency used to format value. Check Intl.NumberFormat documentation for more information */
    @Input()
    currencyDisplay: string;

    /** Whether StepInput should display Increase/Decrease buttons */
    @Input()
    hasStepButtons = true;

    /** Horizontally aligns value inside input */
    @Input()
    textAlign: 'left' | 'center' | 'right';

    /** Hint displayed inside input before user writes value */
    @Input()
    placeholder = '';

    /** Emits event when input gets focused */
    @Output()
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    onFocusIn = new EventEmitter<void>();

    /** Emits event when input loses focus */
    @Output()
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    onFocusOut = new EventEmitter<void>();

    /** Emits new value when control value has changed */
    @Output()
    valueChange = new EventEmitter<number | null>();

    /** @hidden */
    @ViewChild('incrementBtn', { read: ElementRef })
    incrementButton: ElementRef<HTMLButtonElement>;

    /** @hidden */
    @ViewChild('decrementBtn', { read: ElementRef })
    decrementButton: ElementRef<HTMLButtonElement>;

    /** @hidden */
    @ViewChild('inputElement', { read: ElementRef, static: true })
    inputElement: ElementRef;

    /** @hidden */
    lastEmittedValue: Nullable<number>;

    /** @hidden */
    currencySign: string;

    /** @hidden */
    focused: boolean;

    /** @hidden */
    private _value: number | null = null;

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
    onChange: (value: Nullable<number>) => void = () => {};

    /** @hidden */
    onTouched = (): void => {};

    constructor(
        @Inject(LOCALE_ID) locale,
        private _changeDetectorRef: ChangeDetectorRef,
        private readonly _liveAnnouncer: LiveAnnouncer,
        readonly _contentDensityConsumer: ContentDensityConsumer
    ) {
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

    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    registerOnChange(fn: (value: Nullable<number>) => void): void {
        this.onChange = fn;
    }

    /** @hidden */
    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    /** @hidden */
    writeValue(value: number | null): void {
        this.value = value;
    }

    /** @hidden */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    /** @hidden */
    get canIncrement(): boolean {
        if (this.value == null) {
            return false;
        }
        return this.value + this.step <= this._max;
    }

    /** @hidden */
    get canDecrement(): boolean {
        if (this.value == null) {
            return false;
        }
        return this.value - this.step >= this._min;
    }

    /** @hidden */
    get canDisplayLabel(): boolean {
        return !!this.unit || !!this.currencySign;
    }

    /** Increment input value by step value */
    increment(): void {
        if (this.canIncrement) {
            this._value = this._cutFloatingNumberDistortion(this.value!, this.step);
            this._emitChangedValue();
            this._updateViewValue();
        }
    }

    /** Decrement input value by step value */
    decrement(): void {
        if (this.canDecrement) {
            this._value = this._cutFloatingNumberDistortion(this.value!, -this.step);
            this._emitChangedValue();
            this._updateViewValue();
        }
    }

    /** @hidden */
    handleKeyDown(event: KeyboardEvent): void {
        const muteEvent = (evnt: Event): void => {
            evnt.stopPropagation();
            evnt.preventDefault();
        };

        if (!this._canChangeValue) {
            return;
        }

        if (KeyUtil.isKeyCode(event, UP_ARROW)) {
            this.increment();
            muteEvent(event);
        } else if (KeyUtil.isKeyCode(event, DOWN_ARROW)) {
            this.decrement();
            muteEvent(event);
        }
    }

    /** @hidden */
    handleFocusIn(): void {
        this.focused = true;
        this.onFocusIn.emit();
        this.onTouched();
    }

    /** @hidden */
    handleFocusOut(): void {
        this.focused = false;
        this.onFocusOut.emit();
    }

    /** @hidden */
    handleScroll(event: WheelEvent): void {
        if (this._canChangeValue && this.focused) {
            if (event.deltaY > 0) {
                this.decrement();
            } else {
                this.increment();
            }
            event.preventDefault();
        }
    }

    /** @hidden Updates viewValue and conditionally emits new value.
     * This method is called on (change) event, when user leaves input control. */
    updateOnInputChanged(): void {
        if (this.value !== this.lastEmittedValue) {
            this._emitChangedValue();
        }
        this._updateViewValue();
    }

    /** @hidden Track parsed value when user changes value of the input control. */
    trackInputValue(event: any): void {
        const parsedValue = this._parseValue(event.target.value);
        this._value = parsedValue != null ? this._checkValueLimits(parsedValue) : null;
    }

    /** @hidden */
    private get _canChangeValue(): boolean {
        return !(this.disabled || this.readonly);
    }

    /** @hidden */
    private _cutFloatingNumberDistortion(value: number, step: number): number {
        const stepDecimals = `${step}`.split('.')[1];
        const valueDecimals = `${value}`.split('.')[1];
        const stepDecimalsLength = stepDecimals ? stepDecimals.length : 0;
        const valueDecimalsLength = valueDecimals ? valueDecimals.length : 0;
        const longestDecimal = valueDecimalsLength > stepDecimalsLength ? valueDecimalsLength : stepDecimalsLength;

        return Number((value + step).toFixed(longestDecimal));
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
        const value = this._formatToViewValue(this.value);
        this.inputElement.nativeElement.value = value;
        this._liveAnnouncer.announce(value);
    }

    /** @hidden */
    private _listenOnButtonsClick(): void {
        if (this.hasStepButtons) {
            this._subscriptions.add(
                this._setupButtonListener(this.incrementButton).subscribe(() => {
                    this.increment();
                    this._changeDetectorRef.detectChanges();
                })
            );

            this._subscriptions.add(
                this._setupButtonListener(this.decrementButton).subscribe(() => {
                    this.decrement();
                    this._changeDetectorRef.detectChanges();
                })
            );
        }
    }

    /**
     * @hidden
     * Listens for click or space/enter keydown events.
     *
     * For long clicks will continuously emit event until "mouseup" event is detected
     */
    private _setupButtonListener(elementRef: ElementRef): Observable<any> {
        const onMouseDown$ = fromEvent(elementRef.nativeElement, 'mousedown');
        const onMouseUp$ = fromEvent(window, 'mouseup');
        const onKeyDown$ = fromEvent<KeyboardEvent>(elementRef.nativeElement, 'keydown').pipe(
            filter((event) => KeyUtil.isKeyCode(event, [SPACE, ENTER]))
        );

        const timerFactory$ = defer(() =>
            timer(500).pipe(
                switchMap(() => interval(40)),
                takeUntil(onMouseUp$)
            )
        );

        return merge(
            onMouseDown$,
            onMouseDown$.pipe(switchMap(() => timerFactory$)),
            // while key is pressed, event will be emitted continuously, so there's no need for timerFactory$
            onKeyDown$
        );
    }

    /** @hidden */
    private _parseValue(text: string): Nullable<number> {
        const trimmedText = text.trim();

        if (trimmedText === '') {
            return null;
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
            return isNaN(parsedValue) ? this.lastEmittedValue : parsedValue;
        }

        return null;
    }

    /** @hidden */
    private _getNumberFormat(): NumberFormat {
        if (isDevMode() && this.minFractionDigits > this.maxFractionDigits) {
            throw new Error("Range error - minFractionDigits can't be bigger than maxFractionDigits");
        }

        return new NumberFormat(this.locale, {
            localeMatcher: this.localeMatcher ?? undefined,
            style: this.mode,
            currency: this.currency,
            // only available in ES2020 and later
            ['currencyDisplay' as any]: this.currencyDisplay,
            useGrouping: this.useGrouping,
            minimumFractionDigits: this.minFractionDigits,
            maximumFractionDigits: this.maxFractionDigits
        });
    }

    /** @hidden */
    private _getNumeralsExpressions(): RegExp {
        const numerals = [
            ...new NumberFormat(this.locale, { useGrouping: false }).format(9876543210).split('')
        ].reverse();
        const index = new Map(numerals.map((d, i) => [d, i]));
        this._index = (d) => index.get(d);

        return new RegExp(`[${numerals.join('')}]`, 'g');
    }

    /** @hidden */
    private _getDecimalSeparator(): RegExp {
        const formatter = new NumberFormat(this.locale, { useGrouping: false });
        return new RegExp(`[${formatter.format(1.1).trim().replace(this._numerals, '')}]`, 'g');
    }

    /** @hidden */
    private _getGroupingSeparator(): RegExp {
        const formatter = new NumberFormat(this.locale, { useGrouping: true });
        return new RegExp(`[${formatter.format(1000).trim().replace(this._numerals, '')}]`, 'g');
    }

    /** @hidden */
    private _getMinusSignExpression(): RegExp {
        const formatter = new NumberFormat(this.locale, { useGrouping: false });
        return new RegExp(`[${formatter.format(-1).trim().replace(this._numerals, '')}]`, 'g');
    }

    /** @hidden */
    private _getCurrencyExpression(): RegExp {
        if (this.currency) {
            const formatter = new NumberFormat(this.locale, {
                style: 'currency',
                currency: this.currency,
                // only available in ES2020 and later
                ['currencyDisplay' as any]: this.currencyDisplay
            });
            this.currencySign = `${formatter
                .format(1)
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
    private _formatToViewValue(number: Nullable<number>): string {
        if (number == null) {
            return '';
        } else {
            return this.currency
                ? this._numberFormat.format(number).replace(this._currency, '')
                : this._numberFormat.format(number);
        }
    }
}
