import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../../api-files';
import { SharedDocumentationPageModule } from '../../../../documentation/shared-documentation-page.module';
import { PlatformButtonModule, PlatformDatePickerModule, FdpFormGroupModule } from '@fundamental-ngx/platform';
import { FdDatetimeModule } from '@fundamental-ngx/core';

import { PlatformDatePickerDocsComponent } from './platform-date-picker-docs.component';
import { PlatformDatePickerHeaderComponent } from './platform-date-picker-header/platform-date-picker-header.component';
import { PlatformDatePickerExampleComponent } from './platform-date-picker-examples/platform-date-picker-example.component';
// import { PlatformDatePickerI18nExampleComponent } from './platform-date-picker-examples/platform-date-picker-international-example.component';
// import { PlatformDisabledFuncDatePickerComponent } from './platform-date-picker-examples/platform-date-picker-disablesfunc-example.component';
// import { PlatformDatePickerPlacementComponent } fro./platform-date-picker-examples/platform-date-picker-placement-example.componentent';
// import { PlatformDatePickerComplexI18nExampleComponent } from './platform-date-picker-examples/platform-date-picker-complexi18n.component';

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
        FdDatetimeModule,
        PlatformDatePickerModule,
        FdpFormGroupModule,
        PlatformButtonModule
    ],
    exports: [RouterModule],
    declarations: [
        // PlatformDatePickerComplexI18nExampleComponent,
        PlatformDatePickerDocsComponent,
        PlatformDatePickerExampleComponent,
        // PlatformDisabledFuncDatePickerComponent,
        PlatformDatePickerHeaderComponent,
        // PlatformDatePickerI18nExampleComponent,
        // PlatformDatePickerPlacementComponent
    ]
})
export class PlatformDatePickerDocsModule {}
