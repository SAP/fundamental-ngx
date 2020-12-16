import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';
import { API_FILES } from '../../api-files';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';

import { ObjectStatusModule, TableModule, LayoutPanelModule } from '@fundamental-ngx/core';
import {
    PlatformButtonModule,
    PlatformInputModule,
    PlatformSearchFieldModule,
    PlatformTableModule
} from '@fundamental-ngx/platform';

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
        PlatformTableFreezableExampleComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlatformTableDocsModule {}
