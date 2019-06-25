import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabPanelComponent } from './tab/tab-panel.component';
import { TabListComponent } from './tab-list.component';

import { TabLoadTitleDirective, TabTitleDirective } from './tab-utils/tab-directives';
import { TabNavDirective } from './tab-nav/tab-nav.directive';
import { TabLinkDirective } from './tab-link/tab-link.directive';
import { TabItemDirective } from './tab-item/tab-item.directive';

@NgModule({
    declarations: [
        TabListComponent,
        TabPanelComponent,
        TabTitleDirective,
        TabLoadTitleDirective,
        TabNavDirective,
        TabLinkDirective,
        TabItemDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        TabListComponent,
        TabPanelComponent,
        TabTitleDirective,
        TabNavDirective,
        TabItemDirective,
        TabLinkDirective
    ]
})
export class TabsModule {}
