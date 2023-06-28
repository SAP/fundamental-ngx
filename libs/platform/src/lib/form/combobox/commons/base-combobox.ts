import {
    AfterViewInit,
    ChangeDetectorRef,
    ContentChildren,
    Directive,
    ElementRef,
    EventEmitter,
    Host,
    Inject,
    Input,
    OnDestroy,
    Optional,
    Output,
    QueryList,
    Self,
    SkipSelf,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { ControlContainer, NgControl, NgForm } from '@angular/forms';
import {
    ALT,
    BACKSPACE,
    CONTROL,
    DOWN_ARROW,
    ENTER,
    ESCAPE,
    LEFT_ARROW,
    NUMPAD_EIGHT,
    NUMPAD_FIVE,
    NUMPAD_FOUR,
    NUMPAD_NINE,
    NUMPAD_ONE,
    NUMPAD_SEVEN,
    NUMPAD_SIX,
    NUMPAD_THREE,
    NUMPAD_TWO,
    NUMPAD_ZERO,
    RIGHT_ARROW,
    SHIFT,
    TAB,
    UP_ARROW
} from '@angular/cdk/keycodes';
import { fromEvent, isObservable, Observable, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ContentDensity, FocusEscapeDirection, KeyUtil, TemplateDirective } from '@fundamental-ngx/cdk/utils';
import { DialogConfig } from '@fundamental-ngx/core/dialog';
import { ListComponent } from '@fundamental-ngx/core/list';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import {
    ArrayComboBoxDataSource,
    coerceArraySafe,
    CollectionBaseInput,
    ComboBoxDataSource,
    PlatformFormFieldControl,
    isDataSource,
    isFunction,
    isJsObject,
    isOptionItem,
    isString,
    MatchingBy,
    MatchingStrategy,
    ObservableComboBoxDataSource,
    OptionItem,
    PlatformFormField
} from '@fundamental-ngx/platform/shared';
import { PopoverFillMode } from '@fundamental-ngx/core/shared';

import { AutoCompleteEvent } from '../../auto-complete/auto-complete.directive';
import { ComboboxConfig } from '../combobox.config';
import { FD_FORM_FIELD, FD_FORM_FIELD_CONTROL } from '@fundamental-ngx/cdk/forms';

export type TextAlignment = 'left' | 'right';
export type FdpComboBoxDataSource<T> = ComboBoxDataSource<T> | Observable<T[]> | T[];

@Directive()
export abstract class BaseCombobox extends CollectionBaseInput implements AfterViewInit, OnDestroy {
    /** @hidden Method to emit change event */
    abstract emitChangeEvent<K>(value: K): void;

    /** @hidden Define is this item selected */
    abstract isSelectedOptionItem(selectedItem: OptionItem): boolean;

    /** @hidden Emit select OptionItem */
    abstract selectOptionItem(item: OptionItem): void;

    /** @hidden Define value as selected */
    abstract setAsSelected(item: OptionItem[]): void;
    /** Provides maximum height for the optionPanel */
    @Input()
    maxHeight = '250px';

    /** Whether the autocomplete should be enabled; Enabled by default */
    @Input()
    autoComplete = true;

    /**
     * Todo: Name of the entity for which DataProvider will be loaded. You can either pass list of
     * items or use this entityClass and internally we should be able to do lookup to some registry
     * and retrieve the best matching DataProvider that is set on application level
     */
    @Input()
    entityClass: string;

    /** Whether the combobox should be built on mobile mode */
    @Input()
    mobile = false;

    /** Multi Input Mobile Configuration, it's applied only, when mobile is enabled */
    @Input()
    mobileConfig: MobileModeConfig;

    /** Tells the combo if we need to group items */
    @Input()
    group = false;

    /** A field name to use to group data by (support dotted notation) */
    @Input()
    groupKey?: string;

    /** The field to show data in secondary column */
    @Input()
    secondaryKey?: string;

    /** Show the second column (Applicable for two columns layout) */
    @Input()
    showSecondaryText = false;

    /** Horizontally align text inside the second column (Applicable for two columns layout) */
    @Input()
    secondaryTextAlignment: TextAlignment;

    /** Turns on/off Adjustable Width feature */
    @Input()
    autoResize = false;

    /**
     * Preset options for the Select body width, whatever is chosen, the body has a 600px limit.
     * `at-least` will apply a minimum width to the body equivalent to the width of the control. - Default
     * `equal` will apply a width to the body equivalent to the width of the control.
     * 'fit-content' will apply width needed to properly display items inside, independent of control.
     */
    @Input()
    fillControlMode: PopoverFillMode = 'at-least';

    /**
     * Whether AddOn Button should be focusable
     * @default true
     */
    @Input()
    buttonFocusable = false;

    /**
     * The trigger events that will open/close the options popover.
     * Accepts any [HTML DOM Events](https://www.w3schools.com/jsref/dom_obj_event.asp).
     */
    @Input()
    triggers: string[] = [];

    /** Whether the combobox should close, when a click is performed outside its boundaries. True by default */
    @Input()
    closeOnOutsideClick = true;

    /** Whether list item options should be rendered as byline. */
    @Input()
    byline = false;

    /** Datasource for suggestion list */
    @Input()
    set dataSource(value: FdpComboBoxDataSource<any>) {
        if (value) {
            this._initializeDataSource(value);
        }
    }

    get dataSource(): FdpComboBoxDataSource<any> {
        return this._dataSource;
    }

    /** Value of the combobox */
    @Input()
    set value(value: any) {
        const selectedItems = coerceArraySafe(value);
        this.setAsSelected(this._convertToOptionItems(selectedItems));
        super.setValue(value);
    }

    get value(): any {
        return super.getValue();
    }

    /** Event emitted when item is selected. */
    @Output()
    selectionChange = new EventEmitter<ComboboxSelectionChangeEvent>();

    /** Event emitted when data loading is started. */
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output() onDataRequested = new EventEmitter<void>();

    /** Event emitted when data loading is finished. */
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output() onDataReceived = new EventEmitter<void>();

    /** @hidden */
    @ViewChild(ListComponent)
    listComponent: ListComponent;

    /** @hidden */
    @ContentChildren(TemplateDirective)
    customTemplates: QueryList<TemplateDirective>;

    /** @hidden Custom Option item Template */
    optionItemTemplate: TemplateRef<any>;

    /** @hidden Custom Group Header item Template */
    groupItemTemplate: TemplateRef<any>;

    /** @hidden Custom Secondary item Template */
    secondaryItemTemplate: TemplateRef<any>;

    /** @hidden Custom Selected option item Template */
    selectedItemTemplate: TemplateRef<any>;

    /** @hidden */
    searchInputElement: ElementRef<HTMLInputElement>;

    /** @hidden */
    _contentDensity: ContentDensity = this.comboboxConfig.contentDensity;

    /** Input text of the input. */
    set inputText(value: string) {
        this._inputTextValue = value;

        this.onTouched();
    }

    get inputText(): string {
        return this._inputTextValue || '';
    }

    /** Whether the combobox is opened. */
    isOpen = false;

    /** Whether a combobox can be closed */
    get canClose(): boolean {
        return !(this.mobile && this.mobileConfig.approveButtonText);
    }

    /** @hidden List of matched suggestions */
    _suggestions: OptionItem[];

    /** @hidden Max width of list container */
    maxWidth?: number;

    /** @hidden Min width of list container */
    minWidth?: number;

    /** @hidden Need for opening mobile version */
    openChange = new Subject<boolean>();

    /** @hidden */
    get isGroup(): boolean {
        return !!(this.group && this.groupKey);
    }

    /** Is suggestions list empty */
    get isSuggestionsListEmpty(): boolean {
        return this._suggestions.length === 0;
    }

    /** @hidden */
    _flatSuggestions: OptionItem[];

    /** @hidden */
    protected _dataSource: FdpComboBoxDataSource<any>;

    /** @hidden */
    private _inputTextValue: string;

    /** @hidden */
    private _matchingStrategy: MatchingStrategy = this.comboboxConfig.matchingStrategy;

    /** @hidden */
    private _dsSubscription?: Subscription;

    /** @hidden */
    private _element: HTMLElement = this.elementRef.nativeElement;

    /** Keys, that won't trigger the popover's open state, when dispatched on search input */
    private readonly _nonOpeningKeys: number[] = [
        ESCAPE,
        ENTER,
        CONTROL,
        TAB,
        SHIFT,
        UP_ARROW,
        RIGHT_ARROW,
        DOWN_ARROW,
        LEFT_ARROW,
        ALT
    ];

    /** Keys, that are numbers from number keypad */
    private readonly _numberPadNumberKeys: number[] = [
        NUMPAD_ZERO,
        NUMPAD_ONE,
        NUMPAD_TWO,
        NUMPAD_THREE,
        NUMPAD_FOUR,
        NUMPAD_FIVE,
        NUMPAD_SIX,
        NUMPAD_SEVEN,
        NUMPAD_SEVEN,
        NUMPAD_EIGHT,
        NUMPAD_NINE
    ];

    /** @hidden */
    protected constructor(
        readonly cd: ChangeDetectorRef,
        elementRef: ElementRef,
        @Optional() @Self() readonly ngControl: NgControl,
        @Optional() @SkipSelf() readonly controlContainer: ControlContainer,
        @Optional() @Self() readonly ngForm: NgForm,
        @Optional() readonly dialogConfig: DialogConfig,
        protected comboboxConfig: ComboboxConfig,
        @Optional() @SkipSelf() @Host() @Inject(FD_FORM_FIELD) formField: PlatformFormField,
        @Optional() @SkipSelf() @Host() @Inject(FD_FORM_FIELD_CONTROL) formControl: PlatformFormFieldControl
    ) {
        super(cd, elementRef, ngControl, controlContainer, ngForm, formField, formControl);
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._initWindowResize();
        this._assignCustomTemplates();
        super.ngAfterViewInit();
    }

    /** @hidden */
    ngOnDestroy(): void {
        super.ngOnDestroy();

        if (isDataSource(this.dataSource)) {
            (this.dataSource as ComboBoxDataSource<any>).close();
        }

        if (this._dsSubscription) {
            this._dsSubscription.unsubscribe();
        }
    }

    /** Is empty search field */
    get isEmptyValue(): boolean {
        return this.inputText.trim().length === 0;
    }

    /** write value for ControlValueAccessor */
    writeValue(value: any): void {
        const selectedItems = coerceArraySafe(value);
        this.setAsSelected(this._convertToOptionItems(selectedItems));
        super.writeValue(value);
    }

    /** @hidden */
    searchTermChanged(text: string): void {
        if (this.inputText === text) {
            return;
        }
        this.inputText = text;

        const map = new Map();
        map.set('query', text);
        map.set('limit', 12);

        this.ds.match(map);
    }

    /** @hidden */
    isOpenChangeHandle(isOpen: boolean): void {
        if (this.isOpen === isOpen) {
            return;
        }

        this.isOpen = isOpen;
        this.onTouched();
        this.openChange.next(isOpen);

        this.cd.detectChanges();
    }

    /** @hidden */
    handleOptionItem(value: OptionItem): void {
        if (value) {
            this.selectOptionItem(value);
        }

        this.searchInputElement.nativeElement.focus();
    }

    /** @hidden */
    handlePressEnter(event: KeyboardEvent, value: OptionItem): void {
        if (!KeyUtil.isKeyCode(event, ENTER)) {
            return;
        }

        this.handleOptionItem(value);
    }

    /**
     * Handle Click on Button
     * @hidden
     */
    onPrimaryButtonClick(): void {
        // if it's mobile mode ignore this click
        if (this.mobile) {
            return;
        }

        this.isOpenChangeHandle(!this.isOpen);

        if (this.isOpen) {
            this.searchInputElement?.nativeElement.focus();
        }
    }

    /**
     * Handle click on input group in mobile mode
     * @hidden
     */
    openInMobileMode(): void {
        // if it's already opened just ignore this click
        // if it's not mobile mode just ignore this click
        if (this.isOpen || !this.mobile) {
            return;
        }

        // otherwise show options
        this.isOpenChangeHandle(true);
    }

    /**
     * Handle Keydown on Input
     * @hidden
     */
    onInputKeydownHandler(event: KeyboardEvent): void {
        if (this.readonly) {
            return;
        }

        if (KeyUtil.isKeyCode(event, DOWN_ARROW)) {
            event.preventDefault();

            if (event.altKey) {
                this.isOpenChangeHandle(true);
            }

            if (this.isOpen && this.listComponent) {
                this.listComponent.setItemActive(0);
            } else if (!this.isOpen) {
                this._chooseOtherItem(1);
            }
        } else if (KeyUtil.isKeyCode(event, UP_ARROW)) {
            event.preventDefault();

            this._chooseOtherItem(-1);
        } else if (KeyUtil.isKeyCode(event, ESCAPE)) {
            event.stopPropagation();

            this.isOpenChangeHandle(false);
        } else if (!event.ctrlKey && !KeyUtil.isKeyCode(event, this._nonOpeningKeys)) {
            if (!KeyUtil.isKeyCode(event, this._numberPadNumberKeys)) {
                this.isOpenChangeHandle(true);
            }
            const acceptedKeys =
                !KeyUtil.isKeyCode(event, BACKSPACE) &&
                !KeyUtil.isKeyType(event, 'alphabetical') &&
                !KeyUtil.isKeyType(event, 'numeric') &&
                !KeyUtil.isKeyCode(event, this._numberPadNumberKeys);

            if (this.isEmptyValue && acceptedKeys) {
                this.listComponent?.setItemActive(0);
            }
        }
    }

    /** Method passed to list component */
    handleListFocusEscape(direction: FocusEscapeDirection): void {
        if (direction === 'up') {
            this.searchInputElement.nativeElement.focus();
        }
    }

    /** @hidden */
    _onCompleteTerm(event: AutoCompleteEvent): void {
        if (event.forceClose) {
            this.toggleSelectionByInputText(event.term);
            this.isOpenChangeHandle(false);
        }
    }

    /** @hidden */
    toggleSelectionByInputText(text = this.inputText): void {
        let optionItem = this._getSelectItemByInputValue(text);
        if (!optionItem) {
            optionItem = {
                label: text,
                value: text
            };
        }

        this.selectOptionItem(optionItem);
    }

    /** @hidden */
    protected _getSelectItemByInputValue(displayValue: string): OptionItem | undefined {
        return this._flatSuggestions.find((value) => value.label === displayValue);
    }

    /** @hidden */
    protected get ds(): ComboBoxDataSource<any> {
        return this.dataSource as ComboBoxDataSource<any>;
    }

    /** @hidden Map grouped values to array. */
    protected _flatGroups(items: OptionItem[]): OptionItem[] {
        return items.reduce((result: OptionItem[], item: OptionItem) => result.concat(item.children ?? []), []);
    }

    /** @hidden */
    private _displayFn = (value: any): string => this.displayValue(value);

    /** @hidden */
    private _secondaryFn = (value: any): string => {
        if (isOptionItem(value)) {
            return value.secondaryText ?? '';
        }

        if (isJsObject(value) && this.secondaryKey) {
            const currentItem = this.objectGet(value, this.secondaryKey);

            return isFunction(currentItem) ? currentItem() : currentItem;
        }

        return value;
    };

    /**
     * @hidden
     * Method that picks other value moved from current one by offset, called only when combobox is closed
     */
    private _chooseOtherItem(offset: number): void {
        const activeValue = this._getSelectItemByValue(this.inputText);
        const index: number = this._suggestions.findIndex((value) => value === activeValue);

        if (this._suggestions[index + offset]) {
            this.handleOptionItem(this._suggestions[index + offset]);
        }
    }

    /** @hidden */
    private _getSelectItemByValue(displayValue: string): OptionItem | undefined {
        return this._suggestions.find((value) => value.label === displayValue);
    }

    /** @hidden */
    private async _initializeDataSource(ds: FdpComboBoxDataSource<any>): Promise<void> {
        this._suggestions = [];

        if (isDataSource(this.dataSource)) {
            (this.dataSource as ComboBoxDataSource<any>).close();

            if (this._dsSubscription) {
                this._dsSubscription.unsubscribe();
                this._dsSubscription = undefined;
            }
        }

        // initializing data source in the seperate microtask to let all config options to be set before it
        // for example, "isGroup" input is needed for initialization logic and it might not be set at this point
        await Promise.resolve();
        // Convert whatever comes in as DataSource so we can work with it identically
        this._dataSource = this._openDataStream(ds);
    }

    /** @hidden */
    private _openDataStream(ds: FdpComboBoxDataSource<any>): ComboBoxDataSource<any> {
        const initDataSource = this._toDataStream(ds);

        if (initDataSource === undefined) {
            throw new Error(`[dataSource] source did not match an array, Observable, or DataSource`);
        }
        this._dsSubscription = new Subscription();
        /**
         * This is single point of data entry to the component. We dont want to set data on different
         * places. If any new data comes in either you do a search and you want to pass initial data
         * its here.
         */
        const dsSub = initDataSource
            .open()
            .pipe(takeUntil(this._destroyed))
            .subscribe((data) => {
                this._suggestions = this._convertToOptionItems(data);
                this._flatSuggestions = this.isGroup ? this._flatGroups(this._suggestions) : this._suggestions;

                this.stateChanges.next('initDataSource.open().');

                this.cd.markForCheck();
            });
        this._dsSubscription.add(dsSub);

        this._dsSubscription.add(initDataSource.onDataRequested().subscribe(this.onDataRequested));
        this._dsSubscription.add(initDataSource.onDataReceived().subscribe(this.onDataReceived));

        initDataSource.dataProvider.setLookupKey(this.lookupKey);
        const matchingBy: MatchingBy = {
            firstBy: this._displayFn
        };

        if (this.secondaryKey) {
            matchingBy.secondaryBy = this._secondaryFn;
        }

        initDataSource.dataProvider.setMatchingBy(matchingBy);
        initDataSource.dataProvider.setMatchingStrategy(this._matchingStrategy);

        // initial data fetch
        const map = new Map();
        map.set('query', '*');
        map.set('limit', 12);
        initDataSource.match(map);

        return initDataSource;
    }

    /** @hidden */
    private _toDataStream(source: FdpComboBoxDataSource<any>): ComboBoxDataSource<any> | undefined {
        if (isDataSource(source)) {
            return source as ComboBoxDataSource<any>;
        }

        if (Array.isArray(source)) {
            // default implementation to work on top of arrays
            return new ArrayComboBoxDataSource<any>(source);
        }

        if (isObservable(source)) {
            return new ObservableComboBoxDataSource<any>(source);
        }

        return undefined;
    }

    /** @hidden */
    private _initWindowResize(): void {
        this._getOptionsListWidth();

        fromEvent(window, 'resize')
            .pipe(takeUntil(this._destroyed))
            .subscribe(() => this._getOptionsListWidth());
    }

    /** @hidden */
    private _getOptionsListWidth(): void {
        const gap = 5;
        const { offsetWidth, clientWidth } = document.body;
        const { width, left } = (this._element.querySelector('fd-input-group') as HTMLElement).getBoundingClientRect();
        const scrollBarWidth = offsetWidth - clientWidth;

        this.maxWidth = this.autoResize ? window.innerWidth - scrollBarWidth - left - gap : this.minWidth;
        this.minWidth = width - 2;

        this._cd.detectChanges();
    }

    /**
     * Convert original data to OptionItems Interface
     * @hidden
     */
    private _convertToOptionItems(items: any[]): OptionItem[] {
        const item = items[0];

        const elementTypeIsOptionItem = isOptionItem(item);
        if (elementTypeIsOptionItem) {
            return items as OptionItem[];
        }

        const elementTypeIsObject = isJsObject(item);
        if (elementTypeIsObject) {
            return this._convertObjectsToOptionItems(items);
        }

        const elementTypeIsString = isString(item);
        if (elementTypeIsString) {
            return this._convertPrimitiveToOptionItems(items);
        }

        return [];
    }

    /**
     * Convert data to OptionItems Interface
     * @hidden
     */
    private _convertObjectsToOptionItems(items: any[]): OptionItem[] {
        if (this.group && this.groupKey) {
            return this._convertObjectsToGroupOptionItems(items);
        } else if (this.showSecondaryText && this.secondaryKey) {
            return this._convertObjectsToSecondaryOptionItems(items);
        } else {
            return this._convertObjectsToDefaultOptionItems(items);
        }
    }

    /**
     * Convert object[] data to Group OptionItems Interface
     * @hidden
     */
    private _convertObjectsToGroupOptionItems<K>(items: K[]): OptionItem[] {
        const group: { [key: string]: K[] } = {};

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const keyValue = this.groupKey && item[this.groupKey];
            if (!keyValue) {
                continue;
            }

            if (!group[keyValue]) {
                group[keyValue] = [];
            }

            group[keyValue].push(item);
        }

        return Object.keys(group).map((key) => {
            const selectItem: OptionItem = {
                label: key,
                value: null,
                isGroup: true
            };

            const currentGroup = group[key];

            if (this.showSecondaryText && this.secondaryKey) {
                selectItem.children = this._convertObjectsToSecondaryOptionItems(currentGroup);
            } else {
                selectItem.children = this._convertObjectsToDefaultOptionItems(currentGroup);
            }

            return selectItem;
        });
    }

    /**
     * Convert object[] data to Secondary OptionItems Interface
     * @hidden
     */
    private _convertObjectsToSecondaryOptionItems<K>(items: K[]): OptionItem[] {
        const selectItems: OptionItem[] = [];

        for (let i = 0; i < items.length; i++) {
            const value = items[i];
            selectItems.push({
                label: this.displayValue(value),
                secondaryText: this.objectGet(value, this.secondaryKey),
                value
            });
        }

        return selectItems;
    }

    /**
     * Convert Primitive data(Boolean, String, Number) to OptionItems Interface
     * @hidden
     */
    private _convertPrimitiveToOptionItems(items: any[]): OptionItem[] {
        const selectItems: OptionItem[] = [];

        for (let i = 0; i < items.length; i++) {
            const value = items[i];
            selectItems.push({ label: value, value });
        }

        return selectItems;
    }

    /**
     * Convert object[] to OptionItems Interface (Default)
     * @hidden
     */
    private _convertObjectsToDefaultOptionItems(items: any[]): OptionItem[] {
        const selectItems: OptionItem[] = [];

        for (let i = 0; i < items.length; i++) {
            const value = items[i];
            selectItems.push({
                label: this.displayValue(value),
                value
            });
        }

        return selectItems;
    }

    /** @hidden Assign custom templates */
    private _assignCustomTemplates(): void {
        this.customTemplates.forEach((template) => {
            switch (template.getName()) {
                case 'optionItemTemplate':
                    this.optionItemTemplate = template.templateRef;
                    break;
                case 'groupItemTemplate':
                    this.groupItemTemplate = template.templateRef;
                    break;
                case 'secondaryItemTemplate':
                    this.secondaryItemTemplate = template.templateRef;
                    break;
                case 'selectedItemTemplate':
                    this.selectedItemTemplate = template.templateRef;
                    break;
            }
        });
    }
}
