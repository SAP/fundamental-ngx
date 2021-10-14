import 'focus-visible';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tab/tab.component';
import { TabTitleComponent } from './tab-title/tab-title.component';
import { TabContentComponent } from './tab-content/tab-content.component';
import { TabItemDirective } from './tab-item.directive';

@NgModule({
    declarations: [TabsComponent, TabComponent, TabTitleComponent, TabContentComponent, TabItemDirective],
    imports: [CommonModule],
    exports: [TabsComponent, TabComponent, TabTitleComponent, TabContentComponent, TabItemDirective]
})
export class ExperimentalTabsModule {}
