import { FocusKeyManager, LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionChange, SelectionModel } from '@angular/cdk/collections';
import { DOWN_ARROW, ENTER, SPACE, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    HostListener,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    ViewChild,
    ViewEncapsulation,
    forwardRef
} from '@angular/core';
import { FD_FORM_FIELD_CONTROL } from '@fundamental-ngx/cdk/forms';
import {
    BehaviorSubject,
    Observable,
    Subscription,
    asyncScheduler,
    filter,
    firstValueFrom,
    isObservable,
    map,
    observeOn,
    of,
    startWith,
    switchMap
} from 'rxjs';
import { delay, tap } from 'rxjs/operators';

import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { KeyUtil, Nullable, RepeatDirective } from '@fundamental-ngx/cdk/utils';
import { BusyIndicatorComponent } from '@fundamental-ngx/core/busy-indicator';
import { InfiniteScrollDirective } from '@fundamental-ngx/core/infinite-scroll';
import {
    ListComponent as CoreListComponent,
    FD_LIST_UNREAD_INDICATOR,
    ListItemComponent,
    ListUnreadIndicator
} from '@fundamental-ngx/core/list';
import { SkeletonComponent } from '@fundamental-ngx/core/skeleton';
import { FD_LANGUAGE, FdLanguage, FdTranslatePipe, TranslationResolver } from '@fundamental-ngx/i18n';
import {
    ArrayListDataSource,
    CollectionBaseInput,
    ListDataSource,
    ObservableListDataSource,
    isBlank,
    isDataSource,
    isPresent
} from '@fundamental-ngx/platform/shared';
import { BaseListItem, LIST_ITEM_TYPE, ListItemDef } from './base-list-item';
import { FdpListComponent } from './fdpListComponent.token';
import { LoadMoreContentContext, LoadMoreContentDirective } from './load-more-content.directive';
import { FdpList, FdpListDataSource, ListType, SelectionType } from './models/list';

export class SelectionChangeEvent {
    /** Selected items */
    selectedItems: BaseListItem[];
    /** Index */
    index: number;
    /** Selected item */
    added?: BaseListItem[];
    /** Deselected item */
    removed?: BaseListItem[];
}

let nextListId = 0;

/**
 * The List component represents a container for list item types.
 * It is used to display a list features.
 */
@Component({
    selector: 'fdp-list',
    templateUrl: './list.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrl: './list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        { provide: FD_FORM_FIELD_CONTROL, useExisting: ListComponent, multi: true },
        { provide: FdpListComponent, useExisting: ListComponent },
        {
            provide: FD_LIST_UNREAD_INDICATOR,
            useExisting: ListComponent
        }
    ],
    host: {
        '[attr.tabindex]': '-1'
    },
    imports: [
        CoreListComponent,
        BusyIndicatorComponent,
        InfiniteScrollDirective,
        ListItemComponent,
        NgTemplateOutlet,
        RepeatDirective,
        SkeletonComponent,
        FdTranslatePipe,
        AsyncPipe
    ]
})
export class ListComponent<T>
    extends CollectionBaseInput
    implements ListUnreadIndicator, OnInit, AfterViewInit, OnDestroy, FdpList<BaseListItem>
{
    /**  An array that holds a list of all selected items. **/
    @Input()
    selectedItems: BaseListItem[];

    /** define size of items for screen reader. */
    @Input()
    ariaSetsize: number;

    /** Defines whether items are multiselectable for screen reader. */
    @Input()
    ariaMultiselectable: boolean;

    /** Title used on button when data loads on button click. */
    @Input()
    loadTitle: string;

    /** Label used on announce message of data was loaded for screen readers. */
    @Input()
    loadingLabel = '';

    /** Wait time for new items. */
    @Input()
    delayTime: number;

    /** Items to be loaded at once. Intinity (no limit) by default. */
    @Input()
    itemSize = Infinity;

    /** Enables lazy loadMore of data. */
    @Input()
    loadMore: boolean;

    /**
     * Enables data load on scroll for true
     * false: enables data loading on button click.
     */
    @Input()
    loadOnScroll: boolean;

    /** define the role to custom requirement. */
    @Input()
    role = 'list';

    /** ListType 'inactive' | 'active' | 'navigation' | 'detail' */
    @Input()
    listType: ListType = 'active';

    /** Max height for viewport to display scroll. */
    @Input()
    maxHeight: string;

    /** Whether list component has removed borders. */
    @Input()
    noBorder = false;

    /** Scroll offset percentage to trigger scroll event. */
    @Input()
    scrollOffsetPercentage: number;

    /** Eenables selection styles. */
    @Input()
    selection = false;

    /**
     * The type of the selection. Types include:
     * 'none'| 'multi' | 'single'|'delete'.
     * Leave empty for default ().'
     * Default value is set to 'none'.
     */
    @Input()
    selectionMode: SelectionType = 'none';

    /** setter and getter for radio button and checkbox. */
    @Input()
    set value(value: any) {
        super.setValue(value);
    }

    get value(): any {
        return super.getValue();
    }

    /** setter and getter for row level Selection. */
    @Input()
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

    get rowSelection(): boolean {
        return this._rowSelection;
    }

    /** Datasource for suggestion list. */
    @Input()
    set dataSource(value: FdpListDataSource<T>) {
        if (value) {
            this._initializeDS(value);
        }
    }

    get dataSource(): FdpListDataSource<T> {
        return this._dataSource;
    }

    /** setter and getter for _navigated. */
    @Input()
    set navigated(value: boolean) {
        this._navigated = value;

        const classList = ['fd-list--navigation'];
        if (this.hasObject) {
            classList.push('fd-list--navigation-object');
        }

        this._ulElement?.classList.add(...classList);
    }

    get navigated(): boolean {
        return this._navigated;
    }

    /** setter and getter for _navigationIndicator. */
    @Input()
    set navigationIndicator(value: boolean) {
        this._navigationIndicator = value;
        this._ulElement?.classList.add('fd-list--navigation-indication');
    }

    get navigationIndicator(): boolean {
        return this._navigationIndicator;
    }

    /** setter and getter for hasByLine. */
    @Input()
    set hasByLine(value: boolean) {
        this._hasByLine = value;
        this._ulElement?.classList.add('fd-list--byline');
    }

    get hasByLine(): boolean {
        return this._hasByLine;
    }

    /** setter and getter for hasObject. */
    @Input()
    set hasObject(value: boolean) {
        this._hasObject = value;
        this._ulElement?.classList.add('fd-object-list');
    }

    get hasObject(): boolean {
        return this._hasObject;
    }

    /** Whether to display unread notification indicator. */
    @Input()
    unreadIndicator = false;

    /** Whether to intercept tab key navigation. */
    @Input()
    interceptTabKey = true;

    /** Event thrown, when selected item is changed */
    @Output()
    selectedItemChange: EventEmitter<SelectionChangeEvent> = new EventEmitter<SelectionChangeEvent>();

    /** Access child element, for checking link content */
    @ViewChild('link', { read: ElementRef })
    anchor: ElementRef<HTMLLinkElement>;

    /** @hidden */
    @ContentChild(forwardRef(() => ListItemDef))
    listItemDef: ListItemDef;

    /** Show More List item content */
    @ContentChild(LoadMoreContentDirective)
    loadMoreContent: LoadMoreContentDirective;

    /** Child items of the List. */
    @ContentChildren(forwardRef(() => BaseListItem), { descendants: true })
    listItems: QueryList<BaseListItem>;

    /** @hidden */
    get _ulElement(): Nullable<HTMLUListElement> {
        return this.elementRef.nativeElement.querySelector('.fd-list');
    }

    /**
     * @hidden
     * To display loading symbol
     */
    _loading = false;

    /** @hidden
     * To differentiate between first loading when skeletons be shown and subsequent loadings when busy indicator be shown
     */
    _firstLoadingDone = false;

    /**
     * @hidden
     * keyManger to handle keybord events used in template
     */
    _keyManager: Nullable<FocusKeyManager<BaseListItem>>;

    /** @hidden */
    _items: T[] = [];

    /** @hidden */
    _ariaSetSize: Observable<number> = new Observable();

    /** @hidden */
    protected _dataSource: ListDataSource<T>;

    /**
     * @hidden
     * Verfies partial navigation enabled
     */
    protected _partialNavigation = false;

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

    /** @hidden */
    private _language: FdLanguage;

    /** @hidden */
    private _afterViewInit$ = new BehaviorSubject(false);

    /** @hidden */
    constructor(
        private readonly _liveAnnouncer: LiveAnnouncer,
        @Inject(FD_LANGUAGE) private readonly _language$: Observable<FdLanguage>
    ) {
        super();
        this._init();
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
        } else if (el.classList.contains('fd-list__item') && !!linkElement) {
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

    /** Get context for load more button */
    getLoadMoreContentContext(): LoadMoreContentContext {
        const $implicit = {
            loadTitle: this.loadTitle,
            loading: this._loading,
            loadingLabel: (() => {
                if (this._loading) {
                    return this._language$.pipe(
                        map((language) => this._translationResolver.resolve(language, 'platformList.loadingAriaLabel'))
                    );
                }
                return of(this.loadingLabel);
            })(),
            lastChunk: {
                start: this._startIndex,
                end: this._lastIndex
            },
            total: this._dsItems.length
        };
        return {
            $implicit,
            ...$implicit
        };
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

        this._selectionModel.changed
            .pipe(takeUntilDestroyed(this._destroyed))
            .subscribe((selection: SelectionChange<BaseListItem>) => {
                this.selectedItems = this._selectionModel.selected;
                const event = new SelectionChangeEvent();
                event.selectedItems = this.selectedItems;
                if (selection.added?.length) {
                    event.added = [...selection.added];
                }
                if (selection.removed?.length) {
                    event.removed = [...selection.removed];
                }
                this.stateChanges.next(event);
                this.selectedItemChange.emit(event);
            });
    }

    /**
     * @hidden
     * Keyboard manager on list items, set values when passed via array
     */
    ngAfterViewInit(): void {
        this._afterViewInit$.next(true);
        this._keyManager = new FocusKeyManager<BaseListItem>(this.listItems).withWrap();

        this._subscriptions.add(
            this.listItems.changes
                .pipe(startWith(this.listItems), observeOn(asyncScheduler))
                .subscribe(() => this._updateListItems())
        );

        const indicator = this.elementRef.nativeElement.querySelector('fd-busy-indicator');
        indicator?.setAttribute('aria-label', '');
    }

    /** @hidden */
    ngOnDestroy(): void {
        super.ngOnDestroy();

        if (isDataSource(this.dataSource)) {
            this.dataSource.close();
        }

        this._dsSubscription?.unsubscribe();

        this._keyManager?.destroy();
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

        if (KeyUtil.isKeyCode(event, TAB) && !this.interceptTabKey) {
            return;
        }

        event.stopImmediatePropagation();

        if (KeyUtil.isKeyCode(event, DOWN_ARROW) || KeyUtil.isKeyCode(event, UP_ARROW)) {
            return false;
        } else if (KeyUtil.isKeyCode(event, ENTER) || KeyUtil.isKeyCode(event, SPACE)) {
            this._updateNavigation(event);
            return false;
        }
    }

    /** @hidden */
    _setCurrentActiveItemIndex(activeItemIndex: number): void {
        this._keyManager?.setActiveItem(activeItemIndex);
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
     * show more on enter or space press
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
                        console.error('===Invalid Response received===');
                    }
                    this.loadingLabel = this._translationResolver.resolve(
                        this._language,
                        'platformList.loadingAriaLabel'
                    );
                    await this._liveAnnouncer.announce(this.loadingLabel, 'assertive');
                }),
                delay(this.delayTime),
                takeUntilDestroyed(this._destroyed)
            )
            .subscribe((result) => {
                if (isPresent(result)) {
                    for (let i = this._items.length, j = 0; j < result.length; ++i, ++j) {
                        this._items[i] = result[j];
                    }
                }
                this._loading = false;
                this.stateChanges.next(this._items);
                this.markForCheck();
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

    /** @hidden */
    _setupListItem(item: BaseListItem): void {
        item.selectionMode = this.selectionMode;
        item.rowSelection = this.rowSelection;
        item._hasByLine = this.hasByLine;
        item.itemSelected.subscribe(() => {
            this._keyManager?.setActiveItem(this.listItems.toArray().indexOf(item));
        });

        this.stateChanges.next(item);
    }

    /** @hidden */
    _selectItem(item: BaseListItem): void {
        this._selectionModel.select(item);
        this.stateChanges.next(item);
    }

    /** @hidden */
    _clearSelection(): void {
        this._selectionModel.clear();
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
            .pipe(
                // Set new items when component is fully initiated and all child components are available.
                this._waitForViewInit(),
                takeUntilDestroyed(this._destroyed)
            )
            .subscribe((data) => {
                this._dsItems = data || [];
                this.stateChanges.next(this._dsItems);
                this._setItems();
                // Trigger change detection when queue is empty.
                setTimeout(() => {
                    this.detectChanges();
                });
            });

        this._dsSubscription.add(initDataSource.onDataRequested().subscribe(() => (this._loading = true)));

        this._dsSubscription.add(
            initDataSource.onDataReceived().subscribe(() => {
                this._loading = false;
                this._firstLoadingDone = true;
            })
        );

        const matchParams = new Map();

        matchParams.set('query', '*');
        matchParams.set('limit', this.itemSize);

        // initial data fetch
        initDataSource.match(matchParams);

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

        this._ariaSetSize = this.ariaSetsize
            ? of(this.ariaSetsize)
            : this._dataSource && this._dataSource.dataProvider?.getTotalItems
              ? this._dataSource.dataProvider.getTotalItems()
              : of(this.listItems.length);

        this._partialNavigation = this.listItems.some((item) => item.navigationIndicator || item.listType === 'detail');

        let currentGroup: BaseListItem | null = null;
        let currentGroupItemIds: string[] = [];
        // Since we cannot use index from the iteration due to possible group item existence, we need to track it manually.
        let itemIndex = 0;

        this.listItems.forEach((item) => {
            if (!this._partialNavigation) {
                item.navigated = this.navigated;
                item.navigationIndicator = this.navigationIndicator;
                item.listType = this.listType;
            }
            if (item._type === LIST_ITEM_TYPE.HEADER) {
                currentGroup?.listItem.nativeElement.setAttribute('aria-owns', currentGroupItemIds.join(' '));
                currentGroupItemIds = [];
                currentGroup = item;
                return;
            }
            if (item._type !== LIST_ITEM_TYPE.ITEM) {
                return;
            }

            item.ariaSetSize = this._ariaSetSize;

            item.ariaPosinset = ++itemIndex;

            if (currentGroup) {
                currentGroupItemIds.push(item.listItem.nativeElement.id);
            }

            if (item === this.listItems.last) {
                currentGroup?.listItem.nativeElement.setAttribute('aria-owns', currentGroupItemIds.join(' '));
            }
        });

        this.markForCheck();
    }

    /** @hidden */
    private _waitForViewInit<SourceDataType>() {
        return (source: Observable<SourceDataType>): Observable<SourceDataType> =>
            source.pipe(
                switchMap((src) =>
                    this._afterViewInit$.pipe(
                        filter((afterViewInit) => afterViewInit),
                        map(() => src)
                    )
                )
            );
    }

    /** @hidden */
    private async _init(): Promise<void> {
        this._language = await firstValueFrom(this._language$);
    }
}
