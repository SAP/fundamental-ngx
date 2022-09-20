import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';

import { PopoverControlComponent } from './popover-control/popover-control.component';
import { PopoverBodyComponent } from './popover-body/popover-body.component';
import { PopoverBodyHeaderDirective } from './popover-body/popover-body-directives/popover-body-header.directive';
import { PopoverBodyFooterDirective } from './popover-body/popover-body-directives/popover-body-footer.directive';

import { PopoverComponent } from './popover.component';
import { A11yModule } from '@angular/cdk/a11y';
import { PopoverTriggerDirective } from './popover-trigger.directive';
import { PopoverContainerDirective } from './popover-container/popover-container.directive';

@NgModule({
    declarations: [
        PopoverControlComponent,
        PopoverBodyComponent,
        PopoverBodyHeaderDirective,
        PopoverBodyFooterDirective,
        PopoverComponent,
        PopoverTriggerDirective,
        PopoverContainerDirective
    ],
    imports: [CommonModule, OverlayModule, A11yModule, SkeletonModule],
    exports: [
        PopoverControlComponent,
        PopoverBodyComponent,
        PopoverBodyHeaderDirective,
        PopoverBodyFooterDirective,
        PopoverComponent,
        PopoverTriggerDirective,
        PopoverContainerDirective
    ]
})
export class PopoverModule {}
