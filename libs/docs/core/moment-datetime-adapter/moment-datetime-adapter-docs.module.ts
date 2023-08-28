import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DatePickerModule } from '@fundamental-ngx/core/date-picker';
import { DatetimePickerModule } from '@fundamental-ngx/core/datetime-picker';
import { FormModule } from '@fundamental-ngx/core/form';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { MomentDatetimeModule } from '@fundamental-ngx/moment-adapter';

import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import {
    ApiComponent,
    CURRENT_LIB,
    currentComponentProvider,
    SharedDocumentationPageModule
} from '@fundamental-ngx/docs/shared';
import { DatePickerMomentAdapterExampleComponent } from './examples/date-picker-moment-adapter-example.component';
import { MomentAdapterOptionsExampleComponent } from './examples/moment-adapter-options-example.component';
import { MomentDatetimeFormatsExampleComponent } from './examples/moment-datetime-formats-example.component';
import { MomentDatetimeAdapterDocsComponent } from './moment-datetime-adapter-docs.component';
import { MomentDatetimeAdapterHeaderComponent } from './moment-datetime-adapter-header/moment-datetime-adapter-header.component';

const routes: Routes = [
    {
        path: '',
        component: MomentDatetimeAdapterHeaderComponent,
        children: [
            { path: '', component: MomentDatetimeAdapterDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.momentDatetimeAdapter } }
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
        MomentDatetimeModule,
        DatePickerModule,
        DatetimePickerModule,
        MomentDatetimeAdapterDocsComponent,
        MomentDatetimeAdapterHeaderComponent,
        DatePickerMomentAdapterExampleComponent,
        MomentAdapterOptionsExampleComponent,
        MomentDatetimeFormatsExampleComponent
    ],
    exports: [RouterModule],
    providers: [
        { provide: CURRENT_LIB, useValue: 'moment-adapter' },
        currentComponentProvider('moment-datetime-adapter')
    ]
})
export class MomentDatetimeAdapterDocsModule {}
