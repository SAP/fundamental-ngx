import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    SimpleChanges,
    TemplateRef,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ListItemDirective } from '../list/list-item.directive';
import { ListMessageDirective } from '../list/list-message.directive';
import { ComboboxItem } from './combobox-item';
import { MenuKeyboardService } from '../menu/menu-keyboard.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import focusTrap, { FocusTrap } from 'focus-trap';
import { FormStates } from '../form/form-control/form-states';
import { PopoverComponent } from '../popover/popover.component';
import { GroupFunction } from '../utils/pipes/list-group.pipe';
import { InputGroupComponent } from '../input-group/input-group.component';
import { KeyUtil } from '../..';

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
@Component({
    selector: 'fd-combobox',
    templateUrl: './combobox.component.html',
    styleUrls: ['./combobox.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ComboboxComponent),
            multi: true
        },
        MenuKeyboardService
    ],
    host: {
        '[class.fd-combobox-custom-class]': 'true',
        '[class.fd-combobox-input]': 'true'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComboboxComponent implements ControlValueAccessor, OnInit, OnChanges, AfterViewInit, OnDestroy {
    /** Values to be filtered in the search input. */
    @Input()
    dropdownValues: any[] = [];

    /** Filter function. Accepts an array of objects and a search term as arguments
     * and returns a string. See search input examples for details. */
    @Input()
    filterFn: Function = this._defaultFilter;

    /** Whether the search input is disabled. **/
    @Input()
    disabled: boolean;

    /** Placeholder of the search input. **/
    @Input()
    placeholder: string;

    /** Icon to display in the right-side button. */
    @Input()
    glyph: string = 'navigation-down-arrow';

    /**
     *  The trigger events that will open/close the options popover.
     *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp).
     */
    @Input()
    triggers: string[] = [];

    /** Whether the combobox should close, when a click is performed outside its boundaries. True by default */
    @Input()
    closeOnOutsideClick: boolean = true;

    /**
     * Whether the combobox should open, when any key is pressed in input (except Escape, Space, Enter). True by default
     */
    @Input()
    openOnKeyboardEvent: boolean = true;

    /**
     *  The state of the form control - applies css classes.
     *  Can be `success`, `error`, `warning`, `information` or blank for default.
     */
    @Input()
    state: FormStates;

    /**
     * The template with which to display the individual listed items.
     * Use it by passing an ng-template with implicit content. See examples for more info.
     */
    @Input()
    itemTemplate: TemplateRef<any>;

    /**
     * Function used to handle grouping of items.
     */
    @Input()
    groupFn: GroupFunction;

    /** Max height of the popover. Any overflowing elements will be accessible through scrolling. */
    @Input()
    maxHeight: string = '50vh';

    /** Search function to execute when the Enter key is pressed on the main input. */
    @Input()
    searchFn: Function;

    /** Whether the search input should be displayed in compact mode. */
    @Input()
    compact: boolean = false;

    /** Whether the matching string should be highlighted during filtration. */
    @Input()
    highlighting: boolean = true;

    /** Whether the popover should close when a user selects a result. */
    @Input()
    closeOnSelect: boolean = true;

    /** Whether the input field should be populated with the result picked by the user. */
    @Input()
    fillOnSelect: boolean = true;

    /** Defines if combobox should behave same as dropdown. When it's enabled writing inside text input won't
     * trigger onChange function, until it matches one of displayed dropdown values. Also communicating with combobox
     * can be achieved only by objects with same type as dropdownValue */
    @Input()
    communicateByObject: boolean = false;

    /** Display function. Accepts an object of the same type as the
     * items passed to dropdownValues as argument, and outputs a string.
     * An arrow function can be used to access the *this* keyword in the calling component.
     * See search input examples for details. */
    @Input()
    displayFn: Function = this._defaultDisplay;

    /** Whether AddOn Button should be focusable, set to false by default */
    @Input()
    buttonFocusable: boolean = false;

    /** Whether the combobox is part of the shellbar, used to add shellbar-specific styles */
    @Input()
    inShellbar: boolean = false;

    /** Whether the combobox is readonly. */
    @Input()
    readOnly: boolean = false;

    /** Event emitted when an item is clicked. Use *$event* to retrieve it. */
    @Output()
    readonly itemClicked: EventEmitter<ComboboxItem> = new EventEmitter<ComboboxItem>();

    /** Event emitted, when the combobox's popover body is opened or closed */
    @Output()
    readonly openChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** @hidden */
    @ViewChildren(ListItemDirective)
    listItems: QueryList<ListItemDirective>;

    /** @hidden */
    @ViewChild('searchInputElement')
    searchInputElement: ElementRef;

    /** @hidden */
    @ViewChild(PopoverComponent)
    popoverComponent: PopoverComponent;

    /** @hidden */
    @ViewChild(InputGroupComponent)
    inputGroup: InputGroupComponent;

    /** @hidden */
    @ContentChildren(ListMessageDirective)
    listMessages: QueryList<ListMessageDirective>;

    /** Whether the combobox is opened. */
    open: boolean = false;

    /** @hidden */
    selectedTermSubject$: BehaviorSubject<string> = new BehaviorSubject<string>('');

    /** @hidden */
    displayedValues: any[] = [];

    /** @hidden */
    inputTextValue: string;

    /** @hidden */
    public focusTrap: FocusTrap;

    /** @hidden */
    private readonly onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    private programmaticFocusChange: boolean = false;

    /** @hidden */
    onChange: any = () => {};

    /** @hidden */
    onTouched: any = () => {};

    constructor(
        private _elementRef: ElementRef,
        private _menuKeyboardService: MenuKeyboardService,
        private _cdRef: ChangeDetectorRef
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this._refreshDisplayedValues();
        this._setupFocusTrap();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (this.dropdownValues && (changes.dropdownValues || changes.searchTerm)) {
            this._refreshDisplayedValues();
        }
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._setupKeyboardService();
        this._addShellbarClass();
    }

    /** @hidden */
    onInputKeydownHandler(event: KeyboardEvent): void {
        if (KeyUtil.isKey(event, 'Enter')) {
            if (this.searchFn) {
                this.searchFn();
            }
        } else if (KeyUtil.isKey(event, 'ArrowDown')) {
            if (event.altKey) {
                this.isOpenChangeHandle(true);
            }
            event.preventDefault();
            if (this.listItems && this.listItems.first) {
                this._focusListItem(this.listItems.first);
            }
        } else if (KeyUtil.isKey(event, 'Escape')) {
            this.focusLost();
        }
    }

    /** @hidden */
    onInputKeyupHandler(event: KeyboardEvent): void {
        if (this._inputKeyupTextChanged(event)) {
            this.isOpenChangeHandle(true);
            // If there are displayed values and the input text has changed since this function was last ran
            if (this._hasDisplayedValues()) {
                let foundCloseMatch = false;
                this.displayedValues.forEach((displayedValue, i) => {
                    // Try to find an exact match. If one is found, focus it. Otherwise, check if a displayedValue starts with input value
                    if (this.searchInputElement.nativeElement.value === this.displayFn(displayedValue)) {
                        this._focusListItem(this.listItems.toArray()[i])
                    } else if (this.displayFn(displayedValue).toLocaleLowerCase()
                            .startsWith(this.inputText.toLocaleLowerCase()) && !foundCloseMatch) {
                        foundCloseMatch = true;
                        if (!KeyUtil.isKey(event, 'Backspace') && !KeyUtil.isKey(event, 'Delete')) {
                            this._typeahead(displayedValue, event);
                        }
                    }
                });
            }
        } else if (KeyUtil.isKey(event, 'Enter') && this._hasDisplayedValues()) {
            this._inputEnterKeyup();
        }
        this.selectedTermSubject$.next(this.searchInputElement.nativeElement.value);
    }

    /** @hidden */
    onListKeydownHandler(event: KeyboardEvent, index: number): void {
        this._menuKeyboardService.keyDownHandler(event, index, this.listItems.toArray());
    }

    /** @hidden */
    onMenuClickHandler(index: number): void {
        const selectedItem = this.displayedValues[index];
        if (selectedItem) {
            this._handleClickActions(selectedItem);
            this.itemClicked.emit({ item: selectedItem, index: index });
        }
    }

    /** Get the input text of the input. */
    get inputText(): string {
        return this.inputTextValue;
    }

    /** Set the input text of the input. */
    set inputText(value) {
        this.inputTextValue = value;
        if (this.communicateByObject) {
            this.onChange(this._getOptionObjectByDisplayedValue(value));
        } else {
            this.onChange(value);
        }
        this.onTouched();
    }

    /** @hidden */
    writeValue(value: any): void {
        if (this.communicateByObject) {
            this.inputTextValue = this.displayFn(value);
        } else {
            this.inputTextValue = value;
        }
        this._cdRef.markForCheck();
    }

    /** @hidden */
    registerOnChange(fn): void {
        this.onChange = fn;
    }

    /** @hidden */
    registerOnTouched(fn): void {
        this.onTouched = fn;
    }

    /** @hidden */
    handleSearchTermChange(): void {
        let foundMatch = false;
        this.dropdownValues.forEach((value) => {
            if (this.displayFn(value) === this.inputText) {
                foundMatch = true;
            }
        });
        foundMatch
            ? (this.displayedValues = this.dropdownValues)
            : (this.displayedValues = this.filterFn(this.dropdownValues, this.inputText));
        if (this.popoverComponent) {
            this.popoverComponent.updatePopover();
        }
        if (!this.inputText) {
            this.isOpenChangeHandle(false);
        }
    }

    /** @hidden */
    onPrimaryButtonClick(): void {
        if (this.searchFn) {
            this.searchFn();
        }
        this.isOpenChangeHandle(!this.open);
    }

    /** @hidden */
    isOpenChangeHandle(isOpen: boolean): void {
        this.selectedTermSubject$.next(this.searchInputElement.nativeElement.value);
        if (this.open !== isOpen) {
            this.open = isOpen;
            this.openChange.emit(this.open);
            this.onTouched();
            if (this._hasDisplayedValues()) {
                this.focusTrap.activate();
            } else {
                this.focusTrap.deactivate();
            }
        }
    }

    /** @hidden */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this._cdRef.detectChanges();
    }

    /** @hidden */
    focusLost(): void {
        if (this.programmaticFocusChange) {
            this.programmaticFocusChange = false;
        } else if (this.open) {
            let foundMatch = false;
            this.displayedValues.forEach((value, i) => {
                if (this.searchInputElement.nativeElement.value === this.displayFn(value)) {
                    this.onMenuClickHandler(i);
                    foundMatch = true;
                    this._setCursorToLastChar();
                }
            });
            if (!foundMatch) {
                this.isOpenChangeHandle(false);
            }
        }
    }

    /** Method that reset filtering for displayed values. It overrides displayed values by all possible dropdown values */
    public resetDisplayedValues(): void {
        this.displayedValues = this.dropdownValues;
    }

    /** @hidden */
    private _setupKeyboardService(): void {
        this._menuKeyboardService.itemClicked
            .pipe(takeUntil(this.onDestroy$))
            .subscribe((index) => this.onMenuClickHandler(index));
        this._menuKeyboardService.focusEscapeBeforeList = () => {
            this.programmaticFocusChange = true;
            this.searchInputElement.nativeElement.focus();
        };
        this._menuKeyboardService.focusEscapeAfterList = () => {};
    }

    /** @hidden */
    private _addShellbarClass(): void {
        if (this.inShellbar) {
            this.searchInputElement.nativeElement.classList.add('fd-shellbar__input-group__input');
        }
    }

    private _defaultDisplay(str: any): string {
        return str;
    }

    private _defaultFilter(contentArray: any[], searchTerm: any): any[] {
        if (typeof searchTerm === 'string') {
            const searchLower = searchTerm.toLocaleLowerCase();
            return contentArray.filter((item) => {
                if (item) {
                    return this.displayFn(item).toLocaleLowerCase().includes(searchLower);
                }
            });
        } else if (typeof searchTerm === 'object') {
            return contentArray.filter((item) => {
                if (item === searchTerm) {
                    return item;
                }
            });
        }
    }

    private _handleClickActions(term): void {
        if (this.closeOnSelect) {
            this.isOpenChangeHandle(false);
        }
        if (this.fillOnSelect) {
            this.inputText = this.displayFn(term);
        }
        this.handleSearchTermChange();
    }

    private _getOptionObjectByDisplayedValue(displayValue: string): any {
        return this.dropdownValues.find((value) => this.displayFn(value) === displayValue);
    }

    private _setupFocusTrap(): void {
        try {
            this.focusTrap = focusTrap(this._elementRef.nativeElement, {
                clickOutsideDeactivates: true,
                returnFocusOnDeactivate: true,
                escapeDeactivates: false
            });
        } catch (e) {
            console.warn('Unsuccessful attempting to focus trap the Combobox.');
        }
    }

    private _refreshDisplayedValues(): void {
        if (this.inputText) {
            this.displayedValues = this.filterFn(this.dropdownValues, this.inputText);
        } else {
            this.displayedValues = this.dropdownValues;
        }
    }

    private _hasDisplayedValues(): boolean {
        return this.open && this.displayedValues && this.displayedValues.length > 0;
    }

    private _setCursorToLastChar(): void {
        const inputValueLength = this.searchInputElement.nativeElement.value.length;
        this.searchInputElement.nativeElement.setSelectionRange(inputValueLength, inputValueLength);
    }

    private _focusListItem(item: ListItemDirective): void {
        this.programmaticFocusChange = true;
        item.focus();
    }

    private _typeahead(displayedValue: string, event: KeyboardEvent): void {
        this.searchInputElement.nativeElement.value = this.displayFn(displayedValue);
        const selectionStartIndex = this.inputText.length;
        this.searchInputElement.nativeElement.setSelectionRange(selectionStartIndex,
            this.displayFn(displayedValue).length);
    }

    private _inputKeyupTextChanged(event: KeyboardEvent): boolean {
        return this.openOnKeyboardEvent &&
        !KeyUtil.isKey(event, 'Escape') &&
        !KeyUtil.isKey(event, ' ') &&
        !KeyUtil.isKey(event, 'Tab') &&
        !KeyUtil.isKey(event, 'Enter') &&
        !KeyUtil.isKey(event, 'Alt') &&
        !KeyUtil.isKey(event, 'Ctrl') &&
        !KeyUtil.isKey(event, 'Meta') &&
        !KeyUtil.isKey(event, 'Shift')
    }

    private _inputEnterKeyup(): void {
        // If the user presses enter and there are displayed values, select the value that matches the input
        this.displayedValues.forEach((value, i) => {
            if (this.displayFn(value) === this.searchInputElement.nativeElement.value) {
                this.onMenuClickHandler(i);
            }
        });
        this.isOpenChangeHandle(false);
        this._setCursorToLastChar();
    }
}
