import { NgModule } from '@angular/core';

import {
    FocusKeyManagerItemDirective,
    DeprecatedFocusKeyManagerItemDirective
} from './focus-key-manager-item.directive';
import {
    DeprecatedFocusKeyManagerListDirective,
    FocusKeyManagerListDirective
} from './focus-key-manager-list.directive';

@NgModule({
    imports: [
        FocusKeyManagerItemDirective,
        FocusKeyManagerListDirective,
        DeprecatedFocusKeyManagerItemDirective,
        DeprecatedFocusKeyManagerListDirective
    ],
    exports: [
        FocusKeyManagerItemDirective,
        FocusKeyManagerListDirective,
        DeprecatedFocusKeyManagerItemDirective,
        DeprecatedFocusKeyManagerListDirective
    ]
})
export class FocusKeyManagerHelpersModule {}
