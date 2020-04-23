import {
    ElementRef, HostBinding, Input, ChangeDetectorRef, EventEmitter,
    Output, HostListener, ViewChild, AfterViewChecked, AfterViewInit, OnInit
} from '@angular/core';
import { CheckboxComponent, RadioButtonComponent } from '@fundamental-ngx/core';
import { BaseComponent } from '../base';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
let nextListItemId = 0;
/**
 * This class contains common properties used across list Item components.
 * this can be extended to reduce the code duplication across list Item components.
 */
export class BaseListItem extends BaseComponent implements AfterViewChecked, AfterViewInit, OnInit {

    /** event emitter for selected item*/
    @Output()
    itemSelected: EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('listItem')
    listItemRef: ElementRef;


    /** Access child element, for checking link content*/
    @ViewChild('link', { read: ElementRef })
    anchor: ElementRef;


    /** Whether Navigation mode is included to list component
    * for all the items
    */
    hasNavigation: boolean = false;

    /** Whether Navigation mode is included to list component
     * only a subset of the list items are navigable
     * you should indicate those by displaying a navigation arrow
    */
    showNavigationArrow: boolean = false;


    /** Whether Navigation mode is included to for current list item component
   *
   */
    @Input()
    partialNavigation?: boolean = false;

    /**By default selection mode is '' */
    selectionMode: String = '';


    /** Whether By line mode is included to list component, by which
     *  list item will accomdate the data in 2 column
     */
    hasByLine: boolean = false;

    /** href value to navigate to */
    @Input()
    href: string;

    /**target of the link */
    @Input()
    target: string;

    /**Description of the title*/
    @Input()
    description: string;

    /**
    * list of values, it can be of type Item or String.
    */
    private _item: any;

    /** @hidden */
    @ViewChild(CheckboxComponent, { static: false })
    checkboxComponent: CheckboxComponent;


    /** @hidden */
    @ViewChild(RadioButtonComponent, { static: false })
    radioButtonComponent: RadioButtonComponent;

    /** Value set to checkbox*/
    @Input()
    checkboxValue: string;

    /** Tooltip text to show when focused for more than timeout value*/
    @Input()
    title?: string;

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

    /**
     * Enabling this flag causes forcing secondary item directive to not wrap text,
     * instead of wrapping there will be text truncation
     */
    @Input()
    secondaryWrap?: boolean;

    /** attribute holds secondary icon*/
    @Input()
    secondayIcon?: string;

    /** Whether listitem is selected */
    @Input()
    @HostBinding('class.is-selected')
    selected: boolean = false;

    /**
    ** Whather list footer
    **should displayed or not
    **/
    @Input()
    footer?: boolean;

    /** @hidden */
    /** a11y role */
    @HostBinding('attr.role')
    role = 'listitem';

    /** The type of the secondary text.fd-list__byline-right--*
     *  Can be one of *positive*, *negative*, *informative*, *critical*, *neutral* */
    @Input()
    type?: string;

    /** @hidden */
    constructor(protected _changeDetectorRef: ChangeDetectorRef, public itemEl: ElementRef) {
        super(_changeDetectorRef);
    }

    /**Get the list of items */
    get item(): any {
        return this._item;
    }

    /**Set the list of item values to list item view */
    @Input()
    set item(item: any) {
        this.title = item.title ? item.title : '';
        this.checkboxValue = item.checkboxValue ? item.checkboxValue : '';
        this.titleWrap = item.titleWrap ? true : false;
        this.titleIcon = item.titleIcon;
        this.name = item.name ? item.name : '';
        this.target = item.target;
        this.href = item.href;
        this.partialNavigation = item.partialNavigation;
        this.secondary = item.secondary;
        this.description = item.description;
        this.type = item.type;
        this.secondayIcon = item.secondayIcon;
        this.secondaryWrap = item.secondaryWrap ? true : false;

    }

    /** @hidden */
    /**Created focus on list item on mouseclick,
     * Up,down arrow press */
    public focus(): void {
        this.listItemRef.nativeElement.focus();
    }

    /** @hidden */
    /**To detect changes from parent-listbox to list item
     * for example single, multi option selection those details
     * will be deducted in list item
     */
    ngAfterViewChecked(): void {
        this._changeDetectorRef.detectChanges();
    }

    /**On item click event will be emitted */
    @HostListener('click')
    onItemClick(): void {
        if (this.checkboxComponent) {
            this.checkboxComponent.inputLabel.nativeElement.click();
            event.stopImmediatePropagation();
        }
        this.itemSelected.emit(event);
        this._changeDetectorRef.markForCheck();

    }

    /** @hidden */
    /**on keypdown append active styles on actionable item */
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

    /** @hidden */
    /** message type styles to secondary text in Byline*/
    ngAfterViewInit(): void {
        this._setProperties();
    }

    /** @hidden */
    /** Show navigation for single list*/
    ngOnInit(): void {
        this.id = `fdp-list-item-${nextListItemId++}`;
        if (this.partialNavigation === true) {
            this.hasNavigation = true;
            this.showNavigationArrow = true;
        }
    }

    /** @hidden */
    _setProperties(): void {
        if (this.type !== null && this.type !== undefined) {
            this._addClassToElement('fd-list__byline-right--' + this.type);
        }
    }

    /** @hidden */
    _addClassToElement(className: string): void {
        const secItems = this.listItemRef.nativeElement.querySelectorAll('.fd-list__byline-right');
        secItems.forEach(function (sItem: any) {
            sItem.classList.add(...className.split(' '));
        });
    }

}
