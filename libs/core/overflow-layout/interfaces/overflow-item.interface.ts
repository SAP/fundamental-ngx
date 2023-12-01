import { ElementRef, EventEmitter } from '@angular/core';
import { OverflowLayoutFocusableItem } from './overflow-focusable-item.interface';

export interface OverflowItem {
    /**
     * Whether to enforce the visibility of the item.
     */
    forceVisibility: boolean;
    /**
     * Element reference.
     */
    elmRef: ElementRef;
    /**
     * Whether the item is hidden.
     */
    hidden: boolean;
    /**
     * Event emitted when `hidden` property has been changed.
     */
    hiddenChange: EventEmitter<boolean>;
    /**
     * Focusable item for keyboard navigation.
     */
    focusableItem: OverflowLayoutFocusableItem;
}
