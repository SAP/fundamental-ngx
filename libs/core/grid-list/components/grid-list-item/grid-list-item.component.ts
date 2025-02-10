import { ENTER, ESCAPE, F2, F7, MAC_ENTER, SPACE } from '@angular/cdk/keycodes';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnDestroy,
    Output,
    Renderer2,
    ViewChild,
    ViewEncapsulation,
    booleanAttribute,
    signal
} from '@angular/core';
import { Subscription } from 'rxjs';

import { KeyUtil, Nullable, TabbableElementService } from '@fundamental-ngx/cdk/utils';

import { NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
    ContentDensityModule,
    ContentDensityObserver,
    contentDensityObserverProviders
} from '@fundamental-ngx/core/content-density';

import { IconComponent } from '@fundamental-ngx/core/icon';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { GridListItemBodyDirective } from '../../directives/grid-list-item-body.directive';
import { parseLayoutPattern } from '../../helpers/parse-layout-pattern';
import {
    GridListSelectionActions,
    GridListSelectionMode,
    GridListSelectionModeEnum
} from '../../models/grid-list-selection.models';
import { GridListItemFooterBarComponent } from '../grid-list-item-footer-bar/grid-list-item-footer-bar.component';
import { GridListItemToolbarComponent } from '../grid-list-item-toolbar/grid-list-item-toolbar.component';
import { GridListTitleBarSpacerComponent } from '../grid-list-title-bar-spacer/grid-list-title-bar-spacer.component';
import { GridList } from '../grid-list/grid-list-base.component';

let gridListItemUniqueId = 0;

export interface GridListItemOutputEvent<T> {
    index?: number;
    value?: T;
}

export type GridListItemType = 'inactive' | 'active' | 'detail' | 'detailsAndActive' | 'navigation';
export type GridListItemState = 'unread' | 'locked' | 'error' | 'draft';
export type GridListItemStatus = 'success' | 'warning' | 'error' | 'neutral';

@Component({
    selector: 'fd-grid-list-item',
    templateUrl: './grid-list-item.component.html',
    styleUrl: './grid-list-item.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [
        NgTemplateOutlet,
        GridListTitleBarSpacerComponent,
        ButtonComponent,
        IconComponent,
        FormsModule,
        ObjectStatusComponent,
        FdTranslatePipe,
        ContentDensityModule
    ],
    providers: [contentDensityObserverProviders()]
})
export class GridListItemComponent<T> implements AfterViewInit, OnDestroy {
    /** id for the Element */
    @Input()
    id = `fd-grid-list-item-${gridListItemUniqueId++}`;

    /** width of the element */
    @Input()
    @HostBinding('style.max-width')
    @HostBinding('style.min-width')
    width: string;

    /**
     * specify the cell layout in the format `XLn-Ln-Mn-Sn` where n is
     * the number of occupied columns and n can be different for each size.
     */
    @Input()
    set layoutItemPattern(value: Nullable<string>) {
        this.gridLayoutClasses = value ? parseLayoutPattern(value, false) : [];
    }

    /**
     * Defines the status of Grid List Item
     * (Statuses: success | warning | error | neutral)
     */
    @Input()
    status?: GridListItemStatus;

    /** Sets number of sub items */
    @Input()
    counter: Nullable<number>;

    /**
     * Value field stores information for radio button value, checkbox button and for GridListSelectionEvent
     * The field is mandatory for modes like singleSelect, singleSelectLeft, singleSelectRight or multiSelect
     */
    @Input()
    value?: T;

    /** Whether click on the custom toolbar is disabled */
    @Input()
    disableToolbarClick = false;

    /** Allows an item to be selected programmatically */
    @Input({ transform: booleanAttribute })
    selected = false;

    /** Remove the padding from the Item body */
    @Input()
    noPadding = false;

    /** Sets the `aria-label` attribute to the element. */
    @Input()
    ariaLabel: Nullable<string>;

    /** Sets the `aria-label` attribute to the element. */
    @Input()
    ariaLabelledBy: Nullable<string>;

    /**
     * Defines the type of Grid List Item
     * Types:
     * - active: indicates that the item is clickable via active feedback when item is pressed
     * - detail: enables detail button of the list item that fires event.
     * - detailsAndActive: enables "detail" and "active" enumerations together
     * - inactive: indicates the list item does not have any active feedback when item is pressed
     * - navigation: indicates the list item is navigable to show extra information about the item
     * Default: inactive
     */
    @Input()
    set type(value: Nullable<GridListItemType>) {
        this._type = value ?? 'inactive';
    }

    get type(): GridListItemType {
        return this._type;
    }

    /**
     * Sets the state of Grid List Item
     * (States: unread | error | locked | draft)
     */
    @Input()
    state?: GridListItemState;

    /**
     * The navigated state of the list item.
     * If set to true, a navigation indicator is displayed at the end of the list item.
     */
    @Input()
    isNavigated = false;

    /** Title of the item */
    @Input()
    title: string;

    /**
     * Aria-level of the title
     * Available options: 1, 2, 3, 4, 5, 6
     * Default: 4
     */
    @Input()
    titleLevel: 1 | 2 | 3 | 4 | 5 | 6 = 4;

    /** Description of the item */
    @Input()
    description: string;

    /** When set to true the grid list item's height will be set to auto */
    @Input()
    autoHeight = false;

    /**
     * Event is thrown, when type is active
     * and item is pressed
     */
    @Output()
    press = new EventEmitter<GridListItemOutputEvent<T>>();

    /**
     * Event is thrown, when type is detail or detailsAndActive
     * and Detail button was pressed
     */
    @Output()
    detail = new EventEmitter<GridListItemOutputEvent<T>>();

    /**
     * Event is thrown, when mode delete
     * and Delete button was pressed
     */
    @Output()
    delete = new EventEmitter<GridListItemOutputEvent<T>>();

    /**
     * Event is thrown, when type is navigation
     * and Navigate button was pressed
     */
    @Output()
    navigate = new EventEmitter<GridListItemOutputEvent<T>>();

    /**
     * Event is thrown on grid list item click.
     */
    @Output()
    cardClick = new EventEmitter<GridListItemOutputEvent<T>>();

    /**
     * Event is thrown, when state is error, not used GridListItemFooterBarComponent
     * and Draft button was pressed
     */
    @Output()
    draft = new EventEmitter<GridListItemOutputEvent<T>>();

    /**
     * Event is thrown, when state is locked, not used GridListItemFooterBarComponent
     * and Locked button was pressed
     */
    @Output()
    locked = new EventEmitter<GridListItemOutputEvent<T>>();

    /** @hidden */
    @ViewChild('gridListItem')
    _gridListItem: ElementRef<HTMLDivElement>;

    /** @hidden */
    @ContentChild(GridListItemFooterBarComponent)
    footerBarComponent: Nullable<GridListItemFooterBarComponent>;
    /** @hidden */
    @ContentChild(GridListItemToolbarComponent)
    itemToolbarComponent: Nullable<GridListItemToolbarComponent>;

    /** @hidden */
    @ContentChild(GridListItemBodyDirective)
    body: Nullable<GridListItemBodyDirective>;

    /** @hidden
     * The active state of the list item.
     * If set to true, the whole card has active state. Becomes false only when the Edit button is clicked.
     */
    _isActive = true;

    /** @hidden */
    set gridLayoutClasses(value: string[]) {
        this._removeClassesNames(this._gridLayoutClasses);
        this._gridLayoutClasses = value;
        this._addClassesNames(this._gridLayoutClasses);
    }

    get gridLayoutClasses(): string[] {
        return this._gridLayoutClasses;
    }

    /** @hidden */
    _selectedItem?: T;

    /** @hidden */
    set selectionMode(mode: GridListSelectionMode | undefined) {
        this._selectionMode = mode;

        if (mode !== GridListSelectionModeEnum.DELETE && mode !== GridListSelectionModeEnum.NONE && !this.value) {
            throw new Error('Grid List Item must have [value] attribute.');
        }

        if (this.selected && this.value && this._index != null) {
            const action =
                this.selectionMode !== GridListSelectionModeEnum.MULTI_SELECT ? null : GridListSelectionActions.ADD;

            this._gridList.setSelectedItem(this.value, this._index, action);
        }

        this._cd.detectChanges();
    }

    get selectionMode(): GridListSelectionMode | undefined {
        return this._selectionMode;
    }

    /** @hidden */
    _index?: number;

    /** tabIndex of the element */
    tabIndex = signal(-1);

    /** @hidden */
    private _type: GridListItemType = 'inactive';

    /** @hidden */
    private _selectionMode?: GridListSelectionMode;

    /** @hidden */
    private _gridLayoutClasses: string[] = [];

    /** @hidden */
    private readonly subscription = new Subscription();

    /** @hidden */
    private _innerElementFocused = signal<boolean>(false);

    /** @hidden */
    constructor(
        private readonly _cd: ChangeDetectorRef,
        private readonly _elementRef: ElementRef,
        private readonly _render: Renderer2,
        private readonly _gridList: GridList<T>,
        readonly _contentDensityObserver: ContentDensityObserver,
        private readonly _tabbableElementService: TabbableElementService
    ) {
        const selectedItemsSub = this._gridList._selectedItems$.subscribe((items) => {
            this._selectedItem = items.selection.find((item) => item === this.value);
            this._cd.markForCheck();
        });
        this.subscription.add(selectedItemsSub);
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._cd.detectChanges();
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    /** Focus grid list item programmatically */
    focus(options?: FocusOptions): void {
        this._gridListItem?.nativeElement.focus(options);
    }

    /** @hidden */
    _setActive(event: MouseEvent, isActive: boolean): void {
        if (this._isElementCanBeClicked(event)) {
            return;
        }

        this._isActive = isActive;
    }

    /** @hidden */
    _singleSelect(event: Event): void {
        this._preventDefault(event);

        if (typeof this._selectedItem !== 'undefined' || !this.value || this._index == null) {
            return;
        }

        this._gridList.setSelectedItem(this.value, this._index);
    }

    /** @hidden */
    _checkboxClick(event: MouseEvent): void {
        const checked = (<HTMLInputElement>event.target).checked;
        this._selectionItem(checked, event);
    }

    /** @hidden */
    _checkboxEscape(): void {
        this._gridListItem.nativeElement.focus();
    }

    /** @hidden */
    _selectionItem(value: boolean | number | T, event?: MouseEvent): void {
        if (!this.value || this._index == null) {
            return;
        }
        const action =
            this.selectionMode !== GridListSelectionModeEnum.MULTI_SELECT
                ? null
                : value || value === 0
                  ? GridListSelectionActions.ADD
                  : GridListSelectionActions.REMOVE;

        this._gridList.setSelectedItem(this.value, this._index, action, event);
    }

    /** @hidden */
    _onDetail(event: MouseEvent): void {
        this._preventDefault(event);

        this.detail.emit(this._outputEventValue);
    }

    /** @hidden */
    _onNavigate(event: MouseEvent): void {
        this._preventDefault(event);

        this.navigate.emit(this._outputEventValue);
    }

    /** @hidden */
    _onDelete(event: MouseEvent): void {
        this._preventDefault(event);

        this.delete.emit(this._outputEventValue);
    }

    /** @hidden */
    _clickOnDraft(event: MouseEvent): void {
        this._preventDefault(event);

        this.draft.emit(this._outputEventValue);
    }

    /** @hidden */
    _clickOnLocked(event: MouseEvent): void {
        this._preventDefault(event);

        this.locked.emit(this._outputEventValue);
    }

    /** @hidden */
    _onClick(event: MouseEvent): void {
        if (!this._isElementCanBeClicked(event)) {
            return;
        }

        if (this.type !== 'active' && this.type !== 'detailsAndActive' && this.type !== 'navigation') {
            this.cardClick.emit(this._outputEventValue);
            return;
        }

        if (this.type === 'navigation') {
            this._onNavigate(event);
            return;
        }
        this.press.emit(this._outputEventValue);
        this.cardClick.emit(this._outputEventValue);
    }
    /** @hidden */
    _onKeyDown(event: KeyboardEvent): void {
        const activeElement = document.activeElement as HTMLElement;
        const isFocused = activeElement === this._gridListItem.nativeElement;
        const shouldFocusChild = KeyUtil.isKeyCode(event, [ENTER, MAC_ENTER, F2, F7]) && !event.shiftKey && isFocused;
        if (shouldFocusChild) {
            event.stopPropagation();
            const interactiveElements = this._gridListItem.nativeElement.querySelectorAll(
                'a, button, input, select, textarea'
            );

            const firstInteractiveElement = interactiveElements[0] as HTMLElement;
            firstInteractiveElement.focus();
            interactiveElements.forEach((element) => {
                element.setAttribute('tabindex', '0');
            });
            this._innerElementFocused.set(true);
            return;
        } else if (this._innerElementFocused() && KeyUtil.isKeyCode(event, [F2, F7, ESCAPE])) {
            event.stopPropagation();
            this._gridListItem.nativeElement.focus();
            this._innerElementFocused.set(false);
            return;
        }
        const target = event.target as HTMLDivElement;

        const isSelectionKeyDown = KeyUtil.isKeyCode(event, [ENTER, SPACE]);

        if (isSelectionKeyDown && this.selectionMode === GridListSelectionModeEnum.NONE) {
            this.press.emit(this._outputEventValue);
        }

        if (
            !isSelectionKeyDown ||
            this.selectionMode === GridListSelectionModeEnum.NONE ||
            !target.classList.contains('fd-grid-list__item')
        ) {
            return;
        }

        this._preventDefault(event);

        if (this.selectionMode === GridListSelectionModeEnum.MULTI_SELECT) {
            this._selectionItem(!this._selectedItem);

            return;
        }

        if (typeof this._selectedItem === 'undefined') {
            this._singleSelect(event);
        }
    }

    /** @hidden */
    private _isElementCanBeClicked(event: MouseEvent): boolean {
        if (!event?.target) {
            return false;
        }

        const element = event.target as HTMLElement;
        const { classList } = element;

        return (
            !(this._isToolbarElement(element) && this.disableToolbarClick) &&
            !classList.contains('fd-grid-list__action-button') &&
            !classList.contains('fd-grid-list__radio-label') &&
            !classList.contains('fd-grid-list__radio-input') &&
            !classList.contains('fd-grid-list__checkbox-label') &&
            !classList.contains('fd-grid-list__checkbox-input') &&
            !classList.contains('fd-checkbox__checkmark')
        );
    }

    /** @hidden */
    private _isToolbarElement(element: HTMLElement): boolean {
        if (!this.itemToolbarComponent) {
            return false;
        }

        while (element.parentElement && !element.parentElement.classList.contains('fd-grid-list__item')) {
            if (element.classList.contains('fd-toolbar--extra-content')) {
                return true;
            }

            element = element.parentElement;
        }

        return false;
    }

    /** @hidden */
    private _preventDefault(event: Event): void {
        event.preventDefault();
        event.stopPropagation();
    }

    /** @hidden */
    private get _outputEventValue(): GridListItemOutputEvent<T> {
        return {
            value: this.value,
            index: this._index
        };
    }

    /** @hidden */
    private _addClassesNames(classesNames: string[]): void {
        for (const className of classesNames) {
            this._render.addClass(this._elementRef.nativeElement, className);
        }
    }

    /** @hidden */
    private _removeClassesNames(classesNames: string[]): void {
        for (const className of classesNames) {
            this._render.removeClass(this._elementRef.nativeElement, className);
        }
    }
}
