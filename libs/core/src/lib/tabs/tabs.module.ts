import { NgModule } from '@angular/core';

import { TabListComponent } from './tab-list.component';
import { TabPanelComponent } from './tab-panel/tab-panel.component';

import { TabItemDirective } from './tab-item/tab-item.directive';
import { TabLinkDirective } from './tab-link/tab-link.directive';
import { TabNavComponent } from './tab-nav/tab-nav.component';
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

const components = [
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
];

@NgModule({
    imports: [...components],
    exports: [...components]
})
export class TabsModule {}
