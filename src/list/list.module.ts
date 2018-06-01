import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { List, ListItem, ListAction, ListCheckbox } from './list';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
@NgModule({
  declarations: [List, ListItem, ListAction, ListCheckbox],
  imports: [CommonModule, ButtonModule, IconModule],
  exports: [List, ListItem, ListAction, ListCheckbox]
})
export class ListModule {}
