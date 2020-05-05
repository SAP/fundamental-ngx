import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { API_FILES } from '../../api-files';
import { SelectHeaderComponent } from './select-header/select-header.component';
import { SelectDocsComponent } from './select-docs.component';
import { SelectFormsComponent } from './examples/select-forms/select-forms.component';
import { SelectNestedOptionsComponent } from './examples/select-nested-options/select-nested-options.component';
import { SelectAddingExampleComponent } from './examples/select-adding-example/select-adding-example.component';
import { SelectCustomTriggerComponent } from './examples/select-custom-trigger/select-custom-trigger.component';
import { SelectMaxHeightExampleComponent } from './examples/select-height/select-max-height-example.component';
import { SelectProgrammaticExampleComponent } from './examples/select-programmatic-example/select-programmatic-example.component';
import { DialogModule, FormModule, ListModule, SelectModule } from '@fundamental-ngx/core';
import { SelectSemanticStateExampleComponent } from './examples/select-semantic-state-example/select-semantic-state-example.component';
import { SelectModeExampleComponent } from './examples/select-mode-example/select-mode-example.component';
import { SelectMobileExampleComponent } from './examples/select-mobile-example/select-mobile-example.component';

const routes: Routes = [
    {
        path: '',
        component: SelectHeaderComponent,
        children: [
            { path: '', component: SelectDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.select } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationModule,
        SelectModule,
        DialogModule,
        ListModule,
        FormModule
    ],
    exports: [RouterModule],
    declarations: [
        SelectDocsComponent,
        SelectFormsComponent,
        SelectHeaderComponent,
        SelectModeExampleComponent,
        SelectNestedOptionsComponent,
        SelectMobileExampleComponent,
        SelectAddingExampleComponent,
        SelectCustomTriggerComponent,
        SelectMaxHeightExampleComponent,
        SelectProgrammaticExampleComponent,
        SelectSemanticStateExampleComponent
    ]
})
export class SelectDocsModules {}
