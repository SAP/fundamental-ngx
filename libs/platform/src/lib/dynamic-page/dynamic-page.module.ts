import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TabsModule } from '@fundamental-ngx/core/tabs';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { DynamicPageModule } from '@fundamental-ngx/core/dynamic-page';
import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';

import { DynamicPageContentComponent } from './dynamic-page-content/dynamic-page-content.component';
import { DynamicPageContentHostComponent } from './dynamic-page-content/dynamic-page-content-host.component';
import { DynamicPageFooterComponent } from './dynamic-page-footer/dynamic-page-footer.component';
import { DynamicPageGlobalActionsComponent } from './dynamic-page-header/actions/global-actions/dynamic-page-global-actions.component';
import { DynamicPageLayoutActionsComponent } from './dynamic-page-header/actions/layout-actions/dynamic-page-layout-actions.component';
import { DynamicPageHeaderComponent } from './dynamic-page-header/header/dynamic-page-header.component';
import { DynamicPageKeyInfoComponent } from './dynamic-page-header/key-info/dynamic-page-key-info.component';
import { DynamicPageTitleComponent } from './dynamic-page-header/title/dynamic-page-title.component';
import { DynamicPageTitleImageComponent } from './dynamic-page-header/title/dynamic-page-title-image.component';
import { DynamicPageComponent } from './dynamic-page.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FacetModule } from '@fundamental-ngx/core/facets';

@NgModule({
    declarations: [
        DynamicPageComponent,
        DynamicPageTitleComponent,
        DynamicPageKeyInfoComponent,
        DynamicPageGlobalActionsComponent,
        DynamicPageLayoutActionsComponent,
        DynamicPageHeaderComponent,
        DynamicPageContentComponent,
        DynamicPageContentHostComponent,
        DynamicPageFooterComponent,
        DynamicPageTitleImageComponent
    ],
    imports: [
        CommonModule,
        TabsModule,
        DynamicPageModule,
        PlatformButtonModule,
        BreadcrumbModule,
        ScrollingModule,
        FacetModule
    ],
    exports: [
        DynamicPageComponent,
        DynamicPageTitleComponent,
        DynamicPageKeyInfoComponent,
        DynamicPageGlobalActionsComponent,
        DynamicPageLayoutActionsComponent,
        DynamicPageHeaderComponent,
        DynamicPageContentComponent,
        DynamicPageFooterComponent,
        DynamicPageTitleImageComponent
    ]
})
export class PlatformDynamicPageModule {}
