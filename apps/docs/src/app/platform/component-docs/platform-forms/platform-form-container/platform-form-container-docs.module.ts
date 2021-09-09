import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../../api-files';
import { SharedDocumentationPageModule } from '../../../../documentation/shared-documentation-page.module';

import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import {
    PlatformTextAreaModule,
    FdpFormGroupModule,
    PlatformRadioGroupModule,
    PlatformInputModule,
    PlatformCheckboxGroupModule,
    PlatformStepInputModule,
    PlatformInputGroupModule,
    PlatformSwitchModule,
    PlatformComboboxModule,
    PlatformSelectModule
} from '@fundamental-ngx/platform/form';
import { PlatformFormContainerDocsComponent } from './platform-form-container-docs.component';
import { PlatformFormContainerRecommendedExampleComponent } from './platform-form-container-examples/platform-form-container-recommended-example.component';
import { PlatformFormContainerPossibleExampleComponent } from './platform-form-container-examples/platform-form-container-possible-example.component';
import { PlatformFormContainerNotRecommendedExampleComponent } from './platform-form-container-examples/platform-form-container-not-recommended-example.component';
import { PlatformFormContainerComplexExampleComponent } from './platform-form-container-examples/platform-form-container-complex-example.component';
import { PlatformFormContainerHeaderComponent } from './platform-form-container-header/platform-form-container-header.component';
import { PlatformFormBasicExampleComponent } from './platform-form-container-examples/platform-form-basic/platform-form-basic-example.component';
import { PlatformFormGroupExampleComponent } from './platform-form-container-examples/platform-form-group/platform-form-group-example.component';
import { PlatformFieldColumnChangeExampleComponent } from './platform-form-container-examples/platform-field-layout/platform-field-column-change-example.component';
import { PlatformFieldIsInlineChangeExampleComponent } from './platform-form-container-examples/platform-field-layout/platform-field-isinline-change-example.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformFormContainerHeaderComponent,
        children: [
            { path: '', component: PlatformFormContainerDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.formContainer } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        PlatformTextAreaModule,
        PlatformButtonModule,
        PlatformRadioGroupModule,
        PlatformInputModule,
        PlatformCheckboxGroupModule,
        PlatformStepInputModule,
        PlatformInputGroupModule,
        PlatformSwitchModule,
        PlatformComboboxModule,
        PlatformSelectModule,
        FdpFormGroupModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformFormContainerDocsComponent,
        PlatformFormContainerHeaderComponent,
        PlatformFormContainerRecommendedExampleComponent,
        PlatformFormContainerPossibleExampleComponent,
        PlatformFormContainerNotRecommendedExampleComponent,
        PlatformFormContainerComplexExampleComponent,

        PlatformFormBasicExampleComponent,
        PlatformFormGroupExampleComponent,

        PlatformFieldColumnChangeExampleComponent,
        PlatformFieldIsInlineChangeExampleComponent
    ]
})
export class PlatformFormContainerDocsModule {}
