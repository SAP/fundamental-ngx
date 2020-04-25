import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { API_FILES } from '../../api-files';
import { RadioHeaderComponent } from './radio-header/radio-header.component';
import { RadioDocsComponent } from './radio-docs.component';
import { RadioExamplesComponent } from './examples/radio-examples.component';
import { RadioFormGroupExampleComponent } from './examples/radio-form-group-example.component';
import { RadioModule } from '@fundamental-ngx/core';

const routes: Routes = [
    {
        path: '',
        component: RadioHeaderComponent,
        children: [
            { path: '', component: RadioDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.form } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationModule, RadioModule],
    exports: [RouterModule],
    declarations: [RadioDocsComponent, RadioHeaderComponent, RadioExamplesComponent, RadioFormGroupExampleComponent]
})
export class RadioDocsModule {}
