import {
    ChangeDetectionStrategy, Component, Input, ViewEncapsulation,
    ContentChildren, QueryList, ViewChild,
    ElementRef, AfterContentInit, Output, EventEmitter,
    HostListener, ChangeDetectorRef, OnInit, AfterViewInit,
    ContentChild, Self, Optional, SkipSelf, Host, OnDestroy, forwardRef
} from '@angular/core';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { NgControl, NgForm } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription, Subject, of } from 'rxjs';
import { takeUntil, delay, tap } from 'rxjs/operators';
import { ENTER, SPACE, UP_ARROW, DOWN_ARROW } from '@angular/cdk/keycodes';

import { ListDataSource, isDataSource } from '../../domain/data-source';
import { ContentDensity, FormFieldControl } from '../../components/form/form-control';
import { FormField } from '../form/form-field';
import { BaseComponent } from '../base';
import { CollectionBaseInput } from '../form/collection-base.input';

import { BaseListItem, ListItemDef } from './base-list-item';
import { ListConfig } from './list.config';
import { KeyUtil, closestElement } from '@fundamental-ngx/core';



export type SelectionType = 'none' | 'multi' | 'single' | 'delete';
export type ListType = 'inactive' | 'active' | 'detail';
let nextListId = 0;
let nextListGrpHeaderId = 0;
export type FdpListDataSource<T> = ListDataSource<T> | T[];
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

    /**Title used on button when data loads on button click */
    @Input()
    loadTitle: string;

    /**Wait time for new items */
    @Input()
    delayTime: number;

    /**Items to be loaded at once */
    @Input()
    itemSize = 0;

    /**Enables lazy loadMore of data */
    @Input()
    loadMore: boolean;

    /**Enables data load on scroll for true
     * false: enables data loading on button
     * click
     */
    @Input()
    loadOnScroll: boolean;

    /**ListType 'inactive' | 'active' | 'navigation' | 'detail' */
    @Input()
    listType: ListType = 'active';

    /**Max height for viewport to display scroll */
    @Input()
    maxHeight: string;

    /** Whether list component has removed borders */
    @Input()
    noBorder = false;

    /** Whether list component has removed bottom borders */
    @Input()
    noSeperator: boolean;

    /**Scroll offset percentage to trigger scroll event */
    @Input()
    scrollOffsetPercentage: number;

    /**enables selection styles */
    @Input()
    selection = false;

    /** The type of the selection. Types include:
    *'none'| 'multi' | 'single'|'delete'.
    * Leave empty for default ().'
    * Default value is set to ''
    */
    @Input()
    selectionMode: SelectionType = 'none';

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


    /** setter and getter for _navigationIndicator */
    @Input('navigationIndicator')
    get navigationIndicator(): boolean {
        return this._navigationIndicator;
    }

    set navigationIndicator(value: boolean) {
        this._navigationIndicator = value;
        this.itemEl.nativeElement.querySelector('ul').classList.add('fd-list--navigation-indication');
    }

    /** setter and getter for hasByLine*/
    @Input('hasByLine')
    get hasByLine(): boolean {
        return this._hasByLine;
    }

    set hasByLine(value: boolean) {
        this._hasByLine = value;
        this.itemEl.nativeElement.querySelector('ul').classList.add('fd-list--byline');
    }

    /** setter and getter for hasObject*/
    @Input('hasObject')
    get hasObject(): boolean {
        return this._hasObject;
    }

    set hasObject(value: boolean) {
        this._hasObject = value;
        this.itemEl.nativeElement.querySelector('ul').classList.add('fd-object-list');
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

    /**
   * content Density of element. 'cozy' | 'compact'
   */
    set contentDensity(contentDensity: ContentDensity) {
        this._contentDensity = contentDensity;
        this._isCompact = contentDensity === 'compact';
    }

    /** @hidden */
    @Output()
    selectedItemChange: EventEmitter<SelectionChangeEvent> = new EventEmitter<SelectionChangeEvent>();

    /** Access child element, for checking link content*/
    @ViewChild('link', { read: ElementRef })
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

    /**@hidden
     * To display loading symbol */
    _loading = false;

    /**
     * @hidden
     * keyManger to handle keybord events
     * used in template
     */
    _keyManager: FocusKeyManager<BaseListItem>;

    /**@hidden */
    _items = [];

    /** @hidden
    */
    _destroyed = new Subject<void>();

    /** @hidden */
    _contentDensity: ContentDensity = this._listConfig.contentDensity;

    /**
     * @hidden
     * Used to define if contentDensity value is 'compact' or not.
     */
    _isCompact = this._contentDensity === 'compact';

    /**@hidden */
    protected _dataSource: FdpListDataSource<any>;

    /**@hidden
     * The model backing of the component. */
    private _selectionModel: SelectionModel<BaseListItem>;

    /**@hidden
     * Whether list component has multiselection
     * binding in tempate to append class */
    private _multiSelect = false;

    /**@hidden */
    private _selectedvalue: string;

    /**@hidden
     * Whether Navigation mode is included to list component
     * for all the items
    */
    private _navigated: boolean;

    /**@hidden
     * Whether row level selection mode is enabled to list component
     * for all the items
    */
    private _rowSelection: boolean;

    /**@hidden
     * Whether Navigation mode is included to list component
     * only a subset of the list items are navigable
     * you should indicate those by displaying a navigation arrow
    */
    private _navigationIndicator: boolean;

    /**@hidden
     * Whether By line is present in list item*/
    private _hasByLine: boolean;

    /**@hidden
     * Whether object present in list item*/
    private _hasObject: boolean;

    /** @hidden
    * To store */
    private _tempItems = [];

    /** @hidden
    */
    private _startIndex = 0;

    /** @hidden
    */
    private _lastIndex = this.itemSize;

    /** @hidden
    */
    private _dsItems = [];

    /**@hidden
     * for data source handling
     */
    private _dsSubscription: Subscription | null;

    /**@hidden
    * for items impertaive and declartive approaches
    */
    private _itemsSubscription: Subscription | null;


    /**
    * @hidden
    * Verfies partial navigation enabled */
    protected _partialNavigation = false;

    /** @hidden */
    constructor(protected _changeDetectorRef: ChangeDetectorRef,
        public itemEl: ElementRef,
        @Optional() @Self() public ngControl: NgControl,
        @Optional() @Self() public ngForm: NgForm,
        @Optional() @SkipSelf() @Host() formField: FormField,
        @Optional() @SkipSelf() @Host() formControl: FormFieldControl<any>,
        protected _listConfig?: ListConfig) {
        super(_changeDetectorRef, ngControl, ngForm, formField, formControl);
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
        } else { this._multiSelect = false; }
        this._selectionModel = new SelectionModel<BaseListItem>(
            this._multiSelect,
            this.selectedItems
        );

        this._selectionModel.changed.subscribe(e => {
            this.selectedItems = this._selectionModel.selected;
            const event = new SelectionChangeEvent();
            event.selectedItems = this.selectedItems;
            this.stateChanges.next(event);
            this.selectedItemChange.emit(event);

        });
    }

    /** @hidden */
    /**Keyboard manager on list items, set values when passed via array */
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
            item._isCompact = this._isCompact;
            item.selectionMode = this.selectionMode;
            item.selectRow = this.selectRow;
            item._hasByLine = this.hasByLine;
            item._noSeperator = this.noSeperator;
            this.stateChanges.next(item);
        });


        const indicators = this.itemEl.nativeElement.querySelectorAll('fd-busy-indicator');
            indicators.forEach((indicator) => {
                if (indicator) {
                    indicator.setAttribute('aria-label', '');
                }
            });
    }


    /** @hidden */
    /**Setting values from list to list items
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
                item._isCompact = this._isCompact;
                item.selectRow = this.selectRow;
                item.selectionMode = this.selectionMode;
                item._hasByLine = this.hasByLine;
                item._noSeperator = this.noSeperator;
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
    /**handline keyboard operations
    * in template on list and list items
    */
    _handleKeyDown(event: KeyboardEvent): boolean {
        event.stopImmediatePropagation();
        if (this._keyManager) {
            this._keyManager.setActiveItem(this._keyManager.activeItemIndex);
            if (KeyUtil.isKeyCode(event, DOWN_ARROW) || KeyUtil.isKeyCode(event, UP_ARROW)) {
                return false;
            } else if (KeyUtil.isKeyCode(event, ENTER) || KeyUtil.isKeyCode(event, SPACE)) {
                this._updateNavigation(event);
                return false;
            }
        }
    }

    /**@hidden
     * binded in template on scroll
     */
    _scrollHandler(): void {
        if (!this._loading && this.loadOnScroll) {
            this._getMoreData();
        }
    }

    /** @hidden */
    /**load more on enter or space press */
    _loadOnkeyPress(event: KeyboardEvent): void {
        if (KeyUtil.isKeyCode(event, ENTER) || KeyUtil.isKeyCode(event, SPACE)) {
            this._getMoreData();
        }
    }

    /**@hidden
   *  Handles lazy loading data
   * used in template
   * onscroll and on more button click
   */
    _getMoreData(): void {
        this._loading = true;
        of(this._loadNewItems())
            .pipe(
                tap(data => {
                    if (data === null || data === undefined) {
                        console.error('===Invalid Response recived===');
                    }
                }),
                delay(this.delayTime)
            ).subscribe(result => {
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


    /**@hidden
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
        let selectedItemId = '0';
        const el = event.target as HTMLElement;
        const parent = closestElement('.fd-list__item', event.target);
        if (parent !== null && parent !== undefined) {
            selectedItemId = parent.getAttribute('id');
        }

        this.listItems.forEach((item, index) => {
            if (item.anchor !== undefined) {
                item.anchor.nativeElement.classList.remove('is-navigated');
            }
            if (item._focused) {
                this._keyManager.updateActiveItem(index);
            }
        });
        if (el !== null && el.tagName.toLowerCase() === 'a') {
            el.classList.add('is-navigated');
        } else if (el !== null &&
            el.tagName.toLowerCase() === 'li' &&
            el.querySelector('a') !== undefined &&
            el.querySelector('a') !== null) {
            el.querySelector('a').classList.add('is-navigated');
        }

        if (el !== null && el !== undefined) {
            if (this.selectRow) {
                this._handleRowSelect(selectedItemId);
            } else if (this.selectionMode === 'single') {
                this._handleSingleSelect(event, selectedItemId);
            } else if (this.selectionMode === 'multi') {
                this._handleMultiSelect(selectedItemId);
            }
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
        // Convert ListDataSource<T> | T[] as DataSource
        this._dataSource = this._openDataStream(ds);
    }

    /** @hidden */
    private _toDataStream(ds: FdpListDataSource<any>): ListDataSource<any> {
        if (isDataSource(ds)) {
            return ds;
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

    /**@hidden
    /**List item with radio button styles,check,uncheckupdates
     * event:any to avoid code duplication
     */
    private _handleSingleSelect(event: Event, selectedItemId: string): void {
        const parent = closestElement('.fd-list__item', event.target);
        const radio = parent ? parent.querySelector('input') : null;
        this._selectedvalue = radio ? radio.getAttribute('ng-reflect-value') : null;


        this.listItems.forEach((item) => {
            if (item.radioButtonComponent !== undefined) {
                item._selected = false;
                item.listItem.nativeElement.setAttribute('aria-checked', false);
            }
            this.stateChanges.next(item);
        });
        this._selectionModel.clear();
        this.listItems.forEach((item) => {
            item.selectionValue = this._selectedvalue;
            if (item.listItem.nativeElement.getAttribute('id') === selectedItemId) {
                item.listItem.nativeElement.setAttribute('_selected', true);
                item.listItem.nativeElement.setAttribute('aria-checked', true);
                this._selectItem(item);
            }
        });

    }



    private _handleRowSelect(selectedItemId: string): void {
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
                if (item.anchor !== undefined) {
                    item.listItem.nativeElement.setAttribute('_selected', false);
                    item.listItem.nativeElement.setAttribute('aria-selected', false);
                    item.listItem.nativeElement.classList.remove('is-selected');
                    item.anchor.nativeElement.classList.remove('is-selected');
                    this.stateChanges.next(item);
                }
            });
            this._selectionModel.clear();
            this.listItems.forEach((item) => {
                if (item.listItem.nativeElement.getAttribute('id') === selectedItemId) {
                    item.listItem.nativeElement.setAttribute('_selected', true);
                    if (item.anchor !== undefined) {
                        item.anchor.nativeElement.classList.add('is-selected');
                    }
                    this._selectItem(item);
                }
            });
            selectedItemId = '0';

        }
    }


    /** @hidden */
    /**List item with checkbox styles,check,uncheckupdates
     * event:any to avoid code duplication
     */
    private _handleMultiSelect(selectedItemId: string): void {
        this.listItems.forEach((item) => {
            if (item.listItem.nativeElement.getAttribute('id') === selectedItemId) {
                const select = item.listItem.nativeElement.getAttribute('_selected');
                item.listItem.nativeElement.setAttribute('_selected', !select);
                if (item._selected) {
                    item.listItem.nativeElement.setAttribute('aria-selected', true);
                    this._selectionModel.select(item);
                } else {
                    item.listItem.nativeElement.setAttribute('aria-selected', false);
                    this._selectionModel.deselect(item);
                }
                this.stateChanges.next(item);
            }
        });
    }
}

@Component({
    selector: 'fdp-list-footer',
    template: `<li #listfooter class="fd-list__footer" [attr.id]="id" role="option">
    <ng-content> </ng-content>
    </li>`
})
export class ListFooter extends BaseComponent { }

@Component({
    selector: 'fdp-list-group-header',
    template: `<li #listItem fd-list-group-header [attr.id]="id" role="option"
    tabindex="0">
        <span fd-list-title>{{grpheaderTitle}}</span>
        <ng-content></ng-content>
</li>`,
providers: [
    { provide: BaseListItem, useExisting: forwardRef(() => ListGroupHeader) }
]
})
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

