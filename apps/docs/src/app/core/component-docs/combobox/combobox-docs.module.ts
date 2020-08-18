import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { ComboboxHeaderComponent } from './combobox-header/combobox-header.component';
import { ComboboxDocsComponent } from './combobox-docs.component';
import { ComboboxAsyncExampleComponent } from './examples/combobox-async-example.component';
import { ComboboxDisplaywithExampleComponent } from './examples/combobox-displaywith-example.component';
import { ComboboxDynamicExampleComponent } from './examples/combobox-dynamic-example.component';
import { ComboboxSearchFunctionExampleComponent } from './examples/combobox-search-function-example.component';
import { ComboboxExampleComponent } from './examples/combobox-example.component';
import { ComboboxTemplateExampleComponent } from './examples/combobox-template-example.component';
import { ComboboxFormsExampleComponent } from './examples/combobox-forms-example.component';
import { ComboboxDisabledExampleComponent } from './examples/combobox-disabled-example.component';
import { ComboboxHeightExampleComponent } from './examples/combobox-height-example.component';
import { ComboboxOpenControlExampleComponent } from './examples/combobox-open-control-example.component';
import { ComboboxColumnsExampleComponent } from './examples/combobox-columns-example.component';
import { ComboboxGroupExampleComponent } from './examples/combobox-group-example.component';
import { ComboboxMobileModule, ComboboxModule, FormModule } from '@fundamental-ngx/core';
import { ComboboxMobileExampleComponent } from './examples/combobox-mobile/combobox-mobile-example.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

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
        FormModule,
        ComboboxModule,
        ComboboxMobileModule,
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
    ],
    exports: [RouterModule],
    declarations: [
        ComboboxDocsComponent,
        ComboboxHeaderComponent,
        ComboboxExampleComponent,
        ComboboxAsyncExampleComponent,
        ComboboxFormsExampleComponent,
        ComboboxHeightExampleComponent,
        ComboboxDynamicExampleComponent,
        ComboboxTemplateExampleComponent,
        ComboboxDisabledExampleComponent,
        ComboboxDisplaywithExampleComponent,
        ComboboxOpenControlExampleComponent,
        ComboboxSearchFunctionExampleComponent,
        ComboboxColumnsExampleComponent,
        ComboboxGroupExampleComponent,
        ComboboxMobileExampleComponent
    ]
})
export class ComboboxDocsModule {
}
