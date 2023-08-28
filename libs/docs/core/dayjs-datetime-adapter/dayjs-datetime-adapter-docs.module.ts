import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DatePickerModule } from '@fundamental-ngx/core/date-picker';
import { DatetimePickerModule } from '@fundamental-ngx/core/datetime-picker';
import { FormModule } from '@fundamental-ngx/core/form';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { DayjsDatetimeAdapterModule } from '@fundamental-ngx/datetime-adapter';

import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { DayjsDatetimeAdapterDocsComponent } from './dayjs-datetime-adapter-docs.component';
import { DayjsDatetimeAdapterHeaderComponent } from './dayjs-datetime-adapter-header/dayjs-datetime-adapter-header.component';
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
        DatetimePickerModule,
        DayjsDatetimeAdapterDocsComponent,
        DayjsDatetimeAdapterHeaderComponent,
        DatePickerDayjsAdapterExampleComponent,
        DayjsAdapterOptionsExampleComponent,
        DayjsDatetimeFormatsExampleComponent
    ],
    exports: [RouterModule],
    providers: [
        {
            provide: 'CURRENT_LIB',
            useValue: 'datetime-adapter'
        },
        currentComponentProvider('dayjs-datetime-adapter')
    ]
})
export class DayjsDatetimeAdapterDocsModule {}
