import {
    ChangeDetectionStrategy, Component, Input, ViewEncapsulation,
    ContentChildren, QueryList, HostBinding, ViewChild,
    ElementRef, AfterContentInit, Output, EventEmitter,
    HostListener, ChangeDetectorRef, OnInit, TemplateRef, AfterViewInit, OnDestroy, forwardRef, SimpleChanges, ContentChild
} from '@angular/core';
import { BaseComponent } from '../base';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { UP_ARROW, DOWN_ARROW, ENTER, SPACE } from '@angular/cdk/keycodes';
import { BaseListItem, ListItemDef } from './base-list-item';
import { SelectionModel } from '@angular/cdk/collections';
import { ListDataSource, isDataSource } from '../../domain/data-source';
import { Subscription, Subject, of } from 'rxjs';
import { takeUntil, delay, tap } from 'rxjs/operators';
import { ContentDensity } from '../../components/form/form-control';
import { ListConfig } from './list.config';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';


export type SelectionType = '' | 'multi' | 'single' | 'delete';
export type ListType = 'inactive' | 'active' | 'detail';
let nextListId = 0;
let nextListGrpHeaderId = 0;
export type FdpListDataSource<T> = ListDataSource<T> | T[];
export const LIST_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ListComponent),
    multi: true
};


/**
 * The List component represents a container for list item types.
 * It is used to display a list features.
 */
@Component({
    selector: 'fdp-list',
    templateUrl: './list.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./list.component.scss',
        './drag-and-drop.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [LIST_VALUE_ACCESSOR],
})


export class ListComponent extends BaseComponent implements AfterContentInit, OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {


    /**
    * Child items of the List.
    */
    @ContentChildren(BaseListItem, { descendants: true }) ListItems: QueryList<BaseListItem>;

    /** Access child element, for checking link content*/
    @ViewChild('link', { read: ElementRef })
    anchor: ElementRef;

    keyManager: FocusKeyManager<BaseListItem>;

    /** @hidden */
    @Output()
    selectedItemChange: EventEmitter<any> = new EventEmitter<any>();

    /** Whether Navigation mode is included to list component
     * for all the items
    */
    _navigated: boolean;

    /** Whether Navigation mode is included to list component
     * only a subset of the list items are navigable
     * you should indicate those by displaying a navigation arrow
    */
    _navigationIndicator: boolean;

    /** Whether By line is present in list item*/
    _hasByLine: boolean;

    /**Enables lazy loadMore of data */
    @Input()
    loadMore: boolean;

    /**To display loading symbol */
    loading = false;

    /**Enables data load on scroll for true
     * false: enables data loading on button
     * click
     */
    @Input()
    onScroll: boolean;

    /**Wait time for new items */
    @Input()
    delayTime: number;

    /**Max height for viewport to display scroll */
    @Input()
    maxHeight: string;

    /**Items to be loaded at once */
    @Input()
    itemSize: number;

    /**Scroll offset percentage to trigger scroll event */
    @Input()
    scrollOffsetPercentage: number;

    /**Event emitted on load more button clicked */
    @Output()
    onload: EventEmitter<any> = new EventEmitter<any>();

    /** Whether list component has removed borders */
    @Input()
    @HostBinding('class.fd-list--no-border')
    noBorder = false;

    /** Whether list component has removed bottom borders */
    @Input()
    noSeperator: boolean;

    /** Whether list component has multiselection */
    multiSelect = false;


    tempItems = [];
    startIndex = 0;
    lastIndex = this.itemSize;

    /** The type of the selection. Types include:
    *''| 'multi' | 'single'|'delete'.
    * Leave empty for default ().'
    * Default value is set to ''
    */
    @Input()
    public selectionMode: SelectionType = '';

    /** @hidden */
    _contentDensity = this._listConfig.contentDensity;

    /**
     * @hidden
     * Used to define if contentDensity value is 'compact' or not.
     */
    isCompact = this._contentDensity === 'compact';

    /**ListType 'inactive' | 'active' | 'navigation' | 'detail' */
    @Input()
    listType: ListType;

    @Input()
    public draggable = false;

    /**  An array that holds a list of all selected items**/
    @Input()
    protected selectedItems: BaseListItem[];

    /** a11y attributes*/

    /** role */
    @HostBinding('attr.role')
    role = 'list';

    /** define size of items for screen reader */
    @Input()
    @HostBinding('attr.aria-setsize')
    ariaSetsize: number;

    /** Defines whether items are multiseletable for screen reader */
    @Input()
    @HostBinding('attr.aria-multiselectable')
    ariaMultiselectable: boolean;

    /** define label of list for screen reader */
    @Input()
    @HostBinding('attr.aria-label')
    ariaLabel: string;

    /**Title used on button when data loads on button click */
    @Input()
    loadTitle: string;

    protected _destroyed = new Subject<void>();


    @ContentChild(ListItemDef) listItemDef: ListItemDef;

    items = [];
    dsItems = [];
    protected _dataSource: FdpListDataSource<any>;
    private _dsSubscription: Subscription | null;

    /**
    * Todo: Name of the entity for which DataProvider will be loaded. You can either pass list of
    * items or use this entityClass and internally we should be able to do lookup to some registry
    * and retrieve the best matching DataProvider that is set on application level
    *
    *
    */
    @Input()
    entityClass: string;

    /** The model backing of the component. */
    selection: SelectionModel<BaseListItem>;

    /**
    * Datasource for suggestion list
    */
    @Input()
    get dataSource(): FdpListDataSource<any> {
        return this._dataSource;
    }
    set dataSource(value: FdpListDataSource<any>) {
        if (value) {
            this.initializeDS(value);
        }
    }

    /**
    * content Density of element. 'cozy' | 'compact'
    */
    @Input()
    set contentDensity(contentDensity: ContentDensity) {
        this._contentDensity = contentDensity;
        this.isCompact = contentDensity === 'compact';
    }

    /** setter and getter for _navigated */
    get navigated(): boolean {
        return this._navigated;
    }

    @Input('navigated')
    set navigated(value: boolean) {
        this._navigated = value;
        this.itemEl.nativeElement.querySelector('ul').classList.add('fd-list--navigation');
    }

    /** setter and getter for _navigationIndicator */
    get navigationIndicator(): boolean {
        return this._navigationIndicator;
    }

    @Input('navigationIndicator')
    set navigationIndicator(value: boolean) {
        this._navigationIndicator = value;
        this.itemEl.nativeElement.querySelector('ul').classList.add('fd-list--navigation-indication');
    }

    /** setter and getter for _hasByLine*/
    get hasByLine(): boolean {
        return this._hasByLine;
    }

    @Input('hasByLine')
    set hasByLine(value: boolean) {
        this._hasByLine = value;
        this.itemEl.nativeElement.querySelector('ul').classList.add('fd-list--byline');
    }


    /**  filter to get Selected items from a list**/
    onSelectionChanged(event: any): void {
        if (event.target.checked) {
            this.selection.select(event.target.parentNode.parentNode);
        } else {
            this.selection.deselect(event.target.parentNode.parentNode);
        }
    }

    /** @hidden */
    /**  Update navgiation styles for non navigated items**/
    @HostListener('click', ['$event'])
    updateNavigation(event: any): void {
        this.ListItems.forEach((item) => {
            if (item.anchor !== undefined) {
                item.anchor.nativeElement.classList.remove('is-navigated');
            }
        });
        if (event.target !== null && event.target.tagName.toLowerCase() === 'a') {
            event.target.classList.add('is-navigated');
        }

        this.ListItems.forEach((item) => {
            if (item.radioButtonComponent !== undefined) {
                item.radioButtonComponent.elementRef().nativeElement.checked = false;
                item.listItemRef.nativeElement.classList.remove('is-selected');
            }
        });

        this.handleSingleSelect(event);
        this.handleMultiSelect(event);

    }

    /** @hidden */
    /**List item with radio button styles,check,uncheckupdates */
    handleSingleSelect(event: any): void {
        if (event.target !== null && (event.target.tagName.toLowerCase() === 'label'
            || event.target.tagName.toLowerCase() === 'input') && event.target.type === 'radio') {
            event.target.checked = true;
            event.target.parentNode.parentNode.classList.add('is-selected');
            this.selection.select(event.target.parentNode.parentNode);
        } else if (event.target.querySelector('fd-radio-button') !== undefined &&
            event.target.querySelector('fd-radio-button') !== null) {
            event.target.querySelector('.fd-radio').checked = true;
            event.target.classList.add('is-selected');
            this.selection.select(event.target);
        }
    }

    /** @hidden */
    /**List item with checkbox styles,check,uncheckupdates */
    handleMultiSelect(event: any): void {
        if (event.target !== null && (event.target.tagName.toLowerCase() === 'label'
            || event.target.tagName.toLowerCase() === 'input') && event.target.type === 'checkbox') {
            event.target.checked = !event.target.checked;
            if (event.target.checked) {
                event.target.parentNode.parentNode.classList.add('is-selected');
                this.selection.select(event.target.parentNode.parentNode);
            } else {
                event.target.parentNode.parentNode.classList.remove('is-selected');
                this.selection.deselect(event.target.parentNode.parentNode);
            }
        } else if (event.target !== null && event.target.querySelector('fd-checkbox') !== undefined
            && event.target.querySelector('fd-checkbox') !== null) {
            event.target.querySelector('fd-checkbox').childNodes[0].checked =
                !event.target.querySelector('fd-checkbox').childNodes[0].checked;
            if (event.target.querySelector('fd-checkbox').childNodes[0].checked) {
                event.target.classList.add('is-selected');
                this.selection.select(event.target);
            } else {
                event.target.classList.remove('is-selected');
                this.selection.deselect(event.target);
            }
        }
    }

    /** @hidden */
    /** Instailization of list with selection mode*/
    ngOnInit(): void {

        if (this.dsItems.length !== null && this.itemSize !== 0) {
            this.startIndex = 0;
            this.lastIndex = this.itemSize;
            this.items = [];
            this.items = this.dsItems.slice(this.startIndex, this.lastIndex);
        } else {
            this.items = this.dsItems;
        }
        this.id = `fdp-list-${nextListId++}`;
        // using selection Model for multiselect
        if (this.selectionMode === 'multi') {
            this.multiSelect = true;
            this.ariaMultiselectable = true;
        } else { this.multiSelect = false; }
        this.selection = new SelectionModel<BaseListItem>(
            this.multiSelect,
            this.selectedItems
        );

        this.selection.changed.subscribe(e => {
            this.selectedItems = this.selection.selected;
            this.selectedItemChange.emit(this.selectedItems);
        });


    }

    /** @hidden */
    /**Keyboard manager on list items */
    ngAfterViewInit(): void {
        this.keyManager = new FocusKeyManager<BaseListItem>(this.ListItems).withWrap();
    }




    /** @hidden */
    /**Setting values from list to list items
     * example:
     * Does list item has navigation,
     * should show arrows,
     * will it be compact mode,
     * should be in which selection mode
     */
    ngAfterContentInit(): void {
        this.ListItems.forEach((item) => {
            item.navigated = this._navigated;
            item.navigationIndicator = this._navigationIndicator;
            item.contentDensity = this.contentDensity;
            item.selectionMode = this.selectionMode;
            item.listType = this.listType;
            item.hasByLine = this._hasByLine;
            item.draggable = this.draggable;
            item.noSeperator = this.noSeperator;
        });
    }

    ngOnDestroy(): void {

        if (isDataSource(this.dataSource)) {
            this.dataSource.close();
        }
        if (this._dsSubscription) {
            this._dsSubscription.unsubscribe();
        }
    }

    /** @hidden */
    /**handline keyboard operations
    *  on list and list items
    */
    handleKeyDown(event: any): boolean {
        event.stopImmediatePropagation();
        if (this.keyManager) {
            if (event.keyCode === DOWN_ARROW || event.keyCode === UP_ARROW) {
                return false;
            } else if (event.keyCode === ENTER || event.keyCode === SPACE) {
                this.updateNavigation(event);
                return false;
            }
        }
    }

    /** @hidden */
    constructor(protected _changeDetectorRef: ChangeDetectorRef, public itemEl: ElementRef, protected _listConfig?: ListConfig) {
        super(_changeDetectorRef);
    }
    writeValue(value: any): void {
        this.selectedItems = value;
        this._changeDetectorRef.markForCheck();
    }
    registerOnChange(fn: any): void {
        this._changeDetectorRef.markForCheck();
    }
    registerOnTouched(fn: any): void {
        this._changeDetectorRef.markForCheck();
    }

    private initializeDS(ds: FdpListDataSource<any>): void {
        this.dsItems = [];
        if (isDataSource(this.dataSource)) {
            this.dataSource.close();
            if (this._dsSubscription) {
                this._dsSubscription.unsubscribe();
                this._dsSubscription = null;
            }
        }
        // Convert ListDataSource<T> | T[] as DataSource
        this._dataSource = this.openDataStream(ds);
    }
    private toDataStream(ds: FdpListDataSource<any>): ListDataSource<any> {
        if (isDataSource(ds)) {
            return ds;
        }
        return undefined;
    }
    private openDataStream(ds: FdpListDataSource<any>): ListDataSource<any> {
        const initDataSource = this.toDataStream(ds);
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
                this.dsItems = data || [];
                this._cd.markForCheck();
            });
        // initial data fetch
        initDataSource.match('*');
        return initDataSource;
    }

    scrollHandler(): void {
        if (!this.loading && this.onScroll) {
            this.getMoreData();
        }
    }


    /**
   *  Handles lazy loading data
   */
    public getMoreData(): void {
        this.loading = true;
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
                    for (let i = this.items.length, j = 0; j < result.length; ++i, ++j) {
                        this.items[i] = result[j];
                    }
                }
                this.loading = false;
                this._changeDetectorRef.markForCheck();

            });

        this.onload.emit(event);
    }
    _loadNewItems(): any[] {
        this.startIndex = this.startIndex + this.itemSize;
        this.lastIndex = this.lastIndex + this.itemSize;
        this.tempItems = this.dsItems.slice(this.startIndex, this.lastIndex);
        return this.tempItems;
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

