import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { API_FILES } from '../../api-files';
import { StepInputDocsComponent } from './step-input-docs.component';
import { StepInputHeaderComponent } from './step-input-header/step-input-header.component';
import { StepInputExamplesComponent } from './examples/step-input-examples.component';
import { StepInputModule } from '@fundamental-ngx/core';

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
    imports: [RouterModule.forChild(routes), SharedDocumentationModule, StepInputModule],
    exports: [RouterModule],
    declarations: [
        StepInputDocsComponent,
        StepInputHeaderComponent,
        StepInputExamplesComponent
    ]
})
export class StepInputDocsModule {}
