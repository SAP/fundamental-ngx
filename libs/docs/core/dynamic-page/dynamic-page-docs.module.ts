import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InlineHelpModule } from '@fundamental-ngx/core/inline-help';

import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { DynamicPageDocsComponent } from './dynamic-page-docs.component';
import { DynamicPageExampleComponent } from './examples/dynamic-page-example.component';
import { DynamicPageDocsHeaderComponent } from './dynamic-page-header/dynamic-page-docs-header.component';
import { DynamicPageTabsExampleComponent } from './examples/dynamic-page-tabs-example/dynamic-page-tabs-example.component';
import { DynamicPageColumnLayoutExampleComponent } from './examples/dynamic-page-column-layout-example/dynamic-page-column-layout-example.component';
import { DynamicPageResponsiveExampleComponent } from './examples/dynamic-page-responsive-example/dynamic-page-responsive-example.component';
import { DynamicPageFacetsExampleComponent } from './examples/dynamic-page-facets-example/dynamic-page-facets-example.component';
import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { BarModule } from '@fundamental-ngx/core/bar';
import { FlexibleColumnLayoutModule } from '@fundamental-ngx/core/flexible-column-layout';
import { DynamicPageModule } from '@fundamental-ngx/core/dynamic-page';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { FacetModule } from '@fundamental-ngx/core/facets';
import { TextModule } from '@fundamental-ngx/core/text';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { ObjectNumberModule } from '@fundamental-ngx/core/object-number';
import { RatingIndicatorModule } from '@fundamental-ngx/core/rating-indicator';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import { DynamicPageDynamicContainerHeightExampleComponent } from './examples/dynamic-page-dynamic-container-height-example/dynamic-page-dynamic-container-height-example.component';

const routes: Routes = [
    {
        path: '',
        component: DynamicPageDocsHeaderComponent,
        children: [
            { path: '', component: DynamicPageDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.dynamicPage } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        BreadcrumbModule,
        ToolbarModule,
        BarModule,
        FlexibleColumnLayoutModule,
        DynamicPageModule,
        SegmentedButtonModule,
        FacetModule,
        TextModule,
        RatingIndicatorModule,
        AvatarModule,
        ObjectNumberModule,
        ObjectStatusModule,
        CdkScrollableModule,
        InlineHelpModule
    ],
    exports: [RouterModule],
    declarations: [
        DynamicPageDocsComponent,
        DynamicPageDocsHeaderComponent,
        DynamicPageExampleComponent,
        DynamicPageTabsExampleComponent,
        DynamicPageColumnLayoutExampleComponent,
        DynamicPageResponsiveExampleComponent,
        DynamicPageDynamicContainerHeightExampleComponent,
        DynamicPageFacetsExampleComponent
    ],
    providers: [currentComponentProvider('dynamic-page')]
})
export class DynamicPageDocsModule {}
