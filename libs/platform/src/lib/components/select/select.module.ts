import { NgModule } from '@angular/core';
import { SelectComponent } from './select.component';
import { OptionComponent } from './option/option.component';
import { PopoverModule } from '@fundamental-ngx/core';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        SelectComponent,
        OptionComponent
    ],
    exports: [
        SelectComponent,
        OptionComponent
    ],
    imports: [
        CommonModule,
        PopoverModule
    ]
})
export class SelectModule { }
