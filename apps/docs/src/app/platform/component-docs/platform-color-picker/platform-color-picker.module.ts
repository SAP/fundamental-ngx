import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

import { PlatformColorPickerHeaderComponent } from './platform-color-picker-header/platform-color-picker-header.component';
import { PlatformColorPickerDocsComponent } from './platform-color-picker-docs.component';
import { PlatformColorPickerExamplesComponent } from './platform-color-picker-examples/platform-color-picker-simple-example.component';

import { PlatformButtonModule } from '@fundamental-ngx/platform/button';
import { PlatformMenuModule } from '@fundamental-ngx/platform/menu';
import { PlatformColorPickerModule } from '@fundamental-ngx/platform/color-picker';
import { PlatformActionButtonGroupModule } from '@fundamental-ngx/platform/action-button-group';
import { PlatformColorPickerReactiveFormExampleComponent } from './platform-color-picker-examples/platform-color-picker-reactive-form-example.component';
import { FdpFormGroupModule } from '@fundamental-ngx/platform/form';

const routes: Routes = [
    {
        path: '',
        component: PlatformColorPickerHeaderComponent,
        children: [
            { path: '', component: PlatformColorPickerDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.colorPicker } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        PlatformColorPickerModule,
        PlatformButtonModule,
        PlatformMenuModule,
        PlatformActionButtonGroupModule,
        FdpFormGroupModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformColorPickerDocsComponent,
        PlatformColorPickerHeaderComponent,
        PlatformColorPickerExamplesComponent,
        PlatformColorPickerReactiveFormExampleComponent
    ]
})
export class PlatformColorPickerDocsModule {}
