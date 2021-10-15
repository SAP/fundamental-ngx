import {
    AfterContentInit,
    ContentChild,
    Directive,
    EventEmitter,
    HostBinding,
    Input,
    OnDestroy,
    Output
} from '@angular/core';
import { NestedLinkDirective } from '../nested-link/nested-link.directive';
import { NestedListKeyboardService } from '../nested-list-keyboard.service';
import { NestedItemInterface } from './nested-item.interface';
import { NestedItemService } from './nested-item.service';
import { NestedListContentDirective } from '../nested-content/nested-list-content.directive';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { NestedListStateService } from '../nested-list-state.service';

let sideNavigationItemUniqueId = 0;

@Directive({
    selector: '[fdNestedItem], [fd-nested-list-item]',
    providers: [NestedItemService]
})
export class NestedItemDirective implements AfterContentInit, NestedItemInterface, OnDestroy {
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

    /** Event thrown, when expanded state is changed */
    @Output()
    readonly expandedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** Event thrown, when any keyboard event is dispatched on this, or link element */
    @Output()
    readonly keyboardTriggered: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

    /** @hidden */
    @HostBinding('class.fd-nested-list__item')
    fdNestedListItemClass = true;

    /**
     * @hidden
     * Reference to the link directive, to allow manipulating the properties of this element.
     */
    @ContentChild(NestedLinkDirective)
    linkItem: NestedLinkDirective;

    /**
     * @hidden
     * Mostly used, when this item has list
     * Reference to the content directive, to allow manipulating the properties of this element.
     */
    @ContentChild(NestedListContentDirective)
    contentItem: NestedListContentDirective;

    /** @hidden */
    constructor(
        private _itemService: NestedItemService,
        private _keyboardService: NestedListKeyboardService,
        private _stateService: NestedListStateService
    ) {}

    /** @hidden */
    private _expanded = false;

    /** An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** Unique element ID */
    private readonly _elementId: string = 'fdNestedItem' + sideNavigationItemUniqueId++;

    /** @hidden */
    ngAfterContentInit(): void {
        this._setUpSubscriptions();
        this._propagateHasChildrenProperty();
        this._passItemReferences();
        /** Propagate initial open state to children */
        this.propagateOpenChange(this._expanded);
    }

    /** @hidden */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** Check if the item element has any child */
    get hasChildren(): boolean {
        return !!(this._itemService && this._itemService.list);
    }

    /** Get all of the children item elements */
    get allChildrenItems(): NestedItemInterface[] {
        if (this._itemService && this._itemService.list) {
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
        if (this.contentItem) {
            this.contentItem.click();
        } else if (this.linkItem) {
            this.linkItem.click();
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
        } else {
            return false;
        }
    }

    /**
     * @hidden
     * Propagate open state to all of the children
     */
    private propagateOpenChange(open: boolean): void {
        this._expanded = open;

        /**
         * Propagate to child content directive, which contains icon and link
         */
        if (this.contentItem) {
            this.contentItem.changeExpandedState(open);
        }

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
        /** Subscribe to mouse click event, thrown by link item */
        this._itemService.toggle.pipe(takeUntil(this._onDestroy$)).subscribe(() => this.toggle());

        /** Subscribe to mouse click event, thrown by link item */
        this._itemService.click
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(() => this._stateService.onSelected.next(this._elementId));

        /** Subscribe to keyboard event and throw it farther */
        this._itemService.keyDown
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((keyboardEvent) => this.keyboardTriggered.emit(keyboardEvent));

        /** Subscribe to selected state change, it's not triggered, when selectable flag is disabled*/
        this._stateService.onSelected
            .pipe(
                takeUntil(this._onDestroy$),
                filter(() => this._stateService.selectable)
            )
            .subscribe((id) => this._selectedChange(id));
    }

    /** @hidden */
    private _propagateHasChildrenProperty(): void {
        if (this.contentItem && this.hasChildren) {
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
        if (this.contentItem) {
            this.contentItem.changeSelected(this.containsId(id));
        } else if (this.linkItem) {
            this.linkItem.changeSelected(this.containsId(id));
        }
    }
}
