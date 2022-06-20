import {
    AfterViewChecked,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnInit,
    Output,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { ENTER, SPACE } from '@angular/cdk/keycodes';

import { ContentDensity, KeyUtil } from '@fundamental-ngx/core/utils';
import { Nullable } from '@fundamental-ngx/core/shared';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import { RadioButtonComponent } from '@fundamental-ngx/core/radio';
import { BaseComponent, isPresent } from '@fundamental-ngx/platform/shared';
import { ListType, SelectionType } from './list.component';
import { ListConfig } from './list.config';
import { ActionListItemComponent } from './action-list-item/action-list-item.component';

export const IS_ACTIVE_CLASS = 'is-active';
let nextListItemId = 0;
export type StatusType = 'negative' | 'critical' | 'positive' | 'informative';

/**
 * Base interface for a list variant definition.
 * Captures a list item template definition.
 */
export interface ItemDef {
    templateRef: TemplateRef<any>;
}

export class ActionChangeEvent {
    source: ActionListItemComponent;
}

export class ModifyItemEvent {
    source: BaseListItem;
    action: 'delete' | 'edit';
}

@Directive({ selector: '[fdpItemDef]' })
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class ListItemDef implements ItemDef {
    constructor(/** @docs-private */ public templateRef: TemplateRef<any>) {}
}

/**
 * This class contains common properties used across list Item components.
 * this can be extended to reduce the code duplication across list Item components.
 */
@Directive()
export class BaseListItem extends BaseComponent implements OnInit, AfterViewChecked {
    /** define label for screen reader */
    @Input()
    ariaLabelledBy: string;

    /** define level of item for screen reader */
    @Input()
    ariaLevel: number;

    /** define position of item for screen reader */
    @Input()
    ariaPosinet: number;

    /** attribute to hold avatar path */
    @Input()
    avatarSrc?: string;

    /** attribute to hold avatar title for a11y */
    @Input()
    avatarTitle: string;

    /** attribute to hold counter value */
    @Input()
    counter?: string;

    /** Description of the title */
    @Input()
    description: Nullable<string>;

    /** To invert the status of secondary text */
    @Input()
    inverted = false;

    /** Whether there is no data inside list item */
    @Input()
    noDataText: string;

    /**
     * The type of the secondary text.fd-list__byline-right--*
     * Can be one of *positive*, *negative*, *informative*, *critical*, *neutral
     */
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

    /** Tooltip text to show when focused for more than timeout value*/
    @Input()
    title?: string;

    /** Used for placeing navigation Link */
    @Input()
    link: Nullable<string>;

    /**
     * Enabling this flag causes forcing title directive to not wrap text,
     * instead of wrapping there will be text truncation
     */
    @Input()
    titleWrap?: boolean;

    /** attribute to hold primary/title icon*/
    @Input()
    titleIcon?: string;

    /**
     * sets the list item in bold text
     * which respresents unread data
     */
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
    listType: ListType = 'active';

    /**
     * Whether Navigation mode is included to list component
     * for all the items
     */
    @Input()
    navigated = false;

    /**
     * Whether Navigation mode is included to list component
     * only a subset of the list items are navigable
     * you should indicate those by displaying a navigation arrow
     */
    @Input()
    navigationIndicator = false;

    /** role */
    @Input()
    role = 'option';

    /**
     * event emitter for selected item
     * seprate PR for custom event
     */
    @Output()
    itemSelected = new EventEmitter<ModifyItemEvent>();

    /** Event sent when delete, details or any other action buttons are clicked */
    @Output()
    buttonClicked = new EventEmitter<ModifyItemEvent>();

    /** @hidden */
    @ViewChild('listItem', { read: ElementRef })
    listItem: ElementRef<HTMLLIElement>;

    /** Access child element, for checking link content*/
    @ViewChild('linkElement', { read: ElementRef })
    anchor: ElementRef<HTMLLinkElement>;

    /** Access edit button*/
    @ViewChild('edit', { read: ElementRef })
    edit: ElementRef<HTMLButtonElement>;

    /** Access delete button*/
    @ViewChild('delete', { read: ElementRef })
    delete: ElementRef<HTMLButtonElement>;

    /** @hidden */
    @ViewChild(CheckboxComponent)
    checkboxComponent: CheckboxComponent;

    /** @hidden */
    @ViewChild(RadioButtonComponent)
    radioButtonComponent: RadioButtonComponent;

    /**
     * @hidden
     * Whether By line mode is included to list component, by which
     * list item will accomdate the data in 2 column
     */
    _hasByLine = false;

    /** @hidden */
    _contentDensity: ContentDensity = this._listConfig.contentDensity;

    /**
     * @hidden
     * Used to define if contentDensity value is 'compact' or not.
     */
    _isCompact = this._contentDensity === 'compact';

    /**
     * @hidden
     * Whether listitem has row level selection enabled
     */
    rowSelection: boolean;

    /**
     * @hidden
     * Whether listitem is selected binded to template
     */
    _selected: boolean;

    /**
     * @hidden
     * Mark a list item as selected
     */
    @Input()
    get selected(): boolean {
        return this._selected;
    }

    set selected(value: boolean) {
        this._selected = value;
    }

    /**
     * @hidden
     * get the focused element for key manager
     */
    _focused: boolean;

    /** @hidden */
    constructor(
        protected _changeDetectorRef: ChangeDetectorRef,
        public itemEl: ElementRef<HTMLElement>,
        protected _listConfig: ListConfig
    ) {
        super(_changeDetectorRef);
    }

    /**
     * @hidden
     * radio button selected value binded to template
     */
    private _selectionValue: Nullable<string>;

    @Input()
    get selectionValue(): Nullable<string> {
        return this._selectionValue;
    }

    set selectionValue(value: Nullable<string>) {
        this._selected = false;
        this._selectionValue = value;
        if (this._selectionValue !== undefined && this.selectionValue !== null) {
            this._selected = this.value === this._selectionValue;
        }
    }
    /**
     * @hidden
     * Show navigation for single list
     */
    ngOnInit(): void {
        this.id = `fdp-list-item-${nextListItemId++}`;
    }

    /**
     * @hidden
     * To detect changes from parent-listbox to list item
     * for example single, multi option selection those details
     * will be deducted in list item
     */
    ngAfterViewChecked(): void {
        const currentitem: Nullable<HTMLLIElement> = this.itemEl.nativeElement.querySelector('li');
        if (!currentitem) {
            return;
        }

        currentitem.setAttribute('role', 'option');
        const parentNode = currentitem.parentNode instanceof HTMLElement && currentitem.parentNode;
        if (parentNode) {
            parentNode.removeAttribute('title');
            parentNode.removeAttribute('aria-label');
        }

        if (this.rowSelection || this.selectionMode === 'multi' || this.selectionMode === 'single') {
            currentitem.setAttribute('aria-selected', `${!!this._selected}`);
        }

        this._changeDetectorRef.detectChanges();
    }

    /**
     * @hidden
     * Created focus on list item on mouseclick,
     * Up,down arrow press
     */
    focus(): void {
        this.listItem.nativeElement.focus();
    }

    /**
     * @hidden
     * On item click event will be emitted
     */
    @HostListener('click')
    _onItemClick(): void {
        if (this.rowSelection && this.selectionMode === 'multi') {
            this._selected = !this._selected;
        }

        const event = new ModifyItemEvent();
        event.source = this;
        this._focused = !this._focused;
        this.itemSelected.emit(event);
        this._changeDetectorRef.markForCheck();
    }

    /** @hidden */
    @HostListener('keydown', ['$event'])
    _handleKeyboardEvent(event: KeyboardEvent): void {
        if (!KeyUtil.isKeyCode(event, [ENTER, SPACE])) {
            return;
        }

        if (this.checkboxComponent || this.radioButtonComponent) {
            this._onKeyboardClick(event);
        }

        this.anchor?.nativeElement.click();

        if (this.rowSelection) {
            this._selected = !this._selected;
        }

        const $event = new ModifyItemEvent();
        $event.source = this;
        this.itemSelected.emit($event);
        this._changeDetectorRef.markForCheck();
    }

    /**
     * @hidden
     * Handler for mouse events
     */
    @HostListener('click', ['$event'])
    _onClick(event: MouseEvent): void {
        if (this.checkboxComponent && !this.anchor) {
            if (!this.checkboxComponent.elementRef.nativeElement.contains(event.target as Node)) {
                // clicking on the checkbox is not suppressed
                // so we should only process clicks if clicked on the list-item, not checkbox itself
                this.checkboxComponent.nextValue();
            }

            this.radioButtonComponent?.valueChange(event);
        }

        this._changeDetectorRef.markForCheck();
        const $event = new ModifyItemEvent();
        $event.source = this;
        this.itemSelected.emit($event);
    }

    /**
     * @hidden
     * helps to avoid multi rows active class with navigation
     */
    @HostListener('focusout', ['$event'])
    _onBlur(event: KeyboardEvent): void {
        if (isPresent(this.anchor) && !KeyUtil.isKeyCode(event, [ENTER, SPACE])) {
            this.anchor.nativeElement.classList.remove(IS_ACTIVE_CLASS);
        }
    }

    /**
     * @hidden
     * on keydown append active styles on actionable item
     */
    _onKeyDown(event: KeyboardEvent): void {
        if (isPresent(this.anchor) && KeyUtil.isKeyCode(event, [ENTER, SPACE])) {
            this.anchor.nativeElement.classList.add(IS_ACTIVE_CLASS);
        }
    }

    /**
     * @hidden
     * on keyup remove active styles from actionable item
     */
    _onKeyUp(event: KeyboardEvent): void {
        if (isPresent(this.anchor) && KeyUtil.isKeyCode(event, [ENTER, SPACE])) {
            this.anchor.nativeElement.classList.remove(IS_ACTIVE_CLASS);
        }
    }

    /**
     * @hidden
     * Handles action button click
     */
    _onActionButtonClick(action: 'delete' | 'edit'): void {
        const event = new ModifyItemEvent();
        event.source = this;
        event.action = action;
        this.buttonClicked.emit(event);
    }

    /**
     * @hidden
     * Handles action button click on key press
     */
    _onKeyButtonClick(event: KeyboardEvent, action: 'delete' | 'edit'): void {
        if (KeyUtil.isKeyCode(event, [ENTER, SPACE])) {
            this._onActionButtonClick(action);
        }
    }

    /** @hidden */
    private _onKeyboardClick(event: KeyboardEvent): void {
        this.checkboxComponent?.nextValue();
        this.radioButtonComponent?.valueChange(event);

        this._changeDetectorRef.markForCheck();
        const $event = new ModifyItemEvent();
        $event.source = this;
        this.itemSelected.emit($event);
    }
}
