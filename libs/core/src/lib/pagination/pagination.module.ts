import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginationComponent } from './pagination.component';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { IconModule } from '@fundamental-ngx/core/icon';
import { SelectModule } from '@fundamental-ngx/core/select';
import { PaginationService } from './pagination.service';

@NgModule({
    declarations: [PaginationComponent],
    imports: [CommonModule, ButtonModule, IconModule, SelectModule],
    providers: [PaginationService],
    exports: [PaginationComponent]
})
export class PaginationModule {}
