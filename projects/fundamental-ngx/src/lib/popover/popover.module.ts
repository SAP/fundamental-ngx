import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsModule } from '../utils/utils.module';

import { PopoverComponent } from './popover.component';
import { PopoverControlComponent } from './popover-control.component';
import { PopoverBodyComponent } from './popover-body.component';

@NgModule({
    declarations: [
        PopoverComponent,
        PopoverControlComponent,
        PopoverBodyComponent
    ],
    imports: [CommonModule, UtilsModule],
    exports: [
        PopoverComponent,
        PopoverControlComponent,
        PopoverBodyComponent
    ]
})
export class PopoverModule {}