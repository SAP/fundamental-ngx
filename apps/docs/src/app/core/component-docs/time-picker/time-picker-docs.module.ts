import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { API_FILES } from '../../api-files';
import { TimePickerHeaderComponent } from './time-picker-header/time-picker-header.component';
import { TimePickerDocsComponent } from './time-picker-docs.component';
import { TimePickerExampleComponent } from './examples/time-picker-example.component';
import { TimePicker12ExampleComponent } from './examples/time-picker-12-example.component';
import { TimePickerFormExampleComponent } from './examples/time-picker-form-example.component';
import { TimePickerLocaleExampleComponent } from './examples/time-picker-locale-example/time-picker-locale-example.component';
import { TimePickerCompactExampleComponent } from './examples/time-picker-compact-example.component';
import { TimePickerDisabledExampleComponent } from './examples/time-picker-disabled-example.component';
import { TimePickerOnlyHoursExampleComponent } from './examples/time-picker-only-hours-example.component';
import { TimePickerNoSecondsExampleComponent } from './examples/time-picker-no-seconds-example.component';
import { TimePickerAllowNullExampleComponent } from './examples/time-picker-allow-null-example.component';
import { TimePickerOtherDelimiterExampleComponent } from './examples/time-picker-other-delimiter-example.component';
import { TimePickerModule, SegmentedButtonModule, SelectModule } from '@fundamental-ngx/core';

const routes: Routes = [
    {
        path: '',
        component: TimePickerHeaderComponent,
        children: [
            { path: '', component: TimePickerDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.timePicker } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationModule, TimePickerModule, SegmentedButtonModule, SelectModule],
    exports: [RouterModule],
    declarations: [
        TimePickerDocsComponent,
        TimePickerHeaderComponent,
        TimePickerExampleComponent,
        TimePicker12ExampleComponent,
        TimePickerFormExampleComponent,
        TimePickerLocaleExampleComponent,
        TimePickerCompactExampleComponent,
        TimePickerDisabledExampleComponent,
        TimePickerOnlyHoursExampleComponent,
        TimePickerNoSecondsExampleComponent,
        TimePickerAllowNullExampleComponent,
        TimePickerOtherDelimiterExampleComponent
    ]
})
export class TimePickerDocsModule {}
