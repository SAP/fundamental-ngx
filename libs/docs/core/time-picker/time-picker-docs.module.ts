import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { FormModule } from '@fundamental-ngx/core/form';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { SelectModule } from '@fundamental-ngx/core/select';
import { TimePickerModule } from '@fundamental-ngx/core/time-picker';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { TimePickerAllowNullExampleComponent } from './examples/time-picker-allow-null-example.component';
import { TimePickerCompactExampleComponent } from './examples/time-picker-compact-example.component';
import { TimePickerDisabledExampleComponent } from './examples/time-picker-disabled-example.component';
import { TimePickerExampleComponent } from './examples/time-picker-example.component';
import { TimePickerFormExampleComponent } from './examples/time-picker-form-example.component';
import { TimePickerFormatExampleComponent } from './examples/time-picker-format-example.component';
import { TimePickerLocaleExampleComponent } from './examples/time-picker-locale-example/time-picker-locale-example.component';
import { TimePickerDocsComponent } from './time-picker-docs.component';
import { TimePickerHeaderComponent } from './time-picker-header/time-picker-header.component';

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
    imports: [
        FormModule,
        SelectModule,
        FdDatetimeModule,
        TimePickerModule,
        SegmentedButtonModule,
        SharedDocumentationPageModule,
        RouterModule.forChild(routes),
        TimePickerDocsComponent,
        TimePickerHeaderComponent,
        TimePickerExampleComponent,
        TimePickerFormatExampleComponent,
        TimePickerFormExampleComponent,
        TimePickerLocaleExampleComponent,
        TimePickerCompactExampleComponent,
        TimePickerDisabledExampleComponent,
        TimePickerAllowNullExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('time-picker')]
})
export class TimePickerDocsModule {}
