import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
/**
 * The component that represents an input group.
 * The input group includes form inputs with add-ons that allow the user to better understand the information being entered.
 *
 * ```html
 * <fd-input-group [placement]="'after'" [addOnText]="'$'" [placeholder]="'Amount'">
 * </fd-input-group>
 * ```
 */
export declare class InputGroupComponent implements ControlValueAccessor {
    /**
     * The placement of the add-on.
     * Options include *before* and *after*
     */
    placement: string;
    /** Whether the input group is in compact mode. */
    compact: boolean;
    /** Whether the input group is inline. */
    inline: boolean;
    /** Placeholder for the input group. */
    placeholder: string;
    /** The text for the add-on. */
    addOnText: string;
    /** The icon value for the add-on. */
    glyph: string;
    /** Whether the icon add-on or the text add-on is a button. */
    button: boolean;
    /** Whether the input group is disabled. */
    disabled: boolean;
    /** Event emitted when the add-on button is clicked. */
    addOnButtonClicked: EventEmitter<any>;
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
    /** @hidden */
    buttonClicked($event: any): void;
}
