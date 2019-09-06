import { ElementRef, EventEmitter, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { PopoverComponent } from '../popover/popover.component';
import { PopoverFillMode } from '../popover/popover-directive/popover.directive';
/**
 * Input field with multiple selection enabled. Should be used when a user can select between a
 * limited number of pre-defined options with a filter-enabled context.
 *
 * Supports Angular Forms.
 */
export declare class MultiInputComponent implements OnInit, ControlValueAccessor, OnChanges {
    private elRef;
    /** @hidden */
    popoverRef: PopoverComponent;
    /** @hidden */
    multiInputClass: boolean;
    /** Placeholder for the input field. */
    placeholder: string;
    /** Whether the input is disabled. */
    disabled: boolean;
    /** Whether the input is in compact mode. */
    compact: boolean;
    /** Max height of the popover. Any overflowing elements will be accessible through scrolling. */
    maxHeight: string;
    /** Icon of the button on the right of the input field. */
    glyph: string;
    /** Values to be displayed in the unfiltered dropdown. */
    dropdownValues: any[];
    /** Search term, or more specifically the value of the inner input field. */
    searchTerm: string;
    /** Whether the search term should be highlighted in results. */
    highlight: boolean;
    /** Selected dropdown items. */
    selected: any[];
    /** Filter function. Accepts an array and a string as arguments, and outputs an array.
     * An arrow function can be used to access the *this* keyword in the calling component.
     * See multi input examples for details. */
    filterFn: Function;
    /** Display function. Accepts an object of the same type as the
     * items passed to dropdownValues as argument, and outputs a string.
     * An arrow function can be used to access the *this* keyword in the calling component.
     * See multi input examples for details. */
    displayFn: Function;
    /** Aria label for the multi input body. */
    multiInputBodyLabel: string;
    /**
     * Preset options for the popover body width.
     * * `at-least` will apply a minimum width to the body equivalent to the width of the control.
     * * `equal` will apply a width to the body equivalent to the width of the control.
     * * Leave blank for no effect.
     */
    fillControlMode: PopoverFillMode;
    /** Event emitted when the search term changes. Use *$event* to access the new term. */
    readonly searchTermChange: EventEmitter<string>;
    /** Event emitted when the selected items change. Use *$event* to access the new selected array. */
    readonly selectedChange: EventEmitter<any[]>;
    /** @hidden */
    displayedValues: any[];
    /** @hidden */
    isOpen: boolean;
    /** @hidden */
    onChange: Function;
    /** @hidden */
    onTouched: Function;
    /** @hidden */
    constructor(elRef: ElementRef);
    /** @hidden */
    ngOnInit(): void;
    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void;
    /** @hidden */
    registerOnChange(fn: any): void;
    /** @hidden */
    registerOnTouched(fn: any): void;
    /** @hidden */
    setDisabledState(isDisabled: boolean): void;
    /** @hidden */
    writeValue(selected: any[]): void;
    /** @hidden */
    handleSelect(checked: any, value: any): void;
    /** @hidden */
    handleSearchTermChange(): void;
    private defaultFilter;
    private defaultDisplay;
    /** @hidden */
    clickHandler(event: any): void;
}
