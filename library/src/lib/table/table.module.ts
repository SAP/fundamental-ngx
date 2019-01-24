import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './table.component';
import { TableHeaderComponent } from './table-header.component';
import { TableBodyComponent } from './table-body.component';
import { ColumnSortableDirective } from './column-sortable.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [TableComponent, TableHeaderComponent, TableBodyComponent, ColumnSortableDirective],
    exports: [TableComponent, TableHeaderComponent, TableBodyComponent, ColumnSortableDirective]
})
export class TableModule {}
