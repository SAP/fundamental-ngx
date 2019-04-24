import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComboboxInputComponent } from './combobox-input.component';

import { PopoverModule } from '../popover/popover.module';
import { SearchInputModule } from '../search-input/search-input.module';
import { FormsModule } from '@angular/forms';
import { MenuModule } from '../menu/menu.module';
import { PipeModule } from '../utils/pipes/pipe.module';

@NgModule({
    declarations: [ComboboxInputComponent],
    imports: [CommonModule, PopoverModule, SearchInputModule, FormsModule, MenuModule, PipeModule],
    exports: [ComboboxInputComponent]
})
export class ComboboxInputModule {}
