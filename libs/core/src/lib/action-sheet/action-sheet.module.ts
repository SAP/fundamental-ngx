import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ActionSheetComponent } from './action-sheet.component';
import { IconModule } from '../icon/icon.module';
import { PopoverModule } from '../popover/popover.module';
import { MenuModule } from '../menu/menu.module';

@NgModule({
    imports: [CommonModule, IconModule, PopoverModule, MenuModule, RouterModule],
    exports: [ActionSheetComponent],
    declarations: [ActionSheetComponent]
})
export class ActionSheetModule {}
