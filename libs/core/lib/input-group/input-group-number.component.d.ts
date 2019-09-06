import { ControlValueAccessor } from '@angular/forms';
/**
 * The component that represents an integer value input.
 * The value is increased or decreased using the spinner add-on.
 *
 * ```html
 * <fd-input-group-number [disabled]="false" [(ngModel)]="numberValue"></fd-input-group-number>
 * ```
 */
export declare class InputGroupNumberComponent implements ControlValueAccessor {
    /** Whether the input is disabled. */
    disabled: boolean;
    /** Placeholder for the input field. */
    placeholder: string;
    /** Aria label for the 'step up' button. */
    stepUpLabel: string;
    /** Aria label for the 'step down' button. */
    stepDownLabel: string;
    /** @hidden */
    inputTextValue: number;
    /** @hidden */
    onChange: any;
    /** @hidden */
    onTouched: any;
    /** Get the value of the text input. */
    /** Set the value of the text input. */
    inputText: number;
    /** @hidden */
    writeValue(value: any): void;
    /** @hidden */
    registerOnChange(fn: any): void;
    /** @hidden */
    registerOnTouched(fn: any): void;
    /** @hidden */
    stepUpClicked(): void;
    /** @hidden */
    stepDownClicked(): void;
}
