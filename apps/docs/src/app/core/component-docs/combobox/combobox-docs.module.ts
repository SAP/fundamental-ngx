import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { ComboboxHeaderComponent } from './combobox-header/combobox-header.component';
import { ComboboxDocsComponent } from './combobox-docs.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { examples } from './examples';
import { ListModule } from '@fundamental-ngx/core/list';
import { FormModule } from '@fundamental-ngx/core/form';
import { ComboboxMobileModule, ComboboxModule } from '@fundamental-ngx/core/combobox';

const routes: Routes = [
    {
        path: '',
        component: ComboboxHeaderComponent,
        children: [
            {path: '', component: ComboboxDocsComponent},
            {path: 'api', component: ApiComponent, data: {content: API_FILES.combobox}}
        ]
    }
];

@NgModule({
    imports: [
        ListModule,
        FormModule,
        ComboboxModule,
        ComboboxMobileModule,
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
    ],
    exports: [RouterModule],
    declarations: [
        examples,
        ComboboxDocsComponent,
        ComboboxHeaderComponent,
    ]
})
export class ComboboxDocsModule { }
