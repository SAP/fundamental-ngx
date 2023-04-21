import { NgModule } from '@angular/core';
import { OverflowLayoutComponent } from './overflow-layout.component';
import { OverflowItemRefDirective } from './directives/overflow-item-ref.directive';
import { OverflowExpandDirective } from './directives/overflow-expand.directive';
import { OverflowLayoutItemDirective } from './directives/overflow-layout-item.directive';
import { OverflowItemContainerRefDirective } from './directives/overflow-item-container-ref.directive';
import { OverflowLayoutPopoverContentDirective } from './directives/overflow-layout-popover-content.directive';
import { OverflowLayoutItemContainerDirective } from './directives/overflow-layout-item-container.directive';
import { OverflowLayoutFocusableItemDirective } from './directives/overflow-layout-focusable-item.directive';

@NgModule({
    imports: [
        OverflowLayoutComponent,
        OverflowItemRefDirective,
        OverflowExpandDirective,
        OverflowLayoutItemDirective,
        OverflowItemContainerRefDirective,
        OverflowLayoutPopoverContentDirective,
        OverflowLayoutItemContainerDirective,
        OverflowLayoutFocusableItemDirective
    ],
    exports: [
        OverflowLayoutComponent,
        OverflowItemRefDirective,
        OverflowExpandDirective,
        OverflowLayoutItemDirective,
        OverflowItemContainerRefDirective,
        OverflowLayoutPopoverContentDirective,
        OverflowLayoutItemContainerDirective,
        OverflowLayoutFocusableItemDirective
    ]
})
export class OverflowLayoutModule {}
