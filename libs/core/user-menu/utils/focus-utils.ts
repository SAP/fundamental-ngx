import { UserMenuListItemComponent } from '../components/user-menu-list-item.component';

/**
 * Resets roving tabindex to the first list item.
 *
 * Roving tabindex preserves focus within the list (important for submenus),
 * but when tabbing back into the menu from outside, focus should start at
 * the first item, not the last-focused item. Called when focus leaves the menu.
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
