import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
/**
 * The component that represents a checkbox list.
 *
 * ```html
 * <fd-list>
 *    <li fd-list-item>
 *       <fd-list-checkbox>List item 1</fd-list-checkbox>
 *    </li>
 * </fd-list>
 * ```
 */
export declare class ListCheckboxComponent implements ControlValueAccessor {
    /** Whether the list item checkbox is checked. */
    checked: boolean;
    /** Whether the list item checkbox is disabled. */
    disabled: boolean;
    /** Event fired when the state of the checkbox changes. Passes back the id and the value. */
    readonly onToggle: EventEmitter<{
        id: string;
        value: boolean;
    }>;
    /** Event fired when the checkbox becomes active. */
    readonly onActivated: EventEmitter<string>;
    /** The id of the checkbox. */
    id: string;
    /** @hidden */
    onChange: any;
    /** @hidden */
    onTouched: any;
    /** Set the value of the *isChecked* property. */
    /** Set the value of the *isChecked* property. */
    isChecked: boolean;
    /** @hidden */
    writeValue(value: any): void;
    /** @hidden */
    registerOnChange(fn: any): void;
    /** @hidden */
    registerOnTouched(fn: any): void;
}
