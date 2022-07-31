import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { FdpFormGroupModule, PlatformDatetimePickerModule } from '@fundamental-ngx/platform/form';
import { platformContentDensityModuleDeprecationsProvider } from '@fundamental-ngx/platform/shared';

import { ApiComponent } from '../../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../../api-files';
import { PlatformDatetimePickerDocsComponent } from './platform-datetime-picker-docs.component';
import { PlatformDatetimePickerBasicExampleComponent } from './platform-datetime-picker-examples/platform-datetime-picker-basic-example.component';
import { PlatformDatetimePickerDisableFunctionExampleComponent } from './platform-datetime-picker-examples/platform-datetime-picker-disable-function-example.component';
import { PlatformDatetimePickerReactiveExampleComponent } from './platform-datetime-picker-examples/platform-datetime-picker-reactive-example.component';
import { PlatformDatetimePickerTemplateExampleComponent } from './platform-datetime-picker-examples/platform-datetime-picker-template-example.component';
import { PlatformDatetimePickerUpdateOnBlurExampleComponent } from './platform-datetime-picker-examples/platform-datetime-picker-update-on-blur-example.component';
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
    providers: [platformContentDensityModuleDeprecationsProvider('fdp-datetime-picker')]
})
export class PlatformDatetimePickerDocsModule {}
