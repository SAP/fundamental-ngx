import { FocusableItem } from './focusable.item';

/**
 * Returns the element of the item.
 * @param item
 */
export function getItemElement(item?: FocusableItem): HTMLElement | null {
    if (!item) {
        return null;
    }
    if (typeof item.element === 'function') {
        return item.element();
    }

    return item.element;
}
