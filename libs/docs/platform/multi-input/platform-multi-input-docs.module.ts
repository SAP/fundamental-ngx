import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { MOBILE_MODE_CONFIG } from '@fundamental-ngx/core/mobile-mode';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { FdpFormGroupModule, PlatformMultiInputModule } from '@fundamental-ngx/platform/form';
import { PlatformListModule, StandardListItemModule } from '@fundamental-ngx/platform/list';
import { DATA_PROVIDERS, DataProvider } from '@fundamental-ngx/platform/shared';

import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import {
    ApiComponent,
    currentComponentProvider,
    MULTI_INPUT_MOBILE_CONFIG,
    SharedDocumentationModule,
    SharedDocumentationPageModule
} from '@fundamental-ngx/docs/shared';
import { PlatformMultiInputCompactExampleComponent } from './examples/platform-multi-input-compact-example.component';
import { PlatformMultiInputComplexExampleComponent } from './examples/platform-multi-input-complex-example.component';
import { PlatformMultiInputDeclineExampleComponent } from './examples/platform-multi-input-decline-example.component';
import { PlatformMultiInputDisabledExampleComponent } from './examples/platform-multi-input-disabled.component';
import { PlatformMultiInputExampleComponent } from './examples/platform-multi-input-example.component';
import { PlatformMultiInputGroupedExampleComponent } from './examples/platform-multi-input-grouped-example.component';
import { PlatformMultiInputLoadingExampleComponent } from './examples/platform-multi-input-loading-example.component';
import { PlatformMultiInputMobileExampleComponent } from './examples/platform-multi-input-mobile-example.component';
import { PlatformMultiInputReactiveExampleComponent } from './examples/platform-multi-input-reactive-example.component';
import { PlatformMultiInputDocsComponent } from './platform-multi-input-docs.component';
import { PlatformMultiInputHeaderComponent } from './platform-multi-input-header/platform-multi-input-header.component';

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
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        PlatformMultiInputModule,
        FdpFormGroupModule,
        BusyIndicatorModule,
        PlatformListModule,
        StandardListItemModule,
        DialogModule,
        InputGroupModule,
        SharedDocumentationModule,
        PlatformButtonModule,
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
        PlatformMultiInputCompactExampleComponent,
        PlatformMultiInputLoadingExampleComponent
    ],
    exports: [RouterModule],
    providers: [
        { provide: DATA_PROVIDERS, useClass: DataProvider as any },
        { provide: MOBILE_MODE_CONFIG, useValue: MULTI_INPUT_MOBILE_CONFIG, multi: true },
        currentComponentProvider('multi-input')
    ]
})
export class PlatformMultiInputDocsModule {}
