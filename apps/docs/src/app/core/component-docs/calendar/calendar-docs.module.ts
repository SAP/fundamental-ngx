import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { CalendarHeaderComponent } from './calendar-header/calendar-header.component';
import { CalendarDocsComponent } from './calendar-docs.component';
import { CalendarRangeExampleComponent } from './examples/calendar-range-example.component';
import { CalendarSingleExampleComponent } from './examples/calendar-single-example.component';
import { CalendarMondayStartExampleComponent } from './examples/calendar-monday-start-example.component';
import { CalendarFormExamplesComponent } from './examples/calendar-form-example.component';
import { CalendarProgrammaticallyChangeExampleComponent } from './examples/calendar-programmatically-change-example.component';
import { CalendarI18nExampleComponent } from './examples/calendar-i18n-example.component';
import { CalendarI18nMomentExampleComponent } from './examples/calendar--i18n-moment-example.component';
import { SegmentedButtonModule, CalendarModule } from '@fundamental-ngx/core';

const routes: Routes = [
    {
        path: '',
        component: CalendarHeaderComponent,
        children: [
            { path: '', component: CalendarDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.calendar } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationModule,
        CalendarModule,
        SegmentedButtonModule
    ],
    exports: [RouterModule],
    declarations: [
        CalendarDocsComponent,
        CalendarHeaderComponent,
        CalendarRangeExampleComponent,
        CalendarFormExamplesComponent,
        CalendarSingleExampleComponent,
        CalendarMondayStartExampleComponent,
        CalendarI18nExampleComponent,
        CalendarI18nMomentExampleComponent,
        CalendarProgrammaticallyChangeExampleComponent,
    ],
})
export class CalendarDocsModule {
}
