import {
    AfterContentInit,
    ContentChild,
    Directive,
    EventEmitter,
    HostBinding,
    Input,
    Output
} from '@angular/core';
import { NestedLinkDirective } from '../nested-link/nested-link.directive';
import { NestedListKeyboardService } from '../nested-list-keyboard.service';
import { NestedItemInterface } from './nested-item.interface';
import { NestedItemService } from './nested-item.service';

@Directive({
    selector: '[fdNestedItem], [fd-nested-list-item]',
    providers: [
        NestedItemService
    ]
})
export class NestedItemDirective implements AfterContentInit, NestedItemInterface {

    /** @hidden */
    @HostBinding('class.fd-nested-list__item')
    fdNestedListItemClass: boolean = true;

    /**
     * @hidden
     * Reference to the link directive, to allow manipulating the properties of this element.
     */
    @ContentChild(NestedLinkDirective)
    linkItem: NestedLinkDirective;

    /** Check if the item element has any child */
    public get hasChildren(): boolean {
        return !!(this._itemService && this._itemService.list);
    }

    /** Get all of the children item elements */
    public get allChildrenItems(): NestedItemInterface[] {
        if (this._itemService && this._itemService.list) {
            return this._itemService.list.nestedItems.toArray()
        } else {
            return [];
        }
    }

    /** @hidden */
    constructor (
        private _itemService: NestedItemService,
        private _keyboardService: NestedListKeyboardService
    ) {}

    /** Whether item should be expanded */
    @Input() set expanded(expanded: boolean) {
        this.propagateOpenChange(expanded);
    }

    /** @hidden */
    get expanded(): boolean {
        return this._expanded;
    }

    /** @hidden */
    private _expanded: boolean = false;

    /** Event thrown, when expanded state is changed */
    @Output()
    readonly expandedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

    /** Event thrown, when any keyboard event is dispatched on this, or link element */
    @Output()
    readonly keyboardTriggered: EventEmitter<KeyboardEvent> = new EventEmitter<KeyboardEvent>();

    /** @hidden */
    ngAfterContentInit(): void {
        /** Propagate hasChildren property */
        if (this.hasChildren && this.linkItem) {
            this.linkItem.hasChildren = true;
            this.linkItem.changeDetRef.detectChanges();
        }

        if (this.linkItem) {
            /** Subscribe to mouse click event, thrown by link item */
            this.linkItem.clicked.subscribe(() => this.toggle());

            /** Subscribe to keyboard event and throw it farther */
            this.linkItem.keyboardTriggered.subscribe(keyboardEvent =>
                this.keyboardTriggered.emit(keyboardEvent)
            );
        }

        /** Pass this element to popover child item, to allow control `expanded` value */
        if (this._itemService.popover) {
            this._itemService.popover.parentItemElement = this;
        }

        /** Propagate initial open state to children */
        this.propagateOpenChange(this._expanded);
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
        if (this.linkItem) {
            this.linkItem.click();
        }
    }

    /** Method that focuses link item*/
    focus(): void {
        if (this.linkItem) {
            this.linkItem.focus();
        }
    }

    /**
     * @hidden
     * Propagate open state to all of the children
     */
    private propagateOpenChange(open: boolean): void {
        this._expanded = open;

        /** Propagate to child link directive */
        if (this.linkItem) {
            this.linkItem.expanded = open;
        }

        /** Propagate hidden flag to list component, that is passed from child */
        if (this._itemService.list) {
            this._itemService.list.hidden = !open;
        }

        /** Propagate open flag to popover list component, that is passed from child */
        if (this._itemService.popover) {
            this._itemService.popover.open = open;
        }

        /** Trigger event to provide keyboard support to new list of opened item element. */
        this._keyboardService.refresh$.next();
        this.expandedChange.emit(open);
    }
}
