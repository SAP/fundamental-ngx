import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OverflowListDirective } from './overflow-list.directive';
import { OverflowListItemDirective } from './overflow-list-item.directive';

@NgModule({
    declarations: [OverflowListDirective, OverflowListItemDirective],
    imports: [CommonModule],
    exports: [OverflowListDirective, OverflowListItemDirective]
})
export class OverflowListModule {}
