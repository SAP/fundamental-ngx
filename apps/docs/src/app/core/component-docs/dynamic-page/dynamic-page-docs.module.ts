import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { DynamicPageDocsComponent } from './dynamic-page-docs.component';
import { DynamicPageExampleComponent } from './dynamic-page-examples/dynamic-page-example.component';
import { DynamicPageDocsHeaderComponent } from './dynamic-page-header/dynamic-page-docs-header.component';
import { DynamicPageTabsExampleComponent } from './dynamic-page-examples/dynamic-page-tabs-example/dynamic-page-tabs-example.component';
import { DynamicPageColumnLayoutExampleComponent } from './dynamic-page-examples/dynamic-page-column-layout-example/dynamic-page-column-layout-example.component';
import { DynamicPageResponsiveExampleComponent } from './dynamic-page-examples/dynamic-page-responsive-example/dynamic-page-responsive-example.component';
import { DynamicPageFacetsExampleComponent } from './dynamic-page-examples/dynamic-page-facets-example/dynamic-page-facets-example.component';
import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { BarModule } from '@fundamental-ngx/core/bar';
import { FlexibleColumnLayoutModule } from '@fundamental-ngx/core/flexible-column-layout';
import { DeprecatedDynamicPageCompactDirective, DynamicPageModule } from '@fundamental-ngx/core/dynamic-page';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { FacetModule } from '@fundamental-ngx/core/facets';
import { TextModule } from '@fundamental-ngx/core/text';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { ObjectNumberModule } from '@fundamental-ngx/core/object-number';
import { RatingIndicatorModule } from '@fundamental-ngx/core/rating-indicator';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import { DynamicPageDynamicContainerHeightExampleComponent } from './dynamic-page-examples/dynamic-page-dynamic-container-height-example/dynamic-page-dynamic-container-height-example.component';
import { moduleDeprecationsProvider } from '@fundamental-ngx/core/utils';

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
        ObjectStatusModule
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
    providers: [moduleDeprecationsProvider(DeprecatedDynamicPageCompactDirective)]
})
export class DynamicPageDocsModule {}
