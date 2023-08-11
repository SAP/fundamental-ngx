import { CdkScrollableModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';

import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ObjectPageDocsHeaderComponent } from './object-page-header/object-page-docs-header.component';
import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { BarModule } from '@fundamental-ngx/core/bar';
import { DynamicPageModule } from '@fundamental-ngx/core/dynamic-page';
import { FacetModule } from '@fundamental-ngx/core/facets';
import { TextModule } from '@fundamental-ngx/core/text';
import { AvatarModule } from '@fundamental-ngx/core/avatar';
import { ObjectNumberModule } from '@fundamental-ngx/core/object-number';
import { RatingIndicatorModule } from '@fundamental-ngx/core/rating-indicator';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import { ObjectPageDocsComponent } from './object-page-docs.component';
import { ObjectPageExampleComponent } from './examples/object-page-example.component';

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
    providers: [currentComponentProvider('object-page')]
})
export class ObjectPageDocsModule {}
