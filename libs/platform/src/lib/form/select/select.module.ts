import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from '@fundamental-ngx/core/button';
import { DynamicComponentService, TemplateModule } from '@fundamental-ngx/core/utils';
import { IconModule } from '@fundamental-ngx/core/icon';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { ListModule } from '@fundamental-ngx/core/list';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { SelectModule } from '@fundamental-ngx/core/select';

import { SelectComponent } from './select/select.component';
import { PlatformAutoCompleteModule } from '../auto-complete/auto-complete.module';
import { OptionComponent } from './option/option.component';

@NgModule({
    declarations: [SelectComponent, OptionComponent],
    imports: [
        CommonModule,
        FormsModule,
        InputGroupModule,
        ListModule,
        ButtonModule,
        PlatformAutoCompleteModule,
        PopoverModule,
        IconModule,
        ReactiveFormsModule,
        SelectModule
    ],
    providers: [DynamicComponentService],
    exports: [SelectComponent, OptionComponent, TemplateModule]
})
export class PlatformSelectModule {}
