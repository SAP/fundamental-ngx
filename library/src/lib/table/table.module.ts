import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './table.component';
import { TableHeaderComponent } from './table-header.component';
import { TableBodyComponent } from './table-body.component';
import { TableSortableDirective } from './table-sortable.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [TableComponent, TableHeaderComponent, TableBodyComponent, TableSortableDirective],
    exports: [TableComponent, TableHeaderComponent, TableBodyComponent, TableSortableDirective]
})
export class TableModule {}
