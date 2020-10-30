import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopoverControlComponent } from './popover-control/popover-control.component';
import { PopoverBodyComponent } from './popover-body/popover-body.component';
import { PopoverBodyHeaderDirective } from './popover-body/popover-body-directives/popover-body-header.directive';
import { PopoverBodyFooterDirective } from './popover-body/popover-body-directives/popover-body-footer.directive';

import { OverlayModule } from '@angular/cdk/overlay';
import { PopoverComponent } from './popover.component';
import { A11yModule } from '@angular/cdk/a11y';
import { PopoverDirective } from './popover-directive/popover.directive';
import { PopoverContainer } from './popover-directive/popover-container';
import { PopoverTriggerDirective } from './popover-trigger.directive';

@NgModule({
    declarations: [
        PopoverControlComponent,
        PopoverBodyComponent,
        PopoverBodyHeaderDirective,
        PopoverBodyFooterDirective,
        PopoverComponent,
        PopoverDirective,
        PopoverContainer,
        PopoverTriggerDirective
    ],
    imports: [CommonModule, OverlayModule, A11yModule],
    exports: [
        PopoverControlComponent,
        PopoverBodyComponent,
        PopoverBodyHeaderDirective,
        PopoverBodyFooterDirective,
        PopoverComponent,
        PopoverDirective,
        PopoverContainer,
        PopoverTriggerDirective
    ],
})
export class PopoverModule {}
