import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './table.component';
import { TableHeaderDirective } from './table-header.directive';
import { TableBodyDirective } from './table-body.directive';
import { ColumnSortableDirective } from './column-sortable.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [TableComponent, TableHeaderDirective, TableBodyDirective, ColumnSortableDirective],
    exports: [TableComponent, TableHeaderDirective, TableBodyDirective, ColumnSortableDirective]
})
export class TableModule {}
