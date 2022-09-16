import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';
import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { TimeHeaderComponent } from './time-header/time-header.component';
import { TimeDocsComponent } from './time-docs.component';
import { TimeOnlyHoursExampleComponent } from './examples/time-only-hours-example.component';
import { TimeProgrammaticallyExampleComponent } from './examples/time-programmatically-example.component';
import { TimeNoSecondsExampleComponent } from './examples/time-no-seconds-example.component';
import { TimeFormExampleComponent } from './examples/time-form-example.component';
import { TimeExampleComponent } from './examples/time-example.component';
import { Time12ExampleComponent } from './examples/time-12-example.component';
import { TimeTwoDigitsExampleComponent } from './examples/time-two-digits-example/time-two-digits-example.component';
import { TimeSizesExampleComponent } from './examples/time-sizes-example.component';
import { TimeNoSpinnersExampleComponent } from './examples/time-no-spinners-example/time-no-spinners-example.component';
import { FormModule } from '@fundamental-ngx/core/form';
import { FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { DeprecatedTimeContentDensityDirective, TimeModule } from '@fundamental-ngx/core/time';
import { moduleDeprecationsProvider } from '@fundamental-ngx/core/utils';

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
    imports: [RouterModule.forChild(routes), SharedDocumentationPageModule, FormModule, FdDatetimeModule, TimeModule],
    exports: [RouterModule],
    declarations: [
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
    providers: [moduleDeprecationsProvider(DeprecatedTimeContentDensityDirective), currentComponentProvider('time')]
})
export class TimeDocsModule {}
