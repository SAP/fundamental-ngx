import { Directive, Input, TemplateRef } from '@angular/core';
import { TreeItem } from '../models/tree-item';
import { TreeItemDefContext } from '../models/tree-item-def-context';

@Directive({
    selector: '[fdTreeItemDef]'
})
export class TreeItemDefDirective<T extends TreeItem = TreeItem> {
    /**
     * @hidden
     * Used for type support.
     */
    @Input()
    fdTreeItemDefAs: T;
    /** @hidden */
    static ngTemplateContextGuard(dir: TreeItemDefDirective, ctx: TreeItemDefContext): ctx is TreeItemDefContext {
        return true;
    }

    /** @hidden */
    constructor(public templateRef: TemplateRef<TreeItemDefContext<T>>) {}
}
