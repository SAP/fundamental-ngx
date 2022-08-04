import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { API_FILES } from '../../api-files';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

import { ButtonModule } from '@fundamental-ngx/core/button';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { MultiInputModule } from '@fundamental-ngx/core/multi-input';
import { TokenModule } from '@fundamental-ngx/core/token';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { PlatformValueHelpDialogModule } from '@fundamental-ngx/platform/value-help-dialog';
import { PlatformVhdDocsComponent } from './platform-vhd.docs.component';
import { PlatformVhdHeaderComponent } from './platform-vhd-header/platform-vhd-header.component';
import {
    PlatformVhdBasicExampleComponent,
    PlatformVhdTokenExampleComponent,
    PlatformVhdMultiInputExampleComponent,
    PlatformVhdInputExampleComponent,
    PlatformVhdMobileExampleComponent,
    PlatformVhdStrategyLabelExampleComponent
} from './platform-vhd-examples';
import { PlatformVhdLoadingExampleComponent } from './platform-vhd-examples/platform-vhd-loading-example.component';
import { platformContentDensityModuleDeprecationsProvider } from '@fundamental-ngx/platform/shared';

const routes: Routes = [
    {
        path: '',
        component: PlatformVhdHeaderComponent,
        children: [
            { path: '', component: PlatformVhdDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.valueHelpDialog } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        SharedDocumentationPageModule,
        ButtonModule,
        InputGroupModule,
        MultiInputModule,
        TokenModule,
        ToolbarModule,
        PlatformValueHelpDialogModule,
        CheckboxModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformVhdDocsComponent,
        PlatformVhdHeaderComponent,
        PlatformVhdBasicExampleComponent,
        PlatformVhdTokenExampleComponent,
        PlatformVhdLoadingExampleComponent,
        PlatformVhdMultiInputExampleComponent,
        PlatformVhdInputExampleComponent,
        PlatformVhdMobileExampleComponent,
        PlatformVhdStrategyLabelExampleComponent
    ],
    providers: [platformContentDensityModuleDeprecationsProvider('fdp-value-help-dialog')]
})
export class PlatformVhdDocsModule {}
