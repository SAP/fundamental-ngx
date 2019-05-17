import { Component, Input, forwardRef, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * The component that represents a search input group.
 *
 * ```html
 * <fd-input-group-search [disabled]="false" [(ngModel)]="searchTerm"></fd-input-group-search>
 * ```
 */
@Component({
    selector: 'fd-input-group-search',
    templateUrl: './input-group-search.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputGroupSearchComponent),
            multi: true
        }
    ],
    encapsulation: ViewEncapsulation.None
})
export class InputGroupSearchComponent implements ControlValueAccessor {
    /** Whether the input is disabled. */
    @Input()
    disabled: boolean;

    /** Placeholder for the input field. */
    @Input()
    placeholder;

    /** Aria label for the 'clear' button. */
    @Input()
    clearLabel: string = 'Clear';

    /** @hidden */
    inputTextValue: string;

    /** @hidden */
    onChange: any = () => {};

    /** @hidden */
    onTouched: any = () => {};

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
    writeValue(value: any) {
        this.inputTextValue = value;
    }

    /** @hidden */
    registerOnChange(fn) {
        this.onChange = fn;
    }

    /** @hidden */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
}
