import { AfterViewInit, ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges, TemplateRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { MenuItemDirective } from '../menu/menu-item.directive';
import { ComboboxItem } from './combobox-item';
import { MenuKeyboardService } from '../menu/menu-keyboard.service';
import { FocusTrap } from 'focus-trap';
/**
 * Allows users to filter through results and select a value.
 *
 * Supports Angular Forms.
 * ```html
 * <fd-combobox
 *      [(ngModel)]="searchTerm"
 *      [dropdownValues]="dropdownValues"
 *      [placeholder]="'Type some text...'">
 * </fd-combobox>
 * ```
 */
export declare class ComboboxComponent implements ControlValueAccessor, OnInit, OnChanges, AfterViewInit, OnDestroy {
    private elRef;
    private menuKeyboardService;
    /** Values to be filtered in the search input. */
    dropdownValues: any[];
    /** Filter function. Accepts an array of objects and a search term as arguments
     * and returns a string. See search input examples for details. */
    filterFn: Function;
    /** Whether the search input is disabled. **/
    disabled: boolean;
    /** Placeholder of the search input. **/
    placeholder: string;
    /** Icon to display in the right-side button. */
    glyph: string;
    /**
     *  The trigger events that will open/close the options popover, by default it is click, so if user click on
     *  input field, the popover with options will open or close
     *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp).
     */
    triggers: string[];
    /**
     * The template with which to display the individual listed items.
     * Use it by passing an ng-template with implicit content. See examples for more info.
     */
    itemTemplate: TemplateRef<any>;
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
    /** Defines if combobox should behave same as dropdown. When it's enabled writing inside text input won't
     * trigger onChange function, until it matches one of displayed dropdown values. Also communicating with combobox
     * can be achieved only by objects with same type as dropdownValue */
    communicateByObject: boolean;
    /** Display function. Accepts an object of the same type as the
     * items passed to dropdownValues as argument, and outputs a string.
     * An arrow function can be used to access the *this* keyword in the calling component.
     * See search input examples for details. */
    displayFn: Function;
    /** Event emitted when an item is clicked. Use *$event* to retrieve it. */
    readonly itemClicked: EventEmitter<ComboboxItem>;
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
    focusTrap: FocusTrap;
    /** @hidden */
    private readonly onDestroy$;
    /** @hidden */
    onChange: any;
    /** @hidden */
    onTouched: any;
    constructor(elRef: ElementRef, menuKeyboardService: MenuKeyboardService);
    /** @hidden */
    ngOnInit(): void;
    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    /** @hidden */
    ngAfterViewInit(): void;
    /** @hidden */
    onInputKeydownHandler(event: any): void;
    /** @hidden */
    onInputKeyupHandler(event: KeyboardEvent): void;
    /** @hidden */
    onMenuKeydownHandler(event: KeyboardEvent, index: number): void;
    /** @hidden */
    onMenuClickHandler(index: number): void;
    /** Get the input text of the input. */
    /** Set the input text of the input. */
    inputText: string;
    /** @hidden */
    writeValue(value: any): void;
    /** @hidden */
    registerOnChange(fn: any): void;
    /** @hidden */
    registerOnTouched(fn: any): void;
    /** @hidden */
    handleSearchTermChange(): void;
    /** @hidden */
    onPrimaryButtonClick(): void;
    /** @hidden */
    isOpenChangeHandle(isOpen: boolean): void;
    /** @hidden */
    setDisabledState(isDisabled: boolean): void;
    private defaultDisplay;
    private defaultFilter;
    private handleClickActions;
    private getOptionObjectByDisplayedValue;
    private setupFocusTrap;
}
