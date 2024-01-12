import { EventEmitter, QueryList } from '@angular/core';
import { DynamicPage } from '@fundamental-ngx/core/dynamic-page';
import { IconTabBarTabComponent } from '@fundamental-ngx/platform/icon-tab-bar';
import { DynamicPageContentComponent } from './dynamic-page-content/dynamic-page-content.component';
import { DynamicPageFooterComponent } from './dynamic-page-footer/dynamic-page-footer.component';
import { DynamicPageHeaderComponent } from './dynamic-page-header/header/dynamic-page-header.component';
import { DynamicPageTitleComponent } from './dynamic-page-header/title/dynamic-page-title.component';
import { DynamicPageTabChangeEvent } from './dynamic-page.component';

export interface PlatformDynamicPage extends DynamicPage {
    stackContent: boolean;
    tabChange: EventEmitter<DynamicPageTabChangeEvent>;
    titleComponent: DynamicPageTitleComponent;
    headerComponent: DynamicPageHeaderComponent;
    footerComponent: DynamicPageFooterComponent;
    contentComponent: DynamicPageContentComponent;
    contentComponents: QueryList<DynamicPageContentComponent>;
    dynamicPageTabs: QueryList<IconTabBarTabComponent>;

    /**
     * marks the dynamic page tab as selected when the id of the tab is passed
     */
    setSelectedTab(id: string): void;
}
