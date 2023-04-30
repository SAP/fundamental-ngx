export type SelectionType = 'none' | 'single' | 'multiple';
/**
 * Selection control placement.
 * - 'left' will place control at the most left side of the tree item;
 * - 'right' will place control at the most right side of the tree item;
 * - 'none' will not render the control, but selection will still work according to `SelectionType` mode;
 * - 'afterExpand' will place control right after the expansion button (if present) or on the left side of the tree item,
 * if expansion button is not present.
 */
export type SelectionPlacement = 'left' | 'right' | 'none' | 'afterExpand';
