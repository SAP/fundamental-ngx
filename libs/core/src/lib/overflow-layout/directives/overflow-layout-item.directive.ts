import { Directive, ElementRef, EventEmitter, Inject, Input, OnInit, Optional, Output, SkipSelf } from '@angular/core';
import { OverflowLayoutFocusableItem } from '../interfaces/overflow-focusable-item.interface';
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
    ],
    standalone: true
})
export class OverflowLayoutItemDirective implements OverflowItem, OnInit {
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
    set hidden(value: boolean) {
        this.hiddenChange.emit(value);
    }
    get hidden(): boolean {
        return this._overflowItemRef?.hidden === true;
    }

    /**
     * Focusable item for keyboard navigation.
     */
    focusableItem: OverflowLayoutFocusableItem;

    /** @hidden */
    private _forceVisibility = false;

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
}
