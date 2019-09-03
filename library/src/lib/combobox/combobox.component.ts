import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Input,
    OnChanges, OnDestroy,
    OnInit,
    Output,
    QueryList,
    SimpleChanges, TemplateRef,
    ViewChild,
    ViewChildren,
    ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MenuItemDirective } from '../menu/menu-item.directive';
import { ComboboxItem } from './combobox-item';
import { MenuKeyboardService } from '../menu/menu-keyboard.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import focusTrap, { FocusTrap } from 'focus-trap';

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
    encapsulation: ViewEncapsulation.None
})
export class ComboboxComponent implements ControlValueAccessor, OnInit, OnChanges, AfterViewInit, OnDestroy {

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

    /** Icon to display in the right-side button. */
    @Input()
    glyph: string = 'navigation-down-arrow';

    /**
     *  The trigger events that will open/close the options popover, by default it is click, so if user click on
     *  input field, the popover with options will open or close
     *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp).
     */
    @Input()
    triggers: string[] = ['click'];

    /**
     * The template with which to display the individual listed items.
     * Use it by passing an ng-template with implicit content. See examples for more info.
     */
    @Input()
    itemTemplate: TemplateRef<any>;

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
    displayFn: Function = this.defaultDisplay;

    /** Event emitted when an item is clicked. Use *$event* to retrieve it. */
    @Output()
    readonly itemClicked: EventEmitter<ComboboxItem> = new EventEmitter<ComboboxItem>();

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
    public focusTrap: FocusTrap;

    /** @hidden */
    private readonly onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    onChange: any = () => { };

    /** @hidden */
    onTouched: any = () => { };

    constructor(
        private elRef: ElementRef,
        private menuKeyboardService: MenuKeyboardService
    ) { }

    /** @hidden */
    ngOnInit(): void {
        if (this.dropdownValues) {
            this.displayedValues = this.dropdownValues;
        }
        this.setupFocusTrap();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (this.dropdownValues && (changes.dropdownValues || changes.searchTerm)) {
            if (this.inputText) {
                this.displayedValues = this.filterFn(this.dropdownValues, this.inputText);
            } else {
                this.displayedValues = this.dropdownValues;
            }
        }
    }

    ngOnDestroy(): void {
        this.onDestroy$.next();
        this.onDestroy$.complete();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this.menuKeyboardService.itemClicked
            .pipe(takeUntil(this.onDestroy$))
            .subscribe(index => this.onMenuClickHandler(index));
        this.menuKeyboardService.focusEscapeBeforeList = () => this.searchInputElement.nativeElement.focus();
        this.menuKeyboardService.focusEscapeAfterList = () => { };
    }

    /** @hidden */
    onInputKeydownHandler(event) {
        if (event.code === 'Enter' && this.searchFunction) {
            this.searchFunction();
        } else if (event.code === 'ArrowDown') {
            event.preventDefault();
            if (this.menuItems && this.menuItems.first) {
                this.menuItems.first.focus();
            }
        }
    }

    /** @hidden */
    onInputKeyupHandler(event: KeyboardEvent) {
        if (this.inputText &&
            this.inputText.length &&
            event.code !== 'Escape' &&
            event.code !== 'Space' &&
            event.code !== 'Enter') {
            this.isOpen = true;
            this.isOpenChangeHandle(this.isOpen);
        }
    }

    /** @hidden */
    onMenuKeydownHandler(event: KeyboardEvent, index: number) {
        this.menuKeyboardService.keyDownHandler(event, index, this.menuItems.toArray());
    }

    /** @hidden */
    onMenuClickHandler(index: number) {
        const selectedItem = this.displayedValues[index];
        if (selectedItem) {
            this.handleClickActions(selectedItem);
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
            this.onChange(this.getOptionObjectByDisplayedValue(value));
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
    }

    /** @hidden */
    registerOnChange(fn) {
        this.onChange = fn;
    }

    /** @hidden */
    registerOnTouched(fn) {
        this.onTouched = fn;
    }

    /** @hidden */
    handleSearchTermChange(): void {
        this.displayedValues = this.filterFn(this.dropdownValues, this.inputText);
    }

    /** @hidden */
    onPrimaryButtonClick(): void {
        if (this.searchFunction) {
            this.searchFunction();
        }
    }

    /** @hidden */
    isOpenChangeHandle(isOpen: boolean): void {
        this.isOpen = isOpen;
        this.onTouched();
        if (isOpen) {
            this.focusTrap.activate();
        } else {
            this.focusTrap.deactivate();
        }
    }

    /** @hidden */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
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

    private handleClickActions(term): void {
        if (this.closeOnSelect) {
            this.isOpen = false;
            this.isOpenChangeHandle(this.isOpen);
        }
        if (this.fillOnSelect) {
            this.inputText = this.displayFn(term);
            this.handleSearchTermChange();
        }
    }

    private getOptionObjectByDisplayedValue(displayValue: string): any {
        return this.dropdownValues.find(value => this.displayFn(value) === displayValue);
    }

    private setupFocusTrap(): void {
        try {
            this.focusTrap = focusTrap(this.elRef.nativeElement, {
                clickOutsideDeactivates: true,
                returnFocusOnDeactivate: true,
                escapeDeactivates: false
            });
        } catch (e) {
            console.warn('Unsuccessful attempting to focus trap the Combobox.');
        }
    }

}
