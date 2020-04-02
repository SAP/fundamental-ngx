import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { DatetimePickerHeaderComponent } from './datetime-picker-header/datetime-picker-header.component';
import { DatetimePickerDocsComponent } from './datetime-picker-docs.component';
import { DatetimePickerComplexI18nExampleComponent } from './examples/datetime-picker-complex-i18n-example/datetime-picker-complex-i18n-example.component';
import { DatetimeExampleComponent } from './examples/datetime-example/datetime-example.component';
import { DatetimeNonMeridianExampleComponent } from './examples/datetime-non-meridian-example/datetime-non-meridian-example.component';
import { DatetimeProgramExampleComponent } from './examples/datetime-program-example/datetime-program-example.component';
import { DatetimeFormatExampleComponent } from './examples/datetime-format-example/datetime-format-example.component';
import { DatetimeFormExampleComponent } from './examples/datetime-form-example/datetime-form-example.component';
import { DatetimePickerAllowNullExampleComponent } from './examples/datetime-allow-null-example/datetime-allow-null-example.component';
import { DatetimeDisabledExampleComponent } from './examples/datetime-disabled-example/datetime-disabled-example.component';
import { SegmentedButtonModule, DatetimePickerModule } from '@fundamental-ngx/core';

const routes: Routes = [
    {
        path: '',
        component: DatetimePickerHeaderComponent,
        children: [
            { path: '', component: DatetimePickerDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.datetimePicker } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationModule,
        DatetimePickerModule,
        SegmentedButtonModule
    ],
    exports: [RouterModule],
    declarations: [
        DatetimeExampleComponent,
        DatetimePickerDocsComponent,
        DatetimeFormExampleComponent,
        DatetimePickerHeaderComponent,
        DatetimeFormatExampleComponent,
        DatetimeProgramExampleComponent,
        DatetimeDisabledExampleComponent,
        DatetimeNonMeridianExampleComponent,
        DatetimePickerAllowNullExampleComponent,
        DatetimePickerComplexI18nExampleComponent
    ]
})
export class DatetimePickerDocsModule {
}
