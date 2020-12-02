import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PopoverModule, TokenModule, PipeModule } from '@fundamental-ngx/core';

import { PlatformInputGroupModule } from '../input-group/input-group.module';
import { PlatformMultiInputComponent } from './multi-input.component';
import { PlatformListModule } from '../../list/list.module';
import { StandardListItemModule } from '../../list/standard-list-item/standard-list-item.module';
import { PlatformButtonModule } from '../../button/button.module';

@NgModule({
    declarations: [PlatformMultiInputComponent],
    imports: [
        CommonModule,
        FormsModule,
        PlatformInputGroupModule,
        PopoverModule,
        PlatformListModule,
        StandardListItemModule,
        TokenModule,
        PipeModule,
        PlatformButtonModule
    ],
    exports: [PlatformMultiInputComponent]
})
export class PlatformMultiInputModule {}
