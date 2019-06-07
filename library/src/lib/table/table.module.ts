import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableDirective } from './table.directive';
import { ColumnSortableDirective } from './column-sortable.directive';
import { TableResponsiveWrapperDirective } from './table-responsive-wrapper.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [TableDirective, TableResponsiveWrapperDirective, ColumnSortableDirective],
    exports: [TableDirective, TableResponsiveWrapperDirective, ColumnSortableDirective]
})
export class TableModule {}
