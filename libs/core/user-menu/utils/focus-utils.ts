import { UserMenuListItemComponent } from '../components/user-menu-list-item.component';

/**
 * Resets roving tabindex to the first list item.
 *
 * In a roving tabindex pattern, only one item has tabindex="0" at a time,
 * allowing arrow keys to navigate within the list. This function resets
 * the pattern so the first item becomes tabbable again.
 *
 * Typically called when focus leaves the menu to ensure that when users
 * Tab back in, focus starts at the first item rather than the last-focused item.
 */
export function resetListFocus(items: readonly UserMenuListItemComponent[]): void {
    if (!items || items.length === 0) {
        return;
    }

    // Reset tabindex: first item gets 0, rest get -1
    items[0]._tabIndex$.set(0);
    for (let i = 1; i < items.length; i++) {
        items[i]._tabIndex$.set(-1);
    }
}
