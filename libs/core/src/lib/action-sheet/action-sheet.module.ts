import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionSheetComponent } from './action-sheet.component';
import { ActionSheetControlComponent } from './action-sheet-control/action-sheet-control.component';
import { ActionSheetItemComponent } from './action-sheet-item/action-sheet-item.component';
import { PopoverModule } from '../popover/popover.module';
import { ActionSheetMobileComponent } from './action-sheet-mobile/action-sheet-mobile.component';
import { ButtonModule } from '../button/button.module';



@NgModule({
    imports: [
        CommonModule,
        PopoverModule,
        ButtonModule
    ],
    exports: [
        ActionSheetComponent,
        ActionSheetControlComponent,
        ActionSheetItemComponent,
        ActionSheetMobileComponent
    ],
    declarations: [
        ActionSheetComponent,
        ActionSheetControlComponent,
        ActionSheetItemComponent,
        ActionSheetMobileComponent
    ]
})
export class ActionSheetModule {}
