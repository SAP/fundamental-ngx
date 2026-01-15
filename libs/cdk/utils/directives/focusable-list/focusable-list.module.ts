import { NgModule } from '@angular/core';
import { FocusableItemDirective } from '../focusable-item';
import { FocusableListDirective } from './focusable-list.directive';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [FocusableItemDirective, FocusableListDirective],
    exports: [FocusableItemDirective, FocusableListDirective]
})
export class FocusableListModule {}
