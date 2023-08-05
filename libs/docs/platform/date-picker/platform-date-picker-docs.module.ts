import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/platform/shared';

import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { PlatformLinkModule } from '@fundamental-ngx/platform/link';
import { FdpFormGroupModule, PlatformDatePickerModule } from '@fundamental-ngx/platform/form';

import { PlatformDatePickerDocsComponent } from './platform-date-picker-docs.component';
import { PlatformDatePickerHeaderComponent } from './platform-date-picker-header/platform-date-picker-header.component';
import { PlatformDatePickerExampleComponent } from './examples/platform-date-picker-example.component';
import { PlatformDatePickeri18nExampleComponent } from './examples/platform-date-picker-i18n-example.component';
import { PlatformDatePickerDisableFuncExampleComponent } from './examples/platform-date-picker-disable-func-example.component';
import { PlatformDatePickerFormatExampleComponent } from './examples/platform-date-picker-format-example.component';
import { PlatformDatePickerUpdateOnBlurExampleComponent } from './examples/platform-date-picker-update-on-blur-example.component';


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
        PlatformDatePickerFormatExampleComponent,
        PlatformDatePickerUpdateOnBlurExampleComponent
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
    exports: [RouterModule],
    providers: [
        platformContentDensityModuleDeprecationsProvider('fdp-date-picker'),
        currentComponentProvider('date-picker')
    ]
})
export class PlatformDatePickerDocsModule {}
