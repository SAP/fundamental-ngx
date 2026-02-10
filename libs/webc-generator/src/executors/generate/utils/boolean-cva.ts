import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * Custom ControlValueAccessor for boolean-based UI5 components (like Switch, CheckBox).
 *
 * This differs from GenericControlValueAccessor by:
 * - Reading/writing to the `checked` property instead of `value`
 * - Handling boolean values instead of strings
 * - Listening to `change` event for the checked state
 *
 * @example
 * ```typescript
 * @Component({
 *   selector: 'ui5-switch',
 *   hostDirectives: [BooleanControlValueAccessor]
 * })
 * export class Switch {}
 * ```
 */
@Directive({
    selector: '[noop]',
    standalone: true,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => BooleanControlValueAccessor),
            multi: true
        }
    ]
})
export class BooleanControlValueAccessor implements ControlValueAccessor, AfterViewInit {
    onChange!: (val: boolean) => void;
    onTouched!: () => void;

    private elementRef = inject(ElementRef);
    private cdr = inject(ChangeDetectorRef);
    private _value = false;
    private _initialized = false;

    ngAfterViewInit(): void {
        // Initialize after the UI5 web component is ready
        // Use requestAnimationFrame for zoneless compatibility instead of setTimeout
        requestAnimationFrame(() => {
            this.initializeComponent();
        });
    }

    setDisabledState = (isDisabled: boolean): void => {
        const element = this.elementRef.nativeElement;
        if (element && this._initialized) {
            element.disabled = isDisabled;
            // Manually trigger change detection for zoneless compatibility
            this.cdr.markForCheck();
        }
    };

    registerOnChange(fn: (newVal: boolean) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    writeValue(val: boolean): void {
        this._value = !!val; // Ensure boolean
        if (this._initialized) {
            this.updateElementChecked(this._value);
        }
    }

    private initializeComponent(): void {
        const element = this.elementRef.nativeElement;
        this._initialized = true;

        // Set up event listener on the UI5 web component
        if (element && element.addEventListener) {
            // For boolean components, listen to 'change' event and read 'checked' property
            element.addEventListener('change', (e: any) => {
                if (this.onChange) {
                    // Read the checked state as boolean
                    console.log('Change event detected, checked state:', e.target.checked, typeof e.target.checked);
                    const checked = e.target.checked ?? false;
                    this.onChange(checked);
                    // Manually trigger change detection for zoneless compatibility
                    this.cdr.markForCheck();
                }
            });

            element.addEventListener('focusout', () => {
                if (this.onTouched) {
                    this.onTouched();
                    // Manually trigger change detection for zoneless compatibility
                    this.cdr.markForCheck();
                }
            });
        }

        // Set initial checked state if we have one pending
        this.updateElementChecked(this._value);
    }

    private updateElementChecked(checked: boolean): void {
        const element = this.elementRef.nativeElement;
        if (element && this._initialized) {
            // Set the checked property as boolean
            element.checked = checked;
            // Manually trigger change detection for zoneless compatibility
            this.cdr.markForCheck();
        }
    }
}
