import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Pagination } from './pagination';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';

@NgModule({
  declarations: [Pagination],
  imports: [CommonModule, ButtonModule, IconModule],
  exports: [Pagination]
})
export class PaginationModule {}
