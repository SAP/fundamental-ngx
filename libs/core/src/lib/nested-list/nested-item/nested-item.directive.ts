import {
    AfterContentInit,
    ContentChild,
    Directive,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    Input,
    Output
} from '@angular/core';
import { NestedLinkDirective } from '../nested-link/nested-link.directive';
import { NestedListKeyboardService } from '../nested-list-keyboard.service';
import { NestedListPopoverComponent } from '../nested-list-popover/nested-list-popover.component';
import { NestedItemInterface } from './nested-item.interface';
import { NestedListDirective } from '../nested-list/nested-list.directive';
import { PreparedNestedListComponent } from '../prepared-nested-list/prepared-nested-list.component';

@Directive({
    selector: '[fdNestedItem], [fd-nested-list-item]'
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

    /** @hidden */
    @ContentChild(NestedListPopoverComponent)
    popoverItem: NestedListPopoverComponent;

    /** @hidden */
    @ContentChild(forwardRef(() => NestedListDirective))
    nestedListItem: NestedListDirective;

    /** @hidden */
    @ContentChild(forwardRef(() => PreparedNestedListComponent))
    preparedListComponent: PreparedNestedListComponent;

    /** Check if the item element has any child */
    public get hasChildren(): boolean {
        return !!(this.nestedListItem || this.popoverItem || this.nestedListFromPreparedComponent);
    }

    /** Get all of the children item elements */
    public get allChildrenItems(): NestedItemInterface[] {
        if (this.nestedListItem && this.nestedListItem.nestedItems) {
            /** Get elements from child list */
            return this.nestedListItem.nestedItems.toArray();

        } else if (this.nestedListFromPreparedComponent && this.nestedListFromPreparedComponent.nestedItems) {
            /** Get elements from child prepared list  component */
            return this.nestedListFromPreparedComponent.nestedItems.toArray();

        } else {
            return [];
        }
    }

    /** @hidden */
    constructor (
        private elementRef: ElementRef,
        private keyboardService: NestedListKeyboardService
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
        if (this.popoverItem) {
            this.popoverItem.parentItemElement = this;
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

        if (this.linkItem) {
            this.linkItem.expanded = open;
        }

        if (this.nestedListItem) {
            this.nestedListItem.hidden = !open;
        }

        if (this.nestedListFromPreparedComponent) {
            this.nestedListFromPreparedComponent.hidden = !open;
        }

        if (this.popoverItem) {
            this.popoverItem.open = open;
        }

        /** Trigger event to provide keyboard support to new list of opened item element. */
        this.keyboardService.refresh$.next();
        this.expandedChange.emit(open);
    }

    /**
     * @hidden
     */
    private get nestedListFromPreparedComponent(): NestedListDirective {
        return this.preparedListComponent && this.preparedListComponent.nestedListDirective;
    }

}
