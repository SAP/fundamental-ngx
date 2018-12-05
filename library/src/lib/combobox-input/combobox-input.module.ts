import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComboboxInputComponent } from './combobox-input.component';

import { PopoverModule } from '../popover/popover.module';

@NgModule({
    declarations: [ComboboxInputComponent],
    imports: [CommonModule, PopoverModule],
    exports: [ComboboxInputComponent]
})
export class ComboboxInputModule {}
