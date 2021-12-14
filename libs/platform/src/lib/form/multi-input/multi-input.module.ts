import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PipeModule } from '@fundamental-ngx/core/utils';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';
import { FormModule } from '@fundamental-ngx/core/form';
import { TokenModule } from '@fundamental-ngx/core/token';
import { PlatformListModule, StandardListItemModule } from '@fundamental-ngx/platform/list';
import { PopoverModule } from '@fundamental-ngx/core/popover';

import { PlatformMultiInputComponent } from './multi-input.component';
import { PlatformAutoCompleteModule } from '../auto-complete/auto-complete.module';

@NgModule({
    declarations: [PlatformMultiInputComponent],
    imports: [
        CommonModule,
        FormsModule,
        PlatformListModule,
        StandardListItemModule,
        TokenModule,
        PipeModule,
        PopoverModule,
        InputGroupModule,
        PlatformAutoCompleteModule,
        FormModule
    ],
    exports: [PlatformMultiInputComponent]
})
export class PlatformMultiInputModule {}
