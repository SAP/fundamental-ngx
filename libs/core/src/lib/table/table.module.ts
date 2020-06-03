import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './table.component';
import { ColumnSortableDirective } from './column-sortable.directive';
import { TableResponsiveWrapperDirective } from './table-responsive-wrapper.directive';
import { TableHeaderDirective } from './directives/table-header.directive';
import { TableBodyDirective } from './directives/table-body.directive';
import { TableRowDirective } from './directives/table-row.directive';
import { TableCellDirective } from './directives/table-cell.directive';
import { TableWrapperComponent } from './table-wrapper.component';
import { TableNoHorizontalBordersDirective, TableNoVerticalBordersDirective } from './directives/table-border-directives';
import { TableFooterDirective } from './directives/table-footer.directive';

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
        TableNoHorizontalBordersDirective,
        TableNoVerticalBordersDirective
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
        TableNoHorizontalBordersDirective,
        TableNoVerticalBordersDirective
    ]
})
export class TableModule {}
