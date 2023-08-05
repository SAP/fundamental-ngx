import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { FdpFormGroupModule, PlatformDatetimePickerModule } from '@fundamental-ngx/platform/form';


import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { PlatformDatetimePickerDocsComponent } from './platform-datetime-picker-docs.component';
import { PlatformDatetimePickerBasicExampleComponent } from './examples/platform-datetime-picker-basic-example.component';
import { PlatformDatetimePickerDisableFunctionExampleComponent } from './examples/platform-datetime-picker-disable-function-example.component';
import { PlatformDatetimePickerReactiveExampleComponent } from './examples/platform-datetime-picker-reactive-example.component';
import { PlatformDatetimePickerTemplateExampleComponent } from './examples/platform-datetime-picker-template-example.component';
import { PlatformDatetimePickerUpdateOnBlurExampleComponent } from './examples/platform-datetime-picker-update-on-blur-example.component';
import { PlatformDatetimePickerHeaderComponent } from './platform-datetime-picker-header/platform-datetime-picker-header.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformDatetimePickerHeaderComponent,
        children: [
            { path: '', component: PlatformDatetimePickerDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.datetimePicker } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        FdDatetimeModule,
        PlatformDatetimePickerModule,
        FdpFormGroupModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformDatetimePickerDocsComponent,
        PlatformDatetimePickerHeaderComponent,
        PlatformDatetimePickerBasicExampleComponent,
        PlatformDatetimePickerReactiveExampleComponent,
        PlatformDatetimePickerTemplateExampleComponent,
        PlatformDatetimePickerDisableFunctionExampleComponent,
        PlatformDatetimePickerUpdateOnBlurExampleComponent
    ],
    providers: [
        platformContentDensityModuleDeprecationsProvider('fdp-datetime-picker'),
        currentComponentProvider('datetime-picker')
    ]
})
export class PlatformDatetimePickerDocsModule {}
