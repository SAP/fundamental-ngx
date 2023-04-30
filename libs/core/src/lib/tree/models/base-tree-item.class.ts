import { Directive, ElementRef, inject } from '@angular/core';
import { Nullable, SelectableItemToken } from '@fundamental-ngx/cdk/utils';
import { FdTreeAcceptableDataSource } from '../data-source/tree-data-source';
import { TreeItemDirective } from '../directives/tree-item.directive';
import { TreeItem, TreeItemState } from './tree-item';

@Directive()
export abstract class BaseTreeItem<T extends TreeItem = TreeItem, P = any>
    implements Partial<SelectableItemToken<HTMLElement, P>>
{
    /**
     * Tree item value.
     */
    abstract value: P;
    /**
     * Tree item ID.
     */
    abstract id: string;

    /**
     * Tree item parent ID.
     */
    abstract parentId: Nullable<string>;

    /**
     * Whether the tree item is navigatable.
     */
    abstract navigatable: boolean;

    /**
     * Whether the tree item should have a navigation indicator.
     */
    abstract navigationIndicator: boolean;

    /**
     * Tree item state.
     */
    abstract state: Nullable<TreeItemState>;

    /**
     * Tree item child nodes data source.
     */
    abstract childNodes: FdTreeAcceptableDataSource<T>;

    /**
     * Whether to wrap content.
     */
    abstract wrapContent: boolean;

    /**
     * Whether the tree item is expanded.
     */
    abstract expanded: boolean;

    /**
     * Tree item level.
     */
    abstract level: number;

    /**
     * Tree item children.
     */
    abstract children: T[];

    /**
     * Whether the tree item has content projected child nodes.
     */
    abstract hasProjectedChildren: boolean;

    /**
     * Whether the tree item has content projected child nodes or data source for children.
     */
    abstract hasChildren: boolean;

    /**
     * Focusable tree item container.
     */
    abstract itemContainer: Nullable<ElementRef>;

    /**
     * Whether the tree item is keyboard navigatable.
     */
    abstract keyboardAccessible: boolean;

    /**
     * Tree item selectable item.
     */
    abstract selectableListItem: SelectableItemToken;

    /** @hidden */
    private readonly _elementRef = inject(ElementRef);

    /** @hidden */
    private readonly _treeItemDir = inject(TreeItemDirective, {
        optional: true
    });
    /** @hidden */
    constructor() {
        this._treeItemDir?.setTreeItem(this);
    }

    /** @hidden */
    elementRef(): ElementRef {
        return this._elementRef;
    }

    abstract focus(): void;
}
