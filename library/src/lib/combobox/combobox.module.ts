import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PopoverModule } from '../popover/popover.module';
import { FormsModule } from '@angular/forms';
import { MenuModule } from '../menu/menu.module';
import { PipeModule } from '../utils/pipes/pipe.module';
import { ComboboxComponent } from './combobox.component';
import { ButtonModule } from '../button/button.module';

@NgModule({
    declarations: [ComboboxComponent],
    imports: [CommonModule, PopoverModule, FormsModule, MenuModule, PipeModule, ButtonModule],
    exports: [ComboboxComponent]
})
export class ComboboxModule {}
