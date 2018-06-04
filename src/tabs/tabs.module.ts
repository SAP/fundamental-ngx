import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabPanelComponent } from './tabs.component';
import { TabListComponent } from './tab-list.component';

import { UtilsModule } from '../utils/utils.module';

@NgModule({
    declarations: [TabListComponent, TabPanelComponent],
    imports: [CommonModule, UtilsModule],
    exports: [TabListComponent, TabPanelComponent]
})
export class TabsModule {}
