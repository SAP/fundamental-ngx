import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { RadioHeaderComponent } from './radio-header/radio-header.component';
import { RadioDocsComponent } from './radio-docs.component';
import { examples } from './examples';
import { RadioButtonModule } from '@fundamental-ngx/fn/radio';
import { FormModule } from '@fundamental-ngx/core/form';

const routes: Routes = [
    {
        path: '',
        component: RadioHeaderComponent,
        children: [
            { path: '', component: RadioDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.radio } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, RadioButtonModule, FormModule],
    exports: [RouterModule],
    declarations: [examples, RadioDocsComponent, RadioHeaderComponent]
})
export class RadioDocsModule {}
