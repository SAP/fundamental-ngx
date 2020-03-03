import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * The component that represents an integer value input.
 * The value is increased or decreased using the spinner add-on.
 *
 * ```html
 * <fd-input-group-number [disabled]="false" [(ngModel)]="numberValue"></fd-input-group-number>
 * ```
 */
@Component({
    selector: 'fd-input-group-number',
    templateUrl: './input-group-number.component.html',
    styleUrls: ['./input-group.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputGroupNumberComponent),
            multi: true
        }
    ],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputGroupNumberComponent implements ControlValueAccessor {
    /** Whether the input is disabled. */
    @Input()
    disabled: boolean;

    /** Placeholder for the input field. */
    @Input()
    placeholder: string = '';

    /** Aria label for the 'step up' button. */
    @Input()
    stepUpLabel: string = 'Step up';

    /** Aria label for the 'step down' button. */
    @Input()
    stepDownLabel: string = 'Step down';

    /** @hidden */
    inputTextValue: number;

    /** @hidden */
    onChange: any = () => { };

    /** @hidden */
    onTouched: any = () => { };

    /** Get the value of the text input. */
    get inputText() {
        return this.inputTextValue;
    }

    /** Set the value of the text input. */
    set inputText(value) {
        this.inputTextValue = value;
        this.onChange(value);
        this.onTouched();
    }

    /** @hidden */
    constructor(
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    /** @hidden */
    writeValue(value: any) {
        this.inputTextValue = value;
        this.changeDetectorRef.markForCheck();
    }

    /** @hidden */
    registerOnChange(fn) {
        this.onChange = fn;
    }

    /** @hidden */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }

    /** @hidden */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.changeDetectorRef.markForCheck();
    }

    /** @hidden */
    stepUpClicked() {
        this.inputTextValue++;
        this.onChange(this.inputTextValue);
        this.onTouched();
    }

    /** @hidden */
    stepDownClicked() {
        this.inputTextValue--;
        this.onChange(this.inputTextValue);
        this.onTouched();
    }
}
