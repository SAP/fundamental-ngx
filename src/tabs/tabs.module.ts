import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabListComponent, TabPanelComponent } from './tabs';

import { UtilsModule } from '../utils/utils.module';

@NgModule({
  declarations: [TabListComponent, TabPanelComponent],
  imports: [CommonModule, UtilsModule],
  exports: [TabListComponent, TabPanelComponent]
})
export class TabsModule {}
