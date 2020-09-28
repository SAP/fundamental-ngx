import {
    ChangeDetectionStrategy, Component, Input, ViewEncapsulation,
    ContentChildren, QueryList, HostBinding, ViewChild,
    ElementRef, AfterContentInit, Output, EventEmitter,
    HostListener, ChangeDetectorRef, OnInit, AfterViewInit, ContentChild, Self, Optional, SkipSelf, Host, OnDestroy
} from '@angular/core';
import { FocusKeyManager, FocusOrigin } from '@angular/cdk/a11y';
import { UP_ARROW, DOWN_ARROW, ENTER, SPACE } from '@angular/cdk/keycodes';
import { NgControl, NgForm } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { Subscription, Subject, of } from 'rxjs';
import { takeUntil, delay, tap } from 'rxjs/operators';
import { ListDataSource, isDataSource } from '../../domain/data-source';
import { ContentDensity, FormFieldControl } from '../../components/form/form-control';
import { BaseComponent } from '../base';
import { CollectionBaseInput } from '../form/collection-base.input';
import { BaseListItem, ListItemDef } from './base-list-item';
import { ListConfig } from './list.config';
import { FormField } from '../form/form-field';


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
        this.itemEl.nativeElement.querySelector('ul').classList.add('fd-list--object');
    }

    @Input()
    get value(): any {
        return super.getValue();
    }

    /** setter and getter for radio button and checkbox*/
    set value(value: any) {
        super.setValue(value);
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

    /**
    * Child items of the List.
    */
    @ContentChildren(BaseListItem, { descendants: true })
    ListItems: QueryList<BaseListItem>;

    /** role */
    @HostBinding('attr.role')
    role = 'list';

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
        this._keyManager = new FocusKeyManager<BaseListItem>(this.ListItems).withWrap();
        this.ListItems.forEach((item) => {
            if (item.navigationIndicator) {
                this._partialNavigation = true;
            }
        });
        this.ListItems.forEach((item) => {
            console.log('this._partialNavigation==>', this._partialNavigation);
            if (!this._partialNavigation) {
                item.navigated = this.navigated;
                item.navigationIndicator = this.navigationIndicator;
                item.listType = this.listType;
            }
            item.contentDensity = this.contentDensity;
            item._isCompact = this._isCompact;
            item.selectionMode = this.selectionMode;
            item._hasByLine = this.hasByLine;
            item._noSeperator = this.noSeperator;
            this.stateChanges.next(item);
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
        this._itemsSubscription = this.ListItems.changes.subscribe((items) => {
            // verfiying partial navgation set for all items in one go
            items.forEach((item) => {
                if (item.navigationIndicator) {
                    this._partialNavigation = true;
                }
            });
            items.forEach((item) => {
                console.log('this._partialNavigation==>', this._partialNavigation);
                if (!this._partialNavigation) {
                    item.navigated = this.navigated;
                    item.navigationIndicator = this.navigationIndicator;
                    item.listType = this.listType;
                }
                item.contentDensity = this.contentDensity;
                item._isCompact = this._isCompact;
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
            if (event.keyCode === DOWN_ARROW || event.keyCode === UP_ARROW) {
                return false;
            } else if (event.keyCode === ENTER || event.keyCode === SPACE) {
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
    _onSelectionChanged(event: any): void {
        if (event.target.checked) {
            this._selectionModel.select(event.target.parentNode.parentNode.parentNode);
        } else {
            this._selectionModel.deselect(event.target.parentNode.parentNode.parentNode);
        }
    }

    /** @hidden */
    /**  on Update navgiation styles for non navigated items
     * event:any to avoid code duplication**/
    @HostListener('click', ['$event'])
    _updateNavigation(event: any): void {
        this.ListItems.forEach((item) => {
            if (item.anchor !== undefined) {
                item.anchor.nativeElement.classList.remove('is-navigated');
            }
        });
        if (event.target !== null && event.target.tagName.toLowerCase() === 'a') {
            event.target.classList.add('is-navigated');
        }
        this._handleSingleSelect(event);
        this._handleMultiSelect(event);

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
    private _handleSingleSelect(event: any): void {
        // clean up single selection items
        if (event.target !== null && event.target !== undefined && this.selectionMode === 'single') {
            this.ListItems.forEach((item) => {
                if (item.radioButtonComponent !== undefined) {
                    item.listItem.nativeElement.classList.remove('is-selected');
                }
            });
            this._selectionModel.clear();

            // get the selected item
            if (event.target.tagName.toLowerCase() === 'li' &&
                event.target.querySelector('fd-radio-button') !== undefined) {
                const radio1 = event.target.querySelector('fd-radio-button');
                this._selectedvalue = radio1.getAttribute('ng-reflect-value');
                radio1.parentNode.parentNode.classList.add('is-selected');
                this._selectionModel.select(radio1.parentNode.parentNode);
            } else if (event.target.tagName.toLowerCase() === 'span' &&
                event.target.parentNode.querySelector('fd-radio-button') !== undefined) {
                const radio2 = event.target.parentNode.querySelector('fd-radio-button');
                this._selectedvalue = radio2.getAttribute('ng-reflect-value');
                radio2.parentNode.parentNode.classList.add('is-selected');
                this._selectionModel.select(radio2.parentNode.parentNode);
            } else if ((event.target.tagName.toLowerCase() === 'label'
                || event.target.tagName.toLowerCase() === 'input') &&
                event.target.type === 'radio') {
                const radio3 = event.target.parentNode;
                this._selectedvalue = radio3.getAttribute('ng-reflect-value');
                radio3.parentNode.parentNode.classList.add('is-selected');
                this._selectionModel.select(radio3.parentNode.parentNode);
            } else if (event.target.querySelector('fd-radio-button') !== undefined &&
                event.target.querySelector('fd-radio-button') !== null) {
                const target1 = event.target;
                this._selectedvalue = target1.getAttribute('ng-reflect-value');
                target1.parentNode.parentNode.classList.add('is-selected');
                this._selectionModel.select(target1.parentNode.parentNode);
            } else if ((event.target.tagName.toLowerCase() === 'div')) {
                const divPart = event.target.parentNode.parentNode;
                divPart.classList.add('is-selected');
                this._selectionModel.select(divPart);
            }
        }
        // selecteditem changes inform parent
        this.ListItems.forEach((item) => {
            if (item.radioButtonComponent !== undefined) {
                item.selectionValue = this._selectedvalue;
                this.stateChanges.next(item);
            }
        });
    }

    /** @hidden */
    /**List item with checkbox styles,check,uncheckupdates
     * event:any to avoid code duplication
     */
    private _handleMultiSelect(event: any): void {
        if (event.target !== null &&
            event.target !== undefined &&
            this.selectionMode === 'multi') {
            if (event.target.tagName.toLowerCase() === 'li' &&
                event.target.querySelector('fd-checkbox') !== undefined) {
                const checkbox1 = event.target.querySelector('fd-checkbox');
                if (checkbox1.childNodes[0].checked) {
                    this._selectionModel.select(checkbox1.parentNode.parentNode);
                } else {
                    this._selectionModel.deselect(checkbox1.parentNode.parentNode);
                }
            } else if (event.target.tagName.toLowerCase() === 'span' &&
                event.target.parentNode.querySelector('fd-checkbox') !== undefined) {
                const checkbox2 = event.target.parentNode.querySelector('fd-checkbox');
                if (checkbox2.childNodes[0].checked) {
                    this._selectionModel.select(checkbox2.parentNode.parentNode);
                } else {
                    this._selectionModel.deselect(checkbox2.parentNode.parentNode);
                }
            } else if ((event.target.tagName.toLowerCase() === 'label'
                || event.target.tagName.toLowerCase() === 'input')
                && event.target.type === 'checkbox') {
                const checkbox3 = event.target;
                if (checkbox3.checked) {
                    this._selectionModel.select(
                        checkbox3.parentNode.parentNode.parentNode);
                } else {
                    this._selectionModel.deselect(
                        checkbox3.parentNode.parentNode.parentNode);
                }
            } else if ((event.target.tagName.toLowerCase() === 'label'
                || event.target.tagName.toLowerCase() === 'input') &&
                event.target.type === 'checkbox') {
                if (event.target.checked) {
                    this._selectionModel.select(
                        event.target.parentNode.parentNode.parentNode);
                } else {
                    this._selectionModel.deselect(
                        event.target.parentNode.parentNode.parentNode);
                }
            } else if ((event.target.tagName.toLowerCase() === 'div')) {
                const divPart = event.target.parentNode.parentNode;
                const checkbox = divPart.querySelector('input');
                if (checkbox.checked) {
                    this._selectionModel.select(divPart);
                } else {
                    this._selectionModel.deselect(divPart);
                }
            }
        }

    }
}

@Component({
    selector: 'fdp-list-footer',
    template: `<li #listfooter class="fd-list__footer" [attr.id]="id" role="listitem">
    <ng-content> </ng-content>
    </li>`
})
export class ListFooter extends BaseComponent { }

@Component({
    selector: 'fdp-list-group-header',
    template: `<li #listItem fd-list-group-header [attr.id]="id" role="listitem"
    [attr.aria-label]="grpheaderTitle" [attr.title]="grpheaderTitle">
    {{grpheaderTitle}} <ng-content></ng-content>
</li>`
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
