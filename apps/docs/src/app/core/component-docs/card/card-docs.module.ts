import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    CardModule,
    ButtonModule,
    BusyIndicatorModule,
    ObjectStatusModule,
    ToolbarModule,
    ListModule,
    TableModule
} from '@fundamental-ngx/core';

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
        ButtonModule,
        BusyIndicatorModule,
        ObjectStatusModule,
        ToolbarModule,
        ListModule,
        TableModule
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
        CardBarComponent
    ]
})
export class CardDocsModule {}
