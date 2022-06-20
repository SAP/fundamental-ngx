import { FocusableOption } from '@angular/cdk/a11y';
import { ElementRef } from '@angular/core';

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
}
