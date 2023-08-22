import { NgModule } from '@angular/core';

import { PopoverControlComponent } from './popover-control/popover-control.component';
import { PopoverBodyComponent } from './popover-body/popover-body.component';
import { PopoverBodyHeaderDirective } from './popover-body/popover-body-directives/popover-body-header.directive';
import { PopoverBodyFooterDirective } from './popover-body/popover-body-directives/popover-body-footer.directive';

import { PopoverComponent } from './popover.component';
import { PopoverTriggerDirective } from './popover-trigger.directive';
import { PopoverContainerDirective } from './popover-container/popover-container.directive';

@NgModule({
    imports: [
        PopoverControlComponent,
        PopoverBodyComponent,
        PopoverBodyHeaderDirective,
        PopoverBodyFooterDirective,
        PopoverComponent,
        PopoverTriggerDirective,
        PopoverContainerDirective
    ],
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
