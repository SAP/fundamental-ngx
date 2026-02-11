import {
    AfterViewInit,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    forwardRef,
    inject,
    InjectionToken
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Configuration for the CVA behavior
 */
export interface CvaConfig {
    /** The property to bind to (e.g., 'value', 'checked') */
    property: string;
    /** The event(s) to listen to (e.g., 'change', 'input', or 'change,input') */
    events: string[];
    /** Value transformer function (e.g., for boolean coercion) */
    transformValue?: (value: any) => any;
    /**
     * Radio button mode: compares form control value with element's value attribute
     * and sets checked state accordingly. When true, the CVA will:
     * - Write: compare formControl.value === element.value, set element.checked
     * - Read: return element.value (not just true/false)
     */
    isRadioButton?: boolean;
}

/** Injection token for CVA configuration */
export const CVA_CONFIG = new InjectionToken<CvaConfig>('CVA_CONFIG');

@Directive({
    selector: '[noop]',
    standalone: true,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => GenericControlValueAccessor),
            multi: true
        }
    ]
})
export class GenericControlValueAccessor<ValueType = any> implements ControlValueAccessor, AfterViewInit {
    onChange!: (val: ValueType) => void;
    onTouched!: () => void;

    private elementRef = inject(ElementRef);
    private cdr = inject(ChangeDetectorRef);
    private config = inject(CVA_CONFIG, { optional: true });

    private _value: ValueType | null = null;
    private _initialized = false;
    private _disabled = false;

    // Default config if none provided
    private get effectiveConfig(): CvaConfig {
        return (
            this.config || {
                property: 'value',
                events: ['change', 'input'],
                transformValue: (v) => v || ''
            }
        );
    }

    ngAfterViewInit(): void {
        // Initialize after the UI5 web component is ready
        // Use requestAnimationFrame for zoneless compatibility instead of setTimeout
        requestAnimationFrame(() => {
            this.initializeComponent();
        });
    }

    setDisabledState = (isDisabled: boolean): void => {
        this._disabled = isDisabled;
        const element = this.elementRef.nativeElement;
        if (element && this._initialized) {
            element.disabled = isDisabled;
            // Manually trigger change detection for zoneless compatibility
            this.cdr.markForCheck();
        }
    };

    registerOnChange(fn: (newVal: ValueType) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    writeValue(val: ValueType): void {
        this._value = val;
        if (this._initialized) {
            this.updateElementValue(val);
        }
    }

    private initializeComponent(): void {
        const element = this.elementRef.nativeElement;
        const config = this.effectiveConfig;
        this._initialized = true;

        // Set up event listeners on the UI5 web component

        if (element && element.addEventListener) {
            // Listen to all configured events
            for (const eventName of config.events) {
                element.addEventListener(eventName, (e: any) => {
                    if (this.onChange) {
                        const valueToEmit = this.getValueToEmit(config, e);
                        const transformedValue = config.transformValue
                            ? config.transformValue(valueToEmit)
                            : valueToEmit;
                        this.onChange(transformedValue);
                        // Manually trigger change detection for zoneless compatibility
                        this.cdr.markForCheck();
                    }
                });
            }

            // Listen to focusout for touched state
            element.addEventListener('focusout', () => {
                if (this.onTouched) {
                    this.onTouched();
                    // Manually trigger change detection for zoneless compatibility
                    this.cdr.markForCheck();
                }
            });
        }

        // Set initial value if we have one pending
        if (this._value !== null) {
            this.updateElementValue(this._value);
        }

        // Set initial disabled state if it was set before initialization
        if (this._disabled) {
            element.disabled = this._disabled;
        }
    }

    private getValueToEmit(config: CvaConfig, event: any): any {
        // For radio buttons, emit the element's value when checked
        // For other components, emit the property value
        if (config.isRadioButton) {
            // Only emit if this radio button was checked
            if (event.target.checked) {
                return event.target.value;
            } else {
                // Don't emit anything if radio was unchecked (another one was selected)
                return;
            }
        } else {
            return event.target[config.property];
        }
    }

    private updateElementValue(value: ValueType): void {
        const element = this.elementRef.nativeElement;
        const config = this.effectiveConfig;

        if (element && this._initialized) {
            if (config.isRadioButton) {
                // For radio buttons, compare the form value with this element's value
                // and set checked accordingly
                const isChecked = element.value === value;
                element.checked = isChecked;
            } else {
                // For other components, set the property directly
                const transformedValue = config.transformValue ? config.transformValue(value) : value;
                element[config.property] = transformedValue;
            }
            // Manually trigger change detection for zoneless compatibility
            this.cdr.markForCheck();
        }
    }
}
