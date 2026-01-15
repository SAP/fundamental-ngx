import { NgModule } from '@angular/core';

import { PopoverBodyFooterDirective } from './popover-body/popover-body-directives/popover-body-footer.directive';
import { PopoverBodyHeaderDirective } from './popover-body/popover-body-directives/popover-body-header.directive';
import { PopoverBodyComponent } from './popover-body/popover-body.component';
import { PopoverControlComponent } from './popover-control/popover-control.component';

import { PopoverBodyDirective } from './popover-body.directive';
import { PopoverContainerDirective } from './popover-container/popover-container.directive';
import { PopoverTriggerDirective } from './popover-trigger.directive';
import { PopoverComponent } from './popover.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [
        PopoverControlComponent,
        PopoverBodyComponent,
        PopoverBodyHeaderDirective,
        PopoverBodyFooterDirective,
        PopoverComponent,
        PopoverTriggerDirective,
        PopoverContainerDirective,
        PopoverBodyDirective
    ],
    exports: [
        PopoverControlComponent,
        PopoverBodyComponent,
        PopoverBodyHeaderDirective,
        PopoverBodyFooterDirective,
        PopoverComponent,
        PopoverTriggerDirective,
        PopoverContainerDirective,
        PopoverBodyDirective
    ]
})
export class PopoverModule {}
