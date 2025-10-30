/**
 * Interface for navigation keyboard event handling
 */
export interface NavigationKeyboardHandler {
    /**
     * Whether the item has children that can be expanded/collapsed
     */
    hasChildren: boolean;

    /**
     * Whether the item is currently expanded
     */
    isExpanded: boolean;

    /**
     * Callback to expand the item
     */
    onExpand: () => void;

    /**
     * Callback to collapse the item
     */
    onCollapse: () => void;
}

/**
 * Type for navigation item state
 */
export type NavigationItemState = 'expanded' | 'collapsed' | 'disabled' | 'selected';

/**
 * Interface for navigation item configuration
 */
export interface NavigationItemConfig {
    /** Whether the item is disabled */
    disabled?: boolean;
    /** Whether the item is selected */
    selected?: boolean;
    /** Whether the item is expanded */
    expanded?: boolean;
    /** Whether the item represents a home link */
    home?: boolean;
    /** Whether the item is a quick create button */
    quickCreate?: boolean;
    /** Whether the item is a separator */
    separator?: boolean;
    /** Whether the item is a spacer */
    spacer?: boolean;
    /** Whether the item is a group */
    group?: boolean;
}

/**
 * Interface for focus management operations
 */
export interface FocusManagerOptions {
    /** Whether to prevent focus on disabled items */
    skipDisabled?: boolean;
    /** Whether to wrap focus from last to first item */
    wrap?: boolean;
    /** Origin of the focus change */
    origin?: 'keyboard' | 'mouse' | 'program';
}
