import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TabsModule } from '@fundamental-ngx/core';

import { PlatformButtonModule } from '../button/public_api';
import { DynamicPageContentComponent } from './dynamic-page-content/dynamic-page-content.component';
import { DynamicPageTabbedContentComponent } from './dynamic-page-content/dynamic-page-tabbed-content.component';
import { DynamicPageFooterComponent } from './dynamic-page-footer/dynamic-page-footer.component';
import { DynamicPageGlobalActionsComponent } from './dynamic-page-header/actions/global-actions/dynamic-page-global-actions.component';
import { DynamicPageLayoutActionsComponent } from './dynamic-page-header/actions/layout-actions/dynamic-page-layout-actions.component';
import { DynamicPageHeaderComponent } from './dynamic-page-header/header/dynamic-page-header.component';
import { DynamicPageKeyInfoComponent } from './dynamic-page-header/key-info/dynamic-page-key-info.component';
import { DynamicPageTitleComponent } from './dynamic-page-header/title/dynamic-page-title.component';
import { DynamicPageComponent } from './dynamic-page.component';
import { DynamicPageSummarizedTitleComponent } from './dynamic-page-header/summarized-title/dynamic-page-summarized-title.component';

@NgModule({
    declarations: [
        DynamicPageComponent,
        DynamicPageTitleComponent,
        DynamicPageKeyInfoComponent,
        DynamicPageGlobalActionsComponent,
        DynamicPageLayoutActionsComponent,
        DynamicPageHeaderComponent,
        DynamicPageContentComponent,
        DynamicPageTabbedContentComponent,
        DynamicPageSummarizedTitleComponent,
        DynamicPageFooterComponent
    ],
    imports: [CommonModule, TabsModule, ScrollingModule, PlatformButtonModule],
    exports: [
        DynamicPageComponent,
        DynamicPageTitleComponent,
        DynamicPageKeyInfoComponent,
        DynamicPageGlobalActionsComponent,
        DynamicPageLayoutActionsComponent,
        DynamicPageHeaderComponent,
        DynamicPageContentComponent,
        DynamicPageTabbedContentComponent,
        DynamicPageSummarizedTitleComponent,
        DynamicPageFooterComponent
    ]
})
export class PlatformDynamicPageModule {}
