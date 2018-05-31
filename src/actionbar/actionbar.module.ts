import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { DropdownModule } from '../dropdown/dropdown.module';

import { ActionBar,  ActionBarTitle } from './actionbar';

@NgModule({
  declarations: [
    ActionBar,
    ActionBarTitle
  ],
  imports: [
    CommonModule,
    ButtonModule,
    IconModule,
    DropdownModule
  ],
  exports: [
    ActionBar,
    ActionBarTitle
  ]
})

export class ActionbarModule { }
