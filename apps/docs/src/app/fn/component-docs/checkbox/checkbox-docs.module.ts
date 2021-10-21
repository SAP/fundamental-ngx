import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { CheckboxHeaderComponent } from './checkbox-header/checkbox-header.component';
import { CheckboxDocsComponent } from './checkbox-docs.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { examples } from './examples';
import { ExperimentalFormModule } from '@fundamental-ngx/fn/form';
import { ExperimentalCheckboxModule } from '@fundamental-ngx/fn/checkbox';

const routes: Routes = [
    {
        path: '',
        component: CheckboxHeaderComponent,
        children: [
            { path: '', component: CheckboxDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.checkbox } }
        ]
    }
];

@NgModule({
    imports: [
        ExperimentalFormModule,
        ExperimentalCheckboxModule,
        RouterModule.forChild(routes),
        SharedDocumentationPageModule
    ],
    exports: [RouterModule],
    declarations: [examples, CheckboxDocsComponent, CheckboxHeaderComponent]
})
export class CheckboxDocsModule {}
