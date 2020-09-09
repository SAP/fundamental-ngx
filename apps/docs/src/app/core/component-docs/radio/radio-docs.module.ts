import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { RadioHeaderComponent } from './radio-header/radio-header.component';
import { RadioDocsComponent } from './radio-docs.component';
import { FormModule, RadioModule } from '@fundamental-ngx/core';
import { examples } from './examples';

const routes: Routes = [
    {
        path: '',
        component: RadioHeaderComponent,
        children: [
            {path: '', component: RadioDocsComponent},
            {path: 'api', component: ApiComponent, data: {content: API_FILES.form}}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        RadioModule,
        FormModule,
    ],
    exports: [RouterModule],
    declarations: [
        examples,
        RadioDocsComponent,
        RadioHeaderComponent
    ]
})
export class RadioDocsModule {
}
