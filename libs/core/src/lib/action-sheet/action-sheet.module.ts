import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionSheetComponent } from './action-sheet.component';
import { ActionSheetControlComponent } from './action-sheet-control/action-sheet-control.component';
import { ActionSheetItemComponent } from './action-sheet-item/action-sheet-item.component';
import { ActionSheetBodyComponent } from './action-sheet-body/action-sheet-body.component';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { ButtonModule } from '@fundamental-ngx/core/button';

@NgModule({
    imports: [CommonModule, PopoverModule, ButtonModule],
    exports: [ActionSheetComponent, ActionSheetControlComponent, ActionSheetItemComponent, ActionSheetBodyComponent],
    declarations: [
        ActionSheetComponent,
        ActionSheetControlComponent,
        ActionSheetItemComponent,
        ActionSheetBodyComponent
    ]
})
export class ActionSheetModule {}
