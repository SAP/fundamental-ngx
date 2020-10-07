import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CheckboxModule, TableModule, ToolbarModule } from '@fundamental-ngx/core';

import { TableComponent } from './table.component';
import { TableWrapperComponent } from './table-wrapper.component';
import { TableColumnComponent } from './table-column/table-column.component';
import { TableToolbarComponent } from './table-toolbar/table-toolbar.component';
import { TableToolbarActionsComponent } from './table-toolbar-actions/table-toolbar-actions.component';
import { TableBodyDirective } from './directives/table-body.directive';
import { FdpCellDef, FdpTableCell } from './directives/table-cell.directive';
import { FdpHeaderCellDef, FdpTableHeader } from './directives/table-header.directive';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        TableModule,
        ToolbarModule,
        CheckboxModule
    ],
    declarations: [
        TableComponent,
        TableWrapperComponent,
        TableColumnComponent,
        TableToolbarComponent,
        TableToolbarActionsComponent,
        TableBodyDirective,
        FdpTableCell,
        FdpCellDef,
        FdpTableHeader,
        FdpHeaderCellDef
    ],
    exports: [
        TableComponent,
        TableWrapperComponent,
        TableColumnComponent,
        TableToolbarComponent,
        TableToolbarActionsComponent,
        TableBodyDirective,
        FdpTableCell,
        FdpCellDef,
        FdpTableHeader,
        FdpHeaderCellDef
    ],
    providers: []
})
export class PlatformTableModule {}
