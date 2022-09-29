import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { OverflowLayoutModule } from '@fundamental-ngx/core/overflow-layout';
import { BaseWebComponentModule } from '@fundamental-ngx/core/web-components';

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
import { IconModule } from '@fundamental-ngx/core/icon';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ListModule } from '@fundamental-ngx/core/list';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { I18nModule } from '@fundamental-ngx/i18n';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { ScrollSpyModule } from '@fundamental-ngx/core/scroll-spy';
import { TabItemExpandComponent } from './tab-item-expand/tab-item-expand.component';
import { DeprecatedTabsCompactDirective } from './deprecated-tabs-compact.directive';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

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
        DeprecatedTabsCompactDirective
    ],
    imports: [
        CommonModule,
        IconModule,
        PopoverModule,
        ListModule,
        ButtonModule,
        MenuModule,
        ScrollSpyModule,
        ContentDensityModule,
        I18nModule,
        OverflowLayoutModule
    ],
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
        TabSeparatorDirective,
        DeprecatedTabsCompactDirective,
        ContentDensityModule
    ],
    providers: [
        {
            provide: 'TAB_INJECT_VARIABLE',
            useValue: 'It working'
        },
        {
            provide: 'SOMETHIUNG',
            useFactory: () => 'wow'
        }
    ]
})
export class TabsModule {}

@NgModule({
    imports: [BrowserModule, TabsModule],
    exports: [TabsModule]
})
export class FdWebComponentTabsModule extends BaseWebComponentModule {
    declarations = [TabListComponent, TabPanelComponent];

    constructor(private _injector: Injector) {
        super(_injector);
    }
}
