import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import {
    ApiComponent,
    currentComponentProvider,
    getI18nKey,
    I18nDocsComponent,
    SharedDocumentationPageModule
} from '@fundamental-ngx/docs/shared';

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
    PlatformVhdInputExampleComponent,
    PlatformVhdMobileExampleComponent,
    PlatformVhdMultiInputExampleComponent,
    PlatformVhdStrategyLabelExampleComponent,
    PlatformVhdTokenExampleComponent
} from './examples';
import { PlatformVhdLoadingExampleComponent } from './examples/platform-vhd-loading-example.component';

import { PlatformVhdInitialLoadingExampleComponent } from './examples/initial-loading/platform-vhd-initial-loading-example.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformVhdHeaderComponent,
        children: [
            { path: '', component: PlatformVhdDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.valueHelpDialog } },
            { path: 'i18n', component: I18nDocsComponent, data: getI18nKey('platformVHD') }
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
        PlatformVhdStrategyLabelExampleComponent,
        PlatformVhdInitialLoadingExampleComponent
    ],
    providers: [
        platformContentDensityModuleDeprecationsProvider('fdp-value-help-dialog'),
        currentComponentProvider('vhd')
    ]
})
export class PlatformVhdDocsModule {}
