import { ElementRef, EventEmitter, OnChanges, OnInit, QueryList, SimpleChanges } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { MenuItemDirective } from '../menu/menu-item.directive';
/**
 * Allows users to filter through results and select.
 * Can also be customized to execute a search function.
 *
 * Supports Angular Forms.
 */
export declare class SearchInputComponent implements ControlValueAccessor, OnInit, OnChanges {
    /** Values to be filtered in the search input. */
    dropdownValues: any[];
    /** Filter function. Accepts an array of objects and a search term as arguments
     * and returns a string. See search input examples for details. */
    filterFn: Function;
    /** Whether the search input is disabled. **/
    disabled: boolean;
    /** Placeholder of the search input. **/
    placeholder: string;
    /** Whether the search input is in a shellbar **/
    inShellbar: boolean;
    /** Icon to display in the right-side button. */
    glyph: string;
    /** Max height of the popover. Any overflowing elements will be accessible through scrolling. */
    maxHeight: string;
    /** Search function to execute when the Enter key is pressed on the main input. */
    searchFunction: Function;
    /** Whether the search input should be displayed in compact mode. */
    compact: boolean;
    /** Whether the matching string should be highlighted during filtration. */
    highlighting: boolean;
    /** Whether the popover should close when a user selects a result. */
    closeOnSelect: boolean;
    /** Whether the input field should be populated with the result picked by the user. */
    fillOnSelect: boolean;
    /** Display function. Accepts an object of the same type as the
     * items passed to dropdownValues as argument, and outputs a string.
     * An arrow function can be used to access the *this* keyword in the calling component.
     * See search input examples for details. */
    displayFn: Function;
    /** Event emitted when an item is clicked. Use *$event* to retrieve it. */
    itemClicked: EventEmitter<{
        item: any;
        index: number;
    }>;
    /** @hidden */
    menuItems: QueryList<MenuItemDirective>;
    /** @hidden */
    searchInputElement: ElementRef;
    /** @hidden */
    displayedValues: any[];
    /** @hidden */
    isOpen: boolean;
    /** @hidden */
    inputTextValue: string;
    /** @hidden */
    searchInputClass: boolean;
    /** @hidden */
    shellBarClass: boolean;
    /** @hidden */
    onInputKeydownHandler(event: any): void;
    /** @hidden */
    onInputKeyupHandler(): void;
    /** @hidden */
    onMenuKeydownHandler(event: any, term?: any): void;
    /** @hidden */
    onMenuClickHandler(event: any, term: any): void;
    /** @hidden */
    shellbarSearchInputClicked(event: any): void;
    /** @hidden */
    onChange: any;
    /** @hidden */
    onTouched: any;
    /** Get the input text of the input. */
    /** Set the input text of the input. */
    inputText: string;
    /** @hidden */
    writeValue(value: any): void;
    /** @hidden */
    registerOnChange(fn: any): void;
    /** @hidden */
    registerOnTouched(fn: any): void;
    private handleClickActions;
    /** @hidden */
    ngOnInit(): void;
    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void;
    /** @hidden */
    handleSearchTermChange(): void;
    private defaultDisplay;
    private defaultFilter;
}
