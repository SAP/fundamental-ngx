import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FormModule } from '@fundamental-ngx/core/form';
import { DatetimePickerModule } from '@fundamental-ngx/core/datetime-picker';
import { DatePickerModule } from '@fundamental-ngx/core/date-picker';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { DayjsDatetimeAdapterModule } from '@fundamental-ngx/datetime-adapter';

import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { DayjsDatetimeAdapterHeaderComponent } from './dayjs-datetime-adapter-header/dayjs-datetime-adapter-header.component';
import { DayjsDatetimeAdapterDocsComponent } from './dayjs-datetime-adapter-docs.component';
import { DatePickerDayjsAdapterExampleComponent } from './examples/date-picker-dayjs-adapter-example.component';
import { DayjsAdapterOptionsExampleComponent } from './examples/dayjs-adapter-options-example.component';
import { DayjsDatetimeFormatsExampleComponent } from './examples/dayjs-datetime-formats-example.component';

const routes: Routes = [
    {
        path: '',
        component: DayjsDatetimeAdapterHeaderComponent,
        children: [
            { path: '', component: DayjsDatetimeAdapterDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.dayjsDatetimeAdapter } }
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
        DayjsDatetimeAdapterModule,
        DatePickerModule,
        DatetimePickerModule
    ],
    exports: [RouterModule],
    declarations: [
        DayjsDatetimeAdapterDocsComponent,
        DayjsDatetimeAdapterHeaderComponent,
        DatePickerDayjsAdapterExampleComponent,
        DayjsAdapterOptionsExampleComponent,
        DayjsDatetimeFormatsExampleComponent
    ],
    providers: [{ provide: 'CURRENT_LIB', useValue: 'datetime-adapter' }]
})
export class DayjsDatetimeAdapterDocsModule {}
