import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { OverflowLayoutComponent } from './overflow-layout.component';
import { OverflowItemRefDirective } from './directives/overflow-item-ref.directive';
import { OverflowExpandDirective } from './directives/overflow-expand.directive';
import { OverflowLayoutItemDirective } from './directives/overflow-layout-item.directive';
import { OverflowItemContainerRefDirective } from './directives/overflow-item-container-ref.directive';
import { OverflowLayoutPopoverContentDirective } from './directives/overflow-layout-popover-content.directive';
import { OverflowLayoutItemContainerDirective } from './directives/overflow-layout-item-container.directive';

@NgModule({
    imports: [CommonModule, PopoverModule, ButtonModule],
    exports: [
        OverflowLayoutComponent,
        OverflowItemRefDirective,
        OverflowExpandDirective,
        OverflowLayoutItemDirective,
        OverflowItemContainerRefDirective,
        OverflowLayoutPopoverContentDirective
    ],
    declarations: [
        OverflowLayoutComponent,
        OverflowItemRefDirective,
        OverflowExpandDirective,
        OverflowLayoutItemDirective,
        OverflowItemContainerRefDirective,
        OverflowLayoutPopoverContentDirective,
        OverflowLayoutItemContainerDirective
    ]
})
export class OverflowLayoutModule {}
