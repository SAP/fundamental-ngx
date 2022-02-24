import 'focus-visible';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tab/tab.component';
import { TabItemDirective } from './tab-item.directive';
import { ButtonModule } from '@fundamental-ngx/fn/button';

@NgModule({
    declarations: [TabsComponent, TabComponent, TabItemDirective],
    imports: [CommonModule, ButtonModule],
    exports: [TabsComponent, TabComponent, TabItemDirective]
})
export class TabsModule {}
