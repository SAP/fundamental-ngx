import {
    Attribute,
    booleanAttribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    ElementRef,
    inject,
    input,
    OnInit,
    output,
    signal,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormStates } from '@fundamental-ngx/cdk/forms';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { FD_LOCALE_SIGNAL } from '@fundamental-ngx/i18n';
import { FormItemControl, registerFormItemControl } from '../form-item-control/form-item-control';

/**
 * Validation error emitted when number input validation fails
 */
export interface NumberValidationError {
    type: 'min' | 'max' | 'precision' | 'invalid';
    message: string;
}

/**
 * Directive intended for use on form controls.
 *
 * ```html
 * <input type="text" fd-form-control />
 * <input type="number" fd-form-control [numberLocale]="'de-DE'" [valuePrecision]="2" />
 * ```
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'input[fd-form-control], textarea[fd-form-control]',
    template: ` <ng-content></ng-content>`,
    styleUrl: './form-control.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        registerFormItemControl(FormControlComponent),
        contentDensityObserverProviders(),
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: FormControlComponent,
            multi: true
        }
    ],
    host: {
        '[class]': 'cssClass()',
        '[attr.aria-label]': 'ariaLabel() ?? ariaLabelAttr ?? null',
        '[attr.aria-labelledby]': 'ariaLabelledBy() ?? ariaLabelledByAttr ?? null',
        '[attr.aria-invalid]': 'effectiveState() === "error" ? true : null',
        '[attr.type]': 'effectiveType() || null',
        '[attr.inputmode]': 'inputMode()',
        '[style.text-align]': 'valueAlignment()',
        '[attr.disabled]': 'disabled() || null',
        '[attr.readonly]': 'readonly() || null'
    }
})
export class FormControlComponent implements FormItemControl, ControlValueAccessor, OnInit {
    /**
     *  The state of the form control - applies css classes.
     *  Can be `success`, `error`, `warning`, `information` or blank for default.
     */
    readonly state = input<FormStates | null>(null);

    /** Type of the form control. */
    readonly type = input<string>();

    /** user's custom classes */
    readonly class = input<string>('');

    /** aria-label for form-control. */
    readonly ariaLabel = input<string | undefined | null>(null);

    /** aria-label for form-control. */
    readonly ariaLabelledBy = input<string | undefined | null>(null);

    // ============ NUMBER INPUT CONFIGURATION ============

    /**
     * Locale for number formatting (e.g., 'en-US', 'de-DE', 'ar-EG').
     * When set, the input switches to text mode with locale-aware number formatting.
     * Defaults to FD_LOCALE_SIGNAL from i18n if available, otherwise 'en-US'.
     */
    readonly numberLocale = input<string>();

    /**
     * Number of digits after the decimal point (0 or positive integer).
     * When set, enforces precision and displays trailing zeros.
     * Example: valuePrecision=6 formats "1.5" as "1.500000"
     */
    readonly valuePrecision = input<number>();

    /**
     * Minimum allowed value (rational number or string).
     * When value reaches minimum, Up/Down shortcuts are disabled at that boundary.
     * Values below minimum show error state.
     */
    readonly min = input<number | string>();

    /**
     * Maximum allowed value (rational number or string).
     * When value reaches maximum, Up/Down shortcuts are disabled at that boundary.
     * Values above maximum show error state.
     */
    readonly max = input<number | string>();

    /**
     * Step size for increment/decrement operations (rational number or string).
     * Applied when using arrow keys, scroll, or step buttons.
     * Default: 1
     */
    readonly step = input<number | string>(1);

    /**
     * Larger step size multiplier for Page Up/Page Down operations (rational number).
     * The actual step = step × largerStep
     * Example: step=1, largerStep=10 → Page Up increases by 10
     * Default: 10
     */
    readonly largerStep = input<number>(10);

    /**
     * Step mode determines how new values are calculated when stepping.
     * - 'increment' (default): new value = current ± step
     * - 'multiple': new value = round(current / step) × step (nearest multiple)
     */
    readonly stepMode = input<'increment' | 'multiple'>('increment');

    /**
     * Text alignment within the input field.
     * - 'end' (default): right-aligned for LTR, left-aligned for RTL (recommended for numbers)
     * - 'start': left-aligned for LTR, right-aligned for RTL
     * - 'center': centered
     */
    readonly valueAlignment = input<'start' | 'center' | 'end'>('end');

    /**
     * Whether to display thousands separator (grouping).
     * When true, formats large numbers with locale-specific grouping.
     * Example (en-US): 1234567 → "1,234,567"
     * Example (de-DE): 1234567 → "1.234.567"
     * Default: false
     */
    readonly thousandsSeparator = input(false, { transform: booleanAttribute });

    /**
     * Whether the number input is disabled.
     * When true, keyboard shortcuts and step operations are disabled.
     */
    readonly disabled = input(false, { transform: booleanAttribute });

    /**
     * Whether the input is read-only.
     * When true, user cannot edit but can still select and copy.
     */
    readonly readonly = input(false, { transform: booleanAttribute });

    /**
     * Emitted when number validation fails (min/max/precision).
     */
    readonly validationError = output<NumberValidationError | null>();

    /** @hidden */
    readonly elementRef = inject<ElementRef<HTMLInputElement | HTMLTextAreaElement>>(ElementRef);

    /** @hidden Injected to activate content density CSS class effects */
    readonly _contentDensityObserver = inject(ContentDensityObserver);

    /** @hidden Whether number input mode is active */
    protected readonly isNumberMode = computed(
        () =>
            this.type() === 'number' &&
            (!!this.numberLocale() || this.valuePrecision() !== undefined || this.thousandsSeparator())
    );

    /** @hidden Effective locale for number formatting */
    protected readonly effectiveLocale = computed(() => {
        if (!this.isNumberMode()) {return null;}
        return this.numberLocale() || this._localeSignal?.() || 'en-US';
    });

    /** @hidden Effective type attribute (text when number mode is active) */
    protected readonly effectiveType = computed(() => {
        if (this.isNumberMode()) {return 'text';}
        return this.type();
    });

    /** @hidden Input mode for mobile keyboards */
    protected readonly inputMode = computed(() => {
        if (this.isNumberMode()) {return 'decimal';}
        return null;
    });

    /** @hidden Effective state (user-provided or validation error) */
    protected readonly effectiveState = computed(() => {
        if (this._validationError()) {return 'error';}
        return this.state();
    });

    /** @hidden */
    protected readonly cssClass = computed(() => {
        const tagName = this.elementRef.nativeElement.tagName.toLowerCase();
        return [
            this.effectiveState() ? 'is-' + this.effectiveState() : '',
            this.class(),
            tagName === 'textarea' ? 'fd-textarea' : tagName === 'input' ? 'fd-input' : ''
        ]
            .filter(Boolean)
            .join(' ');
    });

    /** @hidden */
    private _initialValueProcessed = false;

    /** @hidden */
    private readonly _localeSignal = inject(FD_LOCALE_SIGNAL, { optional: true });

    /** @hidden Current numeric value */
    private readonly _numericValue = signal<number | null>(null);

    /** @hidden Internal validation error state */
    private readonly _validationError = signal<NumberValidationError | null>(null);

    /** @hidden Convert string/number to number (for backwards compatibility) */
    private readonly _minValue = computed(() => this._toNumber(this.min()));

    /** @hidden Convert string/number to number (for backwards compatibility) */
    private readonly _maxValue = computed(() => this._toNumber(this.max()));

    /** @hidden Convert string/number to number (for backwards compatibility) */
    private readonly _stepSizeValue = computed(() => this._toNumber(this.step()) ?? 1);

    /** @hidden */
    constructor(
        @Attribute('aria-label') protected ariaLabelAttr: string,
        @Attribute('aria-labelledby') protected ariaLabelledByAttr: string,
        @Attribute('value') private _initialValue: string | null
    ) {
        // Emit validation errors when they change
        effect(() => {
            const error = this._validationError();
            this.validationError.emit(error);
        });
    }

    /** @hidden */
    ngOnInit(): void {
        const element = this.elementRef.nativeElement;

        // Set up event listeners for number input mode
        element.addEventListener('input', (e) => this._handleInput(e));
        element.addEventListener('blur', () => this._handleBlur());
        element.addEventListener('focus', () => this._handleFocus());
        element.addEventListener('keydown', (e) => this._handleKeydown(e as KeyboardEvent));
        element.addEventListener('wheel', (e) => this._handleWheel(e as WheelEvent), { passive: false });

        // Format initial value if number mode is active and value attribute exists
        // Use setTimeout to ensure all Angular bindings are applied first
        if (this.isNumberMode() && this._initialValue && !this._initialValueProcessed) {
            this._initialValueProcessed = true;
            const initialValue = this._initialValue;
            setTimeout(() => {
                const parsed = this._parseNumber(initialValue);
                if (parsed !== null) {
                    this._numericValue.set(parsed);
                    this._updateDisplayValue(parsed);
                }
            }, 0);
        }
    }

    // ============ ControlValueAccessor Implementation ============

    /** @hidden */
    writeValue(value: any): void {
        const numericValue = typeof value === 'number' ? value : value ? parseFloat(value) : null;
        this._numericValue.set(numericValue);
        this._updateDisplayValue(numericValue);
    }

    /** @hidden */
    registerOnChange(fn: any): void {
        this._onChange = fn;
    }

    /** @hidden */
    registerOnTouched(fn: any): void {
        this._onTouched = fn;
    }

    /** @hidden */
    setDisabledState(): void {
        // Handled via disabled input
    }

    // ============ Event Handlers ============

    /** @hidden */
    protected _handleInput(event: Event): void {
        if (!this.isNumberMode()) {return;}

        const inputElement = event.target as HTMLInputElement;
        const text = inputElement.value;

        // Parse the input text to a number
        const parsed = this._parseNumber(text);

        if (parsed === null && text.trim() !== '') {
            // Invalid format
            this._setValidationError('invalid', 'Invalid number format');
            return;
        }

        // Clear previous errors
        this._validationError.set(null);

        // Validate precision
        if (parsed !== null && this.valuePrecision() !== undefined) {
            const precision = this.valuePrecision();
            const precisionValid = this._validatePrecision(text, precision!);
            if (!precisionValid) {
                this._setValidationError('precision', `Value exceeds precision of ${precision} decimal places`);
                return;
            }
        }

        // Validate min/max
        if (parsed !== null) {
            const min = this._minValue();
            const max = this._maxValue();

            if (min !== undefined && parsed < min) {
                this._setValidationError('min', `Value must be at least ${min}`);
                return;
            }

            if (max !== undefined && parsed > max) {
                this._setValidationError('max', `Value must be at most ${max}`);
                return;
            }
        }

        // Update model value
        this._numericValue.set(parsed);
        this._onChange(parsed);
    }

    /** @hidden */
    protected _handleBlur(): void {
        this._onTouched();

        if (!this.isNumberMode()) {return;}

        // Format the display value on blur
        const value = this._numericValue();
        this._updateDisplayValue(value);
    }

    /** @hidden */
    protected _handleFocus(): void {
        // Optional: show raw number on focus for easier editing
    }

    /** @hidden */
    protected _handleKeydown(event: KeyboardEvent): void {
        if (!this.isNumberMode() || this.disabled() || this.readonly()) {return;}

        const key = event.key;
        let shouldStep = false;
        let multiplier = 1;

        if (key === 'ArrowUp') {
            shouldStep = true;
            multiplier = 1;
            event.preventDefault();
        } else if (key === 'ArrowDown') {
            shouldStep = true;
            multiplier = -1;
            event.preventDefault();
        } else if (key === 'PageUp') {
            shouldStep = true;
            multiplier = this.largerStep();
            event.preventDefault();
        } else if (key === 'PageDown') {
            shouldStep = true;
            multiplier = -this.largerStep();
            event.preventDefault();
        }

        if (shouldStep) {
            this._stepValue(multiplier);
        }
    }

    /** @hidden */
    protected _handleWheel(event: WheelEvent): void {
        if (!this.isNumberMode() || this.disabled() || this.readonly()) {return;}

        // Only step on wheel if input is focused
        if (document.activeElement !== this.elementRef.nativeElement) {return;}

        event.preventDefault();
        const multiplier = event.deltaY < 0 ? 1 : -1;
        this._stepValue(multiplier);
    }

    // ============ Helper Methods ============

    /** @hidden */
    private _stepValue(multiplier: number): void {
        const currentValue = this._numericValue() ?? 0;
        const stepSize = this._stepSizeValue() * multiplier;
        let newValue: number;

        if (this.stepMode() === 'multiple') {
            // Round to nearest multiple of step
            const step = this._stepSizeValue();
            newValue = Math.round((currentValue + stepSize) / step) * step;
        } else {
            // Simple increment/decrement
            newValue = currentValue + stepSize;
        }

        // Clamp to min/max
        const min = this._minValue();
        const max = this._maxValue();
        if (min !== undefined) {newValue = Math.max(min, newValue);}
        if (max !== undefined) {newValue = Math.min(max, newValue);}

        // Update value
        this._numericValue.set(newValue);
        this._onChange(newValue);
        this._updateDisplayValue(newValue);
    }

    /** @hidden ControlValueAccessor callbacks */
    private _onChange: (value: any) => void = () => {};

    /** @hidden ControlValueAccessor callbacks */
    private _onTouched: () => void = () => {};

    /** @hidden */
    private _updateDisplayValue(value: number | null): void {
        if (!this.isNumberMode()) {return;}

        const locale = this.effectiveLocale();
        if (!locale || value === null) {
            this.elementRef.nativeElement.value = '';
            return;
        }

        const formatted = this._formatNumber(value, locale);
        this.elementRef.nativeElement.value = formatted;
    }

    /** @hidden */
    private _formatNumber(value: number, locale: string): string {
        const options: Intl.NumberFormatOptions = {
            useGrouping: this.thousandsSeparator()
        };

        const precision = this.valuePrecision();
        if (precision !== undefined) {
            options.minimumFractionDigits = precision;
            options.maximumFractionDigits = precision;
        }

        return new Intl.NumberFormat(locale, options).format(value);
    }

    /** @hidden */
    private _parseNumber(text: string): number | null {
        if (!text || text.trim() === '') {return null;}

        const locale = this.effectiveLocale();
        if (!locale) {return parseFloat(text);}

        // Get locale-specific decimal and grouping separators
        const formatter = new Intl.NumberFormat(locale);
        const parts = formatter.formatToParts(1234.5);
        const decimalSeparator = parts.find((p) => p.type === 'decimal')?.value || '.';
        const groupSeparator = parts.find((p) => p.type === 'group')?.value || ',';

        // Remove grouping separators and replace decimal separator with '.'
        let normalized = text.trim();
        normalized = normalized.replace(new RegExp(`\\${groupSeparator}`, 'g'), '');
        normalized = normalized.replace(decimalSeparator, '.');

        const parsed = parseFloat(normalized);
        return isNaN(parsed) ? null : parsed;
    }

    /** @hidden */
    private _validatePrecision(text: string, precision: number): boolean {
        const locale = this.effectiveLocale();
        if (!locale) {return true;}

        const formatter = new Intl.NumberFormat(locale);
        const parts = formatter.formatToParts(1234.5);
        const decimalSeparator = parts.find((p) => p.type === 'decimal')?.value || '.';

        const decimalIndex = text.indexOf(decimalSeparator);
        if (decimalIndex === -1) {return true;}

        const fractionalPart = text.slice(decimalIndex + 1);
        return fractionalPart.length <= precision;
    }

    /** @hidden */
    private _setValidationError(type: NumberValidationError['type'], message: string): void {
        this._validationError.set({ type, message });
    }

    /** @hidden Convert string or number to number (for backwards compatibility) */
    private _toNumber(value: number | string | undefined): number | undefined {
        if (value === undefined || value === null) {return undefined;}
        if (typeof value === 'number') {return value;}
        const parsed = parseFloat(value);
        return isNaN(parsed) ? undefined : parsed;
    }
}
