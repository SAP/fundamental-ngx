import {
    ElementRef, HostBinding, Input, ChangeDetectorRef, EventEmitter,
    Output, HostListener, ViewChild, AfterViewChecked, OnInit, Directive, TemplateRef
} from '@angular/core';

import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { CheckboxComponent, RadioButtonComponent } from '@fundamental-ngx/core';
import { ContentDensity } from '../form/form-control';
import { BaseComponent } from '../base';
import { ListConfig } from './list.config';

let nextListItemId = 0;
export type StatusType = 'negative' | 'critical' | 'positive' | 'informative';
export type SelectionType = 'none' | 'multi' | 'single' | 'delete';
export type ListType = 'inactive' | 'active' | 'detail';

/** Base interface for a list variant definition.
 *  Captures a list item template definition. */
export interface ItemDef {
    templateRef: TemplateRef<any>;
}

@Directive({ selector: '[fdpItemDef]' })
export class ListItemDef implements ItemDef {
    constructor(/** @docs-private */ public templateRef: TemplateRef<any>) { }
}

/**
 * Interface for defining more actions on list item
 * secondary
 */
interface SecondaryActionItem {
    icon: string;
    isButton: boolean;
}
/**
 * This class contains common properties used across list Item components.
 * this can be extended to reduce the code duplication across list Item components.
 */
@Directive()
export class BaseListItem extends BaseComponent implements OnInit, AfterViewChecked {

    /** sets the list item in bold text
     * which respresents unread data */
    @Input()
    unRead: boolean;

    /** To invert the status of secondary text*/
    @Input()
    inverted = false;

    /** Whether there is no data inside list item */
    @Input()
    noDataText?: string;

    /** The type of the secondary text.fd-list__byline-right--*
    *  Can be one of *positive*, *negative*, *informative*, *critical*, *neutral* */
    @Input()
    statusType?: StatusType;

    /**Description of the title*/
    @Input()
    description: string;

    /** Tooltip text to show when focused for more than timeout value*/
    @Input()
    title?: string;

    /**radio button value */
    @Input()
    value: string;

    /**
    * Enabling this flag causes forcing title directive to not wrap text,
    * instead of wrapping there will be text truncation
    */
    @Input()
    titleWrap?: boolean;

    /** attribute to hold primary/title icon*/
    @Input()
    titleIcon?: string;

    /** attribute to hold secondary text*/
    @Input()
    secondary?: string;

    /** attribute to hold counter value*/
    @Input()
    counter?: string;

    /** attribute to hold avatar path*/
    @Input()
    avatarSrc?: string;

    /** attribute to hold avatar title for a11y*/
    @Input()
    avatarTitle: string;

    /**
     * Enabling this flag causes forcing secondary item directive to not wrap text,
     * instead of wrapping there will be text truncation
     */
    @Input()
    secondaryWrap?: boolean;

    /** attribute holds secondary icon value*/
    @Input()
    secondaryIcons?: SecondaryActionItem[];

    /** define label for screen reader */
    @Input()
    ariaLabelledBy: string;

    /** define level of item for screen reader */
    @Input()
    ariaLevel: number;

    /** define position of item for screen reader */
    @Input()
    ariaPosinet: number;

    /** Whether Navigation mode is included to list component
    * for all the items
    */
    navigated = false;

    /** Whether Navigation mode is included to list component
     * only a subset of the list items are navigable
     * you should indicate those by displaying a navigation arrow
    */
    navigationIndicator = false;

    /**By default selection mode is 'none' */
    selectionMode: SelectionType = 'none';

    /**By default selection mode is 'active' */
    listType: ListType;

    /** Used for placeing navigation Link */
    link: string;

    noSeperator: boolean;

    /** Whether By line mode is included to list component, by which
     *  list item will accomdate the data in 2 column
     */
    hasByLine = false;

    /** @hidden */
    _contentDensity = this._listConfig.contentDensity;


    /** Whether listitem is selected */
    selected: boolean;

    public selectionValue: string;

    /**
     * @hidden
     * Used to define if contentDensity value is 'compact' or not.
     */
    isCompact = this._contentDensity === 'compact';


    /** event emitter for selected item*/
    @Output()
    itemSelected: EventEmitter<any> = new EventEmitter<any>();

    /** Event sent when delete, details or any other action buttons are clicked */
    @Output()
    buttonClicked: EventEmitter<any> = new EventEmitter();

    @ViewChild('listItem')
    listItemRef: ElementRef;

    @ViewChild('listItem', { read: ElementRef, static: false })
    listItem: ElementRef;

    /** Access child element, for checking link content*/
    @ViewChild('link', { read: ElementRef })
    anchor: ElementRef;

    /** @hidden */
    @ViewChild(CheckboxComponent)
    checkboxComponent: CheckboxComponent;

    /** @hidden */
    @ViewChild(RadioButtonComponent)
    radioButtonComponent: RadioButtonComponent;

    @Input('selectionValue')
    get selectionValueDetails(): string {
        return this.selectionValue;
    }

    set selectionValueDetails(value: string) {
        this.selected = false;
        this.selectionValue = value;
        if (this.selectionValue !== undefined &&
            this.selectionValue !== null) {
            this.selected = this.value === this.selectionValue;
        }
    }

    /**
       * @hidden
       * list of values, it can be of type Item or String.
       */
    private _item: any;

    /** setter and getter for _link */
    @Input('link')
    get routerLink(): string {
        return this.link;
    }

    set routerLink(value: string) {
        this.link = value;
    }

    /**
     * content Density of element. 'cozy' | 'compact'
     */
    @Input()
    set contentDensity(contentDensity: ContentDensity) {
        this._contentDensity = contentDensity;
        this.isCompact = contentDensity === 'compact';
    }

    /**Get the list of items */
    get item(): any {
        return this._item;
    }

    /**Set the list of item values to list item view */
    @Input()
    set item(item: any) {
        this.title = item.title ? item.title : '';
        this.titleWrap = item.titleWrap ? true : false;
        this.titleIcon = item.titleIcon;
        this.name = item.name ? item.name : '';
        this.value = item.value;
        this.link = item.link;
        this.counter = item.counter;
        this.secondary = item.secondary;
        this.description = item.description;
        this.avatarSrc = item.avatarSrc;
        this.avatarTitle = item.avatarTitle;
        this.inverted = item.inverted;
        this.statusType = item.statusType;
        this.noDataText = item.noDataText;
        this.unRead = item.unRead;
        this.selectionValue = item.selectionValue;
        if (item.secondaryIcons !== null && item.secondaryIcons !== undefined) {
            this.secondaryIcons = [...item.secondaryIcons];
        }
        this.secondaryWrap = item.secondaryWrap ? true : false;

    }

    /** @hidden */
    constructor(protected _changeDetectorRef: ChangeDetectorRef,
        public itemEl: ElementRef, protected _listConfig: ListConfig) {
        super(_changeDetectorRef);

    }

    /** @hidden */
    /** Show navigation for single list*/
    ngOnInit(): void {
        this.id = `fdp-list-item-${nextListItemId++}`;
    }

    /** @hidden */
    /**To detect changes from parent-listbox to list item
     * for example single, multi option selection those details
     * will be deducted in list item
     */
    ngAfterViewChecked(): void {
        this._changeDetectorRef.detectChanges();
        if (this.noSeperator) {
            this.itemEl.nativeElement.querySelector('li').classList.add('fd-list-item__no-seprator');
        }
    }

    /** @hidden */
    /**Created focus on list item on mouseclick,
     * Up,down arrow press */
    public focus(): void {
        this.listItem.nativeElement.focus();
    }

    /**
     * @hidden
     * On item click event will be emitted */
    @HostListener('click')
    onItemClick(): void {
        this.itemSelected.emit(event);
        this._changeDetectorRef.markForCheck();
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent): void {
        if (event.keyCode === ENTER || event.keyCode === SPACE) {
            if (this.checkboxComponent || this.radioButtonComponent) {
                this.onKeyboardClick(event);
            }
            this.itemSelected.emit(event);
            this._changeDetectorRef.markForCheck();
        }


    }
    /** @hidden */
    onKeyboardClick(event: KeyboardEvent): void {
        if (this.checkboxComponent) {
            this.checkboxComponent.nextValue();
        }
        if (this.radioButtonComponent) {
            this.radioButtonComponent.valueChange(event);
        }
        this._changeDetectorRef.markForCheck();
        this.itemSelected.emit(event);
    }

    /** Handler for mouse events */
    @HostListener('click', ['$event'])
    onClick(event: MouseEvent): void {
        if (this.checkboxComponent && !this.anchor) {
            this.checkboxComponent.nextValue();
        }
        if (this.radioButtonComponent && !this.anchor) {
            this.radioButtonComponent.valueChange(event);
        }
        this._changeDetectorRef.markForCheck();
        this.itemSelected.emit(event);

    }



    /** @hidden */
    /**on keydown append active styles on actionable item */
    onKeyDown(event: any): void {
        if (this.anchor !== undefined && (event.keyCode === ENTER || event.keyCode === SPACE)) {
            this.anchor.nativeElement.classList.add('is-active');
        }
    }

    /** @hidden */
    /**on keyup remove active styles from actionable item*/
    onKeyUp(event: any): void {
        if (this.anchor !== undefined && (event.keyCode === ENTER || event.keyCode === SPACE)) {
            this.anchor.nativeElement.classList.remove('is-active');
        }
    }


    /**
     *  @hidden
     *  Handles action button click
     */
    public onActionButtonClick($event: any): void {
        this.buttonClicked.emit($event);
    }


}
