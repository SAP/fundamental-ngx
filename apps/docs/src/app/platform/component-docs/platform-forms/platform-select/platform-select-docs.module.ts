import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../../api-files';
import { PlatformSelectHeaderComponent } from './platform-select-header/platform-select-header.component';
import { PlatformSelectDocsComponent } from './platform-select-docs.component';
import { PlatformSelectFormsComponent } from './platform-select-examples/platform-select-forms/platform-select-forms.component';
import { PlatformSelectNestedOptionsComponent } from './platform-select-examples/platform-select-nested-options/platform-select-nested-options.component';
import { PlatformSelectAddingExampleComponent } from './platform-select-examples/platform-select-adding-example/platform-select-adding-example.component';
import { PlatformSelectCustomTriggerComponent } from './platform-select-examples/platform-select-custom-trigger/platform-select-custom-trigger.component';
import { PlatformSelectMaxHeightExampleComponent } from './platform-select-examples/platform-select-height/platform-select-max-height-example.component';
import { PlatformSelectProgrammaticExampleComponent } from './platform-select-examples/platform-select-programmatic-example/platform-select-programmatic-example.component';
import {
    DialogModule,
    FormModule,
    ListModule,
    SelectMobileModule,
    SelectModule
} from '@fundamental-ngx/core';
import {PlatformSelectModule, FdpFormGroupModule } from '@fundamental-ngx/platform';
import { PlatformSelectSemanticStateExampleComponent } from './platform-select-examples/platform-select-semantic-state-example/platform-select-semantic-state-example.component';
import { PlatformSelectModeExampleComponent } from './platform-select-examples/platform-select-mode-example/platform-select-mode-example.component';
import { PlatformSelectMobileExampleComponent } from './platform-select-examples/platform-select-mobile-example/platform-select-mobile-example.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformSelectHeaderComponent,
        children: [
            { path: '', component: PlatformSelectDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.select } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        SelectMobileModule,
        SelectModule,
        DialogModule,
        ListModule,
        FormModule,
        FdpFormGroupModule,
        PlatformSelectModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformSelectDocsComponent,
        PlatformSelectFormsComponent,
        PlatformSelectHeaderComponent,
        PlatformSelectModeExampleComponent,
        PlatformSelectNestedOptionsComponent,
        PlatformSelectMobileExampleComponent,
        PlatformSelectAddingExampleComponent,
        PlatformSelectCustomTriggerComponent,
        PlatformSelectMaxHeightExampleComponent,
        PlatformSelectProgrammaticExampleComponent,
        PlatformSelectSemanticStateExampleComponent
    ]
})
export class PlatformSelectDocsModules {}
