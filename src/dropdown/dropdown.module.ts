import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsModule } from '../utils/utils.module';
import {
  Dropdown,
  DropdownItem,
  DropdownGroup,
  DropdownControl,
  DropdownControlNoBorder,
  DropdownGroupHeader
} from './dropdown';

@NgModule({
  declarations: [Dropdown, DropdownItem, DropdownGroup, DropdownControl, DropdownControlNoBorder, DropdownGroupHeader],
  imports: [CommonModule, UtilsModule],
  exports: [Dropdown, DropdownItem, DropdownGroup, DropdownControl, DropdownControlNoBorder, DropdownGroupHeader]
})
export class DropdownModule {}
