import { NgModule } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { RouterModule, Routes } from '@angular/router';

import { BarModule } from '@fundamental-ngx/core/bar';
import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';
import { FlexibleColumnLayoutModule } from '@fundamental-ngx/core/flexible-column-layout';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { DynamicPageModule } from '@fundamental-ngx/core/dynamic-page';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PlatformDynamicPageModule } from '@fundamental-ngx/platform/dynamic-page';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { FacetModule } from '@fundamental-ngx/core/facets';
import { TextModule } from '@fundamental-ngx/core/text';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import { RatingIndicatorModule } from '@fundamental-ngx/core/rating-indicator';
import { ObjectNumberModule } from '@fundamental-ngx/core/object-number';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';

import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { PlatformDynamicPageDocsComponent } from './platform-dynamic-page-docs.component';
import { PlatformDynamicPageExampleComponent } from './examples/platform-dynamic-page-example.component';
import { PlatformDynamicPageFlexibleColumnExampleComponent } from './examples/platform-dynamic-page-flexible-column-example.component';
import { PlatformDynamicPageNonCollapsibleExampleComponent } from './examples/platform-dynamic-page-non-collapsible-example.component';
import { PlatformDynamicPageResponsivePaddingExampleComponent } from './examples/platform-dynamic-page-responsive-padding-example.component';
import { PlatformDynamicPageSnapScrollExampleComponent } from './examples/platform-dynamic-page-snap-scroll-example.component';
import { PlatformDynamicPageTabbedExampleComponent } from './examples/platform-dynamic-page-tabbed-example.component';
import { PlatformDynamicPageHeaderComponent } from './platform-dynamic-page-header/platform-dynamic-page-header.component';
import { PlatformDynamicPageFacetsExampleComponent } from './examples/platform-dynamic-page-facets-example/platform-dynamic-page-facets-example.component';

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
        AvatarModule,
        FacetModule,
        TextModule,
        ObjectStatusModule,
        RatingIndicatorModule,
        ObjectNumberModule,
        SkeletonModule
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
        PlatformDynamicPageFlexibleColumnExampleComponent,
        PlatformDynamicPageFacetsExampleComponent
    ],
    providers: [currentComponentProvider('dynamic-page')]
})
export class PlatformDynamicPageDocsModule {}
