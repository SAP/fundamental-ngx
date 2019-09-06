import { ElementRef, EventEmitter, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
/**
 * The Toggle component is used to activate or deactivate an element.
 * It uses a visual metaphor to inform the user of the state of the toggle.
 */
export declare class ToggleComponent implements OnInit, ControlValueAccessor {
    /** @hidden */
    inputElement: ElementRef<HTMLInputElement>;
    /**
     * The size of the toggle.
     * Can be one of the four *xs*, *s*, *l*, *error* or default.
     */
    size: string;
    /** Whether the toggle is disabled. */
    disabled: boolean;
    /** Id for the toggle component. If omitted, a unique one is generated. */
    id: string;
    /** Whether the toggle is checked. */
    checked: boolean;
    /** aria-label attribute of the inner input element. */
    ariaLabel: string;
    /** aria-labelledby attribute of the inner input element. */
    ariaLabelledby: string;
    /**
     * Event fired when the state of the toggle changes.
     * *$event* can be used to retrieve the new state of the toggle.
     */
    readonly checkedChange: EventEmitter<boolean>;
    /** @hidden */
    onChange: any;
    /** @hidden */
    onTouched: any;
    /** @hidden */
    ngOnInit(): void;
    /** Set focus on the input element. */
    focus(): void;
    /** Get the id of the inner input element of the toggle. */
    readonly innerInputId: string;
    /** Get the isChecked property of the toggle. */
    /** Set the isChecked property of the toggle. */
    isChecked: boolean;
    /**
     * @hidden
     * @param value Sets the value of the *checked* property of the toggle.
     */
    writeValue(value: any): void;
    /**
     * @hidden
     * @param fn User defined function that handles the *onChange* event of the toggle.
     */
    registerOnChange(fn: any): void;
    /**
     * @hidden
     * @param fn User defined function that handles the *onTouch* event of the toggle.
     */
    registerOnTouched(fn: any): void;
    /**
     * @hidden
     * @param isDisabled Sets the value of the *disabled* property of the toggle.
     */
    setDisabledState(isDisabled: boolean): void;
}
