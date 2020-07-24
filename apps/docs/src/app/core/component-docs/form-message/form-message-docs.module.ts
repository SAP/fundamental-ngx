import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { API_FILES } from '../../api-files';
import { FormMessageHeaderComponent } from './form-message-header/form-message-header.component';
import { FormMessageDocsComponent } from './form-message-docs.component';
import {
    FormMessageExampleComponent,
} from './examples/form-message-example.component';
import { DatePickerModule, FormModule } from '@fundamental-ngx/core';

const routes: Routes = [
    {
        path: '',
        component: FormMessageHeaderComponent,
        children: [
            { path: '', component: FormMessageDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.form } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationModule, FormModule, DatePickerModule],
    exports: [RouterModule],
    declarations: [
        FormMessageDocsComponent,
        FormMessageHeaderComponent,
        FormMessageExampleComponent,
    ]
})
export class FormMessageDocsModule {}
