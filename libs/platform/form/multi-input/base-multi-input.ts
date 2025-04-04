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
import {
    AfterViewInit,
    ContentChildren,
    Directive,
    ElementRef,
    EventEmitter,
    inject,
    Input,
    OnChanges,
    OnDestroy,
    Output,
    QueryList,
    SimpleChanges,
    TemplateRef,
    ViewChild
} from '@angular/core';

import { combineLatest, fromEvent, isObservable, Observable, Subject, Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FocusEscapeDirection, KeyUtil, TemplateDirective } from '@fundamental-ngx/cdk/utils';
import { DialogConfig } from '@fundamental-ngx/core/dialog';
import { MobileModeConfig } from '@fundamental-ngx/core/mobile-mode';
import { FdpListComponent, ListComponent } from '@fundamental-ngx/platform/list';
import {
    ArrayMultiInputDataSource,
    CollectionBaseInput,
    isDataSource,
    isFunction,
    isJsObject,
    isOptionItem,
    isString,
    MatchingBy,
    MatchingStrategy,
    MultiInputDataSource,
    MultiInputOption,
    ObservableMultiInputDataSource
} from '@fundamental-ngx/platform/shared';
import { TextAlignment } from '../combobox';
import { MultiInputConfig } from './multi-input.config';

export type FdpMultiInputDataSource<T> = MultiInputDataSource<T> | Observable<T[]> | T[];

@Directive()
export abstract class BaseMultiInput extends CollectionBaseInput implements AfterViewInit, OnChanges, OnDestroy {
    /** @hidden */
    abstract controlTemplate: TemplateRef<any>;

    /** @hidden */
    abstract listTemplate: TemplateRef<any>;

    /**
     * @hidden
     * Define is this item selected
     */
    abstract isSelectedOptionItem(selectedItem: MultiInputOption): boolean;

    /**
     * @hidden
     * Emit select OptionItem
     * */
    abstract selectOptionItem(item: MultiInputOption): void;

    /**
     * @hidden
     * Define value as selected
     * */
    abstract setAsSelected(item: MultiInputOption[]): void;

    /**
     * @hidden
     * Mathod for marking list option as selected.
     */
    abstract _markListItemsAsSelected(): void;

    /** Provides maximum height for the optionPanel */
    @Input()
    maxHeight = '250px';

    /** Datasource for suggestion list */
    @Input()
    set dataSource(value: FdpMultiInputDataSource<any>) {
        if (value) {
            this._initializeDataSource(value);
        }
    }

    get dataSource(): FdpMultiInputDataSource<any> {
        return this._dataSource;
    }

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

    /** Whether the Multi Input should be built on mobile mode */
    @Input()
    mobile = false;

    /** Multi Input Mobile Configuration, it's applied only, when mobile is enabled */
    @Input()
    mobileConfig: MobileModeConfig;

    /**
     * Whether AddOn Button should be focusable
     * @default false
     */
    @Input()
    buttonFocusable = false;

    /** Tells the multi input if we need to group items */
    @Input()
    group = false;

    /** A field name to use to group data by (support dotted notation) */
    @Input()
    groupKey?: string;

    /** The field to show data in secondary column */
    @Input()
    description?: string;

    /** The field to show avatar image data in secondary column */
    @Input()
    avatarsrc?: string;

    /** Show the second column (Applicable for two columns layout) */
    @Input()
    showSecondaryText = false;

    /** Horizontally align text inside the second column (Applicable for two columns layout) */
    @Input()
    secondaryTextAlignment: TextAlignment = 'right';

    /** Turns on/off Adjustable Width feature */
    @Input()
    autoResize = false;
    /** Whether to open the dropdown when the addon button is clicked. */
    @Input()
    openDropdownOnAddOnClicked = true;

    /** Value of the multi input */
    @Input()
    set value(value: any) {
        const selectedItems = Array.isArray(value) ? value : [value];
        this.setAsSelected(this._convertToOptionItems(selectedItems));
        super.setValue(value);
    }

    get value(): any {
        return super.getValue();
    }

    /** @hidden Emits event when the menu is opened/closed */
    @Output()
    readonly isOpenChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** Event emitted when data loading is started. */
    @Output()
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    readonly onDataRequested = new EventEmitter<void>();

    /** Event emitted when data loading is finished. */
    @Output()
    // eslint-disable-next-line @angular-eslint/no-output-on-prefix
    readonly onDataReceived = new EventEmitter<void>();

    /** Event emitted when the search term changes. Use *$event* to access the new term. */
    @Output()
    readonly searchTermChange: EventEmitter<string> = new EventEmitter<string>();

    /** Emits event when the addon button is clicked. */
    @Output()
    readonly addOnButtonClicked: EventEmitter<Event> = new EventEmitter<Event>();

    /** @hidden */
    @ViewChild(FdpListComponent)
    listComponent: ListComponent<MultiInputOption>;

    /** @hidden */
    @ContentChildren(TemplateDirective)
    customTemplates: QueryList<TemplateDirective>;

    /** @hidden */
    @ViewChild('searchInputElement', { read: ElementRef })
    searchInputElement: ElementRef;

    /** @hidden
     * Custom Option item Template
     * */
    optionItemTemplate: TemplateRef<any>;

    /** @hidden
     * Custom Group Header item Template
     * */
    groupItemTemplate: TemplateRef<any>;

    /** @hidden
     * Custom Secondary item Template
     * */
    secondaryItemTemplate: TemplateRef<any>;

    /** @hidden
     * Custom Selected option item Template
     * */
    selectedItemTemplate: TemplateRef<any>;

    /** input text of the input. */
    inputText: string;

    /** Whether the Multi Input is opened. */
    isOpen = false;

    /** @hidden */
    get canClose(): boolean {
        return !(this.mobile && this.mobileConfig.approveButtonText);
    }

    /**
     * @hidden
     * List of matched suggestions
     * */
    _suggestions: MultiInputOption[];

    /** @hidden
     * List of matched suggestions
     * */
    _newSuggestions: MultiInputOption[];

    /** @hidden
     * Max width of list container
     * */
    maxWidth?: number;

    /** @hidden
     * Min width of list container
     * */
    minWidth?: number;

    /**
     * Need for opening mobile version
     *
     * @hidden
     */
    openChange = new Subject<boolean>();

    /** @hidden */
    protected readonly multiInputConfig = inject(MultiInputConfig);

    /** @hidden */
    protected _dataSource: FdpMultiInputDataSource<any>;

    /** @hidden */
    protected readonly dialogConfig = inject(DialogConfig, { optional: true });
    /** @hidden emits whenever there're changes to the inputs, that affect the data creation from data source */
    private readonly _updateDataSourceValues$ = new Subject<void>();
    /** @hidden */
    private _matchingStrategy: MatchingStrategy = this.multiInputConfig.matchingStrategy;
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
        ALT,
        BACKSPACE
    ];

    /** @hidden */
    private _originalSuggestions: any[] = [];

    /** @hidden */
    ngAfterViewInit(): void {
        this._initWindowResize();
        this._assignCustomTemplates();
        super.ngAfterViewInit();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if ('group' in changes || 'groupKey' in changes) {
            this._updateDataSourceValues$.next();
        }
        if ('avatarSrc' in changes || 'description' in changes || 'title' in changes || 'value' in changes) {
            this._suggestions = this._convertToOptionItems(this._originalSuggestions);
        }
    }
    /** @hidden */
    ngOnDestroy(): void {
        super.ngOnDestroy();

        if (isDataSource(this.dataSource)) {
            (this.dataSource as MultiInputDataSource<any>).close();
        }

        if (this._dsSubscription) {
            this._dsSubscription.unsubscribe();
        }
    }

    /** write value for ControlValueAccessor */
    writeValue(value: any): void {
        const selectedItems = Array.isArray(value) ? value : [value];
        this.setAsSelected(this._convertToOptionItems(selectedItems));
        super.writeValue(value);
    }

    /** @hidden */
    _popoverOpenChangeHandle(isOpen: boolean): void {
        if (!isOpen) {
            this.close();
        }
    }

    /** Opens the select popover body. */
    open(): void {
        this.isOpen = true;
        this.isOpenChange.emit(this.isOpen);
        this.openChange.next(this.isOpen);
        this.markForCheck();
        setTimeout(() => {
            this._markListItemsAsSelected();
            if (this.inputText) {
                return;
            }
        });
    }
    /** Closes the select popover body. */
    close(): void {
        this.isOpen = false;
        this.inputText = '';
        this.searchTermChanged();
        this.isOpenChange.emit(false);
        this.openChange.next(false);
        this.searchInputElement.nativeElement.focus();
        this.markForCheck();
    }

    /** @hidden */
    convertObjectToMultiInputOption(items: any[]): MultiInputOption[] {
        return this._convertObjectsToOptionItems(items);
    }

    /** @hidden */
    searchTermChanged(text: string = this.inputText): void {
        if (text) {
            this.open();
        }
        const map = new Map();
        map.set('query', text);
        map.set('limit', 12);
        this.ds?.match(map);

        this.searchTermChange.emit(text);

        this.detectChanges();
    }

    /** @hidden */
    showList(isOpen: boolean): void {
        if (this.isOpen !== isOpen) {
            if (isOpen) {
                this.open();
            } else {
                this.searchTermChanged('');
                this.close();
            }
        }
    }

    /** @hidden */
    handleOptionItem(value: MultiInputOption): void {
        if (value) {
            this.selectOptionItem(value);
        }
    }

    /** @hidden */
    handlePressEnter(event: KeyboardEvent, value: MultiInputOption): void {
        if (!KeyUtil.isKeyCode(event, ENTER)) {
            return;
        }

        this.handleOptionItem(value);
    }

    /**
     * Handle Keydown on Input
     * @hidden
     */
    onInputKeydownHandler(event: KeyboardEvent): void {
        if (this.readonly) {
            return;
        }

        if (KeyUtil.isKeyCode(event, TAB) && this.isOpen) {
            this.close();
            return;
        }

        if (KeyUtil.isKeyCode(event, DOWN_ARROW)) {
            event.preventDefault();

            if (event.altKey) {
                this.showList(true);
            }

            if (this.isOpen) {
                this.listComponent?._setCurrentActiveItemIndex(0);
                this.listComponent?.listItems.first.focus();
            } else {
                this._chooseOtherItem(1);
            }
        } else if (KeyUtil.isKeyCode(event, UP_ARROW)) {
            event.preventDefault();

            this._chooseOtherItem(-1);
        } else if (!event.ctrlKey && !KeyUtil.isKeyCode(event, this._nonOpeningKeys)) {
            this.showList(true);
        }
    }

    /** Method passed to list component */
    handleListFocusEscape(direction: FocusEscapeDirection): void {
        if (direction === 'up') {
            this.searchInputElement.nativeElement.focus();
        }
    }

    /** @hidden */
    private _displayFn = (value: any): string => this.displayValue(value);

    /** @hidden */
    private _secondaryFn = (value: any): string => {
        if (isOptionItem(value)) {
            return value.secondaryText ?? '';
        } else if (isJsObject(value) && this.description) {
            const currentItem = this.objectGet(value, this.description);

            return isFunction(currentItem) ? currentItem() : currentItem;
        } else {
            return value;
        }
    };

    /** @hidden */
    protected get ds(): MultiInputDataSource<any> {
        return this.dataSource as MultiInputDataSource<any>;
    }

    /** @hidden
     * Method that picks other value moved from current one by offset, called only when Multi Input is closed */
    private _chooseOtherItem(offset: number): void {
        const index: number = this._suggestions.findIndex((value) => value.label === this.inputText);

        if (this._suggestions[index + offset]) {
            this.handleOptionItem(this._suggestions[index + offset]);
        }
    }

    /** @hidden */
    private _initializeDataSource(ds: FdpMultiInputDataSource<any>): void {
        this._suggestions = [];

        if (isDataSource(this.dataSource)) {
            (this.dataSource as MultiInputDataSource<any>).close();

            if (this._dsSubscription) {
                this._dsSubscription.unsubscribe();
                this._dsSubscription = undefined;
            }
        }
        // Convert whatever comes in as DataSource so we can work with it identically
        this._dataSource = this._openDataStream(ds);
    }

    /** @hidden */
    private _openDataStream(ds: FdpMultiInputDataSource<any>): MultiInputDataSource<any> {
        const initDataSource = this._toDataStream(ds);

        if (initDataSource === undefined) {
            throw new Error(`[dataSource] source did not match an array, Observable, or DataSource`);
        }
        /**
         * This is single point of data entry to the component. We dont want to set data on different
         * places. If any new data comes in either you do a search and you want to pass initial data
         * its here.
         */
        this._dsSubscription = new Subscription();
        const dsSub = combineLatest([initDataSource.open(), this._updateDataSourceValues$.pipe(startWith(null))])
            .pipe(takeUntilDestroyed(this._destroyed))
            .subscribe(([data]) => {
                this._originalSuggestions = data;
                this._suggestions = this._convertToOptionItems(data);
                this.stateChanges.next('initDataSource.open().');

                this.detectChanges();
            });
        this._dsSubscription.add(dsSub);

        this._dsSubscription.add(initDataSource.onDataRequested().subscribe(this.onDataRequested));
        this._dsSubscription.add(initDataSource.onDataReceived().subscribe(this.onDataReceived));

        initDataSource.dataProvider.setLookupKey(this.lookupKey);
        const matchingBy: MatchingBy = {
            firstBy: this._displayFn
        };

        if (this.description) {
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
    private _toDataStream(source: FdpMultiInputDataSource<any>): MultiInputDataSource<any> | undefined {
        if (isDataSource(source)) {
            return source as MultiInputDataSource<any>;
        }

        if (Array.isArray(source)) {
            // default implementation to work on top of arrays
            return new ArrayMultiInputDataSource<any>(source);
        }

        if (isObservable(source)) {
            return new ObservableMultiInputDataSource<any>(source);
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
            .pipe(takeUntilDestroyed(this._destroyed))
            .subscribe(() => this._getOptionsListWidth());
    }

    /** @hidden */
    private _getOptionsListWidth(): void {
        const body = document.body;
        const rect = (this._element.querySelector('fd-input-group') as HTMLElement).getBoundingClientRect();
        const scrollBarWidth = body.offsetWidth - body.clientWidth;
        this.maxWidth = window.innerWidth - scrollBarWidth - rect.left;
        this.minWidth = rect.width - 2;
    }

    /**
     * Convert original data to OptionItems Interface
     * @hidden
     */
    private _convertToOptionItems(items: any[]): MultiInputOption[] {
        const item = items[0];

        const elementTypeIsOptionItem = isOptionItem(item);
        if (elementTypeIsOptionItem) {
            return items as MultiInputOption[];
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
    private _convertObjectsToOptionItems(items: any[]): MultiInputOption[] {
        if (this.group && this.groupKey) {
            return this._convertObjectsToGroupOptionItems(items);
        } else if (this.showSecondaryText && this.description) {
            return this._convertObjectsToSecondaryOptionItems(items);
        } else {
            return this._convertObjectsToDefaultOptionItems(items);
        }
    }

    /**
     * Convert object[] data to Group OptionItems Interface
     * @hidden
     */
    private _convertObjectsToGroupOptionItems<K>(items: K[]): MultiInputOption[] {
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
            const selectItem: MultiInputOption = {
                label: key,
                value: null,
                isGroup: true
            };

            const currentGroup = group[key];

            if (this.showSecondaryText && this.description) {
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
    private _convertObjectsToSecondaryOptionItems<K>(items: K[]): MultiInputOption[] {
        const selectItems: MultiInputOption[] = [];

        for (let i = 0; i < items.length; i++) {
            const value = items[i];
            selectItems.push({
                label: this.displayValue(value),
                avatarSrc: this.avatarsrc ? this.objectGet(value, this.avatarsrc) : null,
                description: this.description ? this.objectGet(value, this.description) : null,
                value
            });
        }

        return selectItems;
    }

    /**
     * Convert Primitive data(Boolean, String, Number) to OptionItems Interface
     * @hidden
     */
    private _convertPrimitiveToOptionItems(items: any[]): MultiInputOption[] {
        const selectItems: MultiInputOption[] = [];
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
    private _convertObjectsToDefaultOptionItems(items: any[]): MultiInputOption[] {
        const selectItems: MultiInputOption[] = [];

        for (let i = 0; i < items.length; i++) {
            const value = items[i];
            selectItems.push({
                label: this.displayValue(value),
                value
            });
        }

        return selectItems;
    }

    /** @hidden
     * Assign custom templates
     * */
    private _assignCustomTemplates(): void {
        this.customTemplates.forEach((template) => {
            switch (template.name) {
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
