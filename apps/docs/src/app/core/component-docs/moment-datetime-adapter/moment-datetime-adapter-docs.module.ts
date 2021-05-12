import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
    DatePickerModule,
    DatetimePickerModule,
    FormModule,
    InputGroupModule,
    SegmentedButtonModule
} from '@fundamental-ngx/core';
import { MomentDatetimeModule } from '@fundamental-ngx/moment-adapter'

import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { MomentDatetimeAdapterHeaderComponent } from './moment-datetime-adapter-header/moment-datetime-adapter-header.component';
import { MomentDatetimeAdapterDocsComponent } from './moment-datetime-adapter-docs.component';
import { DatePickerMomentAdapterExampleComponent } from './examples/date-picker-moment-adapter-example.component';
import { MomentAdapterOptionsExampleComponent } from './examples/moment-adapter-options-example.component';
import { MomentDatetimeFormatsExampleComponent } from './examples/moment-datetime-formats-example.component';

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
        DatetimePickerModule
    ],
    exports: [RouterModule],
    declarations: [
        MomentDatetimeAdapterDocsComponent,
        MomentDatetimeAdapterHeaderComponent,
        DatePickerMomentAdapterExampleComponent,
        MomentAdapterOptionsExampleComponent,
        MomentDatetimeFormatsExampleComponent
    ],
})
export class MomentDatetimeAdapterDocsModule {}
