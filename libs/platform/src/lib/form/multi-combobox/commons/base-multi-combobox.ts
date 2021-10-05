import {
    AfterViewInit,
    ChangeDetectorRef,
    ContentChildren,
    Directive,
    ElementRef,
    EventEmitter,
    Host,
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
import { NgControl, NgForm } from '@angular/forms';
import {
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

import { BehaviorSubject, fromEvent, isObservable, Observable, Subject, Subscription } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';

import { DialogConfig } from '@fundamental-ngx/core/dialog';
import { ContentDensity, FocusEscapeDirection, KeyUtil, TemplateDirective } from '@fundamental-ngx/core/utils';
import { FormControlComponent } from '@fundamental-ngx/core/form';
import { ListComponent } from '@fundamental-ngx/core/list';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { PopoverFillMode } from '@fundamental-ngx/core/shared';
import {
    ArrayMultiComboBoxDataSource,
    coerceArraySafe,
    CollectionBaseInput,
    FormField,
    FormFieldControl,
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
    SelectableOptionItem
} from '@fundamental-ngx/platform/shared';
import { ListConfig } from '@fundamental-ngx/platform/list';
import { TextAlignment } from '../../combobox';

export type FdpMultiComboboxDataSource<T> = MultiComboBoxDataSource<T> | Observable<T[]> | T[];

export class MultiComboboxSelectionChangeEvent {
    constructor(
        public source: BaseMultiCombobox,
        public selectedItems: SelectableOptionItem['value'] // Contains selected items
    ) {}
}

@Directive()
export abstract class BaseMultiCombobox extends CollectionBaseInput implements AfterViewInit, OnDestroy {
    /** Provides selected items. */
    @Input()
    selectedItems: any[] = [];

    /** Provides maximum height for the optionPanel. */
    @Input()
    maxHeight = '250px';

    /** Datasource for suggestion list. */
    @Input()
    set dataSource(value: FdpMultiComboboxDataSource<any>) {
        if (value) {
            this._initializeDataSource(value);
        }
    }
    get dataSource(): FdpMultiComboboxDataSource<any> {
        return this._dataSource;
    }

    /** Whether the autocomplete should be enabled; Enabled by default. */
    @Input()
    autoComplete = true;

    /** Content Density of element.
     * Can be 'cozy', 'compact'. */
    @Input()
    set contentDensity(contentDensity: ContentDensity) {
        this._contentDensity = contentDensity;
        this.isCompact = contentDensity === 'compact';
    }

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
    groupKey?: string;

    /** The field to show data in secondary column. */
    @Input()
    secondaryKey?: string;

    /** Show the second column (applicable for two columns layout). */
    @Input()
    showSecondaryText = false;

    /** Horizontally align text inside the second column (applicable for two columns layout). */
    @Input()
    secondaryTextAlignment: TextAlignment = 'right';

    /** Turns on/off Adjustable Width feature. */
    @Input()
    autoResize = false;

    @Input()
    set value(value: any) {
        this.selectedItems = coerceArraySafe(value);
        super.setValue(this.selectedItems);
        this._setSelectedSuggestions();
        this.emitChangeEvent();
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
    addonIconTitle: string = null;

    /** Event emitted when item is selected. */
    @Output()
    selectionChange = new EventEmitter<MultiComboboxSelectionChangeEvent>();

    /** @hidden Emits event when the menu is opened/closed. */
    @Output()
    isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** @hidden */
    @ViewChild(ListComponent)
    listComponent: ListComponent;

    /** @hidden */
    @ViewChild('searchInputElement')
    searchInputElement: FormControlComponent;

    /** @hidden */
    @ContentChildren(TemplateDirective)
    customTemplates: QueryList<TemplateDirective>;

    /** @hidden
     * Custom Option item Template.
     * */
    optionItemTemplate: TemplateRef<any>;

    /** @hidden
     * Custom Group Header item Template.
     * */
    groupItemTemplate: TemplateRef<any>;

    /** @hidden
     * Custom Secondary item Template.
     * */
    secondaryItemTemplate: TemplateRef<any>;

    /** @hidden
     * Custom Selected option item Template.
     * */
    selectedItemTemplate: TemplateRef<any>;

    /** @hidden */
    _contentDensity: ContentDensity = this.listConfig.contentDensity;

    /**
     * @hidden
     * Whether "contentDensity" is "compact".
     */
    isCompact: boolean = this._contentDensity === 'compact';

    /** @hidden */
    controlTemplate: TemplateRef<any>;

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

    /** @hidden
     * List of matched suggestions
     * */
    _suggestions: SelectableOptionItem[];

    /** @hidden
     * Grouped suggestions mapped to array.
     * */
    _flatSuggestions: SelectableOptionItem[];

    /** @hidden
     * List of selected suggestions
     * */
    _selectedSuggestions: SelectableOptionItem[];

    /** @hidden
     * Max width of list container
     * */
    maxWidth?: number;

    /** @hidden
     * Min width of list container
     * */
    minWidth?: number;

    /** @hidden
     * Need for opening mobile version
     */
    openChange = new Subject<boolean>();

    /** @hidden */
    selectedShown$ = new BehaviorSubject(false);

    /** @hidden */
    isSearchInvalid = false;

    /** @hidden */
    isListEmpty = true;

    /** @hidden */
    protected _dataSource: FdpMultiComboboxDataSource<any>;

    /** @hidden */
    private _inputTextValue: string;
    /** @hidden */
    private _matchingStrategy: MatchingStrategy = this.listConfig.matchingStrategy;
    /** @hidden */
    private _dsSubscription?: Subscription;
    /** @hidden */
    private _element: HTMLElement = this.elementRef.nativeElement;
    /** @hidden
     * Keys, that won't trigger the popover's open state, when dispatched on search input. */
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
        LEFT_ARROW
    ];

    /** @hidden */
    private _displayFn = (value: any) => {
        return this.displayValue(value);
    };

    /** @hidden */
    private _secondaryFn = (value: any) => {
        if (isOptionItem(value)) {
            return value.secondaryText;
        } else if (isJsObject(value) && this.secondaryKey) {
            const currentItem = this.objectGet(value, this.secondaryKey);

            return isFunction(currentItem) ? currentItem() : currentItem;
        } else {
            return value;
        }
    };

    constructor(
        protected readonly _cd: ChangeDetectorRef,
        protected readonly elementRef: ElementRef,
        @Optional() @Self() readonly ngControl: NgControl,
        @Optional() @SkipSelf() readonly ngForm: NgForm,
        @Optional() readonly dialogConfig: DialogConfig,
        protected listConfig: ListConfig,
        @Optional() @SkipSelf() @Host() formField: FormField,
        @Optional() @SkipSelf() @Host() formControl: FormFieldControl<any>
    ) {
        super(_cd, ngControl, ngForm, formField, formControl);
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
            (this.dataSource as MultiComboBoxDataSource<any>).close();
        }

        if (this._dsSubscription) {
            this._dsSubscription.unsubscribe();
        }
    }

    /** @hidden
     * Method to set input text as item label.
     * */
    abstract setInputTextFromOptionItem(item: SelectableOptionItem): void;

    /** @hidden
     * Toggle item selection.
     * */
    abstract toggleSelection(item: SelectableOptionItem): void;

    /** @hidden
     * Toggle item selection by input text value.
     * */
    abstract toggleSelectionByInputText(): void;

    /** write value for ControlValueAccessor */
    writeValue(value: any): void {
        this.selectedItems = coerceArraySafe(value);
        super.writeValue(this.selectedItems);
        this._setSelectedSuggestions();
        this.emitChangeEvent();
    }

    /** @hidden */
    popoverOpenChangeHandle(isOpen): void {
        this.isOpen = isOpen;
    }

    /** Opens the select popover body. */
    open(): void {
        this.isOpen = true;
        this.isOpenChange.emit(this.isOpen);
        this._cd.markForCheck();
    }

    /** Closes the select popover body. */
    close(): void {
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
        map.set('limit', 12);
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

        this.showList(!isOpen);

        if (this.isOpen && this.listComponent) {
            this.listComponent.setItemActive(0);
        }
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
        } else if (!event.ctrlKey && !KeyUtil.isKeyCode(event, this._nonOpeningKeys)) {
            this.showList(true);
            const acceptedKeys =
                !KeyUtil.isKeyType(event, 'alphabetical') &&
                !KeyUtil.isKeyType(event, 'numeric');
            if (this.isEmptyValue && acceptedKeys) {
                this.listComponent?.setItemActive(0);
            }
        }
    }

    /** Method passed to list component */
    handleListFocusEscape(direction: FocusEscapeDirection): void {
        if (direction === 'up') {
            this.searchInputElement?.elementRef().nativeElement.focus();
        }
    }

    /** 
     * @hidden
     * Method to emit change event
     */
    emitChangeEvent(): void {
        const event = new MultiComboboxSelectionChangeEvent(this, this.value);

        this.selectionChange.emit(event);
    }

    /** @hidden */
    protected _setSelectedSuggestions(): void {
        this._selectedSuggestions = [];

        if (!this.selectedItems?.length) {
            return;
        }

        for (let i = 0; i <= this.selectedItems.length; i++) {
            const selectedItem = this.selectedItems[i];
            const idx = this._flatSuggestions.findIndex(item => (item.label === selectedItem) || (item.value === selectedItem));
            if (idx !== -1) {
                this._selectedSuggestions.push(this._flatSuggestions[idx]);
                this._flatSuggestions[idx].selected = true;
            }
        }

        this._cd.markForCheck();
    }


    /** @hidden */
    protected get ds(): MultiComboBoxDataSource<any> {
        return <MultiComboBoxDataSource<any>>this.dataSource;
    }

    /** @hidden */
    protected _focusToSearchField(): void {
        this.searchInputElement?.elementRef().nativeElement.focus();
    }

    /** @hidden
     * Method that picks other value moved from current one by offset, called only when Multi Combobox is closed */
    private _chooseOtherItem(offset: number): void {
        if (this._selectedSuggestions?.length === this._flatSuggestions.length) {
            this.inputText = '';
            return;
        }

        const activeValue: SelectableOptionItem = this._getSelectItemByInputValue(this.inputText);
        const index: number = this._flatSuggestions.findIndex(value => value === activeValue);
        const position = !this.inputText && offset === -1 ? this._flatSuggestions.length - 1 : index + offset;
        const item: SelectableOptionItem = this._flatSuggestions[position];

        if (item) {
            this.setInputTextFromOptionItem(item);
        }

        const selectedIndex = this._selectedSuggestions.findIndex(value => value.label === item?.label);
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
        return items.reduce((result: SelectableOptionItem[], item: SelectableOptionItem) => result.concat(item.children), []);
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

        if (initDataSource === undefined) {
            throw new Error(`[dataSource] source did not match an array, Observable, or DataSource`);
        }
        /**
         * This is single point of data entry to the component. We dont want to set data on different
         * places. If any new data comes in either you do a search and you want to pass initial data
         * its here.
         */
        this._dsSubscription = initDataSource
            .open()
            .pipe(
                takeUntil(this._destroyed),
                tap(data => this.isListEmpty = !data?.length),
                filter(data => !!data.length)
            )
            .subscribe(data => {
                this._suggestions = this._convertToOptionItems(data);
                this._flatSuggestions = this.isGroup ? this._flattenGroups(this._suggestions) : this._suggestions;

                this.stateChanges.next('initDataSource.open().');

                this._cd.markForCheck();
            });

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
    private _toDataStream(ds: FdpMultiComboboxDataSource<any>): MultiComboBoxDataSource<any> | undefined {
        if (isDataSource(ds)) {
            return ds as MultiComboBoxDataSource<any>;
        } else if (Array.isArray(ds)) {
            return new ArrayMultiComboBoxDataSource<any>(ds);
        } else if (isObservable(ds)) {
            return new ObservableMultiComboBoxDataSource<any>(ds);
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
                secondaryText: this.objectGet(value, this.secondaryKey),
                value: value,
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
                value: value,
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
                value: value,
                selected: this.selectedItems?.includes(value) || false
            });
        }

        return selectItems;
    }

    /** @hidden
     * Assign custom templates
     * */
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
