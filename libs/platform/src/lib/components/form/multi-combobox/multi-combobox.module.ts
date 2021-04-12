import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';

import {
    ButtonModule,
    CheckboxModule,
    DynamicComponentService,
    FormModule,
    InputGroupModule,
    ListModule,
    TemplateModule,
    TokenModule
} from '@fundamental-ngx/core';
import { MultiComboboxComponent } from './multi-combobox/multi-combobox.component';
import { PlatformAutoCompleteModule } from '../auto-complete/auto-complete.module';
import { PlatformComboboxModule } from '../combobox';
import { PlatformListModule } from '../../list/list.module';
import { StandardListItemModule } from '../../list/standard-list-item/standard-list-item.module';

@NgModule({
    declarations: [MultiComboboxComponent],
    imports: [
        CommonModule,
        FormsModule,
        CheckboxModule,
        InputGroupModule,
        TokenModule,
        ListModule,
        ButtonModule,
        FormModule,
        OverlayModule,
        PlatformListModule,
        StandardListItemModule,
        PlatformAutoCompleteModule,
        PlatformComboboxModule
    ],
    providers: [DynamicComponentService],
    exports: [MultiComboboxComponent, TemplateModule]
})
export class PlatformMultiComboboxModule {}
