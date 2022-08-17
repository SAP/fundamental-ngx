import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { API_FILES } from '../../../api-files';
import { ApiComponent } from '../../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../../documentation/shared-documentation-page.module';

import { PlatformStepInputModule, FdpFormGroupModule } from '@fundamental-ngx/platform/form';
import { PlatformStepInputDocsComponent } from './platform-step-input-docs.component';
import { PlatformStepInputHeaderComponent } from './platform-step-input-header/platform-step-input-header.component';
import { PlatformNumberStepInputExampleComponent } from './platform-step-input-examples/platform-number-step-input-example.component';
import { PlatformNumberStepInputFormExampleComponent } from './platform-step-input-examples/platform-number-step-input-reactive-example.component';
import { PlatformNumberStepInputTemplateFormExampleComponent } from './platform-step-input-examples/platform-number-step-input-template-example.component';
import { PlatformNumberStepInputStateExampleComponent } from './platform-step-input-examples/platform-number-step-input-state-example.component';
import { platformContentDensityModuleDeprecationsProvider } from '@fundamental-ngx/platform/shared';

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
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        PlatformStepInputModule,
        FdpFormGroupModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformStepInputDocsComponent,
        PlatformStepInputHeaderComponent,
        PlatformNumberStepInputExampleComponent,
        PlatformNumberStepInputFormExampleComponent,
        PlatformNumberStepInputTemplateFormExampleComponent,
        PlatformNumberStepInputStateExampleComponent
    ],
    providers: [platformContentDensityModuleDeprecationsProvider('fdp-number-step-input')]
})
export class PlatformStepInputDocsModule {}
