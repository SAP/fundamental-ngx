import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { ObjectPageDocsHeaderComponent } from './object-page-header/object-page-docs-header.component';
import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { BarModule } from '@fundamental-ngx/core/bar';
import { DeprecatedDynamicPageCompactDirective, DynamicPageModule } from '@fundamental-ngx/core/dynamic-page';
import { FacetModule } from '@fundamental-ngx/core/facets';
import { TextModule } from '@fundamental-ngx/core/text';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { ObjectNumberModule } from '@fundamental-ngx/core/object-number';
import { RatingIndicatorModule } from '@fundamental-ngx/core/rating-indicator';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import { moduleDeprecationsProvider } from '@fundamental-ngx/core/utils';
import { ObjectPageDocsComponent } from './object-page-docs.component';
import { ObjectPageExampleComponent } from './object-page-examples/object-page-example.component';

const routes: Routes = [
    {
        path: '',
        component: ObjectPageDocsHeaderComponent,
        children: [
            { path: '', component: ObjectPageDocsComponent },
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
        DynamicPageModule,
        FacetModule,
        TextModule,
        RatingIndicatorModule,
        AvatarModule,
        ObjectNumberModule,
        ObjectStatusModule,
        CdkScrollableModule
    ],
    exports: [RouterModule],
    declarations: [ObjectPageDocsComponent, ObjectPageDocsHeaderComponent, ObjectPageExampleComponent],
    providers: [moduleDeprecationsProvider(DeprecatedDynamicPageCompactDirective)]
})
export class ObjectPageDocsModule {}
