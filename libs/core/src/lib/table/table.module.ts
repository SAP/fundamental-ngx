import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './table.component';
import { ColumnSortableDirective } from './directives/column-sortable.directive';
import { TableResponsiveWrapperDirective } from './directives/table-responsive-wrapper.directive';
import { TableHeaderDirective } from './directives/table-header.directive';
import { TableBodyDirective } from './directives/table-body.directive';
import { TableRowDirective } from './directives/table-row.directive';
import { TableCellDirective } from './directives/table-cell.directive';
import { TableWrapperComponent } from './table-wrapper.component';
import { TableFooterDirective } from './directives/table-footer.directive';
import { TableCellCheckboxDirective } from './directives/table-cell-checkbox.directive';
import { TableStatusIndicatorDirective } from './directives/table-status-indicator.directive';
import { TablePopoverDirective } from './directives/table-popover.directive';
import { TableInnerDirective } from './directives/table-inner.directive';
import { TableIconDirective } from './directives/table-icon.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [
        TableComponent,
        TableResponsiveWrapperDirective,
        ColumnSortableDirective,
        TableWrapperComponent,
        TableHeaderDirective,
        TableFooterDirective,
        TableBodyDirective,
        TableRowDirective,
        TableCellDirective,
        TableCellCheckboxDirective,
        TableStatusIndicatorDirective,
        TablePopoverDirective,
        TableInnerDirective,
        TableIconDirective
    ],
    exports: [
        TableComponent,
        TableResponsiveWrapperDirective,
        ColumnSortableDirective,
        TableWrapperComponent,
        TableHeaderDirective,
        TableFooterDirective,
        TableBodyDirective,
        TableRowDirective,
        TableCellDirective,
        TableCellCheckboxDirective,
        TableStatusIndicatorDirective,
        TablePopoverDirective,
        TableInnerDirective,
        TableIconDirective
    ]
})
export class TableModule {}
