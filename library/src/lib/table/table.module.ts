import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableDirective } from './table.component';
import { ColumnSortableDirective } from './column-sortable.directive';
import { CdkTableModule } from '@angular/cdk/table';

@NgModule({
    imports: [CommonModule, CdkTableModule],
    declarations: [TableDirective, ColumnSortableDirective],
    exports: [TableDirective, ColumnSortableDirective]
})
export class TableModule {}
