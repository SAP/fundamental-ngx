import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from '@fundamental-ngx/core/button';
import { IconModule } from '@fundamental-ngx/core/icon';
import { SelectModule } from '@fundamental-ngx/core/select';
import { FormModule } from '@fundamental-ngx/core/form';
import { OnlyDigitsModule } from '@fundamental-ngx/core/utils';

import { PaginationComponent } from './pagination.component';
import { PaginationService } from './pagination.service';

@NgModule({
    declarations: [PaginationComponent],
    imports: [CommonModule, ButtonModule, IconModule, SelectModule, FormsModule, FormModule, OnlyDigitsModule],
    providers: [PaginationService],
    exports: [PaginationComponent]
})
export class PaginationModule {}
