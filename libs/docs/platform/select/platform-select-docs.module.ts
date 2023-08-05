import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SelectModule } from '@fundamental-ngx/core/select';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { ListModule } from '@fundamental-ngx/core/list';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { FdpFormGroupModule, PlatformSelectModule } from '@fundamental-ngx/platform/form';

import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { PlatformSelectHeaderComponent } from './platform-select-header/platform-select-header.component';
import { PlatformSelectDocsComponent } from './platform-select-docs.component';
import { PlatformSelectFormsComponent } from './examples/platform-select-forms/platform-select-forms.component';
import { PlatformSelectCustomTriggerComponent } from './examples/platform-select-custom-trigger/platform-select-custom-trigger.component';
import { PlatformSelectMaxHeightExampleComponent } from './examples/platform-select-height/platform-select-max-height-example.component';
import { PlatformSelectSemanticStateExampleComponent } from './examples/platform-select-semantic-state-example/platform-select-semantic-state-example.component';
import { PlatformSelectModeExampleComponent } from './examples/platform-select-mode-example/platform-select-mode-example.component';
import { PlatformSelectMobileExampleComponent } from './examples/platform-select-mobile-example/platform-select-mobile-example.component';
import { PlatformSelectColumnsExampleComponent } from './examples/platform-select-columns/platform-select-columns-example.component';
import { PlatformSelectNoneExampleComponent } from './examples/platform-select-none/platform-select-none-example.component';
import { PlatformSelectNoWrapExampleComponent } from './examples/platform-select-nowrap/platform-select-nowrap-example.component';


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
        SelectModule,
        DialogModule,
        ListModule,
        FdpFormGroupModule,
        PlatformSelectModule,
        ReactiveFormsModule,
        PlatformButtonModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformSelectDocsComponent,
        PlatformSelectFormsComponent,
        PlatformSelectHeaderComponent,
        PlatformSelectModeExampleComponent,
        PlatformSelectMobileExampleComponent,
        PlatformSelectCustomTriggerComponent,
        PlatformSelectMaxHeightExampleComponent,
        PlatformSelectSemanticStateExampleComponent,
        PlatformSelectColumnsExampleComponent,
        PlatformSelectNoneExampleComponent,
        PlatformSelectNoWrapExampleComponent
    ],
    providers: [platformContentDensityModuleDeprecationsProvider('fdp-select'), currentComponentProvider('select')]
})
export class PlatformSelectDocsModules {}
