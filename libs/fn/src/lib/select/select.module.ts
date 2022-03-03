import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListModule } from '@fundamental-ngx/core/list';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { SelectComponent } from './select.component';
import { OptionComponent } from './option/option.component';

@NgModule({
    declarations: [SelectComponent, OptionComponent],
    imports: [CommonModule, FormsModule, PopoverModule, ListModule],
    exports: [SelectComponent, OptionComponent]
})
export class SelectModule {}
