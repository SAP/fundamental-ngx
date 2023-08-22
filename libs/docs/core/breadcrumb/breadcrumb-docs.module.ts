import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import {
    BreadcrumbHrefExampleComponent,
    BreadcrumbRouterLinkExampleComponent
} from './examples/breadcrumb-examples.component';
import { BreadcrumbHeaderComponent } from './breadcrumb-header/breadcrumb-header.component';
import { BreadcrumbDocsComponent } from './breadcrumb-docs.component';
import { BreadcrumbModule } from '@fundamental-ngx/core/breadcrumb';

const routes: Routes = [
    {
        path: '',
        component: BreadcrumbHeaderComponent,
        children: [
            { path: '', component: BreadcrumbDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.breadcrumb } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        BreadcrumbModule,
        BreadcrumbDocsComponent,
        BreadcrumbHeaderComponent,
        BreadcrumbHrefExampleComponent,
        BreadcrumbRouterLinkExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('breadcrumb')]
})
export class BreadcrumbDocsModule {}
