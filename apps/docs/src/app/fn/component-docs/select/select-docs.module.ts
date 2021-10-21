import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { SelectHeaderComponent } from './select-header/select-header.component';
import { SelectDocsComponent } from './select-docs.component';
import { examples } from './examples';
import { ExperimentalSelectModule } from '@fundamental-ngx/fn/select';
import { FormModule } from '@fundamental-ngx/core';

const routes: Routes = [
    {
        path: '',
        component: SelectHeaderComponent,
        children: [
            {
                path: '',
                component: SelectDocsComponent
            },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.select } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, ExperimentalSelectModule, FormModule],
    exports: [RouterModule],
    declarations: [examples, SelectHeaderComponent, SelectDocsComponent]
})
export class SelectDocsModule {}
