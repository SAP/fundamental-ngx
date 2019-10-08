import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComboboxModule, PopoverModule, MenuModule } from '@fundamental-ngx/core';
import { PlatformSearchInputComponent } from './search-input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, FormsModule, ComboboxModule, PopoverModule, MenuModule],
    exports: [PlatformSearchInputComponent],
    declarations: [PlatformSearchInputComponent]
})
export class PlatformSearchInputModule { }
