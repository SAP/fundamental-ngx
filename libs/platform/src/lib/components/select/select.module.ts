import { NgModule } from '@angular/core';
import { SelectComponent } from './select.component';
import { OptionComponent } from './option/option.component';
import { PopoverModule } from '@fundamental-ngx/core';
import { CommonModule } from '@angular/common';
import { MenuModule, PipeModule } from '@fundamental-ngx/core';

@NgModule
({
    declarations: [ SelectComponent, OptionComponent ],
    exports: [ SelectComponent, OptionComponent ],
    imports: [ CommonModule, PopoverModule, PipeModule, MenuModule ]
})

export class SelectModule { }
