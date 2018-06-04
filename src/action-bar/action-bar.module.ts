import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { DropdownModule } from '../dropdown/dropdown.module';

import { ActionBarComponent, ActionBarTitle } from './action-bar.component';

@NgModule({
    declarations: [ActionBarComponent, ActionBarTitle],
    imports: [CommonModule, ButtonModule, IconModule, DropdownModule],
    exports: [ActionBarComponent, ActionBarTitle]
})
export class ActionBarModule {}
