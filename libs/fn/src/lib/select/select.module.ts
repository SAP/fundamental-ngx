import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListModule } from '@fundamental-ngx/core/list';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { SelectComponent } from './select.component';
import { OptionComponent } from './option/option.component';
import { SelectMenuDirective } from './select-menu.directive';

@NgModule({
    declarations: [SelectComponent, OptionComponent, SelectMenuDirective],
    imports: [CommonModule, FormsModule, PopoverModule, ListModule, OverlayModule],
    exports: [SelectComponent, OptionComponent, SelectMenuDirective]
})
export class SelectModule {}
