import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionSheetComponent } from './action-sheet.component';
import { ActionSheetControlComponent } from './action-sheet-control/action-sheet-control.component';
import { ActionSheetItemComponent } from './action-sheet-item/action-sheet-item.component';



@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        ActionSheetComponent,
        ActionSheetControlComponent
    ],
    declarations: [
        ActionSheetComponent,
        ActionSheetControlComponent,
        ActionSheetItemComponent
    ]
})
export class ActionSheetModule {}
