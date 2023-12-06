import { NgModule } from '@angular/core';
import { OverflowExpandDirective } from './directives/overflow-expand.directive';
import { OverflowItemContainerRefDirective } from './directives/overflow-item-container-ref.directive';
import { OverflowItemRefDirective } from './directives/overflow-item-ref.directive';
import { OverflowLayoutFocusableItemDirective } from './directives/overflow-layout-focusable-item.directive';
import { OverflowLayoutItemContainerDirective } from './directives/overflow-layout-item-container.directive';
import { OverflowLayoutItemDirective } from './directives/overflow-layout-item.directive';
import { OverflowLayoutPopoverContentDirective } from './directives/overflow-layout-popover-content.directive';
import { OverflowLayoutComponent } from './overflow-layout.component';

/**
 * @deprecated
 * Use direct imports of OverflowLayoutComponent,
        OverflowItemRefDirective,
        OverflowExpandDirective,
        OverflowLayoutItemDirective,
        OverflowItemContainerRefDirective,
        OverflowLayoutPopoverContentDirective,
        OverflowLayoutItemContainerDirective,
        OverflowLayoutFocusableItemDirective
 */
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
