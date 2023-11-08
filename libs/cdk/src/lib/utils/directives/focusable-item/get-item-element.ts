import { Nullable } from '../../models/nullable';
import { FocusableItem } from './focusable.item';

/**
 * Returns the element of the item.
 * @param item
 */
export function getItemElement(item?: Nullable<FocusableItem>): HTMLElement | null {
    if (!item) {
        return null;
    }
    if (typeof item.element === 'function') {
        return item.element();
    }

    return item.element;
}
