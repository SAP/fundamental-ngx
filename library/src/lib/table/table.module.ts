import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './table.component';
import { ColumnSortableDirective } from './column-sortable.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [TableComponent, ColumnSortableDirective],
    exports: [TableComponent, ColumnSortableDirective]
})
export class TableModule {}
