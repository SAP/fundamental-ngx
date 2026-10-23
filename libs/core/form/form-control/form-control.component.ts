import {
    afterNextRender,
    Attribute,
    ChangeDetectionStrategy,
    Component,
    computed,
    ElementRef,
    inject,
    Injector,
    input,
    LOCALE_ID,
    numberAttribute,
    output,
    untracked,
    ViewEncapsulation
} from '@angular/core';
import { FormStates } from '@fundamental-ngx/cdk/forms';
import { ContentDensityObserver, contentDensityObserverProviders } from '@fundamental-ngx/core/content-density';
import { FormItemControl, registerFormItemControl } from '../form-item-control/form-item-control';
import { NumberInputService } from './number-input.service';

/**
 * Directive intended for use on form controls.
 *
 * ```html
 * <input type="text" fd-form-control />
 * ```
 */
@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'input[fd-form-control], textarea[fd-form-control]',
    template: ` <ng-content></ng-content>`,
    styleUrl: './form-control.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [registerFormItemControl(FormControlComponent), contentDensityObserverProviders(), NumberInputService],
    host: {
        '[class]': 'cssClass()',
        '[attr.type]': 'internalType()',
        '[attr.aria-label]': 'ariaLabelAttr || ariaLabel() || null',
        '[attr.aria-labelledby]': 'ariaLabelledByAttr || ariaLabelledBy() || null',
        '[attr.aria-invalid]': 'state() === "error" ? true : null',
        '[style.text-align]': 'isEnhancedNumberMode() ? textAlign() : null',
        '(keydown)': '_handleKeydown($any($event))',
        '(paste)': '_handlePaste($any($event))',
        '(input)': '_handleInput($any($event))',
        '(focus)': '_handleFocus($any($event))',
        '(blur)': '_handleBlur($any($event))',
        '(wheel)': '_handleWheel($any($event))'
    }
})
export class FormControlComponent implements FormItemControl {
    /**
     * The state of the form control - applies css classes.
     * Can be `success`, `error`, `warning`, `information` or blank for default.
     */
    readonly state = input<FormStates | null>(null);

    /**
     * Type of the form control.
     * For type="number", it will be converted to type="text" internally.
     */
    readonly type = input<string>('text');

    /**
     * User's custom classes
     */
    readonly class = input<string>('');

    /**
     * aria-label for form-control.
     */
    readonly ariaLabel = input<string | undefined | null>();

    /**
     * aria-labelledby for form-control.
     */
    readonly ariaLabelledBy = input<string | undefined | null>();

    // ===== Number Input Signal Inputs =====

    /**
     * Minimum value for number input.
     * Accepts number or string and normalizes to number.
     */
    readonly min = input<number | undefined, number | string | undefined | null>(undefined, {
        transform: (value) => (value != null ? numberAttribute(value) : undefined)
    });

    /**
     * Maximum value for number input.
     * Accepts number or string and normalizes to number.
     */
    readonly max = input<number | undefined, number | string | undefined | null>(undefined, {
        transform: (value) => (value != null ? numberAttribute(value) : undefined)
    });

    /**
     * Step size for incrementing/decrementing value.
     * Used with Arrow Up/Down keys and scroll.
     * Accepts number or string and normalizes to number.
     * @default 1
     */
    readonly step = input<number, number | string | undefined | null>(1, {
        transform: (value) => (value != null ? numberAttribute(value) : 1)
    });

    /**
     * Larger step multiplier for Page Up/Down keys.
     * The actual step is calculated as: step × largeStep
     * @default 10
     */
    readonly largeStep = input<number, number | string | undefined | null>(10, {
        transform: (value) => (value != null ? numberAttribute(value) : 10)
    });

    /**
     * Number of decimal places to display.
     * When undefined, precision is not enforced.
     */
    readonly valuePrecision = input<number | undefined, number | string | undefined | null>(undefined, {
        transform: (value) => (value != null ? numberAttribute(value) : undefined)
    });

    /**
     * Step mode for value calculation.
     * - 'addition': new value = current value ± step
     * - 'multiple': new value rounds to nearest multiple of step
     * @default 'addition'
     */
    readonly stepMode = input<'addition' | 'multiple'>('addition');

    /**
     * Validation mode for numeric input.
     * - 'delayed': validate on blur or Enter
     * - 'live': validate immediately on each keystroke
     * @default 'delayed'
     */
    readonly validationMode = input<'delayed' | 'live'>('delayed');

    /**
     * Text alignment within the input field.
     * - 'start': left-aligned (LTR) / right-aligned (RTL)
     * - 'center': center-aligned
     * - 'end': right-aligned (LTR) / left-aligned (RTL)
     * @default 'end'
     */
    readonly textAlign = input<'start' | 'center' | 'end'>('end');

    /**
     * Enable thousands separator for large numbers.
     * Example: 1000000 displays as 1,000,000
     * @default false
     */
    readonly useGrouping = input<boolean>(false);

    /**
     * Locale identifier for number formatting.
     * Determines the decimal separator and thousands separator based on locale conventions.
     * - 'en-US': uses . for decimal and , for thousands (1,234.56)
     * - 'de-DE': uses , for decimal and . for thousands (1.234,56)
     * - 'fr-FR': uses , for decimal and space for thousands (1 234,56)
     * @default Injected LOCALE_ID from Angular
     */
    readonly locale = input<string | undefined>(undefined);

    /**
     * Decimal separator character.
     * When set explicitly, overrides the locale-based separator.
     * - '.': period (en-US style)
     * - ',': comma (de-DE style)
     * @default Determined by locale
     * @deprecated Use `locale` input instead for automatic locale-based formatting
     */
    readonly decimalSeparator = input<'.' | ',' | undefined>(undefined);

    /**
     * Emits validation state for number inputs.
     * Emits `true` when the value is valid, `false` when invalid.
     */
    readonly validationChange = output<boolean>();

    /** @hidden */
    readonly elementRef = inject<ElementRef<HTMLInputElement | HTMLTextAreaElement>>(ElementRef);

    /** @hidden */
    protected readonly contentDensityObserver = inject(ContentDensityObserver);

    /** @hidden */
    protected readonly numberInputService = inject(NumberInputService);

    /** @hidden */
    protected readonly localeId = inject(LOCALE_ID);

    /** @hidden */
    protected readonly ariaLabelAttr: string;

    /** @hidden */
    protected readonly ariaLabelledByAttr: string;

    /** @hidden Computed CSS classes */
    protected readonly cssClass = computed(() => {
        const tagName = this.elementRef.nativeElement.tagName.toLowerCase();
        const classes: string[] = [];

        // Add state class
        if (this.state()) {
            classes.push(`is-${this.state()}`);
        }

        // Add base class
        if (tagName === 'textarea') {
            classes.push('fd-textarea');
        } else if (tagName === 'input') {
            classes.push('fd-input');
        }

        // Add custom classes
        if (this.class()) {
            classes.push(this.class());
        }

        return classes.join(' ');
    });

    /** @hidden Internal type - converts number to text */
    protected readonly internalType = computed(() => {
        const inputType = this.type();
        return inputType === 'number' ? 'text' : inputType;
    });

    /** @hidden Enhanced number mode is active when type is number */
    protected readonly isEnhancedNumberMode = computed(() => this.type() === 'number');

    /**
     * @hidden
     * Computed decimal separator based on locale or explicit override.
     * Priority: decimalSeparator input (deprecated) > locale input > LOCALE_ID injection
     */
    protected readonly effectiveDecimalSeparator = computed<'.' | ','>(() => {
        // Explicit decimalSeparator takes precedence (backward compatibility)
        const explicitSeparator = this.decimalSeparator();
        if (explicitSeparator !== undefined) {
            return explicitSeparator;
        }

        // Determine from locale
        const localeIdValue = this.locale() || this.localeId;
        return this._getDecimalSeparatorForLocale(localeIdValue);
    });

    /** @hidden */
    private readonly _injector = inject(Injector);

    /** @hidden Value before focus - used for Escape key reset */
    private _valueBeforeFocus: string | null = null;

    /** @hidden Cache for locale to decimal separator mapping */
    private _decimalSeparatorCache = new Map<string, '.' | ','>();

    /** @hidden */
    constructor(
        @Attribute('aria-label') ariaLabelAttr: string,
        @Attribute('aria-labelledby') ariaLabelledByAttr: string
    ) {
        this.ariaLabelAttr = ariaLabelAttr;
        this.ariaLabelledByAttr = ariaLabelledByAttr;
        this.contentDensityObserver.subscribe();

        // Format initial value if enhanced number mode needs formatting
        // Use a slightly longer delay to ensure ngModel has written its value
        afterNextRender(
            () => {
                // Use untracked to avoid creating dependencies during initialization
                const needsFormatting = untracked(
                    () =>
                        this.type() === 'number' &&
                        (this.useGrouping() || this.effectiveDecimalSeparator() === ',' || this.locale() !== undefined)
                );

                if (needsFormatting) {
                    // Small delay to let ngModel finish writing
                    setTimeout(() => this._formatInitialValue(), 100);
                }
            },
            { injector: this._injector }
        );
    }

    /** @hidden Handle keydown events for number input validation */
    protected _handleKeydown(event: KeyboardEvent): void {
        // Only apply validation for number type
        if (this.type() !== 'number') {
            return;
        }

        const inputElement = this.elementRef.nativeElement as HTMLInputElement;
        const currentValue = inputElement.value;

        // Handle special keys for number input
        switch (event.key) {
            case 'ArrowUp':
                event.preventDefault();
                this._stepValue(1, false);
                return;
            case 'ArrowDown':
                event.preventDefault();
                this._stepValue(-1, false);
                return;
            case 'PageUp':
                event.preventDefault();
                this._stepValue(1, true);
                return;
            case 'PageDown':
                event.preventDefault();
                this._stepValue(-1, true);
                return;
            case 'Enter':
                this._handleEnterKey();
                return;
            case 'Escape':
                event.preventDefault();
                this._handleEscapeKey();
                return;
        }

        // Validate the key press
        if (!this.numberInputService.isValidKeyPress(event, currentValue, this.effectiveDecimalSeparator())) {
            event.preventDefault();
        }

        // Live validation - validate after keystroke
        if (this.validationMode() === 'live') {
            // Use setTimeout to wait for the input value to update
            setTimeout(() => this._validateLive(inputElement), 0);
        }
    }

    /** @hidden Handle paste events for number input validation */
    protected _handlePaste(event: ClipboardEvent): void {
        // Only apply validation for number type
        if (this.type() !== 'number') {
            return;
        }

        const pastedText = event.clipboardData?.getData('text') || '';

        // Validate the pasted content
        if (!this.numberInputService.isValidPaste(pastedText, this.effectiveDecimalSeparator())) {
            event.preventDefault();
        }
    }

    /** @hidden Handle input events - currently a pass-through for ngModel */
    protected _handleInput(_event: Event): void {
        // Only apply for number type
        if (this.type() !== 'number') {
            return;
        }

        // For now, let the input event propagate normally to ngModel. The formatting will be handled on blur
    }

    /** @hidden Handle focus - store current value for Escape reset */
    protected _handleFocus(event: FocusEvent): void {
        if (this.type() !== 'number') {
            return;
        }

        const inputElement = event.target as HTMLInputElement;
        this._valueBeforeFocus = inputElement.value;

        // Parse and reformat value for editing (remove thousands separator if present)
        const numericValue = this.numberInputService.parseNumericValue(
            inputElement.value,
            this.effectiveDecimalSeparator()
        );

        if (numericValue !== null) {
            // Format without grouping and always use DOT for decimal during editing
            // This ensures ngModel receives standard numeric strings that JavaScript can parse
            inputElement.value = this.numberInputService.formatNumber(
                numericValue,
                undefined,
                '.', // Always use dot during editing for ngModel compatibility
                false
            );
        }

        // Select all text on focus for easy replacement
        inputElement.select();
    }

    /** @hidden Handle blur - validate and format value */
    protected _handleBlur(event: FocusEvent): void {
        if (this.type() !== 'number') {
            return;
        }

        const inputElement = event.target as HTMLInputElement;
        const value = inputElement.value;

        // If empty, leave as empty (don't default to 0)
        if (!value || value === '-') {
            inputElement.value = '';
            this.validationChange.emit(true); // Empty is valid
            return;
        }

        // Parse and validate the value
        const numericValue = this.numberInputService.parseNumericValue(value, this.effectiveDecimalSeparator());

        if (numericValue === null) {
            // Invalid value - revert to value before focus or empty
            inputElement.value = this._valueBeforeFocus || '';
            this.validationChange.emit(false);
            return;
        }

        // Apply precision if defined
        let finalValue = numericValue;
        const precision = this.valuePrecision();
        if (typeof precision === 'number') {
            finalValue = parseFloat(numericValue.toFixed(precision));
        }

        // Check min/max boundaries and emit validation state
        const minValue = this.min();
        const maxValue = this.max();
        let isValid = true;

        if (typeof minValue === 'number' && finalValue < minValue) {
            isValid = false;
        }
        if (typeof maxValue === 'number' && finalValue > maxValue) {
            isValid = false;
        }

        // Emit validation state
        this.validationChange.emit(isValid);

        // Format and update the input (but don't clamp the value - let user see their input)
        inputElement.value = this.numberInputService.formatNumber(
            finalValue,
            typeof precision === 'number' ? precision : undefined,
            this.effectiveDecimalSeparator(),
            this.useGrouping()
        );
    }

    /** @hidden Handle mouse wheel events for number input */
    protected _handleWheel(event: WheelEvent): void {
        // Only apply for number type and when input is focused
        if (this.type() !== 'number') {
            return;
        }

        const inputElement = event.target as HTMLInputElement;

        // Only handle wheel events when the input is focused
        if (document.activeElement !== inputElement) {
            return;
        }

        // Prevent page scroll when input is focused
        event.preventDefault();

        // Determine direction: negative deltaY = scroll up (increment), positive = scroll down (decrement)
        const direction: 1 | -1 = event.deltaY < 0 ? 1 : -1;

        // Use normal step (not large step) for scroll
        this._stepValue(direction, false);
    }

    /** @hidden Step the value up or down */
    private _stepValue(direction: 1 | -1, isLargeStep: boolean): void {
        const inputElement = this.elementRef.nativeElement as HTMLInputElement;
        const currentValue = this.numberInputService.parseNumericValue(
            inputElement.value,
            this.effectiveDecimalSeparator()
        );

        // Get step size
        const stepValue = this.step();
        const stepSize = typeof stepValue === 'number' ? stepValue : 1;
        const largeStepValue = this.largeStep();
        const largeStepMultiplier = isLargeStep ? (typeof largeStepValue === 'number' ? largeStepValue : 10) : 1;
        const actualStep = stepSize * largeStepMultiplier * direction;

        // Calculate new value based on step mode
        let newValue: number;
        const baseValue = currentValue ?? 0;

        if (this.stepMode() === 'multiple') {
            // Multiple mode: round to nearest multiple of step
            // After adding/subtracting, round DOWN to the nearest multiple
            const targetValue = baseValue + actualStep;
            newValue = Math.floor(targetValue / stepSize) * stepSize;
        } else {
            // Addition mode: simple arithmetic
            newValue = baseValue + actualStep;
        }

        // Clamp to min/max boundaries
        const minValue = this.min();
        const maxValue = this.max();
        if (typeof minValue === 'number') {
            newValue = Math.max(newValue, minValue);
        }
        if (typeof maxValue === 'number') {
            newValue = Math.min(newValue, maxValue);
        }

        // Apply precision if defined
        const precision = this.valuePrecision();
        if (typeof precision === 'number') {
            newValue = parseFloat(newValue.toFixed(precision));
        }

        // Update the input value
        inputElement.value = this.numberInputService.formatNumber(
            newValue,
            typeof precision === 'number' ? precision : undefined,
            this.effectiveDecimalSeparator(),
            this.useGrouping()
        );

        // Move cursor to end
        inputElement.setSelectionRange(inputElement.value.length, inputElement.value.length);

        // Trigger input event for ngModel/formControl
        inputElement.dispatchEvent(new Event('input', { bubbles: true }));
    }

    /** @hidden Handle Enter key - validate and format, default to 0 if empty */
    private _handleEnterKey(): void {
        const inputElement = this.elementRef.nativeElement as HTMLInputElement;
        const value = inputElement.value;

        // If empty, set to 0
        if (!value || value === '-') {
            inputElement.value = '0';
            inputElement.dispatchEvent(new Event('input', { bubbles: true }));
            return;
        }

        // Otherwise, trigger blur logic (validate and format)
        inputElement.blur();
        inputElement.focus();
    }

    /** @hidden Handle Escape key - restore value before focus */
    private _handleEscapeKey(): void {
        const inputElement = this.elementRef.nativeElement as HTMLInputElement;

        if (this._valueBeforeFocus !== null) {
            inputElement.value = this._valueBeforeFocus;
            inputElement.dispatchEvent(new Event('input', { bubbles: true }));
        }
    }

    /** @hidden Format initial value with proper decimal separator and optional grouping */
    private _formatInitialValue(): void {
        const inputElement = this.elementRef.nativeElement as HTMLInputElement;
        const currentValue = inputElement.value;

        if (!currentValue || currentValue === '' || currentValue === '-') {
            return;
        }

        const numericValue = this.numberInputService.parseNumericValue(currentValue, this.effectiveDecimalSeparator());

        if (numericValue === null) {
            return;
        }

        // Apply precision if defined
        let finalValue = numericValue;
        const precision = this.valuePrecision();
        if (typeof precision === 'number') {
            finalValue = parseFloat(numericValue.toFixed(precision));
        }

        // Format with decimal separator and optional grouping
        inputElement.value = this.numberInputService.formatNumber(
            finalValue,
            typeof precision === 'number' ? precision : undefined,
            this.effectiveDecimalSeparator(),
            this.useGrouping()
        );
    }

    /** @hidden Validate live during typing */
    private _validateLive(inputElement: HTMLInputElement): void {
        const value = inputElement.value;

        // Empty or just minus is valid during typing
        if (!value || value === '-') {
            this.validationChange.emit(true);
            return;
        }

        // Parse the value
        const numericValue = this.numberInputService.parseNumericValue(value, this.effectiveDecimalSeparator());

        if (numericValue === null) {
            this.validationChange.emit(false);
            return;
        }

        // Check min/max boundaries
        const minValue = this.min();
        const maxValue = this.max();
        let isValid = true;

        if (typeof minValue === 'number' && numericValue < minValue) {
            isValid = false;
        }
        if (typeof maxValue === 'number' && numericValue > maxValue) {
            isValid = false;
        }

        this.validationChange.emit(isValid);
    }

    /**
     * @hidden
     * Get the decimal separator for a given locale.
     * Results are cached to avoid recreating Intl.NumberFormat on every call.
     */
    private _getDecimalSeparatorForLocale(localeId: string): '.' | ',' {
        // Check cache first
        const cached = this._decimalSeparatorCache.get(localeId);
        if (cached !== undefined) {
            return cached;
        }

        // Determine separator for this locale
        let separator: '.' | ',' = '.';
        try {
            const formatter = new Intl.NumberFormat(localeId);
            const parts = formatter.formatToParts(1.1);
            const decimalPart = parts.find((part) => part.type === 'decimal');
            separator = decimalPart?.value === ',' ? ',' : '.';
        } catch {
            // Fallback to dot if locale is invalid
            separator = '.';
        }

        // Cache the result
        this._decimalSeparatorCache.set(localeId, separator);
        return separator;
    }
}
