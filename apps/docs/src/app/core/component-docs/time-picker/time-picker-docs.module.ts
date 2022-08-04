import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { TimePickerHeaderComponent } from './time-picker-header/time-picker-header.component';
import { TimePickerDocsComponent } from './time-picker-docs.component';
import { TimePickerExampleComponent } from './examples/time-picker-example.component';
import { TimePickerFormatExampleComponent } from './examples/time-picker-format-example.component';
import { TimePickerFormExampleComponent } from './examples/time-picker-form-example.component';
import { TimePickerLocaleExampleComponent } from './examples/time-picker-locale-example/time-picker-locale-example.component';
import { TimePickerCompactExampleComponent } from './examples/time-picker-compact-example.component';
import { TimePickerDisabledExampleComponent } from './examples/time-picker-disabled-example.component';
import { TimePickerAllowNullExampleComponent } from './examples/time-picker-allow-null-example.component';
import { FormModule } from '@fundamental-ngx/core/form';
import { SelectModule } from '@fundamental-ngx/core/select';
import { FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { DeprecatedTimepickerCompactDirective, TimePickerModule } from '@fundamental-ngx/core/time-picker';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { moduleDeprecationsProvider } from '@fundamental-ngx/core/utils';

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
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule],
    declarations: [
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
    providers: [moduleDeprecationsProvider(DeprecatedTimepickerCompactDirective)]
})
export class TimePickerDocsModule {}
