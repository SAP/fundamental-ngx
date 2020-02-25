import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApiComponent} from '../../../documentation/core-helpers/api/api.component';
import {SharedDocumentationModule} from '../../../documentation/shared-documentation.module';
import {API_FILES} from '../../api-files';
import {ListHeaderComponent} from './list-header/list-header.component';
import {ListDocsComponent} from './list-docs.component';
import {ListSingleSelectExampleComponent} from './examples/list-single-select-example.component';
import {ListInfiniteScrollExampleComponent} from './examples/list-infinite-scroll-example.component';
import {
    ListActionsExampleComponent,
    ListCheckboxExampleComponent,
    ListExampleComponent
} from './examples/list-examples.component';
import {ListCheckboxFormExampleComponent} from './examples/list-checkbox-form-example.component';
import { CheckboxModule, InfiniteScrollModule, ListModule, RadioModule } from '@fundamental-ngx/core';

const routes: Routes = [
    {
        path: '',
        component: ListHeaderComponent,
        children: [
            {path: '', component: ListDocsComponent},
            {path: 'api', component: ApiComponent, data: {content: API_FILES.list}}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationModule,
        ListModule,
        CheckboxModule,
        RadioModule,
        InfiniteScrollModule
    ],
    exports: [RouterModule],
    declarations: [
        ListDocsComponent,
        ListHeaderComponent,
        ListExampleComponent,
        ListActionsExampleComponent,
        ListCheckboxExampleComponent,
        ListCheckboxFormExampleComponent,
        ListSingleSelectExampleComponent,
        ListInfiniteScrollExampleComponent
    ]
})
export class ListDocsModule {
}
