import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';

import { PlatformStepInputModule } from '@fundamental-ngx/platform';

import { PlatformStepInputDocsComponent } from './platform-step-input-docs.component';
import { PlatformStepInputHeaderComponent } from './platform-step-input-header/platform-step-input-header.component';
import { PlatformNumberStepInputExampleComponent } from './platform-step-input-examples/platform-number-step-input-example.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformStepInputHeaderComponent,
        children: [
            { path: '', component: PlatformStepInputDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.stepInput } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationModule, PlatformStepInputModule],
    exports: [RouterModule],
    declarations: [
        PlatformStepInputDocsComponent,
        PlatformStepInputHeaderComponent,
        PlatformNumberStepInputExampleComponent
    ]
})
export class PlatformStepInputDocsModule {}
