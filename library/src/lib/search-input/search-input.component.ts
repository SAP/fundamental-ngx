import {
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    Input,
    OnChanges,
    OnInit,
    Output,
    QueryList,
    SimpleChanges,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MenuItemDirective } from '../menu/menu-item.directive';

/**
 * Allows users to filter through results and select.
 * Can also be customized to execute a search function.
 *
 * Supports Angular Forms.
 */
@Component({
    selector: 'fd-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SearchInputComponent),
            multi: true
        }
    ],
    host: {
        class: 'fd-search-input-custom'
    },
    encapsulation: ViewEncapsulation.None
})
export class SearchInputComponent implements ControlValueAccessor, OnInit, OnChanges {

    /** Values to be filtered in the search input. */
    @Input()
    dropdownValues: any[] = [];

    /** Filter function. Accepts an array of objects and a search term as arguments
     * and returns a string. See search input examples for details. */
    @Input()
    filterFn: Function = this.defaultFilter;

    /** Whether the search input is disabled. **/
    @Input()
    disabled: boolean;

    /** Placeholder of the search input. **/
    @Input()
    placeholder: string;

    /** Whether the search input is in a shellbar **/
    @Input()
    inShellbar: boolean = false;

    /** Icon to display in the right-side button. */
    @Input()
    glyph: string = 'search';

    /** Max height of the popover. Any overflowing elements will be accessible through scrolling. */
    @Input()
    maxHeight: string = '200px';

    /** Search function to execute when the Enter key is pressed on the main input. */
    @Input()
    searchFunction: Function;

    /** Whether the search input should be displayed in compact mode. */
    @Input()
    compact: boolean = false;

    /** Whether the matching string should be highlighted during filtration. */
    @Input()
    highlight: boolean = true;

    /** Whether the popover should close when a user selects a result. */
    @Input()
    closeOnSelect: boolean = true;

    /** Whether the input field should be populated with the result picked by the user. */
    @Input()
    fillOnSelect: boolean = true;

    /** Display function. Accepts an object of the same type as the
     * items passed to dropdownValues as argument, and outputs a string.
     * An arrow function can be used to access the *this* keyword in the calling component.
     * See search input examples for details. */
    @Input()
    displayFn: Function = this.defaultDisplay;

    /** Event emitted when an item is clicked. Use *$event* to retrieve it. */
    @Output()
    itemClicked: EventEmitter<{item: any, index: number}> = new EventEmitter<{item: any, index: number}>();

    /** @hidden */
    @ViewChildren(MenuItemDirective)
    menuItems: QueryList<MenuItemDirective>;

    /** @hidden */
    @ViewChild('searchInputElement')
    searchInputElement: ElementRef;

    /** @hidden */
    displayedValues: any[] = [];

    /** @hidden */
    isOpen: boolean = false;

    /** @hidden */
    inputTextValue: string;

    /** @hidden */
    @HostBinding('class.fd-search-input')
    searchInputClass = true;

    /** @hidden */
    @HostBinding('class.fd-search-input--closed')
    shellBarClass = this.inShellbar;

    /** @hidden */
    onInputKeydownHandler(event) {
        if (event.code === 'Enter' && this.searchFunction) {
            this.searchFunction();
        } else if (event.code === 'ArrowDown') {
            event.preventDefault();
            if (this.menuItems && this.menuItems.first) {
                this.menuItems.first.itemEl.nativeElement.children[0].focus();
            }
        }
    }

    /** @hidden */
    onInputKeyupHandler() {
        if (this.inputText.length) {
            this.isOpen = true;
        }
    }

    /** @hidden */
    onMenuKeydownHandler(event, term?) {
        if (event.code === 'Enter' && term) {
            this.handleClickActions(term);
            this.itemClicked.emit({item: term, index: this.dropdownValues.indexOf(term)});
        } else if (event.code === 'ArrowDown') {
            event.preventDefault();
            let foundItem = false;
            const menuItemsArray = this.menuItems.toArray();
            menuItemsArray.forEach((item, index) => {
                if (document.activeElement === item.itemEl.nativeElement.children[0] && !foundItem) {
                    if (menuItemsArray[index + 1]) {
                        menuItemsArray[index + 1].itemEl.nativeElement.children[0].focus();
                    }
                    foundItem = true;
                }
            })
        } else if (event.code === 'ArrowUp') {
            event.preventDefault();
            let foundItem = false;
            const menuItemsArray = this.menuItems.toArray();
            menuItemsArray.forEach((item, index) => {
                if (!foundItem) {
                    if (document.activeElement === item.itemEl.nativeElement.children[0] && index === 0) {
                        this.searchInputElement.nativeElement.focus();
                        foundItem = true;
                    } else if (document.activeElement === item.itemEl.nativeElement.children[0]) {
                        if (menuItemsArray[index - 1]) {
                            menuItemsArray[index - 1].itemEl.nativeElement.children[0].focus();
                        }
                        foundItem = true;
                    }
                }
            });
        }
    }

    /** @hidden */
    onMenuClickHandler(event, term) {
        if (term) {
            this.handleClickActions(term);
            this.itemClicked.emit({item: term, index: this.dropdownValues.indexOf(term)});
        }
    }

    /** @hidden */
    shellbarSearchInputClicked(event) {
        event.stopPropagation();
    }

    /** @hidden */
    onChange: any = () => {};

    /** @hidden */
    onTouched: any = () => {};

    /** Get the input text of the input. */
    get inputText() {
        return this.inputTextValue;
    }

    /** Set the input text of the input. */
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

    private handleClickActions(term): void {
        if (this.closeOnSelect) {
            this.isOpen = false;
        }
        if (this.fillOnSelect) {
            this.inputText = this.displayFn(term);
            this.handleSearchTermChange();
        }
    }

    /** @hidden */
    ngOnInit() {
        if (this.dropdownValues) {
            this.displayedValues = this.dropdownValues;
        }
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges) {
        if (this.dropdownValues && (changes.dropdownValues || changes.searchTerm)) {
            if (this.inputText) {
                this.displayedValues = this.filterFn(this.dropdownValues, this.inputText);
            } else {
                this.displayedValues =  this.dropdownValues;
            }
        }
    }

    /** @hidden */
    handleSearchTermChange(): void {
        this.displayedValues = this.filterFn(this.dropdownValues, this.inputText);
    }

    private defaultDisplay(str: any): string {
        return str;
    }

    private defaultFilter(contentArray: any[], searchTerm: string): any[] {
        const searchLower = searchTerm.toLocaleLowerCase();
        return contentArray.filter(item => {
            if (item) {
                return this.displayFn(item).toLocaleLowerCase().includes(searchLower);
            }
        });
    }

}
