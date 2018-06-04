import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { DropdownModule } from '../dropdown/dropdown.module';

import { ActionBarComponent } from './action-bar.component';
import { ActionBarTitleComponent } from './action-bar-title.component';

@NgModule({
    declarations: [ActionBarComponent, ActionBarTitleComponent],
    imports: [CommonModule, ButtonModule, IconModule, DropdownModule],
    exports: [ActionBarComponent, ActionBarTitleComponent]
})
export class ActionBarModule {}
