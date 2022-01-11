import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperimentalSelectComponent } from './select.component';
import { FormsModule } from '@angular/forms';
import { ExperimentalOptionComponent } from './option/option.component';
import { ListModule } from '@fundamental-ngx/core/list';
import { PopoverModule } from '@fundamental-ngx/core/popover';

@NgModule({
    declarations: [ExperimentalSelectComponent, ExperimentalOptionComponent],
    imports: [CommonModule, FormsModule, PopoverModule, ListModule],
    exports: [ExperimentalSelectComponent, ExperimentalOptionComponent]
})
export class ExperimentalSelectModule {}
