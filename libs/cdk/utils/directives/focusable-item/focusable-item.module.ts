import { NgModule } from '@angular/core';
import { FocusableItemDirective } from './focusable-item.directive';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [FocusableItemDirective],
    exports: [FocusableItemDirective]
})
export class FocusableItemModule {}
