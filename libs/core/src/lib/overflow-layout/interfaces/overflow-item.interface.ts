import { FocusableOption } from '@angular/cdk/a11y';
import { ElementRef, EventEmitter } from '@angular/core';

export interface OverflowItem extends FocusableOption {
    /**
     * Whether the item is focusable.
     */
    focusable: boolean;
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
}
