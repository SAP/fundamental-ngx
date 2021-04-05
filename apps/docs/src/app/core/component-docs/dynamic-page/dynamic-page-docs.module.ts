import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    BarModule,
    BreadcrumbModule,
    DynamicPageModule,
    FlexibleColumnLayoutModule,
    ToolbarModule,
    SegmentedButtonModule
} from '@fundamental-ngx/core';

import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { DynamicPageDocsComponent } from './dynamic-page-docs.component';
import { DynamicPageExampleComponent } from './dynamic-page-examples/dynamic-page-example.component';
import { DynamicPageDocsHeaderComponent } from './dynamic-page-header/dynamic-page-docs-header.component';
import { DynamicPageTabsExampleComponent } from './dynamic-page-examples/dynamic-page-tabs-example/dynamic-page-tabs-example.component';
import { DynamicPageColumnLayoutExampleComponent } from './dynamic-page-examples/dynamic-page-column-layout-example/dynamic-page-column-layout-example.component';
import { DynamicPageResponsiveExampleComponent } from './dynamic-page-examples/dynamic-page-responsive-example/dynamic-page-responsive-example.component';

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
        SegmentedButtonModule
    ],
    exports: [RouterModule],
    declarations: [
        DynamicPageDocsComponent,
        DynamicPageDocsHeaderComponent,
        DynamicPageExampleComponent,
        DynamicPageTabsExampleComponent,
        DynamicPageColumnLayoutExampleComponent,
        DynamicPageResponsiveExampleComponent,
    ]
})
export class DynamicPageDocsModule { }
