import { Directive, Injector, OnDestroy } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { BaseTreeItem } from '../models/base-tree-item.class';
import { TreeItem } from '../models/tree-item';

@Directive({
    selector: '[fdTreeItem]',
    exportAs: 'fdTreeItem'
})
export class TreeItemDirective<T extends TreeItem, P> implements OnDestroy {
    /** Tree item component instance. */
    treeItem: Nullable<BaseTreeItem<T, P>>;

    /** Injector to be used in a tree item component, to resolve a tree item directive. */
    readonly injector: Injector;

    /** @hidden */
    constructor(injector: Injector) {
        this.injector = Injector.create({ providers: [], parent: injector });
    }

    /** Sets tree item. */
    setTreeItem(item: Nullable<BaseTreeItem<T, P>>): void {
        this.treeItem = item;
    }

    /** @hidden */
    ngOnDestroy(): void {
        this.treeItem = null;
    }
}
