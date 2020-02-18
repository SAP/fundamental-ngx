import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ApiComponent} from '../../../documentation/core-helpers/api/api.component';
import {API_FILES} from '../../api-files';
import {SharedDocumentationModule} from '../../../documentation/shared-documentation.module';
import {CheckboxHeaderComponent} from './checkbox-header/checkbox-header.component';
import {CheckboxDocsComponent} from './checkbox-docs.component';
import {CheckboxCustomLabelExampleComponent} from './examples/checkbox-custom-label-example.component';
import {CheckboxCustomValuesExampleComponent} from './examples/checkbox-custom-values-example.component';
import {CheckboxDefaultExampleComponent} from './examples/checkbox-default-example.component';
import {CheckboxReactiveFormsExampleComponent} from './examples/checkbox-reactive-forms-example.component';
import {CheckboxStatesExampleComponent} from './examples/checkbox-states-example.component';
import {CheckboxTristateExampleComponent} from './examples/checkbox-tristate-example.component';

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
        RouterModule.forChild(routes),
        SharedDocumentationModule
    ],
    exports: [RouterModule],
    declarations: [
        CheckboxDocsComponent,
        CheckboxHeaderComponent,
        CheckboxCustomLabelExampleComponent,
        CheckboxCustomValuesExampleComponent,
        CheckboxDefaultExampleComponent,
        CheckboxReactiveFormsExampleComponent,
        CheckboxStatesExampleComponent,
        CheckboxTristateExampleComponent,
    ],
})
export class CheckboxDocsModule {
}
