import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApiComponent} from '../../../documentation/core-helpers/api/api.component';
import {SharedDocumentationModule} from '../../../documentation/shared-documentation.module';
import {API_FILES} from '../../api-files';
import {PaginationHeaderComponent} from './pagination-header/pagination-header.component';
import {PaginationDocsComponent} from './pagination-docs.component';
import {PaginationExampleComponent} from './examples/pagination-example.component';
import { PaginationModule } from '@fundamental-ngx/core';

const routes: Routes = [
    {
        path: '',
        component: PaginationHeaderComponent,
        children: [
            { path: '', component: PaginationDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.pagination } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationModule,
        PaginationModule
    ],
    exports: [RouterModule],
    declarations: [
        PaginationDocsComponent,
        PaginationHeaderComponent,
        PaginationExampleComponent
    ],
})
export class PaginationDocsModule {
}
