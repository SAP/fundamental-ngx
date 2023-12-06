import { NgModule } from '@angular/core';

import { OverflowListItemDirective } from './overflow-list-item.directive';
import { OverflowListDirective } from './overflow-list.directive';

@NgModule({
    imports: [OverflowListDirective, OverflowListItemDirective],
    exports: [OverflowListDirective, OverflowListItemDirective]
})
export class OverflowListModule {}
