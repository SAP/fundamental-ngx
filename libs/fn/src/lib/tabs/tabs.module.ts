import 'focus-visible';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tab/tab.component';
import { TabItemDirective } from './tab-item.directive';

@NgModule({
    declarations: [TabsComponent, TabComponent, TabItemDirective],
    imports: [CommonModule],
    exports: [TabsComponent, TabComponent, TabItemDirective]
})
export class ExperimentalTabsModule {}
