import { Directive, ElementRef } from '@angular/core';
import { Nullable, SelectableItemToken } from '@fundamental-ngx/cdk/utils';
import { FdTreeAcceptableDataSource } from '../data-source/tree-data-source';
import { TreeItem, TreeItemState } from './tree-item';

/**
 * Abstract base class for tree item components.
 * Defines the contract for tree item implementations with navigation, selection, and hierarchy support.
 * @template T - The tree item type extending TreeItem
 * @template P - The value type of the tree item (defaults to any)
 */
@Directive()
export abstract class BaseTreeItem<T extends TreeItem = TreeItem, P = any>
    implements Partial<SelectableItemToken<HTMLElement, P>>
{
    /**
     * The data value associated with this tree item.
     */
    abstract value: P;

    /**
     * Unique identifier for the tree item.
     */
    abstract id: string;

    /**
     * ID of the parent tree item, or null if this is a root item.
     */
    abstract parentId: Nullable<string>;

    /**
     * Whether the tree item can be navigated to via keyboard or mouse interaction.
     */
    abstract navigatable: boolean;

    /**
     * Current state of the tree item (e.g., loading, error, success).
     */
    abstract state: Nullable<TreeItemState>;

    /**
     * Data source for child nodes, can be an array or DataSource instance.
     */
    abstract childNodes: FdTreeAcceptableDataSource<T>;

    /**
     * Whether the content text should wrap to multiple lines.
     */
    abstract wrapContent: boolean;

    /**
     * Whether the tree item is currently expanded to show its children.
     */
    abstract expanded: boolean;

    /**
     * The hierarchical level of this item in the tree (root level is 1).
     */
    abstract level: number;

    /**
     * Array of child tree items.
     */
    abstract children: T[];

    /**
     * Whether the tree item has children defined via content projection.
     */
    abstract hasProjectedChildren: boolean;

    /**
     * Whether the tree item has any children (projected or from data source).
     */
    abstract hasChildren: boolean;

    /**
     * Reference to the focusable container element of the tree item.
     */
    abstract itemContainer: Nullable<ElementRef>;

    /**
     * Whether the tree item can receive keyboard focus for navigation.
     */
    abstract keyboardAccessible: boolean;

    /**
     * Reference to the selectable item directive for selection management.
     */
    abstract selectableListItem: SelectableItemToken;

    /**
     * Whether the tree item has children provided by a DataSource.
     */
    abstract hasDsChildren: boolean;

    /**
     * Whether children from DataSource have finished loading.
     */
    abstract childrenLoaded: boolean;

    /**
     * Reference to the host element of the tree item.
     */
    abstract elementRef: ElementRef;

    /**
     * Sets focus on the tree item.
     */
    abstract focus(): void;

    /**
     * Updates the ARIA position information for the item.
     * @param totalItemsCount - Total number of items in the set
     * @param currentIndex - Current position index (0-based)
     */
    abstract setPosition(totalItemsCount: number, currentIndex: number): void;

    /**
     * Sets the tabindex value for the item's container element.
     * @param value - The tabindex value (typically 0 for focusable, -1 for not focusable)
     */
    abstract setContainerTabIndex(value: number): void;
}
