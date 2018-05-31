import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Table } from './table';


@NgModule({
  declarations: [
    Table
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    Table
  ]
})
export class TableModule { }
