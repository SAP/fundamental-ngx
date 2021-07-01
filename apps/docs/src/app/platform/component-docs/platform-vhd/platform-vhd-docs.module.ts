import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { PlatformValueHelpDialogModule } from '@fundamental-ngx/platform';

import { PlatformVhdDocsComponent } from './platform-vhd.docs.component';
import { PlatformVhdHeaderComponent } from './platform-vhd-header/platform-vhd-header.component';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

import {
    PlatformVhdBasicExampleComponent,
    PlatformVhdTokenExampleComponent,
    PlatformVhdMultiInputExampleComponent,
    PlatformVhdInputExampleComponent,
    PlatformVhdMobileExampleComponent,
    PlatformVhdStrategyLabelExampleComponent
} from './platform-vhd-examples'
import { ButtonModule } from '@fundamental-ngx/core/button';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { MultiInputModule } from '@fundamental-ngx/core/multi-input';
import { TokenModule } from '@fundamental-ngx/core/token';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';

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
        PlatformValueHelpDialogModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformVhdDocsComponent,
        PlatformVhdHeaderComponent,

        PlatformVhdBasicExampleComponent,
        PlatformVhdTokenExampleComponent,
        PlatformVhdMultiInputExampleComponent,
        PlatformVhdInputExampleComponent,
        PlatformVhdMobileExampleComponent,
        PlatformVhdStrategyLabelExampleComponent
    ]

})
export class PlatformVhdDocsModule { }
