import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { API_FILES } from '../../api-files';
import { InputHeaderComponent } from './input-header/input-header.component';
import { InputDocsComponent } from './input-docs.component';
import { InputFormGroupExampleComponent } from './examples/input-form-group-example.component';
import {
    InputExampleComponent,
    InputInlineHelpExampleComponent,
    InputStateExampleComponent
} from './examples/input-examples.component';
import { FormModule } from '@fundamental-ngx/core';

const routes: Routes = [
    {
        path: '',
        component: InputHeaderComponent,
        children: [
            { path: '', component: InputDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.inputGroup } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationModule, FormModule],
    exports: [RouterModule],
    declarations: [
        InputDocsComponent,
        InputHeaderComponent,
        InputExampleComponent,
        InputStateExampleComponent,
        InputFormGroupExampleComponent,
        InputInlineHelpExampleComponent
    ]
})
export class InputDocsModule {}
