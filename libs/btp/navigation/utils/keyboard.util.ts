import { NavigationKeyboardHandler } from '../models/navigation-types';

/**
 * Utility functions for keyboard handling in navigation components
 */
export class NavigationKeyboardUtil {
    /**
     * Determines if the key event should trigger expansion
     */
    static isExpandKey(event: KeyboardEvent): boolean {
        return (
            event.key === 'ArrowRight' ||
            event.key === '+' ||
            event.key === '=' ||
            event.code === 'Equal' ||
            event.code === 'NumpadAdd' ||
            event.keyCode === 187 || // Plus/Equal key
            event.keyCode === 107 // Numpad plus
        );
    }

    /**
     * Determines if the key event should trigger collapse
     */
    static isCollapseKey(event: KeyboardEvent): boolean {
        return (
            event.key === 'ArrowLeft' ||
            event.key === '-' ||
            event.key === '_' ||
            event.code === 'Minus' ||
            event.code === 'NumpadSubtract' ||
            event.keyCode === 189 || // Minus key
            event.keyCode === 109 // Numpad minus
        );
    }

    /**
     * Handles keyboard events for navigation expansion/collapse using handler interface
     * @param event The keyboard event
     * @param handler The navigation keyboard handler implementation
     */
    static handleNavigationKeysWithHandler(event: KeyboardEvent, handler: NavigationKeyboardHandler): boolean {
        return this.handleNavigationKeys(
            event,
            handler.hasChildren,
            handler.isExpanded,
            handler.onExpand,
            handler.onCollapse
        );
    }

    /**
     * Handles keyboard events for navigation expansion/collapse
     * @param event The keyboard event
     * @param hasChildren Whether the item has children
     * @param isExpanded Whether the item is currently expanded
     * @param onExpand Callback for expansion
     * @param onCollapse Callback for collapse
     */
    static handleNavigationKeys(
        event: KeyboardEvent,
        hasChildren: boolean,
        isExpanded: boolean,
        onExpand: () => void,
        onCollapse: () => void
    ): boolean {
        if (!hasChildren) {
            return false;
        }

        const isExpandKey = this.isExpandKey(event);
        const isCollapseKey = this.isCollapseKey(event);

        if (isExpandKey && !isExpanded) {
            event.preventDefault();
            onExpand();
            return true;
        }

        if (isCollapseKey && isExpanded) {
            event.preventDefault();
            onCollapse();
            return true;
        }

        return false;
    }
}
