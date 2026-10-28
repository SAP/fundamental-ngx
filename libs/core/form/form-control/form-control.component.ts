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
    model,
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
        '(keydown)': 'handleKeydown($any($event))',
        '(paste)': 'handlePaste($any($event))',
        '(focus)': 'handleFocus($any($event))',
        '(blur)': 'handleBlur($any($event))',
        '(wheel)': 'handleWheel($any($event))'
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
     * Writable so sibling directives (e.g. `fd-form-item`) can associate the control with a label.
     */
    readonly ariaLabelledBy = model<string | undefined | null>();

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
     * When not set, formatting falls back to the Angular `LOCALE_ID` injection token.
     * @default undefined
     */
    readonly locale = input<string | undefined>(undefined);

    /**
     * Decimal separator character.
     * When set explicitly, overrides the locale-based separator.
     * - '.': period (en-US style)
     * - ',': comma (de-DE style)
     * @default Determined by locale
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

    /** @hidden Internal type - converts number to text; omitted on non-input hosts (e.g. textarea) */
    protected readonly internalType = computed(() => {
        // Textareas have no `type` attribute; don't stamp one onto them.
        if (this.elementRef.nativeElement.tagName !== 'INPUT') {
            return null;
        }
        const inputType = this.type();
        return inputType === 'number' ? 'text' : inputType;
    });

    /** @hidden Enhanced number mode is active when type is number */
    protected readonly isEnhancedNumberMode = computed(() => this.type() === 'number');

    /**
     * @hidden
     * Computed decimal separator based on locale or explicit override.
     * Priority: decimalSeparator input > locale input > LOCALE_ID injection
     */
    protected readonly effectiveDecimalSeparator = computed<'.' | ','>(() => {
        // Explicit decimalSeparator takes precedence
        const explicitSeparator = this.decimalSeparator();
        if (explicitSeparator !== undefined) {
            return explicitSeparator;
        }

        // Determine from locale
        const localeIdValue = this.locale() || this.localeId;
        return this.getDecimalSeparatorForLocale(localeIdValue);
    });

    /**
     * @hidden
     * Computed grouping (thousands) separator based on locale.
     * Falls back to inferring from the decimal separator when an explicit `decimalSeparator`
     * override is set without a locale (e.g. a `,` decimal implies a `.` grouping separator).
     */
    protected readonly effectiveGroupingSeparator = computed<string>(() => {
        // When the decimal separator is overridden without a locale, there's no locale to read a
        // grouping separator from, so keep the decimal-derived default (handled by the service).
        if (this.decimalSeparator() !== undefined && this.locale() === undefined) {
            return this.effectiveDecimalSeparator() === ',' ? '.' : ',';
        }

        const localeIdValue = this.locale() || this.localeId;
        return this.getGroupingSeparatorForLocale(localeIdValue);
    });

    /** @hidden */
    private readonly _injector = inject(Injector);

    /** @hidden Value before focus - used for Escape key reset */
    private _valueBeforeFocus: string | null = null;

    /** @hidden Cache for locale to decimal separator mapping */
    private _decimalSeparatorCache = new Map<string, '.' | ','>();

    /** @hidden Cache for locale to grouping (thousands) separator mapping */
    private _groupingSeparatorCache = new Map<string, string>();

    /** @hidden */
    constructor(
        @Attribute('aria-label') ariaLabelAttr: string,
        @Attribute('aria-labelledby') ariaLabelledByAttr: string
    ) {
        this.ariaLabelAttr = ariaLabelAttr;
        this.ariaLabelledByAttr = ariaLabelledByAttr;
        this.contentDensityObserver.subscribe();

        // Format initial value if enhanced number mode needs formatting.
        // afterNextRender runs after the first render, but ngModel's ControlValueAccessor
        // writes its value in a microtask, so defer one more microtask to read the settled value.
        afterNextRender(
            () => {
                // Use untracked to avoid creating dependencies during initialization
                const needsFormatting = untracked(
                    () =>
                        this.type() === 'number' &&
                        (this.useGrouping() || this.effectiveDecimalSeparator() === ',' || this.locale() !== undefined)
                );

                if (needsFormatting) {
                    queueMicrotask(() => this.formatInitialValue());
                }
            },
            { injector: this._injector }
        );
    }

    /** @hidden Handle keydown events for number input validation */
    protected handleKeydown(event: KeyboardEvent): void {
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
                this.stepValue(1, false);
                return;
            case 'ArrowDown':
                event.preventDefault();
                this.stepValue(-1, false);
                return;
            case 'PageUp':
                event.preventDefault();
                this.stepValue(1, true);
                return;
            case 'PageDown':
                event.preventDefault();
                this.stepValue(-1, true);
                return;
            case 'Enter':
                this.handleEnterKey();
                return;
            case 'Escape':
                event.preventDefault();
                this.handleEscapeKey();
                return;
        }

        // Validate the key press
        if (!this.numberInputService.isValidKeyPress(event, currentValue)) {
            event.preventDefault();
            return;
        }

        // Live validation - block input that would exceed precision, then validate the result
        if (this.validationMode() === 'live') {
            const precision = this.valuePrecision();
            if (
                typeof precision === 'number' &&
                this.numberInputService.wouldExceedPrecision(event, currentValue, precision)
            ) {
                event.preventDefault();
                return;
            }

            // Use setTimeout to wait for the input value to update
            setTimeout(() => this.validateLive(inputElement), 0);
        }
    }

    /** @hidden Handle paste events for number input validation */
    protected handlePaste(event: ClipboardEvent): void {
        // Only apply validation for number type
        if (this.type() !== 'number') {
            return;
        }

        const pastedText = event.clipboardData?.getData('text') || '';

        // Validate the pasted content, including precision when defined
        if (
            !this.numberInputService.isValidPaste(pastedText, this.effectiveDecimalSeparator(), this.valuePrecision())
        ) {
            event.preventDefault();
        }
    }

    /** @hidden Handle focus - store current value for Escape reset */
    protected handleFocus(event: FocusEvent): void {
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
    protected handleBlur(event: FocusEvent): void {
        if (this.type() !== 'number') {
            return;
        }

        this.commitValue(event.target as HTMLInputElement);
    }

    /** @hidden Handle mouse wheel events for number input */
    protected handleWheel(event: WheelEvent): void {
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
        this.stepValue(direction, false);
    }

    /** @hidden Step the value up or down */
    protected stepValue(direction: 1 | -1, isLargeStep: boolean): void {
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

        // Update the displayed (formatted) value
        inputElement.value = this.numberInputService.formatNumber(
            newValue,
            typeof precision === 'number' ? precision : undefined,
            this.effectiveDecimalSeparator(),
            this.useGrouping(),
            this.effectiveGroupingSeparator()
        );

        // Move cursor to end
        inputElement.setSelectionRange(inputElement.value.length, inputElement.value.length);

        // Sync the numeric model value (canonical numeric string, not the formatted display)
        this.syncModelValue(inputElement, String(newValue));
    }

    /** @hidden Handle Enter key - validate and format, default to 0 if empty */
    protected handleEnterKey(): void {
        const inputElement = this.elementRef.nativeElement as HTMLInputElement;
        const value = inputElement.value;

        // If empty, set to 0
        if (!value || value === '-') {
            inputElement.value = '0';
            this.syncModelValue(inputElement, '0');
            this.validationChange.emit(true);
            return;
        }

        // Otherwise, validate and format in place (no blur/focus round-trip)
        this.commitValue(inputElement);
    }

    /** @hidden Handle Escape key - restore value before focus */
    protected handleEscapeKey(): void {
        const inputElement = this.elementRef.nativeElement as HTMLInputElement;

        if (this._valueBeforeFocus !== null) {
            inputElement.value = this._valueBeforeFocus;
            this.syncModelValue(inputElement, this._valueBeforeFocus);
        }
    }

    /** @hidden Format initial value with proper decimal separator and optional grouping */
    protected formatInitialValue(): void {
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
            this.useGrouping(),
            this.effectiveGroupingSeparator()
        );
    }

    /** @hidden Validate live during typing */
    protected validateLive(inputElement: HTMLInputElement): void {
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
    protected getDecimalSeparatorForLocale(localeId: string): '.' | ',' {
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

    /**
     * @hidden
     * Get the grouping (thousands) separator for a given locale.
     * Note this may be a non-ASCII space (e.g. fr-FR uses U+202F, a narrow no-break space).
     * Results are cached to avoid recreating Intl.NumberFormat on every call.
     */
    protected getGroupingSeparatorForLocale(localeId: string): string {
        const cached = this._groupingSeparatorCache.get(localeId);
        if (cached !== undefined) {
            return cached;
        }

        // Default: comma, matching the historical fallback for dot-decimal locales
        let separator = ',';
        try {
            const formatter = new Intl.NumberFormat(localeId, { useGrouping: true });
            const parts = formatter.formatToParts(1000000);
            const groupPart = parts.find((part) => part.type === 'group');
            if (groupPart?.value) {
                separator = groupPart.value;
            }
        } catch {
            // Fallback to comma if locale is invalid
            separator = ',';
        }

        this._groupingSeparatorCache.set(localeId, separator);
        return separator;
    }

    /**
     * @hidden
     * Validate the current input, apply precision, emit validation state, and render the
     * formatted display value. Shared by blur and Enter so neither needs a focus round-trip.
     */
    private commitValue(inputElement: HTMLInputElement): void {
        const value = inputElement.value;

        // If empty, leave as empty (don't default to 0)
        if (!value || value === '-') {
            inputElement.value = '';
            this.syncModelValue(inputElement, '');
            this.validationChange.emit(true); // Empty is valid
            return;
        }

        // Parse and validate the value
        const numericValue = this.numberInputService.parseNumericValue(value, this.effectiveDecimalSeparator());

        if (numericValue === null) {
            // Invalid value - revert to value before focus or empty
            const reverted = this._valueBeforeFocus || '';
            inputElement.value = reverted;
            this.syncModelValue(inputElement, reverted);
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

        // Render the formatted display value (don't clamp - let the user see their input)
        inputElement.value = this.numberInputService.formatNumber(
            finalValue,
            typeof precision === 'number' ? precision : undefined,
            this.effectiveDecimalSeparator(),
            this.useGrouping(),
            this.effectiveGroupingSeparator()
        );

        // Sync the numeric model value (canonical numeric string, not the formatted display)
        this.syncModelValue(inputElement, String(finalValue));
    }

    /**
     * @hidden
     * Notifies the bound ngModel/formControl of a numeric change without leaking the formatted
     * display string (grouping, locale decimal separator) into the model. The displayed value is
     * briefly swapped for a canonical JS-parseable numeric string while the `input` event fires,
     * then restored so the user keeps seeing the formatted value.
     */
    private syncModelValue(inputElement: HTMLInputElement, canonicalValue: string): void {
        const displayValue = inputElement.value;

        if (displayValue !== canonicalValue) {
            inputElement.value = canonicalValue;
        }

        inputElement.dispatchEvent(new Event('input', { bubbles: true }));

        if (inputElement.value !== displayValue) {
            inputElement.value = displayValue;
        }
    }
}
