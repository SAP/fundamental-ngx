import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { InputGroupHeaderComponent } from './input-group-header/input-group-header.component';
import { InputGroupDocsComponent } from './input-group-docs.component';
import { FormModule, InputGroupModule } from '@fundamental-ngx/core';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { examples } from './examples';

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
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, FormModule, InputGroupModule],
    exports: [RouterModule],
    declarations: [
        examples,
        InputGroupDocsComponent,
        InputGroupHeaderComponent
    ]
})
export class InputGroupDocsModules { }
