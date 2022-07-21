import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { RouterModule, Routes } from '@angular/router';

import { BarModule } from '@fundamental-ngx/core/bar';
import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';
import { FlexibleColumnLayoutModule } from '@fundamental-ngx/core/flexible-column-layout';
import { InlineHelpModule } from '@fundamental-ngx/core/inline-help';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { DynamicPageModule } from '@fundamental-ngx/core/dynamic-page';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PlatformDynamicPageModule } from '@fundamental-ngx/platform/dynamic-page';

import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { PlatformDynamicPageDocsComponent } from './platform-dynamic-page-docs.component';
import { PlatformDynamicPageExampleComponent } from './platform-dynamic-page-examples/platform-dynamic-page-example.component';
import { PlatformDynamicPageFlexibleColumnExampleComponent } from './platform-dynamic-page-examples/platform-dynamic-page-flexible-column-example.component';
import { PlatformDynamicPageNonCollapsibleExampleComponent } from './platform-dynamic-page-examples/platform-dynamic-page-non-collapsible-example.component';
import { PlatformDynamicPageResponsivePaddingExampleComponent } from './platform-dynamic-page-examples/platform-dynamic-page-responsive-padding-example.component';
import { PlatformDynamicPageSnapScrollExampleComponent } from './platform-dynamic-page-examples/platform-dynamic-page-snap-scroll-example.component';
import { PlatformDynamicPageTabbedExampleComponent } from './platform-dynamic-page-examples/platform-dynamic-page-tabbed-example.component';
import { PlatformDynamicPageHeaderComponent } from './platform-dynamic-page-header/platform-dynamic-page-header.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformDynamicPageHeaderComponent,
        children: [
            { path: '', component: PlatformDynamicPageDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.dynamicPage } }
        ]
    }
];

@NgModule({
    imports: [
        ScrollingModule,
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        PlatformDynamicPageModule,
        BreadcrumbModule,
        ToolbarModule,
        PlatformButtonModule,
        BarModule,
        FlexibleColumnLayoutModule,
        DynamicPageModule,
        InlineHelpModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformDynamicPageDocsComponent,
        PlatformDynamicPageHeaderComponent,
        PlatformDynamicPageExampleComponent,
        PlatformDynamicPageSnapScrollExampleComponent,
        PlatformDynamicPageTabbedExampleComponent,
        PlatformDynamicPageResponsivePaddingExampleComponent,
        PlatformDynamicPageNonCollapsibleExampleComponent,
        PlatformDynamicPageFlexibleColumnExampleComponent
    ]
})
export class PlatformDynamicPageDocsModule {}
