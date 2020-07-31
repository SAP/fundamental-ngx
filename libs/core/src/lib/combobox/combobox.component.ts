import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    forwardRef,
    Injector,
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
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import focusTrap, { FocusTrap } from 'focus-trap';
import { FormStates } from '../form/form-control/form-states';
import { PopoverComponent } from '../popover/popover.component';
import { GroupFunction } from '../utils/pipes/list-group.pipe';
import { InputGroupComponent } from '../input-group/input-group.component';
import { KeyUtil } from '../utils/functions/key-util';
import { AutoCompleteEvent } from './auto-complete.directive';
import { MobileModeConfig } from '../utils/interfaces/mobile-mode-config';
import { COMBOBOX_COMPONENT, ComboboxInterface } from './combobox.interface';
import { DynamicComponentService } from '../utils/dynamic-component/dynamic-component.service';
import { ComboboxMobileComponent } from './combobox-mobile/combobox-mobile.component';

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
export class ComboboxComponent implements ComboboxInterface, ControlValueAccessor, OnInit, OnChanges, AfterViewInit, OnDestroy {

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
    glyph = 'navigation-down-arrow';

    /**
     *  The trigger events that will open/close the options popover.
     *  Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp).
     */
    @Input()
    triggers: string[] = [];

    /** Whether the combobox should close, when a click is performed outside its boundaries. True by default */
    @Input()
    closeOnOutsideClick = true;

    /**
     * Whether the combobox should open, when any key is pressed in input (except Escape, Space, Enter). True by default
     */
    @Input()
    openOnKeyboardEvent = true;

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
    maxHeight = '50vh';

    /** Search function to execute when the Enter key is pressed on the main input. */
    @Input()
    searchFn: Function;

    /** Whether the search input should be displayed in compact mode. */
    @Input()
    compact = false;

    /** Whether the matching string should be highlighted during filtration. */
    @Input()
    highlighting = true;

    /** Whether the popover should close when a user selects a result. */
    @Input()
    closeOnSelect = true;

    /** Whether the input field should be populated with the result picked by the user. */
    @Input()
    fillOnSelect = true;

    /** Whether the autocomplete should be enabled; Enabled by default */
    @Input()
    autoComplete = true;

    /** Defines if combobox should behave same as dropdown. When it's enabled writing inside text input won't
     * trigger onChange function, until it matches one of displayed dropdown values. Also communicating with combobox
     * can be achieved only by objects with same type as dropdownValue */
    @Input()
    communicateByObject = false;

    /** Display function. Accepts an object of the same type as the
     * items passed to dropdownValues as argument, and outputs a string.
     * An arrow function can be used to access the *this* keyword in the calling component.
     * See search input examples for details. */
    @Input()
    displayFn: Function = this._defaultDisplay;

    /** Whether AddOn Button should be focusable, set to false by default */
    @Input()
    buttonFocusable = false;

    /** Whether the combobox is readonly. */
    @Input()
    readOnly = false;

    /** Whether the combobox should be built on mobile mode */
    @Input()
    mobile = false;

    /** Multi Input Mobile Configuration, it's applied only, when mobile is enabled */
    @Input()
    mobileConfig: MobileModeConfig;

    /** Event emitted when an item is clicked. Use *$event* to retrieve it. */
    @Output()
    readonly itemClicked: EventEmitter<ComboboxItem> = new EventEmitter<ComboboxItem>();

    /** Event emitted, when the combobox's popover body is opened or closed */
    @Output()
    readonly openChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** Event emitted when the input text changes. */
    @Output()
    inputTextChange: EventEmitter<string> = new EventEmitter<string>();

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

    /** @hidden */
    @ViewChild('controlTemplate')
    controlTemplate: TemplateRef<any>;

    /** @hidden */
    @ViewChild('listTemplate')
    listTemplate: TemplateRef<any>;

    /** Keys, that won't trigger the popover's open state, when dispatched on search input */
    readonly nonOpeningKeys: string[] = [
        'Escape',
        'Enter',
        'ArrowLeft',
        'ArrowRight',
        'ArrowDown',
        'ArrowUp',
        'Ctrl',
        'Tab',
        'Shift'
    ];

    /** Keys, that will close popover's body, when dispatched on search input */
    readonly closingKeys: string[] = [
        'Escape'
    ];

    /** Whether the combobox is opened. */
    open = false;

    /**
     * Whether or not the input coup is in the shellbar. Only for internal use by combobox component
     * @hidden
     */
    inShellbar = false;

    /** @hidden */
    displayedValues: any[] = [];

    /** @hidden */
    inputTextValue: string;

    /** @hidden */
    public focusTrap: FocusTrap;

    /** @hidden */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    onChange: any = () => {
    };

    /** @hidden */
    onTouched: any = () => {
    };

    /** @hidden */
    constructor(
        private _elementRef: ElementRef,
        private _menuKeyboardService: MenuKeyboardService,
        private _cdRef: ChangeDetectorRef,
        private _dynamicComponentService: DynamicComponentService
    ) {
    }

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
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._setupKeyboardService();
        this._addShellbarClass();
        if (this.mobile) {
            this._setUpMobileMode();
        }
    }

    /** @hidden */
    onInputKeydownHandler(event: KeyboardEvent): void {
        if (KeyUtil.isKey(event, 'Enter')) {
            if (this.searchFn) {
                this.searchFn();
            }
            this._moveCursorToInputEnd();
        } else if (KeyUtil.isKey(event, 'ArrowDown')) {
            if (event.altKey) {
                this._resetDisplayedValues();
                this.isOpenChangeHandle(true);
            }
            if (this.open && this.listItems && this.listItems.first) {
                this.listItems.first.focus();
            } else if (!this.open) {
                this._chooseOtherItem(1);
            }
            event.preventDefault();
        } else if (KeyUtil.isKey(event, 'ArrowUp')) {
            this._chooseOtherItem(-1);
            event.preventDefault();
        } else if (KeyUtil.isKey(event, this.closingKeys)) {
            this.isOpenChangeHandle(false);
            event.stopPropagation();
        } else if (this.openOnKeyboardEvent &&
            !event.ctrlKey &&
            !KeyUtil.isKey(event, this.nonOpeningKeys)) {
            this.isOpenChangeHandle(true);
        }
    }

    /** @hidden */
    onListKeydownHandler(event: KeyboardEvent): void {
        const index: number = this.listItems.toArray().findIndex(
            item => item.itemEl.nativeElement === document.activeElement
        );
        this._menuKeyboardService.keyDownHandler(event, index, this.listItems.toArray());
    }

    /** @hidden */
    onMenuClickHandler(value: any): void {
        if (value) {
            const index: number = this.dropdownValues.findIndex(_value => _value === value);
            this._handleClickActions(value);
            this.itemClicked.emit({ item: value, index: index });
        }
    }

    /** Handle dialog dismissing, closes popover and sets backup data. */
    dialogDismiss(term: string): void {
        this.inputText = term;
        this.isOpenChangeHandle(false);
    }

    /** Handle dialog approval, closes popover and propagates data changes. */
    dialogApprove(): void {
        this._propagateChange();
        this.isOpenChangeHandle(false);
    }

    /** Get the input text of the input. */
    get inputText(): string {
        return this.inputTextValue;
    }

    /** Set the input text of the input. */
    set inputText(value) {
        this.inputTextValue = value;
        this.inputTextChange.emit(value);
        if (!this.mobile) {
            this._propagateChange();
        }
        this.onTouched();
    }

    /** @hidden */
    writeValue(value: any): void {
        this.inputTextValue = this.displayFn(value);
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
        this.displayedValues = this.filterFn(this.dropdownValues, this.inputText);
        if (this.popoverComponent) {
            this.popoverComponent.updatePopover();
        }
    }

    /** @hidden */
    onPrimaryButtonClick(event: MouseEvent): void {
        // Prevent primary button click behaviour on mobiles
        if (this.mobile) {
            return;
        }

        if (this.searchFn) {
            this.searchFn();
        }
        event.preventDefault();
        event.stopPropagation();
        this._resetDisplayedValues();
        this.isOpenChangeHandle(!this.open);
        this.searchInputElement.nativeElement.focus();
    }

    /** @hidden */
    isOpenChangeHandle(isOpen: boolean): void {
        /** Reset displayed values on every mobile open */
        if (this.mobile && !this.open) {
            this._resetDisplayedValues();
        }

        if (this.open !== isOpen) {
            this.open = isOpen;
            this.onTouched();
            if (!this.mobile) {
                this._popoverOpenHandle();
            }
            this.openChange.emit(isOpen);
        }

        if (!this.open && !this.mobile) {
            this.handleBlur();
        }

        this._cdRef.detectChanges();
    }

    /** @hidden */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this._cdRef.detectChanges();
    }

    /** Method that handles complete event from auto complete directive, setting the new value, and closing popover */
    handleAutoComplete(event: AutoCompleteEvent): void {
        this.inputText = event.term;
        this.handleSearchTermChange();
        if (event.forceClose) {
            this.isOpenChangeHandle(false);
        }
    }

    /** @hidden */
    handleBlur(): void {
        if (!this.open) {
            this.handleAutoComplete({
                term: this.searchInputElement.nativeElement.value,
                forceClose: false
            });
        }
        this._moveCursorToInputEnd();
    }

    /** Method that picks other value moved from current one by offset, called only when combobox is closed */
    private _chooseOtherItem(offset: number): void {
        const activeValue: any = this._getOptionObjectByDisplayedValue(this.inputTextValue);
        const index: number = this.dropdownValues.findIndex(value => value === activeValue);
        if (this.dropdownValues[index + offset]) {
            this.onMenuClickHandler(this.dropdownValues[index + offset]);
        }
    }

    /** Method that reset filtering for displayed values. It overrides displayed values by all possible dropdown values */
    private _resetDisplayedValues(): void {
        this.displayedValues = this.dropdownValues;
    }

    /** @hidden */
    private _setupKeyboardService(): void {
        this._menuKeyboardService.itemClicked
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((index) => this.onMenuClickHandler(index));
        this._menuKeyboardService.focusEscapeBeforeList = () => this.searchInputElement.nativeElement.focus();
        this._menuKeyboardService.focusEscapeAfterList = () => {
        };
    }

    /** @hidden */
    private _addShellbarClass(): void {
        if (this.inShellbar) {
            this.searchInputElement.nativeElement.classList.add('fd-shellbar__input-group__input');
            if (this.inputGroup) {
                this.inputGroup.setInShellbar(true);
            }
        }
    }

    /** @hidden */
    private _defaultDisplay(str: any): string {
        return str;
    }

    /** @hidden */
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


    /** @hidden*/
    private _popoverOpenHandle(): void {
        if (this._hasDisplayedValues) {
            this.focusTrap.activate();
        } else {
            this.focusTrap.deactivate();
        }
    }

    /** @hidden */
    private _handleClickActions(term: any): void {
        if (this.closeOnSelect) {
            this.isOpenChangeHandle(false);
        }
        if (this.fillOnSelect) {
            this.inputText = this.displayFn(term);
            this.searchInputElement.nativeElement.value = this.inputText;

            if (this.mobile) {
                this._propagateChange();
            }
        }
        this.handleSearchTermChange();
    }

    /** @hidden */
    private _getOptionObjectByDisplayedValue(displayValue: string): any {
        return this.dropdownValues.find((value) => this.displayFn(value) === displayValue);
    }

    /** @hidden */
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

    /** @hidden */
    private _refreshDisplayedValues(): void {
        if (this.inputText) {
            this.displayedValues = this.filterFn(this.dropdownValues, this.inputText);
        } else {
            this.displayedValues = this.dropdownValues;
        }
    }


    /** @hidden */
    private _hasDisplayedValues(): boolean {
        return this.open && this.displayedValues && this.displayedValues.length > 0;
    }

    /** @hidden */
    private _moveCursorToInputEnd(): void {
        const value = this.searchInputElement.nativeElement.value;
        this.searchInputElement.nativeElement.setSelectionRange(value.length, value.length);
    }

    /** @hidden */
    private _propagateChange(): void {
        if (this.communicateByObject) {
            this.onChange(this._getOptionObjectByDisplayedValue(this.inputTextValue));
        } else {
            this.onChange(this.inputTextValue);
        }
    }

    /** @hidden */
    private _setUpMobileMode(): void {
        this._dynamicComponentService.createDynamicComponent(
            { listTemplate: this.listTemplate, controlTemplate: this.controlTemplate },
            ComboboxMobileComponent,
            { container: this._elementRef.nativeElement },
            { injector: Injector.create({ providers: [{ provide: COMBOBOX_COMPONENT, useValue: this }] }) }
        );
    }
}
