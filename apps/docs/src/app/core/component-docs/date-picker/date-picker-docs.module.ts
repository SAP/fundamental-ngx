import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { DatePickerHeaderComponent } from './date-picker-header/date-picker-header.component';
import { DatePickerDocsComponent } from './date-picker-docs.component';
import { DatePickerRangeExampleComponent } from './examples/date-picker-range-example.component';
import { DatePickerSingleExampleComponent } from './examples/date-picker-single-example.component';
import { DatePickerAllowNullExampleComponent } from './examples/date-picker-allow-null-example.component';
import { DatePickerDisabledExampleComponent } from './examples/date-picker-disabled-example.component';
import { DatePickerFormExampleComponent } from './examples/date-picker-form-example.component';
import { DatePickerFormRangeExampleComponent } from './examples/date-picker-form-range-example.component';
import { DatePickerI18nExampleComponent } from './examples/date-picker-i18n-example.component';
import { DatePickerPositionExampleComponent } from './examples/date-picker-position-example.component';
import { DatePickerFormatExampleComponent } from './examples/date-picker-format-example.component';
import { DatePickerComplexI18nExampleComponent } from './examples/date-picker-complex-i18n-example/date-picker-complex-i18n-example.component';
import { DatePickerRangeDisabledExampleComponent } from './examples/date-picker-range-disabled-example/date-picker-range-disabled-example.component';
import { DatePickerDisableFuncExampleComponent } from './examples/date-picker-disable-func-example/date-picker-disable-func-example.component';
import { SegmentedButtonModule, DatePickerModule } from '@fundamental-ngx/core';

const routes: Routes = [
    {
        path: '',
        component: DatePickerHeaderComponent,
        children: [
            { path: '', component: DatePickerDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.datePicker } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationModule,
        DatePickerModule,
        SegmentedButtonModule
    ],
    exports: [RouterModule],
    declarations: [
        DatePickerDocsComponent,
        DatePickerHeaderComponent,
        DatePickerI18nExampleComponent,
        DatePickerFormExampleComponent,
        DatePickerRangeExampleComponent,
        DatePickerFormatExampleComponent,
        DatePickerSingleExampleComponent,
        DatePickerPositionExampleComponent,
        DatePickerDisabledExampleComponent,
        DatePickerAllowNullExampleComponent,
        DatePickerFormRangeExampleComponent,
        DatePickerComplexI18nExampleComponent,
        DatePickerDisableFuncExampleComponent,
        DatePickerRangeDisabledExampleComponent,
    ]
})
export class DatePickerDocsModule {
}
