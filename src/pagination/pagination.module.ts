import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginationComponent } from './pagination.component';
import { ButtonModule } from '../button/button.module';
import { IconModule } from '../icon/icon.module';
import { PaginationService } from './pagination.service';

@NgModule({
    declarations: [PaginationComponent],
    imports: [CommonModule, ButtonModule, IconModule],
    providers: [PaginationService],
    exports: [PaginationComponent]
})
export class PaginationModule {}
