import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';

import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { BarModule } from '@fundamental-ngx/core/bar';
import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';
import { DynamicPageModule } from '@fundamental-ngx/core/dynamic-page';
import { FacetModule } from '@fundamental-ngx/core/facets';
import { ObjectNumberModule } from '@fundamental-ngx/core/object-number';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import { RatingIndicatorModule } from '@fundamental-ngx/core/rating-indicator';
import { TextModule } from '@fundamental-ngx/core/text';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ObjectPageExampleComponent } from './examples/object-page-example.component';
import { ObjectPageDocsComponent } from './object-page-docs.component';
import { ObjectPageDocsHeaderComponent } from './object-page-header/object-page-docs-header.component';

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
        CdkScrollableModule,
        ObjectPageDocsComponent,
        ObjectPageDocsHeaderComponent,
        ObjectPageExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('object-page')]
})
export class ObjectPageDocsModule {}
