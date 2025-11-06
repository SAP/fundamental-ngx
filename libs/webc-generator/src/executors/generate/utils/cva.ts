import { AfterViewInit, ChangeDetectorRef, Directive, ElementRef, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
    private _value: ValueType | null = null;
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
        this._initialized = true;

        // Set up event listeners on the UI5 web component
        if (element && element.addEventListener) {
            element.addEventListener('input', (e: any) => {
                if (this.onChange) {
                    this.onChange(e.target.value);
                    // Manually trigger change detection for zoneless compatibility
                    this.cdr.markForCheck();
                }
            });

            element.addEventListener('change', (e: any) => {
                if (this.onChange) {
                    this.onChange(e.target.value);
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

        // Set initial value if we have one pending
        if (this._value !== null) {
            this.updateElementValue(this._value);
        }
    }

    private updateElementValue(value: ValueType): void {
        const element = this.elementRef.nativeElement;
        if (element && this._initialized) {
            element.value = value || '';
            // Manually trigger change detection for zoneless compatibility
            this.cdr.markForCheck();
        }
    }
}
