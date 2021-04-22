import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';

import { PipeModule, InputGroupModule, FormModule, TokenModule } from '@fundamental-ngx/core';

import { PlatformMultiInputComponent } from './multi-input.component';
import { PlatformListModule } from '../../list/list.module';
import { StandardListItemModule } from '../../list/standard-list-item/standard-list-item.module';
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
        OverlayModule,
        InputGroupModule,
        PlatformAutoCompleteModule,
        FormModule
    ],
    exports: [PlatformMultiInputComponent]
})
export class PlatformMultiInputModule {}
