import { OverflowItemRef } from '../interfaces/overflow-item-ref.interface';

export interface OverflowPopoverContent {
    /**
     * Array of hidden items.
     */
    items: OverflowItemRef[];

    /**
     * Focuses the first focusable item in the container.
     */
    focusFirstTabbableElement(): void;
}
