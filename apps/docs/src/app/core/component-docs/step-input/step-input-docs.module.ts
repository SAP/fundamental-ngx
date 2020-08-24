import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { API_FILES } from '../../api-files';
import { StepInputDocsComponent } from './step-input-docs.component';
import { StepInputHeaderComponent } from './step-input-header/step-input-header.component';
import { StepInputDefaultExampleComponent } from './examples/step-inpt-default-example/step-input-default-example.component';
import { FormModule, StepInputModule } from '@fundamental-ngx/core';
import { StepInputConfigurationExampleComponent } from './examples/step-input-configuration-example/step-input-configuration-example.component';
import { StepInputLocaleExampleComponent } from './examples/step-input-locale-example/step-input-locale-example.component';
import { StepInputStateExampleComponent } from './examples/step-input-state-example/step-input-state-example.component';
import { StepInputLabelExampleComponent } from './examples/step-input-label-example/step-input-label-example.component';
import { StepInputCurrencyExampleComponent } from './examples/step-input-currency-example/step-input-currency-example.component';
import { StepInputFormExampleComponent } from './examples/step-input-form-example/step-input-form-example.component';

const routes: Routes = [
    {
        path: '',
        component: StepInputHeaderComponent,
        children: [
            { path: '', component: StepInputDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.stepInput } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationModule, FormModule, StepInputModule],
    exports: [RouterModule],
    declarations: [
        StepInputDocsComponent,
        StepInputHeaderComponent,
        StepInputLocaleExampleComponent,
        StepInputDefaultExampleComponent,
        StepInputConfigurationExampleComponent,
        StepInputStateExampleComponent,
        StepInputLabelExampleComponent,
        StepInputCurrencyExampleComponent,
        StepInputFormExampleComponent
    ]
})
export class StepInputDocsModule {}
