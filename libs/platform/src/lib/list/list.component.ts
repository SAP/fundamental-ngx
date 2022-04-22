import {
    AfterContentInit,
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
import { FocusKeyManager } from '@angular/cdk/a11y';
import { NgControl, NgForm } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { isObservable, Observable, of, Subject, Subscription } from 'rxjs';
import { delay, takeUntil, tap } from 'rxjs/operators';

import { ContentDensity, KeyUtil } from '@fundamental-ngx/core/utils';
import {
    ArrayListDataSource,
    BaseComponent,
    CollectionBaseInput,
    FormField,
    FormFieldControl,
    isDataSource,
    ListDataSource,
    ObservableListDataSource
} from '@fundamental-ngx/platform/shared';
import { BaseListItem, ListItemDef } from './base-list-item';
import { ListConfig } from './list.config';

export type SelectionType = 'none' | 'multi' | 'single' | 'delete';
export type ListType = 'inactive' | 'active' | 'detail';
let nextListId = 0;
let nextListGrpHeaderId = 0;
export type FdpListDataSource<T> = ListDataSource<T> | Observable<T[]> | T[];

export class SelectionChangeEvent {
    selectedItems: BaseListItem[];
    index: number;
}

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
    providers: [{ provide: FormFieldControl, useExisting: ListComponent, multi: true }]
})
export class ListComponent extends CollectionBaseInput implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {
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

    /** Wait time for new items */
    @Input()
    delayTime: number;

    /** Items to be loaded at once */
    @Input()
    itemSize = 0;

    /** Enables lazy loadMore of data */
    @Input()
    loadMore: boolean;

    /** Enables data load on scroll for true
     * false: enables data loading on button
     * click
     */
    @Input()
    loadOnScroll: boolean;

    /** define the role to custom requirement */
    @Input()
    role = 'list';

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

    /** The type of the selection. Types include:
     *'none'| 'multi' | 'single'|'delete'.
     * Leave empty for default ().'
     * Default value is set to ''
     */
    @Input()
    selectionMode: SelectionType = 'none';
    /** @hidden */
    @Output()
    selectedItemChange: EventEmitter<SelectionChangeEvent> = new EventEmitter<SelectionChangeEvent>();
    /** Access child element, for checking link content*/
    @ViewChild('linkElement', { read: ElementRef })
    anchor: ElementRef;
    @ContentChild(ListItemDef)
    listItemDef: ListItemDef;
    @ContentChild('#listItem', { read: ElementRef })
    li: ElementRef;
    /**
     * Child items of the List.
     */
    @ContentChildren(BaseListItem, { descendants: true })
    listItems: QueryList<BaseListItem>;
    /** @hidden
     * To display loading symbol */
    _loading = false;
    /**
     * @hidden
     * keyManger to handle keybord events
     * used in template
     */
    _keyManager?: FocusKeyManager<BaseListItem>;
    /** @hidden */
    _items: any[] = [];
    /** @hidden
     */
    _destroyed = new Subject<void>();
    /**
     * @hidden
     * Verfies partial navigation enabled */
    protected _partialNavigation = false;
    /** @hidden
     * The model backing of the component. */
    private _selectionModel: SelectionModel<BaseListItem>;
    /** @hidden
     * Whether list component has multiselection
     * binding in tempate to append class */
    private _multiSelect = false;
    /** @hidden
     * Whether row level selection mode is enabled to list component
     * for all the items
     */
    private _rowSelection: boolean;
    /** @hidden
     * To store */
    private _tempItems: any[] = [];
    /** @hidden
     */
    private _startIndex = 0;
    /** @hidden
     */
    private _lastIndex = this.itemSize;
    /** @hidden
     */
    private _dsItems: any[] = [];
    /** @hidden
     * for data source handling
     */
    private _dsSubscription: Subscription | null;
    /** @hidden
     * for items impertaive and declartive approaches
     */
    private _itemsSubscription: Subscription | null;

    /** @hidden */
    constructor(
        protected _changeDetectorRef: ChangeDetectorRef,
        public itemEl: ElementRef,
        @Optional() @Self() public ngControl: NgControl,
        @Optional() @Self() public ngForm: NgForm,
        @Optional() @SkipSelf() @Host() formField: FormField,
        @Optional() @SkipSelf() @Host() formControl: FormFieldControl<any>,
        protected _listConfig: ListConfig
    ) {
        super(_changeDetectorRef, ngControl, ngForm, formField, formControl);
    }

    @Input()
    get value(): any {
        return super.getValue();
    }

    /** setter and getter for radio button and checkbox*/
    set value(value: any) {
        super.setValue(value);
    }

    /** setter and getter for row level Selection*/
    @Input('rowSelection')
    get selectRow(): boolean {
        return this._rowSelection;
    }

    set selectRow(value: boolean) {
        this._rowSelection = value;
        if (this._rowSelection) {
            this.selection = true;
            this.itemEl.nativeElement.querySelector('ul').classList.add('fd-list--selection-row');
            if (this.navigated && this.hasObject) {
                this.itemEl.nativeElement.querySelector('ul').classList.remove('fd-list--selection-row');
            }
        }
    }

    /** @hidden */
    _contentDensity: ContentDensity = this._listConfig.contentDensity;

    /** @hidden */
    protected _dataSource: FdpListDataSource<any>;

    /**
     * Datasource for suggestion list
     */
    @Input()
    get dataSource(): FdpListDataSource<any> {
        return this._dataSource;
    }

    set dataSource(value: FdpListDataSource<any>) {
        if (value) {
            this._initializeDS(value);
        }
    }

    /** @hidden
     * Whether Navigation mode is included to list component
     * for all the items
     */
    private _navigated: boolean;

    /** setter and getter for _navigated */
    @Input('navigated')
    get navigated(): boolean {
        return this._navigated;
    }

    set navigated(value: boolean) {
        this._navigated = value;
        this.itemEl.nativeElement.querySelector('ul').classList.add('fd-list--navigation');

        if (this.hasObject) {
            this.itemEl.nativeElement.querySelector('ul').classList.add('fd-list--navigation-object');
        }
    }

    /** @hidden
     * Whether Navigation mode is included to list component
     * only a subset of the list items are navigable
     * you should indicate those by displaying a navigation arrow
     */
    private _navigationIndicator: boolean;

    /** setter and getter for _navigationIndicator */
    @Input('navigationIndicator')
    get navigationIndicator(): boolean {
        return this._navigationIndicator;
    }

    set navigationIndicator(value: boolean) {
        this._navigationIndicator = value;
        this.itemEl.nativeElement.querySelector('ul').classList.add('fd-list--navigation-indication');
    }

    /** @hidden
     * Whether By line is present in list item*/
    private _hasByLine: boolean;

    /** setter and getter for hasByLine*/
    @Input('hasByLine')
    get hasByLine(): boolean {
        return this._hasByLine;
    }

    set hasByLine(value: boolean) {
        this._hasByLine = value;
        this.itemEl.nativeElement.querySelector('ul').classList.add('fd-list--byline');
    }

    /** @hidden
     * Whether object present in list item*/
    private _hasObject: boolean;

    /** setter and getter for hasObject*/
    @Input('hasObject')
    get hasObject(): boolean {
        return this._hasObject;
    }

    set hasObject(value: boolean) {
        this._hasObject = value;
        this.itemEl.nativeElement.querySelector('ul').classList.add('fd-object-list');
    }

    /** @hidden */
    /** Instailization of list with selection mode*/
    ngOnInit(): void {
        if (this._dsItems.length !== null && this.itemSize !== 0) {
            this._startIndex = 0;
            this._lastIndex = this.itemSize;
            this._items = [];
            this._items = this._dsItems.slice(this._startIndex, this._lastIndex);
        } else {
            this._items = this._dsItems;
        }
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

        this._selectionModel.changed.subscribe(() => {
            this.selectedItems = this._selectionModel.selected;
            const event = new SelectionChangeEvent();
            event.selectedItems = this.selectedItems;
            this.stateChanges.next(event);
            this.selectedItemChange.emit(event);
        });
    }

    /** @hidden */
    /** Keyboard manager on list items, set values when passed via array */
    ngAfterViewInit(): void {
        this._keyManager = new FocusKeyManager<BaseListItem>(this.listItems).withWrap();

        if (this.listItems.length !== 0) {
            this.listItems.first.listItem.nativeElement.setAttribute('tabindex', 0);
        }
        this.listItems.forEach((item) => {
            if (item.navigationIndicator || item.listType === 'detail') {
                this._partialNavigation = true;
            }
        });
        this.listItems.forEach((item) => {
            if (!this._partialNavigation) {
                item.navigated = this.navigated;
                item.navigationIndicator = this.navigationIndicator;
                item.listType = this.listType;
            }
            item.contentDensity = this.contentDensity;
            item.selectionMode = this.selectionMode;
            item.selectRow = this.selectRow;
            item._hasByLine = this.hasByLine;
            this.stateChanges.next(item);
        });

        const indicators = this.itemEl.nativeElement.querySelectorAll('fd-busy-indicator');
        indicators.forEach((indicator) => {
            if (indicator) {
                indicator.setAttribute('aria-label', '');
            }
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
    ngAfterContentInit(): void {
        this._itemsSubscription = this.listItems.changes.subscribe((items) => {
            if (this.listItems.length !== 0) {
                this.listItems.first.listItem.nativeElement.setAttribute('tabindex', 0);
            }

            // verfiying partial navgation set for all items in one go
            items.forEach((item) => {
                if (item.navigationIndicator || item.listType === 'detail') {
                    this._partialNavigation = true;
                }
            });
            items.forEach((item) => {
                if (!this._partialNavigation) {
                    item.navigated = this.navigated;
                    item.navigationIndicator = this.navigationIndicator;
                    item.listType = this.listType;
                }
                item.contentDensity = this.contentDensity;
                item.selectRow = this.selectRow;
                item.selectionMode = this.selectionMode;
                item._hasByLine = this.hasByLine;
                this.stateChanges.next(item);
            });
        });
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
        if (this._selectionModel) {
            this._selectionModel.changed.unsubscribe();
        }
        if (this._itemsSubscription) {
            this._itemsSubscription.unsubscribe();
        }
    }

    /** @hidden */
    /** handline keyboard operations
     * in template on list and list items
     */
    _handleKeyDown(event: KeyboardEvent): void {
        event.stopImmediatePropagation();
        if (KeyUtil.isKeyCode(event, ENTER) || KeyUtil.isKeyCode(event, SPACE)) {
             this._updateNavigation(event);
         }
    }

    /** @hidden
     * binded in template on scroll
     */
    _scrollHandler(): void {
        if (!this._loading && this.loadOnScroll) {
            this._getMoreData();
        }
    }

    /** @hidden */
    /** load more on enter or space press */
    _loadOnkeyPress(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, ENTER) || KeyUtil.isKeyCode(event, SPACE)) {
            this._getMoreData();
        }
    }

    /** @hidden
     *  Handles lazy loading data
     * used in template
     * onscroll and on more button click
     */
    _getMoreData(): void {
        this._loading = true;
        of(this._loadNewItems())
            .pipe(
                tap((data) => {
                    if (data === null || data === undefined) {
                        console.error('===Invalid Response recived===');
                    }
                }),
                delay(this.delayTime)
            )
            .subscribe((result) => {
                if (result !== null && result !== undefined) {
                    for (let i = this._items.length, j = 0; j < result.length; ++i, ++j) {
                        this._items[i] = result[j];
                    }
                }
                this._loading = false;
                this.stateChanges.next(this._items);
                this._changeDetectorRef.markForCheck();
            });
    }

    /** @hidden
     *  used in tempate to get Selected items from a list
     * event:any to avoid code duplication**/
    _onSelectionChanged(event: Event): void {
        this._updateNavigation(event);
    }

    /** @hidden */
    /**  on Update navgiation styles for non navigated items
     * event:any to avoid code duplication
     * seprate PR for custom event**/
    @HostListener('click', ['$event'])
    _updateNavigation(event: Event): void {
        this.listItems.forEach((item, index) => {
            item.anchor?.nativeElement.classList.remove('is-navigated');
            if (item._focused) {
                this._keyManager?.updateActiveItem(index);
            }
        });

        const el = event.target instanceof HTMLElement ? event.target : null;
        
        if (el?.tagName.toLowerCase() === 'a') {
            el.classList.add('is-navigated');
        } else if ( el?.tagName.toLowerCase() === 'li') {
            el.querySelector('a')?.classList.add('is-navigated');
        }
    }

    /** @hidden */
    _selectItem(item: BaseListItem): void {
        this._selectionModel.select(item);
        this.stateChanges.next(item);
    }

    /** @hidden */
    private _initializeDS(ds: FdpListDataSource<any>): void {
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
    private _toDataStream(source: FdpListDataSource<any>): ListDataSource<any> | undefined {
        if (isDataSource(source)) {
            return <ListDataSource<any>>source;
        }

        if (Array.isArray(source)) {
            // default implementation to work on top of arrays
            return new ArrayListDataSource<any>(source);
        }

        if (isObservable(source)) {
            return new ObservableListDataSource<any>(source);
        }

        return undefined;
    }

    /** @hidden */
    private _openDataStream(ds: FdpListDataSource<any>): ListDataSource<any> {
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
                this._cd.markForCheck();
            });
        // initial data fetch
        initDataSource.match('*');
        return initDataSource;
    }

    /** @hidden */
    private _loadNewItems(): any[] {
        this._startIndex = this._startIndex + this.itemSize;
        this._lastIndex = this._lastIndex + this.itemSize;
        this._tempItems = this._dsItems.slice(this._startIndex, this._lastIndex);
        return this._tempItems;
    }
}

@Component({
    selector: 'fdp-list-footer',
    template: ` <li #listfooter class="fd-list__footer" [attr.id]="id" role="option">
        <ng-content></ng-content>
    </li>`
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class ListFooter extends BaseComponent {}

@Component({
    selector: 'fdp-list-group-header',
    template: ` <li #listItem fd-list-group-header [attr.id]="id" role="option" [tabindex]="0">
        <span fd-list-title>{{ grpheaderTitle }}</span>
        <ng-content></ng-content>
    </li>`,
    providers: [{ provide: BaseListItem, useExisting: forwardRef(() => ListGroupHeader) }]
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class ListGroupHeader extends BaseListItem implements OnInit {
    /**
     *  Displays list goup header title
     */
    @Input()
    grpheaderTitle?: string;

    /** @hidden */
    /** Instailization of list header*/
    ngOnInit(): void {
        this.id = `fdp-list-${nextListGrpHeaderId++}`;
    }
}
