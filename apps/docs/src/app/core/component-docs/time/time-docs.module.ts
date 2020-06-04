import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { API_FILES } from '../../api-files';
import { TimeHeaderComponent } from './time-header/time-header.component';
import { TimeDocsComponent } from './time-docs.component';
import { TimeOnlyHoursExampleComponent } from './examples/time-only-hours-example.component';
import { TimeNoSpinnersExampleComponent } from './examples/time-no-spinners-example.component';
import { TimeNoSecondsExampleComponent } from './examples/time-no-seconds-example.component';
import { TimeI18nExampleComponent } from './examples/time-i18n-example.component';
import { TimeFormExampleComponent } from './examples/time-form-example.component';
import { TimeExampleComponent } from './examples/time-example.component';
import { TimeDisabledExampleComponent } from './examples/time-disabled-example.component';
import { Time12ExampleComponent } from './examples/time-12-example.component';
import { TimeTwoDigitsExampleComponent } from './examples/time-two-digits-example/time-two-digits-example.component';
import { TimeModule } from '@fundamental-ngx/core';

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
    imports: [RouterModule.forChild(routes), SharedDocumentationModule, TimeModule],
    exports: [RouterModule],
    declarations: [
        TimeDocsComponent,
        TimeHeaderComponent,
        TimeExampleComponent,
        Time12ExampleComponent,
        TimeI18nExampleComponent,
        TimeFormExampleComponent,
        TimeDisabledExampleComponent,
        TimeTwoDigitsExampleComponent,
        TimeOnlyHoursExampleComponent,
        TimeNoSecondsExampleComponent,
        TimeNoSpinnersExampleComponent
    ]
})
export class TimeDocsModule {}
