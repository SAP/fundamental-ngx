import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApiComponent} from '../../../documentation/core-helpers/api/api.component';
import {SharedDocumentationModule} from '../../../documentation/shared-documentation.module';
import {API_FILES} from '../../api-files';
import {LinkHeaderComponent} from './link-header/link-header.component';
import {LinkDocsComponent} from './link-docs.component';
import {LinkExampleComponent} from './examples/link-example.component';

const routes: Routes = [
    {
        path: '',
        component: LinkHeaderComponent,
        children: [
            { path: '', component: LinkDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.link } }
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
        LinkDocsComponent,
        LinkHeaderComponent,
        LinkExampleComponent
    ]
})
export class LinkDocsModule {
}
