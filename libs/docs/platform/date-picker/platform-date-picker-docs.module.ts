import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';
import { ApiComponent, SharedDocumentationPageModule, currentComponentProvider } from '@fundamental-ngx/docs/shared';

import { FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { FdpFormGroupModule, PlatformDatePickerModule } from '@fundamental-ngx/platform/form';
import { PlatformLinkModule } from '@fundamental-ngx/platform/link';

import { PlatformDatePickerMobileExampleComponent } from './examples/mobile/platform-date-picker-mobile-example.component';
import { PlatformDatePickerDisableFuncExampleComponent } from './examples/platform-date-picker-disable-func-example.component';
import { PlatformDatePickerExampleComponent } from './examples/platform-date-picker-example.component';
import { PlatformDatePickerFormatExampleComponent } from './examples/platform-date-picker-format-example.component';
import { PlatformDatePickeri18nExampleComponent } from './examples/platform-date-picker-i18n-example.component';
import { PlatformDatePickerUpdateOnBlurExampleComponent } from './examples/platform-date-picker-update-on-blur-example.component';
import { PlatformDatePickerDocsComponent } from './platform-date-picker-docs.component';
import { PlatformDatePickerHeaderComponent } from './platform-date-picker-header/platform-date-picker-header.component';

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
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        SegmentedButtonModule,
        PlatformLinkModule,
        FdDatetimeModule,
        PlatformDatePickerModule,
        FdpFormGroupModule,
        PlatformDatePickerDocsComponent,
        PlatformDatePickerExampleComponent,
        PlatformDatePickerDisableFuncExampleComponent,
        PlatformDatePickerHeaderComponent,
        PlatformDatePickeri18nExampleComponent,
        PlatformDatePickerFormatExampleComponent,
        PlatformDatePickerUpdateOnBlurExampleComponent,
        PlatformDatePickerMobileExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('date-picker')]
})
export class PlatformDatePickerDocsModule {}
