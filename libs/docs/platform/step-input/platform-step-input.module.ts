import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';

import { FdpFormGroupModule, PlatformStepInputModule } from '@fundamental-ngx/platform/form';
import { PlatformNumberStepInputExampleComponent } from './examples/platform-number-step-input-example.component';
import { PlatformNumberStepInputFormExampleComponent } from './examples/platform-number-step-input-reactive-example.component';
import { PlatformNumberStepInputStateExampleComponent } from './examples/platform-number-step-input-state-example.component';
import { PlatformNumberStepInputTemplateFormExampleComponent } from './examples/platform-number-step-input-template-example.component';
import { PlatformStepInputDocsComponent } from './platform-step-input-docs.component';
import { PlatformStepInputHeaderComponent } from './platform-step-input-header/platform-step-input-header.component';

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
        FdpFormGroupModule,
        PlatformStepInputDocsComponent,
        PlatformStepInputHeaderComponent,
        PlatformNumberStepInputExampleComponent,
        PlatformNumberStepInputFormExampleComponent,
        PlatformNumberStepInputTemplateFormExampleComponent,
        PlatformNumberStepInputStateExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('step-input')]
})
export class PlatformStepInputDocsModule {}
