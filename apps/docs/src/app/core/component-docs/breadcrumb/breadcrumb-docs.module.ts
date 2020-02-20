import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApiComponent} from '../../../documentation/core-helpers/api/api.component';
import {API_FILES} from '../../api-files';
import {SharedDocumentationModule} from '../../../documentation/shared-documentation.module';
import {
    BreadcrumbHrefExampleComponent,
    BreadcrumbResponsiveExampleComponent,
    BreadcrumbRouterLinkExampleComponent
} from './examples/breadcrumb-examples.component';
import {BreadcrumbHeaderComponent} from './breadcrumb-header/breadcrumb-header.component';
import {BreadcrumbDocsComponent} from './breadcrumb-docs.component';

const routes: Routes = [
    {
        path: '',
        component: BreadcrumbHeaderComponent,
        children: [
            {path: '', component: BreadcrumbDocsComponent},
            {path: 'api', component: ApiComponent, data: {content: API_FILES.breadcrumb}}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationModule
    ],
    exports: [RouterModule],
    declarations: [
        BreadcrumbDocsComponent,
        BreadcrumbHeaderComponent,
        BreadcrumbHrefExampleComponent,
        BreadcrumbRouterLinkExampleComponent,
        BreadcrumbResponsiveExampleComponent
    ],
})
export class BreadcrumbDocsModule {
}
