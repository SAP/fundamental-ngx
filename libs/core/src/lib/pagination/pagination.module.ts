import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginationComponent } from './pagination.component';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { PaginationService } from './pagination.service';
import { PaginationReversePipe } from './pagination-reverse.pipe';

@NgModule({
    declarations: [PaginationComponent, PaginationReversePipe],
    imports: [CommonModule, ButtonModule, IconModule],
    providers: [PaginationService],
    exports: [PaginationComponent, PaginationReversePipe]
})
export class PaginationModule {}
