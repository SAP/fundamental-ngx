import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableDirective } from './table.directive';
import { ColumnSortableDirective } from './column-sortable.directive';
import { TableFixedDirective } from './table-fixed.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [TableDirective, TableFixedDirective, ColumnSortableDirective],
    exports: [TableDirective, TableFixedDirective, ColumnSortableDirective]
})
export class TableModule {}
