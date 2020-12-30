import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabPanelComponent } from './tab-panel/tab-panel.component';
import { TabListComponent } from './tab-list.component';

import {
    TabCountDirective,
    TabCounterHeaderDirective,
    TabHeaderDirective,
    TabIconComponent,
    TabLabelDirective,
    TabProcessDirective,
    TabProcessIconDirective,
    TabSeparatorDirective,
    TabTagDirective,
    TabTitleDirective
} from './tab-utils/tab-directives';
import { TabNavComponent } from './tab-nav/tab-nav.component';
import { TabLinkDirective } from './tab-link/tab-link.directive';
import { TabItemDirective } from './tab-item/tab-item.directive';
import { IconModule } from '../icon/icon.module';
import { ButtonModule } from '../button/button.module';
import { ListModule } from '../list/list.module';
import { PopoverModule } from '../popover/popover.module';
import { MenuModule } from '../menu/menu.module';
import { ScrollSpyModule } from '../scroll-spy/scroll-spy.module';
import { TabItemExpandComponent } from './tab-item-expand/tab-item-expand.component';

@NgModule({
    declarations: [
        TabListComponent,
        TabPanelComponent,
        TabTitleDirective,
        TabNavComponent,
        TabLinkDirective,
        TabItemDirective,
        TabTagDirective,
        TabIconComponent,
        TabCountDirective,
        TabLabelDirective,
        TabProcessDirective,
        TabHeaderDirective,
        TabItemExpandComponent,
        TabCounterHeaderDirective,
        TabProcessIconDirective,
        TabSeparatorDirective,
    ],
    imports: [CommonModule, IconModule, PopoverModule, ListModule, ButtonModule, MenuModule, ScrollSpyModule],
    exports: [
        TabListComponent,
        TabPanelComponent,
        TabTitleDirective,
        TabNavComponent,
        TabItemDirective,
        TabLinkDirective,
        TabTagDirective,
        TabIconComponent,
        TabCountDirective,
        TabLabelDirective,
        TabProcessDirective,
        TabHeaderDirective,
        TabCounterHeaderDirective,
        TabProcessIconDirective,
        TabSeparatorDirective
    ]
})
export class TabsModule {
}
