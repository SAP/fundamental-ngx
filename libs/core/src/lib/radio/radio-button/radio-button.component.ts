import { ChangeDetectorRef, Component, ElementRef, forwardRef, Input, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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

    @Input() disabled: boolean = false;

    @Input() compact: boolean = false;

    @Input() id: string;

    @Input() name: string;

    @Input() value: any;

    /** @hidden */
    onChange: any = (selected: any) => {};

    /** @hidden */
    onTouched: any = () => {};

    registerOnChange(fn: (selected: any) => { void }): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    constructor (
        private changeDetectionRef: ChangeDetectorRef
    ) {}

    /** @hidden */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.changeDetectionRef.detectChanges();
    }

    writeValue(value: any): void {
        this.actualValue = value;
    }

    labelClicked(): void {
        this.valueChange(this.value);
        this.inputElement.nativeElement.focus();
    }

    valueChange(value: any): void {
        this.actualValue = value;
        this.onChange(value);
    }
}
