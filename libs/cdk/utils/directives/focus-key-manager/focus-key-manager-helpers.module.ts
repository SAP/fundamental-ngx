import { NgModule } from '@angular/core';

import { FocusKeyManagerItemDirective } from './focus-key-manager-item.directive';
import { FocusKeyManagerListDirective } from './focus-key-manager-list.directive';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [FocusKeyManagerItemDirective, FocusKeyManagerListDirective],
    exports: [FocusKeyManagerItemDirective, FocusKeyManagerListDirective]
})
export class FocusKeyManagerHelpersModule {}
