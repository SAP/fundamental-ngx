import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ButtonModule, MultiInputModule, InputGroupModule, TokenModule, ToolbarModule } from '@fundamental-ngx/core';
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
