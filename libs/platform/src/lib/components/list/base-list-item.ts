import {
    ElementRef, Input, ChangeDetectorRef, EventEmitter,
    Output, HostListener, ViewChild, AfterViewChecked, OnInit, Directive, TemplateRef
} from '@angular/core';

import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { CheckboxComponent, RadioButtonComponent } from '@fundamental-ngx/core';
import { SelectionType, ListType } from './list.component';
import { BaseComponent } from '../base';
import { ListConfig } from './list.config';

let nextListItemId = 0;
export type StatusType = 'negative' | 'critical' | 'positive' | 'informative';

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

    @Input()
    testObject: { string: [] };

    /** define label for screen reader */
    @Input()
    text: string;
    /** define label for screen reader */
    @Input()
    icon: string;

    @Input()
    indicationColor: string;

    @Input()
    status: string;

    @Input()
    glyph: string;


    /** define label for screen reader */
    @Input()
    introductionText: string;

    /** define label for screen reader */
    @Input()
    amount: string;

    /** define currency */
    @Input()
    currency: string;

    /** label for avatar */
    @Input()
    label: string;

    /** Is avatar in circle */
    @Input()
    circle: boolean;

    /** Is avatar has placeholder */
    @Input()
    placeholder: boolean;

    /** Is avatar has tile */
    @Input()
    tile: boolean;

    /** Is avatar has colorAccent */
    @Input()
    colorAccent: number;

    /** Avatar image path */
    @Input()
    image: string;

    /** Avatar is transparent */
    @Input()
    transparent: boolean;


    /** define label for screen reader */
    @Input()
    ariaLabelledBy: string;

    /** define level of item for screen reader */
    @Input()
    ariaLevel: number;

    /** define position of item for screen reader */
    @Input()
    ariaPosinet: number;

    /** attribute to hold avatar path*/
    @Input()
    avatarSrc?: string;

    /** attribute to hold avatar title for a11y*/
    @Input()
    avatarTitle: string;

    /** attribute to hold counter value*/
    @Input()
    counter?: string;

    /**Description of the title*/
    @Input()
    description: string;

    /** To invert the status of secondary text*/
    @Input()
    inverted = false;

    /** Whether there is no data inside list item */
    @Input()
    noDataText: string;

    /** The type of the secondary text.fd-list__byline-right--*
    *  Can be one of *positive*, *negative*, *informative*, *critical*, *neutral* */
    @Input()
    statusType?: StatusType;

    /** attribute to hold secondary text*/
    @Input()
    secondary?: string;

    /**
    * Enabling this flag causes forcing secondary item directive to not wrap text,
    * instead of wrapping there will be text truncation
   */
    @Input()
    secondaryWrap?: boolean;

    /** attribute holds secondary icon value*/
    @Input()
    secondaryIcons?: SecondaryActionItem[];

    /** Tooltip text to show when focused for more than timeout value*/
    @Input()
    title?: string;

    /** Used for placeing navigation Link */
    @Input()
    link: string;

    /**
    * Enabling this flag causes forcing title directive to not wrap text,
    * instead of wrapping there will be text truncation
   */
    @Input()
    titleWrap?: boolean;

    /** attribute to hold primary/title icon*/
    @Input()
    titleIcon?: string;

    /** sets the list item in bold text
    * which respresents unread data */
    @Input()
    unRead: boolean;

    /** radio button value */
    @Input()
    value: string;

    /** By default selection mode is 'none' */
    @Input()
    selectionMode: SelectionType = 'none';

    /** By default selection mode is 'active' */
    @Input()
    listType: ListType;

    /*** Whether Navigation mode is included to list component
    * for all the items
    */
    @Input()
    navigated = false;

    /** Whether Navigation mode is included to list component
     * only a subset of the list items are navigable
     * you should indicate those by displaying a navigation arrow
    */
    @Input()
    navigationIndicator = false;

    @Input('selectionValue')
    get selectionValue(): string {
        return this._selectionValue;
    }

    set selectionValue(value: string) {
        this._selected = false;
        this._selectionValue = value;
        if (this._selectionValue !== undefined &&
            this.selectionValue !== null) {
            this._selected = this.value === this._selectionValue;
        }
    }


    /** setter and getter for _link */
    @Input('link')
    get routerLink(): string {
        return this.link;
    }

    set routerLink(value: string) {
        this.link = value;
    }

    /**Getter and setter the list of items */
    @Input()
    set item(item: any) {
        this.text = item.text;
        this.icon = item.icon;
        this.indicationColor = item.indicationColor;
        this.status = item.status;
        this.glyph = item.glyph;
        this.testObject = item.testObject;
        this.label = item.label;
        this.circle = item.circle;
        this.placeholder = item.placeholder;
        this.tile = item.tile;
        this.colorAccent = item.colorAccent;
        this.image = item.image;
        this.transparent = item.transparent;
        this.currency = item.currency;
        this.amount = item.amount;
        this.introductionText = item.introductionText;
        this.navigationIndicator = item.navigationIndicator;
        this.navigated = item.navigated;
        this.listType = item.listType;
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

    get item(): any {
        return this._item;
    }


    /** event emitter for selected item*/
    @Output()
    itemSelected = new EventEmitter<KeyboardEvent | MouseEvent | TouchEvent>();

    /** Event sent when delete, details or any other action buttons are clicked */
    @Output()
    buttonClicked = new EventEmitter<KeyboardEvent | MouseEvent | TouchEvent>();

    @ViewChild('listItem', { read: ElementRef })
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

    /** @hidden
     * Whether By line mode is included to list component, by which
    *  list item will accomdate the data in 2 column
    */
    _hasByLine = false;

    /**@hidden
     * list item with no bottom border
    */
    _noSeperator: boolean;

    /** @hidden */
    _contentDensity: ContentDensity = this._listConfig.contentDensity;

    /**@hidden
   * list of values, it can be of type Item or String.
   */
    _item: any;

    /**
     * @hidden
     * Used to define if contentDensity value is 'compact' or not.
     */
    _isCompact = this._contentDensity === 'compact';

    /** @hidden
    * Whether listitem is selected binded to template */
    _selected: boolean;

    /** @hidden
     * radio button selected value binded to template */
    _selectionValue: string;

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
        if (this._noSeperator) {
            this.itemEl.nativeElement.querySelector('li').classList.add('fd-list-item__no-seprator');
        }
    }

    /** @hidden */
    /**Created focus on list item on mouseclick,
     * Up,down arrow press */
    focus(): void {
        this.listItem.nativeElement.focus();
    }

    /**
     * @hidden
     * On item click event will be emitted */
    @HostListener('click')
    _onItemClick(event: KeyboardEvent | MouseEvent | TouchEvent): void {
        this.itemSelected.emit(event);
        this._changeDetectorRef.markForCheck();
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    _handleKeyboardEvent(event: KeyboardEvent): void {
        if (event.keyCode === ENTER || event.keyCode === SPACE) {
            if (this.checkboxComponent || this.radioButtonComponent) {
                this._onKeyboardClick(event);
            }
            this.itemSelected.emit(event);
            this._changeDetectorRef.markForCheck();
        }
    }

    /**@hidden
     * Handler for mouse events */
    @HostListener('click', ['$event'])
    _onClick(event: MouseEvent): void {
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
    _onKeyDown(event: KeyboardEvent): void {
        if (this.anchor !== undefined && (event.keyCode === ENTER || event.keyCode === SPACE)) {
            this.anchor.nativeElement.classList.add('is-active');
        }
    }

    /** @hidden */
    /**on keyup remove active styles from actionable item*/
    _onKeyUp(event: KeyboardEvent): void {
        if (this.anchor !== undefined && (event.keyCode === ENTER || event.keyCode === SPACE)) {
            this.anchor.nativeElement.classList.remove('is-active');
        }
    }

    /**
     *  @hidden
     *  Handles action button click
     */
    _onActionButtonClick($event: KeyboardEvent | MouseEvent | TouchEvent): void {
        this.buttonClicked.emit($event);
    }

    /** @hidden */
    private _onKeyboardClick(event: KeyboardEvent): void {
        if (this.checkboxComponent) {
            this.checkboxComponent.nextValue();
        }
        if (this.radioButtonComponent) {
            this.radioButtonComponent.valueChange(event);
        }
        this._changeDetectorRef.markForCheck();
        this.itemSelected.emit(event);
    }

}
