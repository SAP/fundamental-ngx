import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TabsModule } from '@fundamental-ngx/core';

import { PlatformButtonModule } from '../button/button.module';
import { DynamicPageContentComponent } from './dynamic-page-content/dynamic-page-content.component';
import { DynamicPageContentHostComponent } from './dynamic-page-content/dynamic-page-content-host.component';
import { DynamicPageFooterComponent } from './dynamic-page-footer/dynamic-page-footer.component';
import { DynamicPageGlobalActionsComponent } from './dynamic-page-header/actions/global-actions/dynamic-page-global-actions.component';
import { DynamicPageLayoutActionsComponent } from './dynamic-page-header/actions/layout-actions/dynamic-page-layout-actions.component';
import { DynamicPageHeaderComponent } from './dynamic-page-header/header/dynamic-page-header.component';
import { DynamicPageHeaderInternalComponent } from './dynamic-page-header/header/dynamic-page-header-internal.component';
import { DynamicPageKeyInfoComponent } from './dynamic-page-header/key-info/dynamic-page-key-info.component';
import { DynamicPageTitleComponent } from './dynamic-page-header/title/dynamic-page-title.component';
import { DynamicPageTitleHostComponent } from './dynamic-page-header/title/dynamic-page-title-host.component';
import { DynamicPageComponent } from './dynamic-page.component';

@NgModule({
    declarations: [
        DynamicPageComponent,
        DynamicPageTitleComponent,
        DynamicPageTitleHostComponent,
        DynamicPageKeyInfoComponent,
        DynamicPageGlobalActionsComponent,
        DynamicPageLayoutActionsComponent,
        DynamicPageHeaderComponent,
        DynamicPageHeaderInternalComponent,
        DynamicPageContentComponent,
        DynamicPageContentHostComponent,
        DynamicPageFooterComponent
    ],
    imports: [CommonModule, TabsModule, PlatformButtonModule],
    exports: [
        DynamicPageComponent,
        DynamicPageTitleComponent,
        DynamicPageKeyInfoComponent,
        DynamicPageGlobalActionsComponent,
        DynamicPageLayoutActionsComponent,
        DynamicPageHeaderComponent,
        DynamicPageContentComponent,
        DynamicPageFooterComponent
    ]
})
export class PlatformDynamicPageModule {}
