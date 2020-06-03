import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiComponent } from '../../../documentation/core-helpers/api/api.component';
import { SharedDocumentationModule } from '../../../documentation/shared-documentation.module';
import { API_FILES } from '../../api-files';
import { TableDocsHeaderComponent } from './table-docs-header/table-docs-header.component';
import { TableDocsComponent } from './table-docs.component';
import { TableExampleComponent } from './examples/table-example.component';
import { TableColumnSortingExampleComponent } from './examples/table-column-sorting-example.component';
import { TableCdkExampleComponent } from './examples/table-cdk-example.component';
import { TableResponsiveExampleComponent } from './examples/table-responsive-example.component';
import { TableCheckboxesExampleComponent } from './examples/table-checkboxes-example.component';
import { CheckboxModule, TableModule } from '@fundamental-ngx/core';
import { TableWithoutBordersExampleComponent } from './examples/table-without-borders-example.component';
import { TableFooterExampleComponent } from './examples/table-footer-example.component';

const routes: Routes = [
    {
        path: '',
        component: TableDocsHeaderComponent,
        children: [
            { path: '', component: TableDocsComponent },
            { path: 'api', component: ApiComponent, data: { content: API_FILES.table } }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes), SharedDocumentationModule, TableModule, CheckboxModule],
    exports: [RouterModule],
    declarations: [
        TableDocsComponent,
        TableExampleComponent,
        TableColumnSortingExampleComponent,
        TableDocsHeaderComponent,
        TableCdkExampleComponent,
        TableResponsiveExampleComponent,
        TableCheckboxesExampleComponent,
        TableWithoutBordersExampleComponent,
        TableFooterExampleComponent
    ]
})
export class TableDocsModule {}
