import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';

import { TableModule } from '@fundamental-ngx/core/table';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import { LayoutPanelModule } from '@fundamental-ngx/core/layout-panel';
import { FdDatetimeModule } from '@fundamental-ngx/core/datetime';
import { RtlService } from '@fundamental-ngx/core/utils';
import { PlatformButtonModule, PlatformInputModule, PlatformSearchFieldModule, PlatformTableModule } from '@fundamental-ngx/platform';

import { API_FILES } from '../../api-files';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

import { PlatformTableHeaderComponent } from './platform-table-header/platform-table-header.component';
import { PlatformTableDocsComponent } from './platform-table-docs.component';
import { PlatformTableDefaultExampleComponent } from './platform-table-examples/platform-table-default-example.component';
import { PlatformTableCustomColumnExampleComponent } from './platform-table-examples/platform-table-custom-column-example.component';
import { PlatformTableMultipleRowSelectionExampleComponent } from './platform-table-examples/platform-table-multiple-row-selection-example.component';
import { PlatformTableSingleRowSelectionExampleComponent } from './platform-table-examples/platform-table-single-row-selection-example.component';
import { PlatformTableSortableExampleComponent } from './platform-table-examples/platform-table-sortable-example.component';
import { PlatformTableFilterableExampleComponent } from './platform-table-examples/platform-table-filterable-example.component';
import { PlatformTableGroupableExampleComponent } from './platform-table-examples/platform-table-groupable-example.component';
import { PlatformTableFreezableExampleComponent } from './platform-table-examples/platform-table-freezable-example.component';
import { PlatformTablePageScrollingExampleComponent } from './platform-table-examples/platform-table-page-scrolling-example.component';
import { PlatformTableInitialStateExampleComponent } from './platform-table-examples/platform-table-initial-state-example.component';
import { PlatformTableP13ColumnsExampleComponent } from './platform-table-examples/platform-table-p13-columns-example.component';
import { PlatformTableP13FilterExampleComponent } from './platform-table-examples/platform-table-p13-filter-example.component';
import { PlatformTableP13GroupExampleComponent } from './platform-table-examples/platform-table-p13-group-example.component';
import { PlatformTableP13SortExampleComponent } from './platform-table-examples/platform-table-p13-sort-example.component';
import { PlatformTableTreeExampleComponent } from './platform-table-examples/platform-table-tree-example.component';
import { PlatformTableLoadingExampleComponent } from './platform-table-examples/platform-table-loading-example.component';
import { PlatformTableNavigatableRowIndicatorExampleComponent } from './platform-table-examples/platform-table-navigatable-row-indicator-example.component';
import { PlatformTableNavigatableRowButtonExampleComponent } from './platform-table-examples/platform-table-navigatable-row-button-example.component';
import { PlatformTableCustomWidthExampleComponent } from './platform-table-examples/platform-table-custom-width-example.component';
import { PlatformTableActivableExampleComponent } from './platform-table-examples/platform-table-activable-example.component';

const routes: Routes = [
    {
        path: '',
        component: PlatformTableHeaderComponent,
        children: [
            { path: '', component: PlatformTableDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.table } }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        SharedDocumentationPageModule,
        CdkTableModule,
        TableModule,
        PlatformTableModule,
        PlatformButtonModule,
        ObjectStatusModule,
        LayoutPanelModule,
        FdDatetimeModule,
        PlatformInputModule,
        PlatformSearchFieldModule
    ],
    exports: [RouterModule],
    declarations: [
        PlatformTableDocsComponent,
        PlatformTableHeaderComponent,
        PlatformTableDefaultExampleComponent,
        PlatformTableCustomColumnExampleComponent,
        PlatformTableSingleRowSelectionExampleComponent,
        PlatformTableMultipleRowSelectionExampleComponent,
        PlatformTableSortableExampleComponent,
        PlatformTableFilterableExampleComponent,
        PlatformTableGroupableExampleComponent,
        PlatformTableFreezableExampleComponent,
        PlatformTablePageScrollingExampleComponent,
        PlatformTableInitialStateExampleComponent,
        PlatformTableP13ColumnsExampleComponent,
        PlatformTableP13SortExampleComponent,
        PlatformTableP13FilterExampleComponent,
        PlatformTableP13GroupExampleComponent,
        PlatformTableTreeExampleComponent,
        PlatformTableLoadingExampleComponent,
        PlatformTableNavigatableRowIndicatorExampleComponent,
        PlatformTableNavigatableRowButtonExampleComponent,
        PlatformTableCustomWidthExampleComponent,
        PlatformTableNavigatableRowButtonExampleComponent,
        PlatformTableActivableExampleComponent
    ],
    providers: [RtlService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlatformTableDocsModule {}
