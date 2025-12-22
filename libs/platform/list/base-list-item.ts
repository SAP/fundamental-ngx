import { ENTER, SPACE } from '@angular/cdk/keycodes';
import {
    AfterViewChecked,
    AfterViewInit,
    Directive,
    ElementRef,
    EventEmitter,
    HostListener,
    Inject,
    Input,
    OnDestroy,
    Optional,
    Output,
    TemplateRef,
    ViewChild,
    inject
} from '@angular/core';

import { ColorAccent, KeyUtil, Nullable, Size, merge } from '@fundamental-ngx/cdk/utils';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { FD_LIST_UNREAD_INDICATOR, ListUnreadIndicator } from '@fundamental-ngx/core/list';
import { RadioButtonComponent } from '@fundamental-ngx/core/radio';
import { BaseComponent, isPresent } from '@fundamental-ngx/platform/shared';
import { Observable } from 'rxjs';
import { FdpListComponent } from './fdpListComponent.token';
import { ListConfig } from './list.config';
import { FdpList, ListType, SelectionType } from './models/list';

export const IS_ACTIVE_CLASS = 'is-active';
let nextListItemId = 0;
export type StatusType = 'negative' | 'critical' | 'positive' | 'informative';

export class ListIconConfig {
    /** The icon name to display. See the icon page for the list of icons
     * here: https://sap.github.io/fundamental-ngx/icon
     * */
    glyph: IconComponent['glyph'];
    /** user's custom classes */
    class: IconComponent['class'] = '';
    /**
     * The icon font
     * Options include: 'SAP-icons', 'BusinessSuiteInAppSymbols' and 'SAP-icons-TNT'
     */
    font: IconComponent['font'] = 'SAP-icons';
    /** Aria-label for Icon. */
    ariaLabel: IconComponent['ariaLabel'];
}

export class ListAvatarConfig {
    /** @hidden */
    class = '';
    /** @hidden */
    ariaLabel: Nullable<string> = null;
    /** @hidden */
    ariaLabelledby: Nullable<string> = null;
    /** @hidden */
    label: Nullable<string> = null;
    /** @hidden */
    size: Size = 's';
    /** @hidden */
    glyph: Nullable<string> = null;
    /** @hidden */
    zoomGlyph: Nullable<string> = null;
    /** @hidden */
    circle = false;
    /** @hidden */
    transparent = false;
    /** @hidden */
    contain = false;
    /** @hidden */
    placeholder = false;
    /** @hidden */
    tile = false;
    /** @hidden */
    border = false;
    /** @hidden */
    colorAccent: Nullable<ColorAccent> = null;
    /** @hidden */
    random = false;
    /** @hidden */
    clickable = false;
    /** @hidden */
    image: Nullable<string> = null;
    /** @hidden */
    alterIcon: Nullable<string> = null;
    /** @hidden */
    backupImage: Nullable<string> = null;
}

/**
 * Base interface for a list variant definition.
 * Captures a list item template definition.
 */
export interface ItemDef {
    templateRef: TemplateRef<any>;
}

export interface ListAdvancedDescription {
    text: string;
    ariaLabel?: string;
    title?: string;
}

export type ListDescription = string | ListAdvancedDescription;

export enum LIST_ITEM_TYPE {
    ITEM = 'item',
    GROUP = 'group',
    FOOTER = 'footer',
    HEADER = 'header'
}

export class ModifyItemEvent {
    /** List Item component */
    source: BaseListItem;
    /** Action */
    action: 'delete' | 'edit';
}

@Directive({
    selector: '[fdpItemDef]',
    standalone: true
})
export class ListItemDef implements ItemDef {
    /** @hidden */
    constructor(/** @docs-private */ public templateRef: TemplateRef<any>) {}
}

/**
 * This class contains common properties used across list Item components.
 * this can be extended to reduce the code duplication across list Item components.
 */
@Directive()
export class BaseListItem extends BaseComponent implements AfterViewInit, AfterViewChecked, OnDestroy {
    /** ID of the list item */
    @Input()
    id = `fdp-list-item-${nextListItemId++}`;

    /** define level of item for screen reader */
    @Input()
    ariaLevel: number;

    /** define position of item for screen reader */
    @Input()
    ariaPosinset: number;

    /** Avatar component properties. @see AvatarComponent for more details */
    @Input()
    set avatar(value: Nullable<Partial<ListAvatarConfig> | string>) {
        if (!value) {
            return;
        }
        value = typeof value === 'string' ? { image: value } : value;
        this._avatarConfig = merge(new ListAvatarConfig(), value);
    }

    get avatar(): ListAvatarConfig {
        return this._avatarConfig;
    }

    /** attribute to hold counter value */
    @Input()
    counter?: string;

    /** Description of the title */
    @Input()
    description: Nullable<ListDescription>;

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
    secondary: Nullable<ListDescription>;

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

    /**
     * List item icon configuration.
     */
    @Input()
    set icon(value: Partial<ListIconConfig>) {
        this._iconConfig = merge(new ListIconConfig(), value);
    }

    get icon(): ListIconConfig {
        return this._iconConfig;
    }

    /**
     * sets the list item in bold text
     * which respresents unread data
     */
    @Input()
    unRead: boolean;

    /**
     * Whether to display unread notification circle.
     */
    get displayUnreadNotification(): boolean {
        return !!this._list?.unreadIndicator;
    }

    /** radio button value */
    @Input()
    value: string;

    /** By default selection mode is 'none' */
    @Input()
    set selectionMode(value: SelectionType) {
        this._selectionMode = value;
        this._setAttrRole();
    }

    get selectionMode(): SelectionType {
        return this._selectionMode;
    }

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
    role: Nullable<string>;

    /**
     * event emitter for selected item
     * seprate PR for custom event
     */
    @Output()
    itemSelected = new EventEmitter<ModifyItemEvent>();

    /**
     * Event emitted for selected item through the checkbox.
     */
    @Output()
    itemCheckboxSelected = new EventEmitter<ModifyItemEvent>();

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

    /** @hidden */
    _type: LIST_ITEM_TYPE = LIST_ITEM_TYPE.ITEM;

    /**
     * @hidden
     * Whether By line mode is included to list component, by which
     * list item will accomdate the data in 2 column
     */
    _hasByLine = false;

    /**
     * @hidden
     * Whether listitem has row level selection enabled
     */
    set rowSelection(value: boolean) {
        this._rowSelection = value;
        this._setAttrRole();
    }

    get rowSelection(): boolean {
        return this._rowSelection;
    }

    /**
     * @hidden
     * Whether listitem is selected binded to template
     */
    _selected = false;

    /** @hidden */
    get _selectedAttr(): boolean | null {
        return !this.rowSelection && this.selectionMode === 'none' ? null : this._selected;
    }

    /**
     * @hidden
     * get the focused element for key manager
     */
    _focused: boolean;

    /** @hidden */
    get _listItemRole(): string {
        return this.role || this._defaultRole;
    }

    /** @hidden */
    ariaSetSize: Observable<number>;

    /** @hidden */
    private _rowSelection = false;

    /** @hidden */
    private _defaultRole = 'listitem';

    /** @hidden */
    private _listComponent = inject<FdpList>(FdpListComponent);

    /** @hidden */
    private _avatarConfig: ListAvatarConfig = new ListAvatarConfig();

    /** @hidden */
    private _iconConfig: ListIconConfig = new ListIconConfig();

    /**
     * @hidden
     * radio button selected value binded to template
     */
    private _selectionValue: Nullable<string>;

    /** @hidden */
    private _selectionMode: SelectionType = 'none';

    /** @hidden */
    constructor(
        public itemEl: ElementRef<HTMLElement>,
        protected _listConfig: ListConfig,
        @Optional() @Inject(FD_LIST_UNREAD_INDICATOR) private readonly _list: ListUnreadIndicator
    ) {
        super();
    }

    /** Selection value */
    @Input()
    set selectionValue(value: Nullable<string>) {
        this._selected = false;
        this._selectionValue = value;
        if (this._selectionValue !== undefined && this.selectionValue !== null) {
            this._selected = this.value === this._selectionValue;
        }
    }
    get selectionValue(): Nullable<string> {
        return this._selectionValue;
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
        this.markForCheck();
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
        this.markForCheck();
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

        this.markForCheck();
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

    /** @hidden */
    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.itemSelected.complete();
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._listComponent._setupListItem(this);
    }

    /**
     * @hidden
     * To detect changes from parent-listbox to list item
     * for example single, multi option selection those details
     * will be deducted in list item
     */
    ngAfterViewChecked(): void {
        const currentItem: Nullable<HTMLElement> =
            this.itemEl.nativeElement.querySelector<HTMLElement>('.fd-list__item');
        if (!currentItem) {
            return;
        }

        const parentNode = currentItem.parentNode instanceof HTMLElement && currentItem.parentNode;
        if (parentNode) {
            parentNode.removeAttribute('title');
            parentNode.removeAttribute('aria-label');
        }
        this.detectChanges();
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
     * Programmatically set selected state of the list item.
     * @param selected Whether the list item is selected
     */
    setSelected(selected: boolean): void {
        if (selected === this._selected) {
            return;
        }
        const event = new ModifyItemEvent();
        event.source = this;
        this._selected = selected;
        this.detectChanges();
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

    /** @hidden */
    _onCheckboxModelChange(): void {
        const event = new ModifyItemEvent();
        event.source = this;
        this.itemCheckboxSelected.emit(event);
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
    _isAdvancedText(text: ListDescription): text is ListAdvancedDescription {
        return typeof text !== 'string' && !!text.text;
    }

    /** @hidden */
    private _onKeyboardClick(event: KeyboardEvent): void {
        this.checkboxComponent?.nextValue();
        this.radioButtonComponent?.valueChange(event);

        this.markForCheck();
        const $event = new ModifyItemEvent();
        $event.source = this;
        this.itemSelected.emit($event);
    }

    /** @hidden */
    private _setAttrRole(): void {
        this._defaultRole =
            this.rowSelection || this.selectionMode === 'single' || this.selectionMode === 'multi'
                ? 'option'
                : 'listitem';
        this.markForCheck();
    }
}
