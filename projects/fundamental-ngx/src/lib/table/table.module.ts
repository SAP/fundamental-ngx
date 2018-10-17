import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableComponent } from './table.component';
import { TableHeaderComponent } from './table-header.component';
import { TableBodyComponent } from './table-body.component';

@NgModule({
    imports: [CommonModule],
    declarations: [TableComponent, TableHeaderComponent, TableBodyComponent],
    exports: [TableComponent, TableHeaderComponent, TableBodyComponent]
})
export class TableModule {}
