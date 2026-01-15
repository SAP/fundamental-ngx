import { NgModule } from '@angular/core';
import { SelectableItemDirective } from './selectable-item.directive';
import { SelectableListDirective } from './selectable-list.directive';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [SelectableListDirective, SelectableItemDirective],
    exports: [SelectableListDirective, SelectableItemDirective]
})
export class SelectableListModule {}
