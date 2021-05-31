import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { API_FILES } from '../../api-files';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

import { CardHeaderComponent } from './card-header/card-header.component';
import { CardDocsComponent } from './card-docs.component';
import { CardExampleComponent } from './examples/card-example.component';
import { CardCompactExampleComponent } from './examples/card-compact-example.component';
import { CardLoaderExampleComponent } from './examples/card-loader-example.component';
import { CardFooterExampleComponent } from './examples/card-footer-example.component';
import { CardKpiExampleComponent } from './examples/card-kpi-example.component';
import { CardTableExampleComponent } from './examples/card-table-example.component';
import { BarChartListCardExampleComponent } from './examples/bar-chart-list-card/bar-chart-list-card-example.component';
import { CardBarComponent } from './examples/bar-chart-list-card/card-bar.component';
import { CardObjectExampleComponent } from './examples/object-card/card-object-example.component';
import { CardCalendarExampleComponent } from './examples/calendar-card/card-calendar-example.component';
import { CardQuickViewExampleComponent } from './examples/quick-view-card/card-quick-view-example.component';
import { CardListExampleComponent } from './examples/list-card/card-list-example.component';
import { CardLinkListExampleComponent } from './examples/link-list-card/card-link-list-example.component';
import { CardModule } from '@fundamental-ngx/core/card';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { ListModule } from '@fundamental-ngx/core/list';
import { TableModule } from '@fundamental-ngx/core/table';
import { CalendarModule } from '@fundamental-ngx/core/calendar';
import { FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { QuickViewModule } from '@fundamental-ngx/core/quick-view';
import { InfoLabelModule } from '@fundamental-ngx/core/info-label';
import { SelectModule } from '@fundamental-ngx/core/select';

const routes: Routes = [
    {
        path: '',
        component: CardHeaderComponent,
        children: [
            { path: '', component: CardDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.card } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        CardModule,
        BarModule,
        ButtonModule,
        BusyIndicatorModule,
        ObjectStatusModule,
        ToolbarModule,
        ListModule,
        TableModule,
        CalendarModule,
        FdDatetimeModule,
        QuickViewModule,
        InfoLabelModule,
        SelectModule
    ],
    exports: [RouterModule],
    declarations: [
        CardDocsComponent,
        CardHeaderComponent,
        CardExampleComponent,
        CardCompactExampleComponent,
        CardLoaderExampleComponent,
        CardFooterExampleComponent,
        CardKpiExampleComponent,
        CardTableExampleComponent,
        BarChartListCardExampleComponent,
        CardBarComponent,
        CardObjectExampleComponent,
        CardCalendarExampleComponent,
        CardQuickViewExampleComponent,
        CardListExampleComponent,
        CardLinkListExampleComponent
    ]
})
export class CardDocsModule {}
