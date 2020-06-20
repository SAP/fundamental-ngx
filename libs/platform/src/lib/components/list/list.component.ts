import {
    ChangeDetectionStrategy, Component, Input, ViewEncapsulation,
    ContentChildren, QueryList, HostBinding, ViewChild,
    ElementRef, AfterContentInit, Output, EventEmitter, HostListener, ChangeDetectorRef, OnInit
} from '@angular/core';
import { BaseComponent } from '../base';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { UP_ARROW, DOWN_ARROW, ENTER, SPACE } from '@angular/cdk/keycodes';
import { BaseListItem } from './base-list-item';
import { SelectionModel } from '@angular/cdk/collections';


export type SelectionType = '' | 'multi' | 'single';
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
    changeDetection: ChangeDetectionStrategy.OnPush
})


export class ListComponent extends BaseComponent implements AfterContentInit, OnInit {


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
    _hasNavigation: boolean;

    /** Whether Navigation mode is included to list component
     * only a subset of the list items are navigable
     * you should indicate those by displaying a navigation arrow
    */
    _showNavigationArrow: boolean;

    /** Whether By line is present in list item*/
    _hasByLine: boolean;

    /** Whether list component has removed borders */
    @Input()
    noBorder: boolean = false;

    /** Whether list component has multiselection */
    multiSelect: boolean = false;

    /** The type of the selection. Types include:
    *''| 'multi' | 'single'.
    * Leave empty for default ().'
    * Default value is set to ''
    */
    @Input()
    public selectionMode: SelectionType = '';

    /**  An array that holds a list of all selected items**/
    @Input()
    protected selectedItems: BaseListItem[];

    /** a11y role */
    @HostBinding('attr.role')
    role = 'list';

    /** The model backing of the component. */
    selection: SelectionModel<BaseListItem>;

    /** setter and getter for _hasNavigation */
    get hasNavigation(): boolean {
        return this._hasNavigation;
    }

    @Input('hasNavigation')
    set hasNavigation(value: boolean) {
        this._hasNavigation = value;
        this.itemEl.nativeElement.querySelector('ul').classList.add('fd-list--navigation');
    }

    /** setter and getter for _showNavigationArrow */
    get showNavigationArrow(): boolean {
        return this._showNavigationArrow;
    }

    @Input('showNavigationArrow')
    set showNavigationArrow(value: boolean) {
        this._showNavigationArrow = value;
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
    onSelectionChanged(event: any) {
        if (event.target.checked) {
            this.selection.select(event.target.parentNode.parentNode);
        }
        else {
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
        if (event.target.querySelector('a') !== undefined && event.target.querySelector('a') !== null) {
            event.target.querySelector('a').classList.add('is-navigated');
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
        }
        else if (event.target.querySelector('fd-radio-button') !== undefined &&
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
            }
            else {
                event.target.parentNode.parentNode.classList.remove('is-selected');
                this.selection.deselect(event.target.parentNode.parentNode);
            }
        }
        else if (event.target !== null && event.target.querySelector('fd-checkbox') !== undefined
            && event.target.querySelector('fd-checkbox') !== null) {
            event.target.querySelector('fd-checkbox').childNodes[0].checked =
                !event.target.querySelector('fd-checkbox').childNodes[0].checked;
            if (event.target.querySelector('fd-checkbox').childNodes[0].checked) {
                event.target.classList.add('is-selected');
                this.selection.select(event.target);
            }
            else {
                event.target.classList.remove('is-selected');
                this.selection.deselect(event.target);
            }
        }
    }

    /** @hidden */
    /** Instailization of list with selection mode*/
    ngOnInit(): void {
        this.id = `fdp-list-${nextListId++}`;

        // for checkbox,selecAll,unselectAll
        if (this.selectionMode === 'multi') {
            this.multiSelect = true;
        }
        else { this.multiSelect = false; }
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
        this.keyManager.setFirstItemActive();
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
            item.hasNavigation = this._hasNavigation;
            item.showNavigationArrow = this._showNavigationArrow;
            item.contentDensity = this.contentDensity;
            item.selectionMode = this.selectionMode;
            item.hasByLine = this._hasByLine;
        });

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
                this.keyManager.activeItem.onItemClick();
                this.updateNavigation(event);
                return false;
            }
        }
    }

    /** @hidden */
    constructor(protected _changeDetectorRef: ChangeDetectorRef, public itemEl: ElementRef) {
        super(_changeDetectorRef);
    }

}

@Component({
    selector: 'fdp-list-footer',
    template: `<li #listfooter fd-list-footer [attr.id]="id" role="listitem">
    <ng-content> </ng-content>
    </li>`
})
export class ListFooter extends BaseComponent { }

@Component({
    selector: 'fdp-list-group-header',
    template: `<li #listItem fd-list-item fd-list-group-header [attr.id]="id" role="listitem" tabindex="-1"
    [attr.aria-label]="grpheaderTitle" [attr.title]="grpheaderTitle">
    {{grpheaderTitle}} <ng-content></ng-content>
</li>`
})
export class ListGroupHeader extends BaseListItem {
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
