import { ControlValueAccessor } from '@angular/forms';
/**
 * The component that represents a search input group.
 *
 * ```html
 * <fd-input-group-search [disabled]="false" [(ngModel)]="searchTerm"></fd-input-group-search>
 * ```
 */
export declare class InputGroupSearchComponent implements ControlValueAccessor {
    /** Whether the input is disabled. */
    disabled: boolean;
    /** Placeholder for the input field. */
    placeholder: any;
    /** Aria label for the 'clear' button. */
    clearLabel: string;
    /** @hidden */
    inputTextValue: string;
    /** @hidden */
    onChange: any;
    /** @hidden */
    onTouched: any;
    /** Get the value of the text input. */
    /** Set the value of the text input. */
    inputText: string;
    /** @hidden */
    writeValue(value: any): void;
    /** @hidden */
    registerOnChange(fn: any): void;
    /** @hidden */
    registerOnTouched(fn: any): void;
}
