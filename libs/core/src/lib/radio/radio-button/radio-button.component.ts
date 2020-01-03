import { ChangeDetectorRef, Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type state = 'valid' | 'invalid' | 'warning' | 'default' | 'information';
@Component({
    selector: 'fd-radio-button',
    templateUrl: './radio-button.component.html',
    styleUrls: ['./radio-button.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RadioButtonComponent),
            multi: true
        }
    ]
})
export class RadioButtonComponent implements ControlValueAccessor {
    @ViewChild('inputElement', { static: false })
    inputElement: ElementRef;

    /** @hidden */
    actualValue: any;

    @Input() compact: boolean = false;
    @Input() state: state = 'default';

    @Input() disabled: boolean = false;

    @Input() id: string;

    @Input() name: string;

    @Input() value: any;

    /** @hidden */
    onChange: any = (selected: any) => { };

    /** @hidden */
    onTouched: any = () => { };

    /** @hidden */
    constructor(private changeDetectionRef: ChangeDetectorRef) { }

    // ControlValueAccessor implementation
    /** @hidden */
    registerOnChange(fn: (selected: any) => { void }): void {
        this.onChange = fn;
    }

    /** @hidden */
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    /** @hidden */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.changeDetectionRef.detectChanges();
    }

    /** @hidden */
    writeValue(value: any): void {
        this.actualValue = value;
    }
    // End implementation

    /** @hidden */
    labelClicked(): void {
        this.valueChange(this.value);
        this.inputElement.nativeElement.focus();
    }

    /** @hidden */
    valueChange(value: any): void {
        this.actualValue = value;
        this.onChange(value);
    }

    // this method is going to be updated when PR #1770 will be merged
    /** @hidden */
    get buildComponentCssClass(): string {
        return [
            'fd-radio',
            this.compact && 'fd-radio--compact',
            this.state && this.state !== 'default' && `is-${this.state}`
        ].join(' ');
    }
}
