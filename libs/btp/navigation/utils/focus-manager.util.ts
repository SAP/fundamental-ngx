import { FocusManagerOptions } from '../models/navigation-types';

/**
 * Focus management strategies for different navigation states
 */
export type NavigationFocusStrategy = 'visible' | 'snapped' | 'overflow';

/**
 * Utility class for managing focus in navigation components
 */
export class NavigationFocusManager {
    /**
     * Handles keyboard expansion for different navigation states
     * @param strategy The navigation state strategy
     * @param shouldExpand Whether to expand or collapse
     * @param context The context object containing necessary methods and properties
     */
    static handleKeyboardExpansion(
        strategy: NavigationFocusStrategy,
        shouldExpand: boolean,
        context: {
            hasChildren: boolean;
            expanded: boolean;
            popoverOpen: boolean;
            parentListItem?: any;
            listItems?: any[];
            setExpanded: (expanded: boolean) => void;
            setPopoverOpen: (open: boolean) => void;
            focus: () => void;
            focusFirstChild?: () => void;
            focusLink?: () => void;
        }
    ): void {
        switch (strategy) {
            case 'visible':
                this.handleVisibleItemExpansion(shouldExpand, context);
                break;
            case 'snapped':
                this.handleSnappedItemExpansion(shouldExpand, context);
                break;
            case 'overflow':
                this.handleOverflowItemExpansion(shouldExpand, context);
                break;
        }
    }

    /**
     * Determines the focus strategy based on navigation state
     */
    static getFocusStrategy(isOverflow: boolean, isSnapped: boolean): NavigationFocusStrategy {
        if (isOverflow) {
            return 'overflow';
        }
        if (isSnapped) {
            return 'snapped';
        }
        return 'visible';
    }

    /**
     * Safely focuses an element with optional disabled check
     */
    static safeFocus(element: { focus: () => void; disabled?: boolean }, options: FocusManagerOptions = {}): boolean {
        if (options.skipDisabled && element.disabled) {
            return false;
        }

        try {
            element.focus();
            return true;
        } catch (error) {
            console.warn('Failed to focus element:', error);
            return false;
        }
    }

    /**
     * Handles keyboard expansion for visible navigation items
     */
    private static handleVisibleItemExpansion(shouldExpand: boolean, context: any): void {
        if (!context.hasChildren) {
            if (!shouldExpand) {
                context.parentListItem?.focus();
            }
            return;
        }

        if (!shouldExpand) {
            // If item already collapsed, shift focus to parent link
            if (!context.expanded) {
                context.parentListItem?.focus();
                return;
            }
            context.setExpanded(false);
            // Keep focus on this item after collapsing
            setTimeout(() => {
                context.focus();
            }, 0);
        } else {
            if (context.expanded && context.focusFirstChild) {
                context.focusFirstChild();
                return;
            }
            context.setExpanded(true);
        }
    }

    /**
     * Handles keyboard expansion for snapped navigation items
     */
    private static handleSnappedItemExpansion(shouldExpand: boolean, context: any): void {
        if (!context.hasChildren) {
            return;
        }

        if (shouldExpand && !context.popoverOpen) {
            context.setPopoverOpen(true);
        }

        if (!shouldExpand && context.popoverOpen) {
            context.setPopoverOpen(false);
            if (context.focusLink) {
                context.focusLink();
            }
        }
    }

    /**
     * Handles keyboard expansion for overflow navigation items
     */
    private static handleOverflowItemExpansion(shouldExpand: boolean, context: any): void {
        if (shouldExpand && context.listItems && context.listItems.length > 0) {
            // Focus first child if available
            if (context.focusFirstChild) {
                context.focusFirstChild();
            }
        }

        if (shouldExpand && !context.popoverOpen) {
            context.setPopoverOpen(true);
        }

        if (!shouldExpand && context.popoverOpen) {
            context.setPopoverOpen(false);
            if (context.focusLink) {
                context.focusLink();
            }
        }
    }
}
