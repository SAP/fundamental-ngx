import {
    AfterViewInit,
    ChangeDetectorRef,
    ContentChildren,
    Directive,
    ElementRef,
    EventEmitter,
    Host,
    Inject,
    InjectionToken,
    Input,
    OnChanges,
    OnDestroy,
    Optional,
    Output,
    QueryList,
    Self,
    SimpleChanges,
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
    RIGHT_ARROW,
    SHIFT,
    TAB,
    UP_ARROW
} from '@angular/cdk/keycodes';

import { BehaviorSubject, fromEvent, isObservable, Observable, Subject, Subscription, timer } from 'rxjs';
import { takeUntil, skip } from 'rxjs/operators';
import equal from 'fast-deep-equal';

import { DialogConfig } from '@fundamental-ngx/core/dialog';
import { RangeSelector } from '@fundamental-ngx/cdk/utils';
import { ContentDensity, FocusEscapeDirection, KeyUtil, TemplateDirective } from '@fundamental-ngx/cdk/utils';
import { ListComponent } from '@fundamental-ngx/core/list';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { PopoverFillMode } from '@fundamental-ngx/core/shared';
import { FormStates } from '@fundamental-ngx/cdk/forms';
import {
    ArrayMultiComboBoxDataSource,
    coerceArraySafe,
    CollectionBaseInput,
    PlatformFormFieldControl,
    isDataSource,
    isFunction,
    isJsObject,
    isOptionItem,
    isSelectableOptionItem,
    isString,
    MatchingBy,
    MatchingStrategy,
    MultiComboBoxDataSource,
    ObservableMultiComboBoxDataSource,
    PlatformFormField,
    SelectableOptionItem
} from '@fundamental-ngx/platform/shared';

import { TextAlignment } from '../../combobox';
import { MultiComboboxConfig } from '../multi-combobox.config';
import { FD_FORM_FIELD, FD_FORM_FIELD_CONTROL } from '@fundamental-ngx/cdk/forms';

export const MAP_LIMIT = new InjectionToken<number>('Map limit≥', { factory: () => 12 });

export type FdpMultiComboboxDataSource<T> = MultiComboBoxDataSource<T> | Observable<T[]> | T[];

export class MultiComboboxSelectionChangeEvent {
    /**
     * Multi Combobox selection change event
     * @param source Multi Combobox component
     * @param selectedItems Selected items
     */
    constructor(
        public source: BaseMultiCombobox,
        public selectedItems: SelectableOptionItem['value'] // Contains selected items
    ) {}
}

@Directive()
export abstract class BaseMultiCombobox extends CollectionBaseInput implements OnChanges, AfterViewInit, OnDestroy {
    /** Provides selected items. */
    @Input()
    selectedItems: any[] = [];

    /** Provides maximum height for the optionPanel. */
    @Input()
    maxHeight = '250px';

    /**
     * Whether AddOn Button should be focusable
     * @default true
     */
    @Input()
    buttonFocusable = false;

    /** Datasource for suggestion list. */
    @Input()
    set dataSource(value: FdpMultiComboboxDataSource<any>) {}
    get dataSource(): FdpMultiComboboxDataSource<any> {
        return this._dataSource;
    }

    /** Whether the autocomplete should be enabled; Enabled by default. */
    @Input()
    autoComplete = true;

    /**
     * TODO: Name of the entity for which DataProvider will be loaded. You can either pass list of
     * items or use this entityClass and internally we should be able to do lookup to some registry
     * and retrieve the best matching DataProvider that is set on application level
     */
    @Input()
    entityClass: string;

    /** Whether the multi-combobox should be built on mobile mode. */
    @Input()
    mobile = false;

    /** Multi Combobox Mobile Configuration, it's applied only, when mobile is enabled. */
    @Input()
    mobileConfig: MobileModeConfig;

    /** Tells the multi-combobox if we need to group items. */
    @Input()
    group = false;

    /** A field name to use to group data by (support dotted notation). */
    @Input()
    groupKey: string;

    /** The field to show data in secondary column. */
    @Input()
    secondaryKey: string;

    /** Show the second column (applicable for two columns layout). */
    @Input()
    showSecondaryText = false;

    /** Horizontally align text inside the second column (applicable for two columns layout). */
    @Input()
    secondaryTextAlignment: TextAlignment = 'right';

    /** Turns on/off Adjustable Width feature. */
    @Input()
    autoResize = false;

    /** Value of the multi combobox */
    @Input()
    set value(value: any) {
        super.setValue(value, true);
    }
    get value(): any {
        return super.getValue();
    }

    /**
     * Preset options for the Select body width, whatever is chosen, the body has a 600px limit.
     * * `at-least` will apply a minimum width to the body equivalent to the width of the control. - Default
     * * `equal` will apply a width to the body equivalent to the width of the control.
     * * 'fit-content' will apply width needed to properly display items inside, independent of control.
     */
    @Input()
    fillControlMode: PopoverFillMode = 'at-least';

    /** Sets title attribute to addon button. */
    @Input()
    addonIconTitle: string;

    /** Sets invalid entry message. */
    @Input()
    invalidEntryMessage = 'Invalid entry';

    /** Turns limitless mode, ON or OFF */
    @Input()
    limitless: boolean;

    /** Whether to open the dropdown when the addon button is clicked. */
    @Input()
    openDropdownOnAddOnClicked = true;

    /** Event emitted when item is selected. */
    @Output()
    selectionChange = new EventEmitter<MultiComboboxSelectionChangeEvent>();

    /** @hidden Emits event when the menu is opened/closed. */
    @Output()
    isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** Event emitted when data loading is started. */
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output() onDataRequested = new EventEmitter<void>();

    /** Event emitted when data loading is finished. */
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    @Output() onDataReceived = new EventEmitter<void>();

    /** Emits event when the addon button is clicked. */
    @Output()
    addOnButtonClicked: EventEmitter<Event> = new EventEmitter<Event>();

    /** @hidden */
    @ViewChild(ListComponent)
    listComponent: ListComponent;

    /** @hidden */
    @ViewChild('searchInputElement', { read: ElementRef })
    searchInputElement: ElementRef;

    /** @hidden */
    @ContentChildren(TemplateDirective)
    customTemplates: QueryList<TemplateDirective>;

    /**
     * @hidden
     * Custom Option item Template.
     */
    optionItemTemplate: TemplateRef<any>;

    /**
     * @hidden
     * Custom Group Header item Template.
     */
    groupItemTemplate: TemplateRef<any>;

    /**
     * @hidden
     * Custom Secondary item Template.
     */
    secondaryItemTemplate: TemplateRef<any>;

    /**
     * @hidden
     * Custom Selected option item Template.
     */
    selectedItemTemplate: TemplateRef<any>;

    /** @hidden */
    _contentDensity: ContentDensity = this.multiComboboxConfig.contentDensity;

    /** @hidden */
    listTemplate: TemplateRef<any>;

    /** Set the input text of the input. */
    set inputText(value: string) {
        this._inputTextValue = value;

        this.onTouched();
    }

    /** Get the input text of the input. */
    get inputText(): string {
        return this._inputTextValue || '';
    }

    /** Is empty search field. */
    get isEmptyValue(): boolean {
        return this.inputText.trim().length === 0;
    }

    /** @hidden */
    get isGroup(): boolean {
        return !!(this.group && this.groupKey);
    }

    /** Whether the Multi Input is opened. */
    isOpen = false;

    /**
     * @hidden
     * List of matched suggestions
     */
    _suggestions: SelectableOptionItem[];

    /**
     * @hidden
     * Grouped suggestions mapped to array.
     */
    _flatSuggestions: SelectableOptionItem[] = [];

    /** @hidden */
    _fullFlatSuggestions: SelectableOptionItem[] = [];

    /**
     * @hidden
     * List of selected suggestions
     */
    _selectedSuggestions: SelectableOptionItem[];

    /**
     * @hidden
     * Max width of list container
     */
    maxWidth: number;

    /**
     * @hidden
     * Min width of list container
     */
    minWidth: number;

    /**
     * @hidden
     * Need for opening mobile version
     */
    openChange = new Subject<boolean>();

    /** @hidden */
    selectedShown$ = new BehaviorSubject(false);

    /** @hidden */
    protected _dataSource: FdpMultiComboboxDataSource<any>;

    /** @hidden */
    private _inputTextValue: string;

    /** @hidden */
    private _previousInputText: string;

    /** @hidden */
    private _matchingStrategy: MatchingStrategy = this.multiComboboxConfig.matchingStrategy;

    /** @hidden */
    private _dsSubscription: Subscription | null = null;

    /** @hidden */
    private _element: HTMLElement = this.elementRef.nativeElement;

    /**
     * @hidden
     * Keys, that won't trigger the popover's open state, when dispatched on search input.
     */
    private readonly _nonOpeningKeys: number[] = [
        BACKSPACE,
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

    /** @hidden */
    private _timerSub$: Subscription;

    /** @hidden */
    private _previousState?: FormStates;

    /** @hidden */
    private _previousStateMessage: Nullable<string>;

    /** @hidden */
    protected readonly _rangeSelector = new RangeSelector();

    /** @hidden */
    private _displayFn = (value: any): string => this.displayValue(value);

    /** @hidden */
    private _secondaryFn = (value: any): string => {
        if (isOptionItem(value)) {
            return value.secondaryText ?? '';
        } else if (isJsObject(value) && this.secondaryKey) {
            const currentItem = this.objectGet(value, this.secondaryKey);

            return isFunction(currentItem) ? currentItem() : currentItem;
        } else {
            return value;
        }
    };

    /** @hidden */
    protected constructor(
        protected readonly _cd: ChangeDetectorRef,
        elementRef: ElementRef,
        @Optional() @Self() readonly ngControl: NgControl,
        @Optional() @SkipSelf() controlContainer: ControlContainer,
        @Optional() @SkipSelf() readonly ngForm: NgForm,
        @Optional() readonly dialogConfig: DialogConfig,
        protected multiComboboxConfig: MultiComboboxConfig,
        @Optional() @SkipSelf() @Host() @Inject(FD_FORM_FIELD) formField: PlatformFormField,
        @Optional() @SkipSelf() @Host() @Inject(FD_FORM_FIELD_CONTROL) formControl: PlatformFormFieldControl,
        @Inject(MAP_LIMIT) private _mapLimit: number
    ) {
        super(_cd, elementRef, ngControl, controlContainer, ngForm, formField, formControl);
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        const dataSourceChange = changes['dataSource'];

        if (dataSourceChange) {
            this._initializeDataSource(dataSourceChange.currentValue);
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._initWindowResize();
        this._assignCustomTemplates();
        this._previousInputText = this.inputText;
        super.ngAfterViewInit();
    }

    /** @hidden */
    ngOnDestroy(): void {
        super.ngOnDestroy();

        if (isDataSource(this.dataSource)) {
            (this.dataSource as MultiComboBoxDataSource<any>).close();
        }

        if (this._dsSubscription) {
            this._dsSubscription.unsubscribe();
        }
    }

    /**
     * @hidden
     * Method to set input text as item label.
     */
    abstract setInputTextFromOptionItem(item: SelectableOptionItem): void;

    /**
     * @hidden
     * Toggle item selection.
     */
    abstract toggleSelection(item: SelectableOptionItem): void;

    /**
     * @hidden
     * Toggle item selection by input text value.
     */
    abstract toggleSelectionByInputText(): void;

    /** write value for ControlValueAccessor */
    writeValue(value: any): void {
        this.selectedItems = coerceArraySafe(value);
        super.writeValue(this.selectedItems);
        this._setSelectedSuggestions();
        this._emitChangeEvent();
    }

    /** @hidden */
    popoverOpenChangeHandle(isOpen: boolean): void {
        this.isOpen = isOpen;
        this._rangeSelector.reset();
    }

    /** Opens the select popover body. */
    open(): void {
        this.isOpen = true;
        this.isOpenChange.emit(this.isOpen);
        this._cd.markForCheck();
    }

    /** Closes the select popover body. */
    close(): void {
        this._rangeSelector.reset();
        this.selectedShown$.next(false);
        this.inputText = '';
        this._focusToSearchField();

        this.isOpen = false;
        this.isOpenChange.emit(this.isOpen);
        this._cd.markForCheck();
    }

    /** @hidden */
    showList(isOpen: boolean): void {
        if (this.isOpen !== isOpen) {
            this.isOpen = isOpen;
            this.onTouched();
            this.openChange.next(isOpen);
        }

        if (!this.isOpen) {
            this.searchTermChanged('');
        }

        this._cd.markForCheck();
    }

    /** @hidden */
    searchTermChanged(text: string = this.inputText): void {
        if (text) {
            this.open();
        }

        const map = new Map();
        map.set('query', text);

        if (!this.limitless) {
            map.set('limit', this._mapLimit);
        }

        this.ds.match(map);

        this._cd.markForCheck();
    }

    /**
     * Handle Click on Button
     * @hidden
     */
    onPrimaryButtonClick(isOpen: boolean): void {
        if (!isOpen) {
            this.searchTermChanged('');
        }

        if (this.openDropdownOnAddOnClicked) {
            this.showList(!isOpen);
        } else if (this.isOpen) {
            this.showList(false);
        }

        this.searchInputElement?.nativeElement.focus();
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
                this.showList(true);
            }

            if (this.isOpen && this.listComponent) {
                this.listComponent.setItemActive(0);
            } else if (!this.isOpen) {
                this._chooseOtherItem(1);
            }
        } else if (KeyUtil.isKeyCode(event, UP_ARROW)) {
            event.preventDefault();

            this._chooseOtherItem(-1);
        } else if (KeyUtil.isKeyCode(event, ENTER)) {
            this.toggleSelectionByInputText();
        } else if (KeyUtil.isKeyCode(event, ESCAPE)) {
            event.stopPropagation();

            this.showList(false);
        } else if (!KeyUtil.isKeyCode(event, [...this._nonOpeningKeys, CONTROL])) {
            this.showList(true);
            const acceptedKeys = !KeyUtil.isKeyType(event, 'alphabetical') && !KeyUtil.isKeyType(event, 'numeric');
            if (acceptedKeys) {
                // SetTimeout is needed for input to receive new value.
                setTimeout(() => {
                    if (this.isEmptyValue) {
                        this.listComponent?.setItemActive(0);
                    }
                });
            }
        }
    }

    /** Method passed to list component */
    handleListFocusEscape(direction: FocusEscapeDirection): void {
        if (direction === 'up') {
            this.searchInputElement?.nativeElement.focus();
        }
    }

    /**
     * @hidden
     * Method to emit change event
     */
    _emitChangeEvent(): void {
        const event = new MultiComboboxSelectionChangeEvent(this, this.value);

        this.selectionChange.emit(event);
    }

    /**
     * Used to change the value of a control.
     * @param value the value to be applied
     * @param emitOnChange whether to emit "onChange" event.
     * Should be "false", if the change is made programmatically (internally) by the control, "true" otherwise
     */
    protected setValue(value: any, emitOnChange = true): void {
        this.selectedItems = coerceArraySafe(value);
        super.setValue(this.selectedItems, emitOnChange);
        this._setSelectedSuggestions();
        this._emitChangeEvent();
    }

    /** @hidden */
    protected _setSelectedSuggestions(): void {
        this._selectedSuggestions = [];

        if (!this.selectedItems?.length) {
            return;
        }

        for (let i = 0; i <= this.selectedItems.length; i++) {
            const selectedItem = this.selectedItems[i];
            const idx = this._fullFlatSuggestions.findIndex(
                (item) => item.label === selectedItem || item.value === selectedItem
            );
            if (idx !== -1) {
                this._selectedSuggestions.push(this._fullFlatSuggestions[idx]);
                this._fullFlatSuggestions[idx].selected = true;
            }
        }

        this._cd.detectChanges();
    }

    /** @hidden */
    protected get ds(): MultiComboBoxDataSource<any> {
        return this.dataSource as MultiComboBoxDataSource<any>;
    }

    /** @hidden */
    protected _focusToSearchField(): void {
        this.searchInputElement?.nativeElement.focus();
    }

    /** @hidden
     * Method that picks other value moved from current one by offset, called only when Multi Combobox is closed */
    private _chooseOtherItem(offset: number): void {
        if (this._selectedSuggestions?.length === this._flatSuggestions.length) {
            this.inputText = '';
            return;
        }

        const activeValue = this._getSelectItemByInputValue(this.inputText);
        const index = this._flatSuggestions.findIndex((value) => value === activeValue);
        const position = !this.inputText && offset === -1 ? this._flatSuggestions.length - 1 : index + offset;
        const item = this._flatSuggestions[position];

        if (item) {
            this.setInputTextFromOptionItem(item);
        }

        const selectedIndex = this._selectedSuggestions.findIndex((value) => value.label === item?.label);
        if (selectedIndex !== -1) {
            this._chooseOtherItem(offset);
        }
    }

    /** @hidden */
    protected _getSelectItemByInputValue(displayValue: string): SelectableOptionItem | undefined {
        return this._flatSuggestions.find((value) => value.label === displayValue);
    }

    /** @hidden
     *  Map grouped values to array. */
    protected _flattenGroups(items: SelectableOptionItem[]): SelectableOptionItem[] {
        return items.reduce((result, item) => result.concat(item.children ?? []), <SelectableOptionItem[]>[]);
    }

    /** @hidden */
    private _initializeDataSource(ds: FdpMultiComboboxDataSource<any>): void {
        this._suggestions = [];
        this._flatSuggestions = [];

        if (isDataSource(this.dataSource)) {
            (this.dataSource as MultiComboBoxDataSource<any>).close();

            if (this._dsSubscription) {
                this._dsSubscription.unsubscribe();
                this._dsSubscription = null;
            }
        }
        // Convert whatever comes in as DataSource so we can work with it identically
        this._dataSource = this._openDataStream(ds);
    }

    /** @hidden */
    private _openDataStream(ds: FdpMultiComboboxDataSource<any>): MultiComboBoxDataSource<any> {
        const initDataSource = this._toDataStream(ds);
        let isInitDataSource = true;

        if (initDataSource === undefined) {
            throw new Error(`[dataSource] source did not match an array, Observable, or DataSource`);
        }

        initDataSource.limitless = this.limitless;

        /**
         * This is single point of data entry to the component. We dont want to set data on different
         * places. If any new data comes in either you do a search and you want to pass initial data
         * its here.
         */
        this._dsSubscription = new Subscription();
        const dsSub = initDataSource
            .open()
            .pipe(skip(1), takeUntil(this._destroyed))
            .subscribe((data) => {
                if (data.length === 0) {
                    this._processingEmptyData();

                    return;
                } else {
                    this._previousInputText = this.inputText;
                }

                this._suggestions = this._convertToOptionItems(data).map((optionItem: SelectableOptionItem) => {
                    const selectedElement = this._selectedSuggestions.find(
                        (selectedItem: SelectableOptionItem) => selectedItem.id === optionItem.id
                    );
                    if (selectedElement) {
                        optionItem.selected = selectedElement.selected;
                    }
                    return optionItem;
                });

                this._flatSuggestions = this.isGroup ? this._flattenGroups(this._suggestions) : this._suggestions;

                if (isInitDataSource) {
                    this._fullFlatSuggestions = this._flatSuggestions;
                    isInitDataSource = false;
                }

                const selectedSuggestionsLength = this._selectedSuggestions.length;
                if (selectedSuggestionsLength > 0) {
                    for (let i = 0; i < selectedSuggestionsLength; i++) {
                        const selectedSuggestion = this._selectedSuggestions[i];
                        const idx = this._suggestions.findIndex((item) => equal(item.value, selectedSuggestion.value));

                        if (idx !== -1) {
                            this._suggestions[idx].selected = true;
                        }
                    }
                }

                this.stateChanges.next('initDataSource.open().');

                this._cd.markForCheck();
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

        if (!this.limitless) {
            map.set('limit', MAP_LIMIT);
        }

        initDataSource.match(map);

        return initDataSource;
    }

    /** @hidden */
    private _processingEmptyData(): void {
        this._cd.detectChanges();

        this.inputText = this._previousInputText;

        this._setInvalidEntry();

        if (this._timerSub$) {
            this._timerSub$.unsubscribe();
        }

        this._timerSub$ = timer(3000).subscribe(() => this._unsetInvalidEntry());
    }

    /** @hidden */
    private _setInvalidEntry(): void {
        if (this._previousState || this._previousStateMessage) {
            return;
        }

        this._previousState = this.state;
        this.state = 'error';

        this._previousStateMessage = this.stateMessage;
        this.stateMessage = this.invalidEntryMessage;

        this._cd.markForCheck();
    }

    /** @hidden */
    private _unsetInvalidEntry(): void {
        this.state = this._previousState;
        this._previousState = undefined;

        this.stateMessage = this._previousStateMessage;
        this._previousStateMessage = undefined;

        this._cd.markForCheck();
    }

    /** @hidden */
    private _toDataStream(source: FdpMultiComboboxDataSource<any>): MultiComboBoxDataSource<any> | undefined {
        if (isDataSource(source)) {
            return source as MultiComboBoxDataSource<any>;
        }

        if (Array.isArray(source)) {
            return new ArrayMultiComboBoxDataSource<any>(source);
        }

        if (isObservable(source)) {
            return new ObservableMultiComboBoxDataSource<any>(source);
        }

        return undefined;
    }

    /** @hidden */
    private _initWindowResize(): void {
        this._getOptionsListWidth();

        if (!this.autoResize) {
            return;
        }

        fromEvent(window, 'resize')
            .pipe(takeUntil(this._destroyed))
            .subscribe(() => this._getOptionsListWidth());
    }

    /** @hidden */
    private _getOptionsListWidth(): void {
        const body = document.body;
        const rect = (this._element.querySelector('fd-input-group') as HTMLElement).getBoundingClientRect();
        const scrollBarWidth = body.offsetWidth - body.clientWidth;
        this.maxWidth = this.autoResize ? window.innerWidth - scrollBarWidth - rect.left : this.minWidth;
        this.minWidth = rect.width - 2;
        this._cd.markForCheck();
    }

    /**
     * Convert original data to SelectableOptionItems Interface
     * @hidden
     */
    private _convertToOptionItems(items: any[]): SelectableOptionItem[] {
        const item = items[0];

        const elementTypeIsOptionItem = isSelectableOptionItem(item);
        if (elementTypeIsOptionItem) {
            return items as SelectableOptionItem[];
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
     * Convert data to SelectableOptionItems Interface
     * @hidden
     */
    private _convertObjectsToOptionItems(items: any[]): SelectableOptionItem[] {
        if (this.isGroup) {
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
    protected _convertObjectsToGroupOptionItems<K>(items: K[]): SelectableOptionItem[] {
        const group: { [key: string]: K[] } = {};

        for (let i = 0; i < items.length; i++) {
            const item = items[i];
            const keyValue = item[this.groupKey];
            if (!keyValue) {
                continue;
            }

            if (!group[keyValue]) {
                group[keyValue] = [];
            }

            group[keyValue].push(item);
        }

        return Object.keys(group).map((key) => {
            const selectItem: SelectableOptionItem = {
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
     * Convert object[] data to Secondary SelectableOptionItems Interface
     * @hidden
     */
    private _convertObjectsToSecondaryOptionItems<K>(items: K[]): SelectableOptionItem[] {
        const selectItems: SelectableOptionItem[] = [];

        for (let i = 0; i < items.length; i++) {
            const value = items[i];
            selectItems.push({
                label: this.displayValue(value),
                id: this.lookupValue(value),
                secondaryText: this.objectGet(value, this.secondaryKey),
                value,
                selected: this.selectedItems?.includes(value) || false
            });
        }

        return selectItems;
    }

    /**
     * Convert Primitive data(Boolean, String, Number) to SelectableOptionItems Interface
     * @hidden
     */
    private _convertPrimitiveToOptionItems(items: any[]): SelectableOptionItem[] {
        const selectItems: SelectableOptionItem[] = [];
        for (let i = 0; i < items.length; i++) {
            const value = items[i];
            selectItems.push({
                label: value,
                id: this.lookupValue(value),
                value,
                selected: this.selectedItems?.includes(value) || false
            });
        }

        return selectItems;
    }

    /**
     * Convert object[] to SelectableOptionItems Interface (Default)
     * @hidden
     */
    private _convertObjectsToDefaultOptionItems(items: any[]): SelectableOptionItem[] {
        const selectItems: SelectableOptionItem[] = [];

        for (let i = 0; i < items.length; i++) {
            const value = items[i];
            selectItems.push({
                label: this.displayValue(value),
                id: this.lookupValue(value),
                value,
                selected: this.selectedItems?.includes(value) || false
            });
        }

        return selectItems;
    }

    /**
     * @hidden
     * Assign custom templates
     */
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
