import { NgModule } from '@angular/core';
import { TreeItemComponent } from './components/tree-item/tree-item.component';
import { TreeItemButtonDirective } from './directives/tree-item-button.directive';
import { TreeItemDefDirective } from './directives/tree-item-def.directive';
import { TreeItemIconDirective, TreeItemTextDirective } from './directives/tree-item-icon.directive';
import { TreeItemDirective } from './directives/tree-item.directive';
import { TreeComponent } from './tree.component';

const components = [
    TreeComponent,
    TreeItemComponent,
    TreeItemDefDirective,
    TreeItemDirective,
    TreeItemIconDirective,
    TreeItemTextDirective,
    TreeItemButtonDirective
];

/**
 * @deprecated
 *
 * Use direct imports of `TreeComponent`,
        `TreeItemComponent`,
        `TreeItemDefDirective`,
        `TreeItemDirective`,
        `TreeItemIconDirective`,
        `TreeItemTextDirective`,
        `TreeItemButtonDirective`
 */
@NgModule({
    imports: [...components],
    exports: [...components]
})
export class TreeModule {}
