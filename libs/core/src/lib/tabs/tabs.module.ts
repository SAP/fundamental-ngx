import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabPanelComponent } from './tab/tab-panel.component';
import { TabListComponent } from './tab-list.component';

import {
    TabCountDirective,
    TabCounterHeaderDirective,
    TabHeaderDirective,
    TabIconDirective,
    TabLabelDirective,
    TabLoadTitleDirective,
    TabProcessDirective,
    TabProcessIconDirective,
    TabSeparatorDirective,
    TabTagDirective,
    TabTitleDirective
} from './tab-utils/tab-directives';
import { TabNavComponent } from './tab-nav/tab-nav.component';
import { TabLinkDirective } from './tab-link/tab-link.directive';
import { TabItemDirective } from './tab-item/tab-item.directive';

@NgModule({
    declarations: [
        TabListComponent,
        TabPanelComponent,
        TabTitleDirective,
        TabLoadTitleDirective,
        TabNavComponent,
        TabLinkDirective,
        TabItemDirective,
        TabTagDirective,
        TabIconDirective,
        TabCountDirective,
        TabLabelDirective,
        TabProcessDirective,
        TabHeaderDirective,
        TabCounterHeaderDirective,
        TabProcessIconDirective,
        TabSeparatorDirective
    ],
    imports: [CommonModule],
    exports: [
        TabListComponent,
        TabPanelComponent,
        TabTitleDirective,
        TabLoadTitleDirective,
        TabNavComponent,
        TabItemDirective,
        TabLinkDirective,
        TabTagDirective,
        TabIconDirective,
        TabCountDirective,
        TabLabelDirective,
        TabProcessDirective,
        TabHeaderDirective,
        TabCounterHeaderDirective,
        TabProcessIconDirective,
        TabSeparatorDirective
    ]
})
export class TabsModule {}
