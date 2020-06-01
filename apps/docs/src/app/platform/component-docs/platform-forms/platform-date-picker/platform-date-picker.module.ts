import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../../api-files';
import { SharedDocumentationModule } from '../../../../documentation/shared-documentation.module';
import { PlatformDatePickerDocsComponent } from './platform-date-picker-docs.component';
import { PlatformDatePickerHeaderComponent } from './platform-date-picker-header/platform-date-picker-header.component';
import { PlatformDatePickerExampleComponent } from './platform-date-picker-examples/platform-date-picker-examples.component';
import { PlatformButtonModule, PlatformDatePickerModule, FdpFormGroupModule } from '@fundamental-ngx/platform';
import { PlatformDatePickerI18nExampleComponent } from './platform-date-picker-examples/platform-date-picker-international.component';
import { PlatformDisabledFuncDatePickerComponent } from './platform-date-picker-examples/platform-date-picker-disablesfunc.component';
import { PlatformDatePickerPlacementComponent } from './platform-date-picker-examples/platform-date-picker-placement.component';
import { PlatformDatePickerComplexI18nExampleComponent } from './platform-date-picker-examples/platform-date-picker-complexi18n.component';
import { DatePickerModule } from '@fundamental-ngx/core';

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
        SharedDocumentationModule,
        DatePickerModule,
        PlatformDatePickerModule,
        FdpFormGroupModule,
        PlatformButtonModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformDatePickerComplexI18nExampleComponent,
        PlatformDatePickerDocsComponent,
        PlatformDatePickerExampleComponent,
        PlatformDisabledFuncDatePickerComponent,
        PlatformDatePickerHeaderComponent,
        PlatformDatePickerI18nExampleComponent,
        PlatformDatePickerPlacementComponent
    ]
})
export class PlatformDatePickerDocsModule {}
