import {
    AfterContentInit,
    Component,
    ContentChild,
    DestroyRef,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    Output,
    booleanAttribute,
    forwardRef,
    inject
} from '@angular/core';
import { filter } from 'rxjs/operators';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { NestedListContentDirective } from '../nested-content/nested-list-content.directive';
import { NestedLinkComponent } from '../nested-link/nested-link.component';
import { NestedListExpandIconComponent } from '../nested-list-directives';
import { NestedListKeyboardService } from '../nested-list-keyboard.service';
import { NestedListStateService } from '../nested-list-state.service';
import { NestedListComponent } from '../nested-list/nested-list.component';
import { NestedItemInterface } from './nested-item.interface';
import { NestedItemService } from './nested-item.service';

let sideNavigationItemUniqueId = 0;

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[cxNestedItem], [fdx-nested-list-item], li[fdx-nested-list-item]',
    template: ` <ng-content></ng-content> `,
    providers: [NestedItemService],
    standalone: true,
    host: {
        role: 'treeitem'
    }
})
export class NestedItemComponent implements AfterContentInit, NestedItemInterface {
    /** Whether item should be expanded */
    @Input() set expanded(expanded: boolean) {
        if (expanded !== this._expanded) {
            this.propagateOpenChange(expanded);
        }
    }

    /** @hidden */
    get expanded(): boolean {
        return this._expanded;
    }

    /** @hidden */
    @HostBinding('class.fdx-nested-list__item--group')
    @Input({ transform: booleanAttribute })
    group = false;

    /** Event thrown, when expanded state is changed */
    @Output()
    readonly expandedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** Event thrown, when any keyboard event is dispatched on this, or link element */
    @Output()
    readonly keyboardTriggered: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

    /** @hidden */
    @Input()
    @HostBinding('class.fdx-nested-list__item')
    fdNestedListItemClass = true;

    /** Whether this item is a header item. */
    @Input()
    @HostBinding('class.fdx-nested-list__item--header')
    header = false;

    /** Whether this item is only meant for display purposes, meaning it cannot be used for navigation or shown as selected. */
    @Input()
    display = false;

    /**
     * @Input
     * Applies `aria-hidden` to the element.
     * Set to `true` for non-focusable elements without focusable children to hide them from assistive technologies.
     */
    @Input()
    @HostBinding('attr.aria-hidden')
    ariaHidden = false;

    /**
     * @hidden
     * Reference to the link directive, to allow manipulating the properties of this element.
     */
    @ContentChild(NestedLinkComponent)
    linkItem: NestedLinkComponent;

    /**
     * @hidden
     * Mostly used, when this item has list
     * Reference to the content directive, to allow manipulating the properties of this element.
     */
    @ContentChild(NestedListContentDirective)
    contentItem: NestedListContentDirective;

    /** @hidden */
    @ContentChild(NestedListExpandIconComponent, { descendants: true })
    expandIcon: NestedListExpandIconComponent;

    /** @hidden */
    @ContentChild(forwardRef(() => NestedListComponent))
    _nestedList: NestedListComponent;

    /** @hidden */
    @HostBinding('attr.aria-level')
    _ariaLevel: Nullable<number> = null;

    /** @hidden */
    @HostBinding('attr.title')
    _title: string;

    /** @hidden */
    @HostBinding('style.display')
    _display = 'block';

    /** @hidden */
    @HostBinding('attr.role')
    protected _role: string;

    /** @hidden */
    @HostBinding('attr.aria-expanded')
    protected _ariaExpanded: Nullable<boolean> = null;

    /** @hidden */
    @HostBinding('attr.aria-selected')
    protected _ariaSelected: Nullable<boolean> = null;

    /** @hidden */
    @HostBinding('attr.aria-disabled')
    protected _ariaDisabled = false;

    /** @hidden */
    @HostBinding('attr.aria-label')
    protected _ariaLabel: string;

    /** @hidden */
    _narrow = false;

    /** @hidden */
    private _expanded = false;

    /** @hidden */
    private readonly _destroyRef = inject(DestroyRef);

    /** Unique element ID */
    private readonly _elementId: string = 'fdNestedItem' + sideNavigationItemUniqueId++;

    /** @hidden */
    constructor(
        private _itemService: NestedItemService,
        private _keyboardService: NestedListKeyboardService,
        private _stateService: NestedListStateService,
        public elementRef: ElementRef
    ) {}

    /** @hidden */
    ngAfterContentInit(): void {
        this._setUpSubscriptions();
        this._propagateHasChildrenProperty();
        this._passItemReferences();
        /** Propagate initial open state to children */
        this.propagateOpenChange(this._expanded);

        if (this.linkItem) {
            this._ariaSelected = this.linkItem.selected;
            this._ariaDisabled = !this._stateService.selectable && !this.linkItem.selected;
            this._title = this.linkItem.getTitle();
        }
    }

    /** Check if the item element has any child */
    get hasChildren(): boolean {
        return !!this._itemService?.list;
    }

    /** Get all of the children item elements */
    get allChildrenItems(): NestedItemInterface[] {
        if (this._itemService?.list) {
            return this._itemService.list.nestedItems.toArray();
        }

        return [];
    }

    /** Method that expand the item and propagate it to children */
    triggerOpen(): void {
        if (!this.expanded) {
            /** Propagate initial open state to children */
            this.propagateOpenChange(true);
        }
    }

    /** Method that close the item and propagate it to children */
    triggerClose(): void {
        if (this.expanded) {
            /** Propagate initial open state to children */
            this.propagateOpenChange(false);
        }
    }

    /** Method that toggle the item and propagate it to children */
    toggle(): void {
        /** Propagate initial open state to children */
        this.propagateOpenChange(!this._expanded);
    }

    /** Method that dispatches `click` event on link item*/
    click(): void {
        if (!this.display) {
            if (this.contentItem) {
                this.contentItem.click();
            } else if (this.linkItem) {
                this.linkItem.click();
            }
        }
    }

    /** Method that focuses link item*/
    focus(): void {
        if (this.contentItem) {
            this.contentItem.focus();
        } else if (this.linkItem) {
            this.linkItem.focus();
        }
    }

    /** Method that provides information if element, or children of this element has passed id */
    containsId(id: string): boolean {
        if (this._elementId === id) {
            return true;
        }

        if (this._itemService.list) {
            return !!this._itemService.list.nestedItems.find((item) => item.containsId(id));
        }

        return false;
    }

    /**
     * @hidden
     * Propagate open state to all of the children
     */
    private propagateOpenChange(open: boolean): void {
        this._expanded = open;

        if (this.hasChildren) {
            this._ariaExpanded = this._expanded;
        }

        this.expandIcon?.changeExpandedState(open);

        /** Propagate hidden flag to list component, that is passed from child */
        if (this._itemService.list) {
            this._itemService.list.hidden = !open;
            this._itemService.list.detectChanges();
        }

        /** Propagate open flag to popover list component, that is passed from child */
        if (this._itemService.popover) {
            this._itemService.popover.open = open;
        }

        /**
         * If there are any list below
         * Trigger event to provide keyboard support to new list of opened item element.
         * */
        if (this._shouldRefreshKeyboardService()) {
            this._keyboardService.refresh$.next();
        }

        this.expandedChange.emit(open);
    }

    /** @hidden */
    private _shouldRefreshKeyboardService(): boolean {
        return !!(this._itemService.popover || this._itemService.list || this.contentItem);
    }

    /** @hidden */
    private _setUpSubscriptions(): void {
        if (this._stateService.condensed) {
            this._role = 'menuitemradio';
        }

        if (!this.display) {
            /** Subscribe to mouse click event, thrown by link item */
            this._itemService.toggle.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => this.toggle());

            /** Subscribe to mouse click event, thrown by link item */
            this._itemService.click
                .pipe(takeUntilDestroyed(this._destroyRef))
                .subscribe(() => this._stateService.onSelected.next(this._elementId));
        }

        /** Subscribe to keyboard event and throw it farther */
        this._itemService.keyDown
            .pipe(takeUntilDestroyed(this._destroyRef))
            .subscribe((keyboardEvent) => this.keyboardTriggered.emit(keyboardEvent));

        /** Subscribe to selected state change, it's not triggered, when selectable flag is disabled*/
        this._stateService.onSelected
            .pipe(
                takeUntilDestroyed(this._destroyRef),
                filter(() => this._stateService.selectable)
            )
            .subscribe((id) => this._selectedChange(id));
    }

    /** @hidden */
    private _propagateHasChildrenProperty(): void {
        if (this.contentItem && this.hasChildren) {
            this._ariaExpanded = false;
            this.contentItem.hasChildren = true;
            this.contentItem.changeDetRef.detectChanges();
        }
    }

    /** Pass this element to popover child item, to allow control `expanded` value */
    private _passItemReferences(): void {
        if (this._itemService.popover) {
            this._itemService.popover.parentItemElement = this;
        }
    }

    /** Change of selected state of content or link, if there is any children with I */
    private _selectedChange(id: string): void {
        const selected = this.containsId(id);
        this._ariaSelected = selected;

        if (this.contentItem) {
            this.contentItem.changeSelected(selected);
        } else if (this.linkItem) {
            this.linkItem.changeSelected(selected);
        }
    }
}
