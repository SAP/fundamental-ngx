import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApiComponent} from '../../../documentation/core-helpers/api/api.component';
import {SharedDocumentationModule} from '../../../documentation/shared-documentation.module';
import {API_FILES} from '../../api-files';
import {SelectHeaderComponent} from './select-header/select-header.component';
import {SelectDocsComponent} from './select-docs.component';
import {SelectFormsComponent} from './examples/select-forms/select-forms.component';
import {SelectTypesExampleComponent} from './examples/select-types-example/select-types-example.component';
import {SelectNestedOptionsComponent} from './examples/select-nested-options/select-nested-options.component';
import {SelectBasicExampleComponent} from './examples/select-basic-example/select-basic-example.component';
import {SelectAddingExampleComponent} from './examples/select-adding-example/select-adding-example.component';
import {SelectCustomTriggerComponent} from './examples/select-custom-trigger/select-custom-trigger.component';
import {SelectMaxHeightExampleComponent} from './examples/select-height/select-max-height-example.component';
import {SelectViewValueExampleComponent} from './examples/select-view-value-example/select-view-value-example.component';
import {SelectProgrammaticExampleComponent} from './examples/select-programmatic-example/select-programmatic-example.component';

const routes: Routes = [
    {
        path: '',
        component: SelectHeaderComponent,
        children: [
            {path: '', component: SelectDocsComponent},
            {path: 'api', component: ApiComponent, data: {content: API_FILES.select}}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationModule
    ],
    exports: [RouterModule],
    declarations: [
        SelectDocsComponent,
        SelectFormsComponent,
        SelectHeaderComponent,
        SelectTypesExampleComponent,
        SelectNestedOptionsComponent,
        SelectBasicExampleComponent,
        SelectAddingExampleComponent,
        SelectCustomTriggerComponent,
        SelectMaxHeightExampleComponent,
        SelectViewValueExampleComponent,
        SelectProgrammaticExampleComponent,
    ]
})
export class SelectDocsModules {
}
