import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {
    DataProvider,
    DATA_PROVIDERS,
    FdpFormGroupModule,
    PlatformListModule,
    PlatformMultiInputModule,
    StandardListItemModule
} from '@fundamental-ngx/platform';
import { DialogModule, InputGroupModule, MOBILE_MODE_CONFIG } from '@fundamental-ngx/core';

import { PlatformMultiInputDocsComponent } from './platform-multi-input-docs.component';
import { PlatformMulitInputExampleComponent } from './platform-mulit-input-example/platform-mulit-input-example.component';
import { PlatformMulitInputHeaderComponent } from './platform-mulit-input-header/platform-mulit-input-header.component';
import { PlatformMulitInputGroupedExampleComponent } from './platform-mulit-input-example/platform-mulit-input-grouped-example.component';
import { PlatformMulitInputDeclineExampleComponent } from './platform-mulit-input-example/platform-mulit-input-decline-example.component';
import { PlatformMulitInputComplexExampleComponent } from './platform-mulit-input-example/platform-mulit-input-complex-example.component';
import { PlatformMulitInputMobileExampleComponent } from './platform-mulit-input-example/platform-mulit-input-mobile-example.component';
import { ApiComponent } from '../../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../../api-files';
import { PlatformMulitInputDisabledExampleComponent } from './platform-mulit-input-example/platform-mulit-input-disabled.component';
import { SharedDocumentationModule } from '../../../../documentation/shared-documentation.module';
import { MULTI_INPUT_MOBILE_CONFIG } from '../../../../documentation/utilities/consts/mobile-mode-configuration-tokens';

const routes: Routes = [
    {
        path: '',
        component: PlatformMulitInputHeaderComponent,
        children: [
            { path: '', component: PlatformMultiInputDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.multiInput } }
        ]
    }
];

@NgModule({
    declarations: [
        PlatformMultiInputDocsComponent,
        PlatformMulitInputExampleComponent,
        PlatformMulitInputHeaderComponent,
        PlatformMulitInputGroupedExampleComponent,
        PlatformMulitInputComplexExampleComponent,
        PlatformMulitInputDeclineExampleComponent,
        PlatformMulitInputDeclineExampleComponent,
        PlatformMulitInputDisabledExampleComponent,
        PlatformMulitInputMobileExampleComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        PlatformMultiInputModule,
        FdpFormGroupModule,
        PlatformListModule,
        StandardListItemModule,
        DialogModule,
        InputGroupModule,
        SharedDocumentationModule
    ],
    exports: [RouterModule],
    providers: [
        { provide: DATA_PROVIDERS, useClass: DataProvider as any },
        { provide: MOBILE_MODE_CONFIG, useValue: MULTI_INPUT_MOBILE_CONFIG, multi: true }
    ]
})
export class PlatformMultiInputDocsModule {}
