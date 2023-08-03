import { FocusableItem } from './focusable.item';

/**
 * Returns true if the item configured to be focusable.
 * @param item
 */
export function isItemFocusable(item: FocusableItem): boolean {
    return Boolean(typeof item.isFocusable === 'function' ? item.isFocusable() : item.isFocusable);
}
