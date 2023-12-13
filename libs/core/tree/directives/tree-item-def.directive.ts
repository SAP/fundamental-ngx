import { Directive, Input, TemplateRef } from '@angular/core';
import { TreeItem } from '../models/tree-item';
import { TreeItemDefContext } from '../models/tree-item-def-context';

@Directive({
    selector: '[fdTreeItemDef]',
    standalone: true
})
export class TreeItemDefDirective<T extends TreeItem = TreeItem> {
    /**
     * @ignore
     * Used for type support.
     */
    @Input()
    fdTreeItemDefAs: T;
    /** @ignore */
    static ngTemplateContextGuard(dir: TreeItemDefDirective, ctx: TreeItemDefContext): ctx is TreeItemDefContext {
        return true;
    }

    /** @ignore */
    constructor(public templateRef: TemplateRef<TreeItemDefContext<T>>) {}
}
