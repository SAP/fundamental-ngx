import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableDirective } from './table.directive';
import { ColumnSortableDirective } from './column-sortable.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [TableDirective, ColumnSortableDirective],
    exports: [TableDirective, ColumnSortableDirective]
})
export class TableModule {}
