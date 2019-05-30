import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopoverComponent } from './popover.component';
import { PopoverControlComponent } from './popover-control/popover-control.component';
import { PopoverBodyComponent } from './popover-body/popover-body.component';
import { PopoverDirective } from './popover-directive/popover.directive';
import { PopoverContainer } from './popover-directive/popover-container';

@NgModule({
    declarations: [PopoverComponent, PopoverControlComponent, PopoverBodyComponent, PopoverDirective, PopoverContainer],
    imports: [CommonModule],
    exports: [PopoverComponent, PopoverControlComponent, PopoverBodyComponent, PopoverDirective],
    entryComponents: [PopoverContainer]
})
export class PopoverModule {}
