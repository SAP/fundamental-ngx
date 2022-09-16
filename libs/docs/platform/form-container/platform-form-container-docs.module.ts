import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';

import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import {
    FdpFormGroupModule,
    PlatformCheckboxGroupModule,
    PlatformComboboxModule,
    PlatformInputGroupModule,
    PlatformInputModule,
    PlatformRadioGroupModule,
    PlatformSelectModule,
    PlatformStepInputModule,
    PlatformSwitchModule,
    PlatformTextAreaModule
} from '@fundamental-ngx/platform/form';
import { PlatformFormContainerDocsComponent } from './platform-form-container-docs.component';
import { PlatformFormContainerRecommendedExampleComponent } from './examples/platform-form-container-recommended-example.component';
import { PlatformFormContainerPossibleExampleComponent } from './examples/platform-form-container-possible-example.component';
import { PlatformFormContainerNotRecommendedExampleComponent } from './examples/platform-form-container-not-recommended-example.component';
import { PlatformFormContainerComplexExampleComponent } from './examples/platform-form-container-complex-example.component';
import { PlatformFormContainerHeaderComponent } from './platform-form-container-header/platform-form-container-header.component';
import { PlatformFormBasicExampleComponent } from './examples/platform-form-basic/platform-form-basic-example.component';
import { PlatformFormGroupExampleComponent } from './examples/platform-form-group/platform-form-group-example.component';
import { PlatformFieldColumnChangeExampleComponent } from './examples/platform-field-layout/platform-field-column-change-example.component';
import { PlatformFieldIsInlineChangeExampleComponent } from './examples/platform-field-layout/platform-field-isinline-change-example.component';
import { PlatformFormCustomLayoutComponent } from './examples/platform-form-custom-layout.component';
import { TableModule } from '@fundamental-ngx/core/table';

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
        FdpFormGroupModule,
        TableModule
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
        PlatformFieldIsInlineChangeExampleComponent,
        PlatformFormCustomLayoutComponent
    ],
    providers: [currentComponentProvider('form-container')]
})
export class PlatformFormContainerDocsModule {}
