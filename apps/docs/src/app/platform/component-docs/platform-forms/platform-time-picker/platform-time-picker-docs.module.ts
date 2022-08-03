import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { API_FILES } from '../../../api-files';
import { SharedDocumentationPageModule } from '../../../../documentation/shared-documentation-page.module';
import { ApiComponent } from '../../../../documentation/core-helpers/api/api.component';

import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { FdpFormGroupModule, PlatformTimePickerModule } from '@fundamental-ngx/platform/form';
import { PlatformTimePickerDocsComponent } from './platform-time-picker-docs.component';
import { PlatformTimePickerHeaderComponent } from './platform-time-picker-header/platform-time-picker-header.component';
import { PlatformTimePickerBasicExampleComponent } from './examples/platform-time-picker-basic-example.component';
import { PlatformTimePickerReactiveExampleComponent } from './examples/platform-time-picker-reactive-example.component';
import { PlatformTimePickerTemplateExampleComponent } from './examples/platform-time-picker-template-example.component';
import { platformContentDensityModuleDeprecationsProvider } from '@fundamental-ngx/platform/shared';

const routes: Routes = [
    {
        path: '',
        component: PlatformTimePickerHeaderComponent,
        children: [
            { path: '', component: PlatformTimePickerDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.timePicker } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SegmentedButtonModule,
        SharedDocumentationPageModule,
        FdDatetimeModule,
        PlatformTimePickerModule,
        FdpFormGroupModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformTimePickerDocsComponent,
        PlatformTimePickerHeaderComponent,
        PlatformTimePickerBasicExampleComponent,
        PlatformTimePickerReactiveExampleComponent,
        PlatformTimePickerTemplateExampleComponent
    ],
    providers: [platformContentDensityModuleDeprecationsProvider('fdp-time-picker')]
})
export class PlatformTimePickerDocsModule {}
