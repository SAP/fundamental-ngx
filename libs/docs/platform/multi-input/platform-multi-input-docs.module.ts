import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { DialogModule } from '@fundamental-ngx/core/dialog';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { MOBILE_MODE_CONFIG } from '@fundamental-ngx/core/mobile-mode';
import {
    DATA_PROVIDERS,
    DataProvider,
    platformContentDensityModuleDeprecationsProvider
} from '@fundamental-ngx/platform/shared';
import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { FdpFormGroupModule, PlatformMultiInputModule } from '@fundamental-ngx/platform/form';
import { PlatformListModule, StandardListItemModule } from '@fundamental-ngx/platform/list';
import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';

import { PlatformMultiInputDocsComponent } from './platform-multi-input-docs.component';
import { PlatformMultiInputExampleComponent } from './examples/platform-multi-input-example.component';
import { PlatformMultiInputHeaderComponent } from './platform-multi-input-header/platform-multi-input-header.component';
import { PlatformMultiInputGroupedExampleComponent } from './examples/platform-multi-input-grouped-example.component';
import { PlatformMultiInputDeclineExampleComponent } from './examples/platform-multi-input-decline-example.component';
import { PlatformMultiInputComplexExampleComponent } from './examples/platform-multi-input-complex-example.component';
import { PlatformMultiInputMobileExampleComponent } from './examples/platform-multi-input-mobile-example.component';
import {
    ApiComponent,
    currentComponentProvider,
    MULTI_INPUT_MOBILE_CONFIG,
    SharedDocumentationModule,
    SharedDocumentationPageModule
} from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { PlatformMultiInputDisabledExampleComponent } from './examples/platform-multi-input-disabled.component';
import { PlatformMultiInputReactiveExampleComponent } from './examples/platform-multi-input-reactive-example.component';
import { PlatformMultiInputCompactExampleComponent } from './examples/platform-multi-input-compact-example.component';
import { PlatformMultiInputLoadingExampleComponent } from './examples/platform-multi-input-loading-example.component';

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
        PlatformMultiInputCompactExampleComponent,
        PlatformMultiInputLoadingExampleComponent
    ],
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
        PlatformButtonModule
    ],
    exports: [RouterModule],
    providers: [
        { provide: DATA_PROVIDERS, useClass: DataProvider as any },
        { provide: MOBILE_MODE_CONFIG, useValue: MULTI_INPUT_MOBILE_CONFIG, multi: true },
        platformContentDensityModuleDeprecationsProvider('fdp-multi-input'),
        currentComponentProvider('multi-input')
    ]
})
export class PlatformMultiInputDocsModule {}
