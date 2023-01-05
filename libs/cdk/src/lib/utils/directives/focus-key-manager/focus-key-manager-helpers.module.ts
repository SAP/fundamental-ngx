import { NgModule } from '@angular/core';

import { FocusKeyManagerItemDirective } from './focus-key-manager-item.directive';
import { FocusKeyManagerListDirective } from './focus-key-manager-list.directive';

@NgModule({
    imports: [FocusKeyManagerItemDirective, FocusKeyManagerListDirective],
    exports: [FocusKeyManagerItemDirective, FocusKeyManagerListDirective]
})
export class FocusKeyManagerHelpersModule {}
