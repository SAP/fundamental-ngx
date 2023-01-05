import { NgModule } from '@angular/core';

import { OverflowListDirective } from './overflow-list.directive';
import { OverflowListItemDirective } from './overflow-list-item.directive';

@NgModule({
    imports: [OverflowListDirective, OverflowListItemDirective],
    exports: [OverflowListDirective, OverflowListItemDirective]
})
export class OverflowListModule {}
