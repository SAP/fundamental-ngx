import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../../api-files';
import { SharedDocumentationPageModule } from '../../../../documentation/shared-documentation-page.module';

import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { PlatformLinkModule } from '@fundamental-ngx/platform/link';
import { PlatformDatePickerModule, FdpFormGroupModule } from '@fundamental-ngx/platform/form';

import { PlatformDatePickerDocsComponent } from './platform-date-picker-docs.component';
import { PlatformDatePickerHeaderComponent } from './platform-date-picker-header/platform-date-picker-header.component';
import { PlatformDatePickerExampleComponent } from './platform-date-picker-examples/platform-date-picker-example.component';
import { PlatformDatePickeri18nExampleComponent } from './platform-date-picker-examples/platform-date-picker-i18n-example.component';
import { PlatformDatePickerDisableFuncExampleComponent } from './platform-date-picker-examples/platform-date-picker-disable-func-example.component';
import { PlatformDatePickerFormatExampleComponent } from './platform-date-picker-examples/platform-date-picker-format-example.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformDatePickerHeaderComponent,
        children: [
            { path: '', component: PlatformDatePickerDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.datePicker } }
        ]
    }
];

@NgModule({
    declarations: [
        PlatformDatePickerDocsComponent,
        PlatformDatePickerExampleComponent,
        PlatformDatePickerDisableFuncExampleComponent,
        PlatformDatePickerHeaderComponent,
        PlatformDatePickeri18nExampleComponent,
        PlatformDatePickerFormatExampleComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        SegmentedButtonModule,
        PlatformLinkModule,
        FdDatetimeModule,
        PlatformDatePickerModule,
        FdpFormGroupModule
    ],
    exports: [RouterModule]

})
export class PlatformDatePickerDocsModule {}
