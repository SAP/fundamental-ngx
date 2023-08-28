import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { API_FILES } from '@fundamental-ngx/docs/core/shared';
import { ApiComponent, currentComponentProvider, SharedDocumentationPageModule } from '@fundamental-ngx/docs/shared';

import { RepeatModule } from '@fundamental-ngx/cdk/utils';
import { BarModule } from '@fundamental-ngx/core/bar';
import { BusyIndicatorModule } from '@fundamental-ngx/core/busy-indicator';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { CalendarModule } from '@fundamental-ngx/core/calendar';
import { CardModule } from '@fundamental-ngx/core/card';
import { FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { InfoLabelModule } from '@fundamental-ngx/core/info-label';
import { LinkModule } from '@fundamental-ngx/core/link';
import { ListModule } from '@fundamental-ngx/core/list';
import { MenuModule } from '@fundamental-ngx/core/menu';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import { QuickViewModule } from '@fundamental-ngx/core/quick-view';
import { SelectModule } from '@fundamental-ngx/core/select';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';
import { TableModule } from '@fundamental-ngx/core/table';
import { ToolbarModule } from '@fundamental-ngx/core/toolbar';
import { CardDocsComponent } from './card-docs.component';
import { CardHeaderComponent } from './card-header/card-header.component';
import { BarChartListCardExampleComponent } from './examples/bar-chart-list-card/bar-chart-list-card-example.component';
import { CardBarComponent } from './examples/bar-chart-list-card/card-bar.component';
import { CardCalendarExampleComponent } from './examples/calendar-card/card-calendar-example.component';
import { CardCompactExampleComponent } from './examples/card-compact-example.component';
import { CardExampleComponent } from './examples/card-example.component';
import { CardFooterExampleComponent } from './examples/card-footer-example.component';
import { CardKpiExampleComponent } from './examples/card-kpi-example.component';
import { CardLoaderExampleComponent } from './examples/card-loader-example.component';
import { CardLoadingExampleComponent } from './examples/card-loading/card-loading-example.component';
import { CardTableExampleComponent } from './examples/card-table-example.component';
import { CardLinkListExampleComponent } from './examples/link-list-card/card-link-list-example.component';
import { CardListExampleComponent } from './examples/list-card/card-list-example.component';
import { CardObjectExampleComponent } from './examples/object-card/card-object-example.component';
import { CardQuickViewExampleComponent } from './examples/quick-view-card/card-quick-view-example.component';

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
        SelectModule,
        MenuModule,
        LinkModule,
        SkeletonModule,
        RepeatModule,
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
        CardLinkListExampleComponent,
        CardLoadingExampleComponent
    ],
    exports: [RouterModule],
    providers: [currentComponentProvider('card')]
})
export class CardDocsModule {}
