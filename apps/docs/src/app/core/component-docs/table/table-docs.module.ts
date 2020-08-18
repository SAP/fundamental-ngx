import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationPageModule } from '../../../documentation/shared-documentation-page.module';
import { API_FILES } from '../../api-files';
import { TableDocsHeaderComponent } from './table-docs-header/table-docs-header.component';
import { TableDocsComponent } from './table-docs.component';
import { TableExampleComponent } from './examples/table-example.component';
import { TableColumnSortingExampleComponent } from './examples/table-column-sorting-example.component';
import { TableCdkExampleComponent } from './examples/table-cdk-example.component';
import { TableResponsiveExampleComponent } from './examples/table-responsive-example.component';
import { TableCheckboxesExampleComponent } from './examples/table-checkboxes-example.component';
import { TableCustomColumnsExampleComponent } from './examples/table-custom-columns-example/table-custom-columns-example.component';
import {
    CheckboxModule,
    DialogModule,
    FormModule,
    InputGroupModule,
    ListModule,
    ObjectStatusModule,
    PaginationModule,
    PopoverModule,
    TableModule,
    ToolbarModule
} from '@fundamental-ngx/core';
import { TableWithoutBordersExampleComponent } from './examples/table-without-borders-example.component';
import { TableFooterExampleComponent } from './examples/table-footer-example.component';
import { TableActivableExampleComponent } from './examples/table-activable-example.component';
import { TableSemanticExampleComponent } from './examples/table-semantic-example.component';
import { TablePopinExampleComponent } from './examples/table-popin-example/table-popin-example.component';
import { TablePaginationExampleComponent } from './examples/table-pagination-example.component';
import { SortTableByPipe } from './examples/table-example-sort.pipe';
import { FilterTableByPipe } from './examples/table-example-filter.pipe';
import { TableToolbarExampleComponent } from './examples/table-toolbar-example.component';
import { TableFilterPipe } from './examples/table-custom-columns-example/table-filter.pipe';
import { TableCustomDialogComponent } from './examples/table-custom-columns-example/table-custom-dialog.component';
import { CdkTableModule } from '@angular/cdk/table';
import { DragDropModule } from '@angular/cdk/drag-drop';

const routes: Routes = [
    {
        path: '',
        component: TableDocsHeaderComponent,
        children: [
            {path: '', component: TableDocsComponent},
            {path: 'api', component: ApiComponent, data: {content: API_FILES.table}}
        ]
    }
];

@NgModule({
    imports: [
        FormModule,
        ListModule,
        TableModule,
        DialogModule,
        PopoverModule,
        ToolbarModule,
        DragDropModule,
        CdkTableModule,
        CheckboxModule,
        InputGroupModule,
        PaginationModule,
        ObjectStatusModule,
        SharedDocumentationPageModule,
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule, SortTableByPipe, FilterTableByPipe],
    declarations: [
        TableDocsComponent,
        TableExampleComponent,
        TableColumnSortingExampleComponent,
        TableDocsHeaderComponent,
        TableCdkExampleComponent,
        TableResponsiveExampleComponent,
        TableCheckboxesExampleComponent,
        TableWithoutBordersExampleComponent,
        TableFooterExampleComponent,
        TableActivableExampleComponent,
        TableSemanticExampleComponent,
        TablePopinExampleComponent,
        TablePaginationExampleComponent,
        TableToolbarExampleComponent,
        FilterTableByPipe,
        SortTableByPipe,
        TableCustomColumnsExampleComponent,
        TableFilterPipe,
        TableCustomDialogComponent
    ],
    entryComponents: [
        TableCustomDialogComponent
    ]
})
export class TableDocsModule {
}
