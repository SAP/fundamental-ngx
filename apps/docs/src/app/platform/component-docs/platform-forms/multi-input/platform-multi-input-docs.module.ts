import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
    DataProvider,
    DATA_PROVIDERS,
    FdpFormGroupModule,
    PlatformButtonModule,
    PlatformListModule,
    PlatformMultiInputModule,
    StandardListItemModule
} from '@fundamental-ngx/platform';
import { DialogModule, InputGroupModule, MOBILE_MODE_CONFIG } from '@fundamental-ngx/core';

import { PlatformMultiInputDocsComponent } from './platform-multi-input-docs.component';
import { PlatformMultiInputExampleComponent } from './platform-multi-input-example/platform-multi-input-example.component';
import { PlatformMultiInputHeaderComponent } from './platform-multi-input-header/platform-multi-input-header.component';
import { PlatformMultiInputGroupedExampleComponent } from './platform-multi-input-example/platform-multi-input-grouped-example.component';
import { PlatformMultiInputDeclineExampleComponent } from './platform-multi-input-example/platform-multi-input-decline-example.component';
import { PlatformMultiInputComplexExampleComponent } from './platform-multi-input-example/platform-multi-input-complex-example.component';
import { PlatformMultiInputMobileExampleComponent } from './platform-multi-input-example/platform-multi-input-mobile-example.component';
import { ApiComponent } from '../../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../../api-files';
import { PlatformMultiInputDisabledExampleComponent } from './platform-multi-input-example/platform-multi-input-disabled.component';
import { SharedDocumentationModule } from '../../../../documentation/shared-documentation.module';
import { MULTI_INPUT_MOBILE_CONFIG } from '../../../../documentation/utilities/consts/mobile-mode-configuration-tokens';
import { PlatformMultiInputReactiveExampleComponent } from './platform-multi-input-example/platform-multi-input-reactive-example.component';
import { PlatformMultiInputCompactExampleComponent } from './platform-multi-input-example/platform-multi-input-compact-example.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformMultiInputHeaderComponent,
        children: [
            { path: '', component: PlatformMultiInputDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.multiInput } }
        ]
    }
];

@NgModule({
    declarations: [
        PlatformMultiInputDocsComponent,
        PlatformMultiInputExampleComponent,
        PlatformMultiInputHeaderComponent,
        PlatformMultiInputGroupedExampleComponent,
        PlatformMultiInputComplexExampleComponent,
        PlatformMultiInputDeclineExampleComponent,
        PlatformMultiInputDeclineExampleComponent,
        PlatformMultiInputDisabledExampleComponent,
        PlatformMultiInputMobileExampleComponent,
        PlatformMultiInputReactiveExampleComponent,
        PlatformMultiInputCompactExampleComponent
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
        SharedDocumentationModule,
        PlatformButtonModule
    ],
    exports: [RouterModule],
    providers: [
        { provide: DATA_PROVIDERS, useClass: DataProvider as any },
        { provide: MOBILE_MODE_CONFIG, useValue: MULTI_INPUT_MOBILE_CONFIG, multi: true }
    ]
})
export class PlatformMultiInputDocsModule {}
