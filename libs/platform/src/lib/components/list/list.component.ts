import {
    ChangeDetectionStrategy, Component, Input, ViewEncapsulation,
    ContentChildren, QueryList, HostBinding, ViewChild,
    ElementRef, AfterContentInit, Output, EventEmitter, HostListener, ChangeDetectorRef, OnInit
} from '@angular/core';
import { BaseComponent } from '../base';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { UP_ARROW, DOWN_ARROW, ENTER, SPACE } from '@angular/cdk/keycodes';
import { BaseListItem } from './base-list-item';

export type SelectionType = '' | 'multi' | 'single';
let nextListId = 0;
let nextListGrpHeaderId = 0;
let nextListHeaderId = 0;
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
    @Input()
    @HostBinding('class.fd-list--navigation')
    hasNavigation: boolean = false;

    /** Whether Navigation mode is included to list component
     * only a subset of the list items are navigable
     * you should indicate those by displaying a navigation arrow
    */
    @Input()
    @HostBinding('class.fd-list--navigation-indication')
    showNavigationArrow: boolean = false;

    /** Whether dropdown mode is included to list component*/
    @Input()
    dropdownMode: boolean = false;

    /** Whether By line is present in list item*/
    @Input()
    @HostBinding('class.fd-list--byline')
    hasByLine: boolean = false;

    /** Whether multi mode is included to list component*/
    @Input()
    multiInputMode: boolean = false;

    /** Whether list component contains message */
    @Input()
    hasMessage: boolean = false;

    /** Whether list component has removed borders */
    @Input()
    noBorder: boolean = false;

    /** Whether list component has multiselection */
    @HostBinding('class.fd-list--selection')
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

    /**  filter to get Selected items from a list**/
    onSelectionChanged(event: any) {
        if (event.target.checked) {
            this.selectedItems.push(event.target.parentNode.parentNode);
        }
        else {
            this.selectedItems = this.selectedItems.filter(m => m.id !== event.target.parentNode.parentNode.id);
        }
        this.selectedItemChange.emit(this.selectedItems);
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

    }

    /** @hidden */
    /**List item with radio button styles,check,uncheckupdates */
    handleSingleSelect(event: any): void {
        if (event.target !== null && (event.target.tagName.toLowerCase() === 'label' || event.target.tagName.toLowerCase() === 'input')) {
            this.selectedItems = [];
            event.target.checked = true;
            event.target.parentNode.parentNode.classList.add('is-selected');
            this.selectedItems.push(event.target.parentNode.parentNode);
            this.selectedItemChange.emit(this.selectedItems);
        }
        else if (event.target.querySelector('fd-radio-button') !== undefined &&
            event.target.querySelector('fd-radio-button') !== null) {
            this.selectedItems = [];
            event.target.querySelector('.fd-radio').checked = true;
            event.target.classList.add('is-selected');
            this.selectedItems.push(event.target);
            this.selectedItemChange.emit(this.selectedItems);
        }
    }

    /** @hidden */
    /** Instailization of list with selection mode*/
    ngOnInit(): void {
        this.id = `fdp-list-${nextListId++}`;
        if (this.selectionMode === 'multi' || this.selectionMode === 'single') {
            this.multiSelect = true;
        }
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
            item.hasNavigation = this.hasNavigation;
            item.showNavigationArrow = this.showNavigationArrow;
            item.contentDensity = this.contentDensity;
            item.selectionMode = this.selectionMode;
            item.hasByLine = this.hasByLine;
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


/**Note:replace below component
 *  with Toolbar once it is avalible
 **/
@Component({
    selector: 'fdp-list-header',
    template: `<li #listHeader class="fd-toolbar" [attr.id]="id" role="listitem">
    <div class="fd-toolbar fd-toolbar--solid">
    <ng-content select="[header]"></ng-content>
    </div>
    <br>
    <div style="width:100%"  class="fd-toolbar fd-toolbar--info fd-toolbar--active">
    <ng-content select="[infoText]"></ng-content>
    </div>
    </li>`,
    styleUrls: ['./list.component.scss']
})
export class ListHeader extends BaseComponent {
    /**
    *  Displays list header title
    **/
    @Input()
    headerTitle?: string;
    /**
     **   Displays list information text
    **/
    @Input()
    infoText?: string;

    /** @hidden */
    /** Instailization of list header*/
    ngOnInit(): void {
        this.id = `fdp-list-${nextListHeaderId++}`;
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
