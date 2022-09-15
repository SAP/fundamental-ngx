import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    forwardRef,
    Host,
    HostListener,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    QueryList,
    Self,
    SkipSelf,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { FocusKeyManager, LiveAnnouncer } from '@angular/cdk/a11y';
import { NgControl, NgForm } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { DOWN_ARROW, ENTER, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { firstValueFrom, isObservable, Observable, of, Subject, Subscription } from 'rxjs';
import { delay, takeUntil, tap } from 'rxjs/operators';

import { KeyUtil } from '@fundamental-ngx/core/utils';
import { Nullable } from '@fundamental-ngx/core/shared';
import {
    ArrayListDataSource,
    BaseComponent,
    CollectionBaseInput,
    FormField,
    FormFieldControl,
    isBlank,
    isDataSource,
    isPresent,
    ListDataSource,
    ObservableListDataSource
} from '@fundamental-ngx/platform/shared';
import { BaseListItem, ListItemDef } from './base-list-item';
import { ListConfig } from './list.config';
import { FD_LANGUAGE, FdLanguage, TranslationResolver } from '@fundamental-ngx/i18n';

export type SelectionType = 'none' | 'multi' | 'single' | 'delete';
export type ListType = 'inactive' | 'active' | 'detail';
export type FdpListDataSource<T> = ListDataSource<T> | Observable<T[]> | T[];

export class SelectionChangeEvent {
    selectedItems: BaseListItem[];
    index: number;
}

let nextListId = 0;
let nextListGrpHeaderId = 0;

/**
 * The List component represents a container for list item types.
 * It is used to display a list features.
 */
@Component({
    selector: 'fdp-list',
    templateUrl: './list.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [{ provide: FormFieldControl, useExisting: ListComponent, multi: true }],
    host: {
        '[attr.tabindex]': '-1'
    }
})
export class ListComponent<T> extends CollectionBaseInput implements OnInit, AfterViewInit, OnDestroy {
    /**  An array that holds a list of all selected items**/
    @Input()
    selectedItems: BaseListItem[];

    /** define size of items for screen reader */
    @Input()
    ariaSetsize: number;

    /** Defines whether items are multiseletable for screen reader */
    @Input()
    ariaMultiselectable: boolean;

    /** Title used on button when data loads on button click */
    @Input()
    loadTitle: string;

    /** Label used on announce message of data was loaded for screen readers */
    @Input()
    loadingLabel = '';

    /** Wait time for new items */
    @Input()
    delayTime: number;

    /** Items to be loaded at once */
    @Input()
    itemSize = 0;

    /** Enables lazy loadMore of data */
    @Input()
    loadMore: boolean;

    /**
     * Enables data load on scroll for true
     * false: enables data loading on button click
     */
    @Input()
    loadOnScroll: boolean;

    /** define the role to custom requirement */
    @Input()
    role = 'listbox';

    /** ListType 'inactive' | 'active' | 'navigation' | 'detail' */
    @Input()
    listType: ListType = 'active';

    /** Max height for viewport to display scroll */
    @Input()
    maxHeight: string;

    /** Whether list component has removed borders */
    @Input()
    noBorder = false;

    /** Scroll offset percentage to trigger scroll event */
    @Input()
    scrollOffsetPercentage: number;

    /** enables selection styles */
    @Input()
    selection = false;

    /**
     * The type of the selection. Types include:
     * 'none'| 'multi' | 'single'|'delete'.
     * Leave empty for default ().'
     * Default value is set to ''
     */
    @Input()
    selectionMode: SelectionType = 'none';

    @Input()
    get value(): any {
        return super.getValue();
    }

    /** setter and getter for radio button and checkbox */
    set value(value: any) {
        super.setValue(value);
    }

    /** setter and getter for row level Selection */
    @Input()
    get rowSelection(): boolean {
        return this._rowSelection;
    }

    set rowSelection(value: boolean) {
        this._rowSelection = value;
        if (this._rowSelection) {
            this.selection = true;
            this._ulElement?.classList.add('fd-list--selection-row');
            if (this.navigated && this.hasObject) {
                this._ulElement?.classList.remove('fd-list--selection-row');
            }
        }
    }

    /** Datasource for suggestion list */
    @Input()
    get dataSource(): FdpListDataSource<T> {
        return this._dataSource;
    }

    set dataSource(value: FdpListDataSource<T>) {
        if (value) {
            this._initializeDS(value);
        }
    }

    /** setter and getter for _navigated */
    @Input()
    get navigated(): boolean {
        return this._navigated;
    }

    set navigated(value: boolean) {
        this._navigated = value;

        const classList = ['fd-list--navigation'];
        if (this.hasObject) {
            classList.push('fd-list--navigation-object');
        }

        this._ulElement?.classList.add(...classList);
    }

    /** setter and getter for _navigationIndicator */
    @Input()
    get navigationIndicator(): boolean {
        return this._navigationIndicator;
    }

    set navigationIndicator(value: boolean) {
        this._navigationIndicator = value;
        this._ulElement?.classList.add('fd-list--navigation-indication');
    }

    /** setter and getter for hasByLine */
    @Input()
    get hasByLine(): boolean {
        return this._hasByLine;
    }

    set hasByLine(value: boolean) {
        this._hasByLine = value;
        this._ulElement?.classList.add('fd-list--byline');
    }

    /** setter and getter for hasObject */
    @Input()
    get hasObject(): boolean {
        return this._hasObject;
    }

    set hasObject(value: boolean) {
        this._hasObject = value;
        this._ulElement?.classList.add('fd-object-list');
    }

    /** Event thrown, when selected item is changed */
    @Output()
    selectedItemChange: EventEmitter<SelectionChangeEvent> = new EventEmitter<SelectionChangeEvent>();

    /** Access child element, for checking link content */
    @ViewChild('link', { read: ElementRef })
    anchor: ElementRef<HTMLLinkElement>;

    /** @hidden */
    @ContentChild(ListItemDef)
    listItemDef: ListItemDef;

    /** Child items of the List. */
    @ContentChildren(BaseListItem, { descendants: true })
    listItems: QueryList<BaseListItem>;

    /** @hidden */
    get _ulElement(): Nullable<HTMLUListElement> {
        return this.itemEl.nativeElement.querySelector('ul');
    }

    /**
     * @hidden
     * To display loading symbol
     */
    _loading = false;

    /**
     * @hidden
     * keyManger to handle keybord events used in template
     */
    _keyManager: FocusKeyManager<BaseListItem>;

    /** @hidden */
    _items: T[] = [];

    /** @hidden */
    _destroyed = new Subject<void>();

    /** @hidden */
    protected _dataSource: FdpListDataSource<T>;

    /** @hidden */
    private _translationResolver = new TranslationResolver();

    /**
     * @hidden
     * Whether Navigation mode is included to list component
     * for all the items
     */
    private _navigated: boolean;

    /**
     * @hidden
     * Whether By line is present in list item
     */
    private _hasByLine: boolean;

    /**
     * @hidden
     * Whether Navigation mode is included to list component
     * only a subset of the list items are navigable
     * you should indicate those by displaying a navigation arrow
     */
    private _navigationIndicator: boolean;

    /**
     * @hidden
     * Whether object present in list item
     */
    private _hasObject: boolean;

    /**
     * @hidden
     * Verfies partial navigation enabled
     */
    protected _partialNavigation = false;

    /**
     * @hidden
     * The model backing of the component.
     */
    private _selectionModel: SelectionModel<BaseListItem>;

    /**
     * @hidden
     * Whether list component has multiselection
     * binding in tempate to append class
     */
    private _multiSelect = false;

    /** @hidden */
    private _selectedvalue: Nullable<string>;

    /**
     * @hidden
     * Whether row level selection mode is enabled to list component
     * for all the items
     */
    private _rowSelection: boolean;

    /** @hidden To store */
    private _tempItems: T[] = [];

    /** @hidden */
    private _startIndex = 0;

    /** @hidden */
    private _lastIndex = this.itemSize;

    /** @hidden */
    private _dsItems: T[] = [];

    /**
     * @hidden
     * for data source handling
     */
    private _dsSubscription: Nullable<Subscription>;

    private _clickSubscription = new Subscription();

    /** @hidden */
    private _language: FdLanguage;

    /** @hidden */
    constructor(
        protected _changeDetectorRef: ChangeDetectorRef,
        public itemEl: ElementRef<HTMLElement>,
        private _liveAnnouncer: LiveAnnouncer,
        @Inject(FD_LANGUAGE) private readonly _language$: Observable<FdLanguage>,
        @Optional() @Self() public ngControl: NgControl,
        @Optional() @Self() public ngForm: NgForm,
        @Optional() @SkipSelf() @Host() formField: FormField,
        @Optional() @SkipSelf() @Host() formControl: FormFieldControl<any>,
        protected _listConfig?: ListConfig
    ) {
        super(_changeDetectorRef, ngControl, ngForm, formField, formControl);
        this._init();
    }

    /** @hidden */
    private async _init(): Promise<void> {
        this._language = await firstValueFrom(this._language$);
    }

    /**
     * @hidden
     * Initialization of the lis component with selection mode
     */
    ngOnInit(): void {
        this._setItems();

        this.stateChanges.next(this._items);
        this.id = `fdp-list-${nextListId++}`;

        // using selection Model for multiselect
        if (this.selectionMode === 'multi') {
            this._multiSelect = true;
            this.ariaMultiselectable = true;
        } else {
            this._multiSelect = false;
        }

        this._selectionModel = new SelectionModel<BaseListItem>(this._multiSelect, this.selectedItems);

        this._selectionModel.changed.pipe(takeUntil(this._destroyed)).subscribe(() => {
            this.selectedItems = this._selectionModel.selected;
            const event = new SelectionChangeEvent();
            event.selectedItems = this.selectedItems;
            this.stateChanges.next(event);
            this.selectedItemChange.emit(event);
        });
    }

    /**
     * @hidden
     * Keyboard manager on list items, set values when passed via array
     */
    ngAfterViewInit(): void {
        this._keyManager = new FocusKeyManager<BaseListItem>(this.listItems).withWrap();

        this._updateListItems();
        this.listItems.changes.subscribe(() => this._updateListItems());

        const indicator = this.itemEl.nativeElement.querySelector('fd-busy-indicator');
        indicator?.setAttribute('aria-label', '');
    }

    /** @hidden */
    ngOnDestroy(): void {
        super.ngOnDestroy();

        if (isDataSource(this.dataSource)) {
            this.dataSource.close();
        }

        if (this._dsSubscription) {
            this._dsSubscription.unsubscribe();
        }

        if (this._clickSubscription) {
            this._clickSubscription.unsubscribe();
        }
    }

    /**
     * @hidden
     * handline keyboard operations
     * in template on list and list items
     */
    _handleKeyDown(event: KeyboardEvent): Nullable<boolean> {
        if (!this._keyManager) {
            return;
        }

        event.stopImmediatePropagation();

        const activeItemIndex: Nullable<number> = this._keyManager.activeItemIndex;

        if (activeItemIndex) {
            this._keyManager.setActiveItem(activeItemIndex);
        }

        if (KeyUtil.isKeyCode(event, DOWN_ARROW) || KeyUtil.isKeyCode(event, UP_ARROW)) {
            return false;
        } else if (KeyUtil.isKeyCode(event, ENTER) || KeyUtil.isKeyCode(event, SPACE)) {
            this._updateNavigation(event);
            return false;
        }
    }

    /**
     * @hidden
     * binded in template on scroll
     */
    _scrollHandler(): void {
        if (!this._loading && this.loadOnScroll) {
            this._getMoreData();
        }
    }

    /**
     * @hidden
     * load more on enter or space press
     */
    _loadOnKeyPress(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, [ENTER, SPACE])) {
            this._getMoreData();
        }
    }

    /**
     * @hidden
     * Handles lazy loading data
     * used in template
     * onscroll and on more button click
     */
    _getMoreData(): void {
        this._loading = true;
        of(this._loadNewItems())
            .pipe(
                tap(async (data) => {
                    if (isBlank(data)) {
                        console.error('===Invalid Response recived===');
                    }
                    this.loadingLabel = this._translationResolver.resolve(
                        this._language,
                        'platformList.loadingAriaLabel'
                    );
                    await this._liveAnnouncer.announce(this.loadingLabel, 'assertive');
                }),
                delay(this.delayTime),
                takeUntil(this._destroyed)
            )
            .subscribe((result) => {
                if (isPresent(result)) {
                    for (let i = this._items.length, j = 0; j < result.length; ++i, ++j) {
                        this._items[i] = result[j];
                    }
                }
                this._loading = false;
                this.stateChanges.next(this._items);
                this._changeDetectorRef.markForCheck();
            });
    }

    /**
     * @hidden
     * used in tempate to get Selected items from a list
     * event:any to avoid code duplication
     */
    _onSelectionChanged(event: Event): void {
        this._updateNavigation(event);
    }

    /**
     * @hidden
     * on Update navgiation styles for non navigated items
     * event:any to avoid code duplication
     * seprate PR for custom event
     */
    @HostListener('click', ['$event'])
    _updateNavigation(event: Event): void {
        let selectedItemId: Nullable<string> = '0';
        const element: Nullable<HTMLElement> = event.target instanceof HTMLElement ? event.target : null;
        const parent = element?.closest('.fd-list__item');
        if (isPresent(parent)) {
            selectedItemId = parent?.getAttribute('id');
        }

        this.listItems.forEach((item, index) => {
            item.anchor?.nativeElement.classList.remove('is-navigated');

            if (item._focused) {
                this._keyManager?.updateActiveItem(index);
            }
        });

        const el = event.target instanceof HTMLElement && event.target;
        if (!el) {
            return;
        }

        const linkElement = el.querySelector('a');
        if (el.tagName.toLowerCase() === 'a') {
            el.classList.add('is-navigated');
        } else if (el.tagName.toLowerCase() === 'li' && !!linkElement) {
            linkElement.classList.add('is-navigated');
        }

        // TODO: selection management should be completely changed https://github.com/SAP/fundamental-ngx/issues/8008
        if (this.rowSelection) {
            this._handleRowSelect(selectedItemId);
        } else if (this.selectionMode === 'single') {
            this._handleSingleSelect(event, selectedItemId);
        } else if (this.selectionMode === 'multi') {
            this._handleMultiSelect(selectedItemId);
        }
    }

    /** @hidden */
    _selectItem(item: BaseListItem): void {
        this._selectionModel.select(item);
        this.stateChanges.next(item);
    }

    /** @hidden */
    private _setItems(): void {
        if (this._dsItems.length !== null && this.itemSize !== 0) {
            this._startIndex = 0;
            this._lastIndex = this.itemSize;
            this._items = this._dsItems.slice(this._startIndex, this._lastIndex);
        } else {
            this._items = this._dsItems;
        }

        this.stateChanges.next(this._items);
    }

    /** @hidden */
    private _initializeDS(ds: FdpListDataSource<T>): void {
        this._dsItems = [];
        if (isDataSource(this.dataSource)) {
            this.dataSource.close();
            if (this._dsSubscription) {
                this._dsSubscription.unsubscribe();
                this._dsSubscription = null;
            }
        }
        // Convert ListDataSource<T> | Observable<T[]> | T[] as DataSource
        this._dataSource = this._openDataStream(ds);
    }

    /** @hidden */
    private _toDataStream(source: FdpListDataSource<T>): ListDataSource<T> | undefined {
        if (isDataSource(source)) {
            return <ListDataSource<T>>source;
        }

        if (Array.isArray(source)) {
            // default implementation to work on top of arrays
            return new ArrayListDataSource<T>(source);
        }

        if (isObservable(source)) {
            return new ObservableListDataSource<T>(source);
        }

        return undefined;
    }

    /** @hidden */
    private _openDataStream(ds: FdpListDataSource<T>): ListDataSource<T> {
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
            .pipe(takeUntil(this._destroyed))
            .subscribe((data) => {
                this._dsItems = data || [];
                this.stateChanges.next(this._dsItems);
                this._setItems();
                this._cd.markForCheck();
            });

        // initial data fetch
        initDataSource.match('*');

        return initDataSource;
    }

    /** @hidden */
    private _loadNewItems(): T[] {
        this._startIndex = this._startIndex + this.itemSize;
        this._lastIndex = this._lastIndex + this.itemSize;
        this._tempItems = this._dsItems.slice(this._startIndex, this._lastIndex);

        return this._tempItems;
    }

    /**
     * @hidden
     * List item with radio button styles, check, uncheckupdates
     * event:any to avoid code duplication
     */
    private _handleSingleSelect(event: Event, selectedItemId: Nullable<string>): void {
        const parent = event.target instanceof HTMLElement && event.target.closest('.fd-list__item');
        const radio = parent ? parent.querySelector('input') : null;
        this._selectedvalue = radio ? (<HTMLInputElement>radio).value : null;

        this.listItems.forEach((item) => {
            if (isPresent(item.radioButtonComponent)) {
                item._selected = false;
                item.listItem.nativeElement.setAttribute('aria-checked', 'false');
            }

            this.stateChanges.next(item);
        });

        this._selectionModel.clear();

        this.listItems.forEach((item) => {
            item.selectionValue = this._selectedvalue;
            const { nativeElement } = item.listItem;
            if (nativeElement.getAttribute('id') === selectedItemId) {
                nativeElement.setAttribute('_selected', 'true');
                nativeElement.setAttribute('aria-checked', 'true');

                this._selectItem(item);
            }
        });
    }

    /** @hidden */
    private _handleRowSelect(selectedItemId: Nullable<string>): void {
        // handles mutli select on row level without checkbox
        if (this.selectionMode === 'multi') {
            this.listItems.forEach((item) => {
                if (item._selected) {
                    this._selectionModel.select(item);
                } else {
                    this._selectionModel.deselect(item);
                }

                this.stateChanges.next(item);
            });
        }

        // handles single select on row level without radiobutton
        if (this.selectionMode === 'single') {
            this.listItems.forEach((item) => {
                if (!item.anchor) {
                    return;
                }

                const { nativeElement } = item.listItem;
                nativeElement.setAttribute('_selected', 'false');
                nativeElement.setAttribute('aria-selected', 'false');
                nativeElement.classList.remove('is-selected');
                item.anchor.nativeElement.classList.remove('is-selected');
                this.stateChanges.next(item);
            });

            this._selectionModel.clear();

            this.listItems.forEach((item) => {
                const { nativeElement } = item.listItem;
                if (nativeElement.getAttribute('id') !== selectedItemId) {
                    return;
                }

                nativeElement.setAttribute('_selected', 'true');
                item.anchor?.nativeElement.classList.add('is-selected');

                this._selectItem(item);
            });

            selectedItemId = '0';
        }
    }

    /**
     * @hidden
     * List item with checkbox styles,check,uncheckupdates
     * event:any to avoid code duplication
     */
    private _handleMultiSelect(selectedItemId: Nullable<string>): void {
        this.listItems.forEach((item) => {
            const { nativeElement } = item.listItem;
            if (nativeElement.getAttribute('id') !== selectedItemId) {
                return;
            }

            const select = nativeElement.getAttribute('_selected');
            nativeElement.setAttribute('_selected', `${!select}`);
            if (item._selected) {
                nativeElement.setAttribute('aria-selected', 'true');
                this._selectionModel.select(item);
            } else {
                nativeElement.setAttribute('aria-selected', 'false');
                this._selectionModel.deselect(item);
            }

            this.stateChanges.next(item);
        });
    }

    /**
     * @hidden
     * Setting values from list to list items
     * example:
     * Does list item has navigation,
     * should show arrows,
     * will it be compact mode,
     * should be in which selection mode
     * set values when passed via datasource
     */
    private _updateListItems(): void {
        if (this.listItems.length !== 0) {
            this.listItems.first.listItem.nativeElement.setAttribute('tabindex', '0');
        }

        if (!this.ariaLabel) {
            this.ariaSetsize = this.listItems.length;
        }

        this._clickSubscription.unsubscribe();

        this._clickSubscription = new Subscription();

        this._partialNavigation = this.listItems.some((item) => item.navigationIndicator || item.listType === 'detail');

        this.listItems.forEach((item, index) => {
            if (!this._partialNavigation) {
                item.navigated = this.navigated;
                item.navigationIndicator = this.navigationIndicator;
                item.listType = this.listType;
            }

            // item.contentDensity = this.contentDensity; // no need for this
            item.selectionMode = this.selectionMode;
            item.rowSelection = this.rowSelection;
            item._hasByLine = this.hasByLine;
            item.ariaPosinet = index;

            this._clickSubscription.add(
                item.itemSelected.subscribe(() => {
                    this._keyManager.setActiveItem(index);
                })
            );

            this.stateChanges.next(item);
        });
    }
}

@Component({
    selector: 'fdp-list-footer',
    template: ` <li #listFooter class="fd-list__footer" [attr.id]="id" role="option">
        <ng-content></ng-content>
    </li>`
})
export class ListFooterComponent extends BaseComponent {}

@Component({
    selector: 'fdp-list-group-header',
    template: ` <li #listItem fd-list-group-header [attr.id]="id" role="option" [tabindex]="0">
        <span fd-list-title>{{ groupHeaderTitle }}</span>
        <ng-content></ng-content>
    </li>`,
    providers: [{ provide: BaseListItem, useExisting: forwardRef(() => ListGroupHeaderComponent) }]
})
export class ListGroupHeaderComponent extends BaseListItem implements OnInit {
    /** Displays list goup header title */
    @Input()
    groupHeaderTitle?: string;

    /** @deprecated Use `groupHeaderTitle` instead */
    @Input()
    set grpheaderTitle(value: string) {
        this.groupHeaderTitle = value;
    }

    /**
     * @hidden
     * Initialization of the list header component
     */
    ngOnInit(): void {
        this.id = `fdp-list-${nextListGrpHeaderId++}`;
    }
}
