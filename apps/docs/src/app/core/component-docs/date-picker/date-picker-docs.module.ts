import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { DatePickerHeaderComponent } from './date-picker-header/date-picker-header.component';
import { DatePickerDocsComponent } from './date-picker-docs.component';
import { DatePickerRangeExampleComponent } from './examples/date-picker-range-example.component';
import { DatePickerSingleExampleComponent } from './examples/date-picker-single-example.component';
import { DatePickerTodayButtonExampleComponent } from './examples/date-picker-today-button-example.component';
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
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { FormModule } from '@fundamental-ngx/core/form';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { DatePickerModule, DeprecatedDatePickerCompactDirective } from '@fundamental-ngx/core/date-picker';
import { moduleDeprecationsProvider, PipeModule } from '@fundamental-ngx/core/utils';
import { DatePickerUpdateOnBlurExampleComponent } from './examples/date-picker-update-on-blur-example.component';
import { DatePickerDisableFocusScrollExampleComponent } from './examples/date-picker-disable-focus-scroll-example.component';

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
        FormModule,
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        SegmentedButtonModule,
        InputGroupModule,
        FdDatetimeModule,
        DatePickerModule,
        PipeModule
    ],
    exports: [RouterModule],
    declarations: [
        DatePickerDocsComponent,
        DatePickerHeaderComponent,
        DatePickerI18nExampleComponent,
        DatePickerTodayButtonExampleComponent,
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
        DatePickerUpdateOnBlurExampleComponent,
        DatePickerDisableFocusScrollExampleComponent
    ],
    providers: [moduleDeprecationsProvider(DeprecatedDatePickerCompactDirective)]
})
export class DatePickerDocsModule {}
