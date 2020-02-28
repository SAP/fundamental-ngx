import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApiComponent} from '../../../documentation/core-helpers/api/api.component';
import {SharedDocumentationModule} from '../../../documentation/shared-documentation.module';
import {API_FILES} from '../../api-files';
import {MultiInputHeaderComponent} from './multi-input-header/multi-input-header.component';
import {MultiInputDocsComponent} from './multi-input-docs.component';
import {MultiInputAsyncExampleComponent} from './examples/multi-input-async-example/multi-input-async-example.component';
import {MultiInputDisplaywithExampleComponent} from './examples/multi-input-displaywith-example/multi-input-displaywith-example.component';
import {MultiInputExampleComponent} from './examples/multi-input-example/multi-input-example.component';
import {MultiInputFilterExampleComponent} from './examples/multi-input-filter-example/multi-input-filter-example.component';
import {MultiInputFormExampleComponent} from './examples/multi-input-form-example/multi-input-form-example.component';
import {MultiInputCompactExampleComponent} from './examples/multi-input-compact-example/multi-input-compact-example.component';
import { MultiInputModule } from '@fundamental-ngx/core';

const routes: Routes = [
    {
        path: '',
        component: MultiInputHeaderComponent,
        children: [
            { path: '', component: MultiInputDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.multiInput } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationModule,
        MultiInputModule
    ],
    exports: [RouterModule],
    declarations: [
        MultiInputDocsComponent,
        MultiInputHeaderComponent,
        MultiInputExampleComponent,
        MultiInputFormExampleComponent,
        MultiInputAsyncExampleComponent,
        MultiInputFilterExampleComponent,
        MultiInputDisplaywithExampleComponent,
        MultiInputCompactExampleComponent
    ]
})
export class MultiInputDocsModule {
}
