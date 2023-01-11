import { NgModule } from '@angular/core';

import { OverflowListDirective, DeprecatedOverflowListDirective } from './overflow-list.directive';
import { OverflowListItemDirective, DeprecatedOverflowListItemDirective } from './overflow-list-item.directive';

@NgModule({
    imports: [
        OverflowListDirective,
        OverflowListItemDirective,
        DeprecatedOverflowListItemDirective,
        DeprecatedOverflowListDirective
    ],
    exports: [
        OverflowListDirective,
        OverflowListItemDirective,
        DeprecatedOverflowListItemDirective,
        DeprecatedOverflowListDirective
    ]
})
export class OverflowListModule {}
