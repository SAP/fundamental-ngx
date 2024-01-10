import { Directive, Input, TemplateRef, inject } from '@angular/core';
import { TreeItem } from '../models/tree-item';
import { TreeItemDefContext } from '../models/tree-item-def-context';

@Directive({
    selector: '[fdTreeItemDef]',
    standalone: true
})
export class TreeItemDefDirective<T extends TreeItem = TreeItem> {
    /**
     * @hidden
     * Used for type support.
     */
    @Input()
    fdTreeItemDefAs: T;
    /** Template reference. */
    readonly templateRef = inject<TemplateRef<TreeItemDefContext<T>>>(TemplateRef);
    /** @hidden */
    static ngTemplateContextGuard(dir: TreeItemDefDirective, ctx: TreeItemDefContext): ctx is TreeItemDefContext {
        return true;
    }
}
