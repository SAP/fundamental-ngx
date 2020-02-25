import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApiComponent} from '../../../documentation/core-helpers/api/api.component';
import {SharedDocumentationModule} from '../../../documentation/shared-documentation.module';
import {API_FILES} from '../../api-files';
import {InputGroupHeaderComponent} from './input-group-header/input-group-header.component';
import {InputGroupDocsComponent} from './input-group-docs.component';
import {InputGroupFormExampleComponent} from './examples/input-group-form-example.component';
import {
    InputGroupButtonExampleComponent,
    InputGroupComplexExampleComponent,
    InputGroupIconExampleComponent,
    InputGroupTextCompactExampleComponent,
    InputGroupTextExampleComponent
} from './examples/input-group-examples.component';
import {InputGroupStatesExampleComponent} from './examples/input-group-states-example/input-group-states-example.component';
import {InputGroupSearchExampleComponent} from './examples/input-group-search-example/input-group-search-example.component';
import {InputGroupNumberExampleComponent} from './examples/input-group-number-example/input-group-number-example.component';
import { InputGroupModule } from '@fundamental-ngx/core';

const routes: Routes = [
    {
        path: '',
        component: InputGroupHeaderComponent,
        children: [
            { path: '', component: InputGroupDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.inputGroup } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationModule,
        InputGroupModule
    ],
    exports: [RouterModule],
    declarations: [
        InputGroupDocsComponent,
        InputGroupHeaderComponent,
        InputGroupFormExampleComponent,
        InputGroupIconExampleComponent,
        InputGroupTextExampleComponent,
        InputGroupButtonExampleComponent,
        InputGroupStatesExampleComponent,
        InputGroupSearchExampleComponent,
        InputGroupNumberExampleComponent,
        InputGroupComplexExampleComponent,
        InputGroupTextCompactExampleComponent
    ]
})
export class InputGroupDocsModules {
}
