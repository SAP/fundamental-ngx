import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabPanelComponent } from './tab/tab.component';
import { TabListComponent } from './tab-list.component';

import { UtilsModule } from '../utils/utils.module';
import { TabLabelDirective } from './tab-directives';

@NgModule({
    declarations: [TabListComponent, TabPanelComponent, TabLabelDirective],
    imports: [CommonModule, UtilsModule],
    exports: [TabListComponent, TabPanelComponent]
})
export class TabsModule {}
