import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FocusKeyManagerItemDirective } from './focus-key-manager-item.directive';
import { FocusKeyManagerListDirective } from './focus-key-manager-list.directive';

@NgModule({
    imports: [CommonModule],
    exports: [FocusKeyManagerItemDirective, FocusKeyManagerListDirective],
    declarations: [FocusKeyManagerItemDirective, FocusKeyManagerListDirective]
})
export class FocusKeyManagerHelpersModule {}
