import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import {
    BreadcrumbHrefExampleComponent,
    BreadcrumbResponsiveExampleComponent,
    BreadcrumbRouterLinkExampleComponent
} from './examples/breadcrumb-examples.component';
import { BreadcrumbHeaderComponent } from './breadcrumb-header/breadcrumb-header.component';
import { BreadcrumbDocsComponent } from './breadcrumb-docs.component';
import { BreadcrumbModule, DeprecatedBreadcrumbsCompactDirective } from '@fundamental-ngx/core/breadcrumb';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { moduleDeprecationsProvider } from '@fundamental-ngx/core/utils';

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
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, BreadcrumbModule],
    exports: [RouterModule],
    declarations: [
        BreadcrumbDocsComponent,
        BreadcrumbHeaderComponent,
        BreadcrumbHrefExampleComponent,
        BreadcrumbRouterLinkExampleComponent,
        BreadcrumbResponsiveExampleComponent
    ],
    providers: [moduleDeprecationsProvider(DeprecatedBreadcrumbsCompactDirective)]
})
export class BreadcrumbDocsModule {}
