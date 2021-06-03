import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MultiInputComponent } from './multi-input.component';
import { TokenModule } from '@fundamental-ngx/core/token';
import { FormsModule } from '@angular/forms';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { PipeModule } from '@fundamental-ngx/core/utils';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { FormModule } from '@fundamental-ngx/core/form';
import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { ListModule } from '@fundamental-ngx/core/list';
import { LinkModule } from '@fundamental-ngx/core/link';

@NgModule({
    declarations: [MultiInputComponent],
    imports: [
        CommonModule,
        TokenModule,
        FormsModule,
        ListModule,
        PopoverModule,
        PipeModule,
        InputGroupModule,
        FormModule,
        CheckboxModule,
        LinkModule
    ],
    exports: [MultiInputComponent]
})
export class MultiInputModule {
}
