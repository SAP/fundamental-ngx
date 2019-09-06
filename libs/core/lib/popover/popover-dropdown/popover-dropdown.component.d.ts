/**
 * A component used to enforce a certain layout for the popover. With additional styling
 * ```html
 * <fd-popover>
 *     <fd-dropdown>Dropdown</fd-dropdown>
 *     <fd-popover-body>Popover Body</fd-popover-body>
 * </fd-popover>
 * ```
 */
export declare class PopoverDropdownComponent {
    /** Whether the popover should have an arrow. */
    noArrow: boolean;
    /** Whether the popover is disabled. */
    disabled: boolean;
    /** The glyph to display. */
    glyph: string;
    /** The btnType to display. */
    btnType: string;
    /** Whether the dropdown is in compact format. */
    compact: boolean;
    /** Whether the dropdown is in a toolbar. */
    toolbar: boolean;
    /** Whether the dropdown is opened. */
    isOpen: boolean;
}
