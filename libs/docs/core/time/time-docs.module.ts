import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { FormModule } from '@fundamental-ngx/core/form';
import { TimeModule } from '@fundamental-ngx/core/time';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { Time12ExampleComponent } from './examples/time-12-example.component';
import { TimeExampleComponent } from './examples/time-example.component';
import { TimeFormExampleComponent } from './examples/time-form-example.component';
import { TimeNoSecondsExampleComponent } from './examples/time-no-seconds-example.component';
import { TimeNoSpinnersExampleComponent } from './examples/time-no-spinners-example/time-no-spinners-example.component';
import { TimeOnlyHoursExampleComponent } from './examples/time-only-hours-example.component';
import { TimeProgrammaticallyExampleComponent } from './examples/time-programmatically-example.component';
import { TimeSizesExampleComponent } from './examples/time-sizes-example.component';
import { TimeTwoDigitsExampleComponent } from './examples/time-two-digits-example/time-two-digits-example.component';
import { TimeDocsComponent } from './time-docs.component';
import { TimeHeaderComponent } from './time-header/time-header.component';

const routes: Routes = [
    {
        path: '',
        component: TimeHeaderComponent,
        children: [
            { path: '', component: TimeDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.time } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        FormModule,
        FdDatetimeModule,
        TimeModule,
        TimeDocsComponent,
        TimeHeaderComponent,
        TimeExampleComponent,
        Time12ExampleComponent,
        TimeFormExampleComponent,
        TimeTwoDigitsExampleComponent,
        TimeOnlyHoursExampleComponent,
        TimeNoSecondsExampleComponent,
        TimeProgrammaticallyExampleComponent,
        TimeNoSpinnersExampleComponent,
        TimeSizesExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('time')]
})
export class TimeDocsModule {}
