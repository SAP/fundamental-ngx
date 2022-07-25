import {
    Directive,
    ElementRef,
    EventEmitter,
    HostBinding,
    HostListener,
    Inject,
    Input,
    OnInit,
    Optional,
    Output,
    SkipSelf
} from '@angular/core';
import { OverflowItemRef } from '../interfaces/overflow-item-ref.interface';
import { OverflowItem } from '../interfaces/overflow-item.interface';
import { OverflowLayoutComponent } from '../overflow-layout.component';
import { FD_OVERFLOW_ITEM_REF } from '../tokens/overflow-item-ref.token';
import { FD_OVERFLOW_ITEM } from '../tokens/overflow-item.token';

/**
 * Directive to mark element as part of for Overflow Layout Component items.
 */
@Directive({
    selector: '[fdOverflowLayoutItem]',
    providers: [
        {
            provide: FD_OVERFLOW_ITEM,
            useExisting: OverflowLayoutItemDirective
        }
    ]
})
export class OverflowLayoutItemDirective implements OverflowItem, OnInit {
    /** Whether the item should be focusable. */
    @Input()
    focusable = false;

    /** Whether to force the visibility of the item. */
    @Input()
    set forceVisibility(value: boolean) {
        if (value === this._forceVisibility) {
            return;
        }

        this._forceVisibility = value;
        this._overflowContainer.triggerRecalculation();
    }

    get forceVisibility(): boolean {
        return this._forceVisibility;
    }

    /**
     * Event emitted when `hidden` property has been changed.
     */
    @Output()
    hiddenChange = new EventEmitter<boolean>();

    /**
     * Whether the item is hidden.
     */
    get hidden(): boolean {
        return this._overflowItemRef?.hidden === true;
    }

    set hidden(value: boolean) {
        this.hiddenChange.emit(value);
    }

    /** @hidden */
    @HostBinding('attr.tabindex')
    private get _tabindex(): number {
        return this.focusable ? 0 : -1;
    }

    /** @hidden */
    private _forceVisibility = false;

    /** @hidden */
    @HostListener('focus')
    onFocus(): void {
        this._overflowContainer.setFocusedElement(this);
    }

    /** @hidden */
    constructor(
        private _overflowContainer: OverflowLayoutComponent,
        public elmRef: ElementRef,
        @Optional() @SkipSelf() @Inject(FD_OVERFLOW_ITEM_REF) private _overflowItemRef: OverflowItemRef | null
    ) {}

    /** @hidden */
    ngOnInit(): void {
        this._overflowItemRef?.setElementRef(this.elmRef);
        this._overflowItemRef?.setOverflowItem(this);
    }

    /**
     * Focuses connected to the DOM element.
     */
    focus(): void {
        // Since we use detach() method of ViewContainerRef to remove elements from the visible list,
        // we need to check that element is connected to the DOM.
        this.elmRef.nativeElement.isConnected
            ? this.elmRef.nativeElement.focus()
            : this._overflowItemRef?.elementRef.nativeElement.isConnected
            ? this._overflowItemRef?.elementRef.nativeElement.focus()
            : this._overflowItemRef?.overflowItem.elmRef.nativeElement.focus();
    }
}
