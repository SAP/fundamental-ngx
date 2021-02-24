import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { VariantManagementComponent } from './variant-management.component';
import {
    BarModule,
    ButtonModule,
    CardModule,
    CheckboxModule,
    DialogModule,
    FormModule,
    IconModule,
    InputGroupModule,
    ListModule,
    PopoverModule,
    SelectModule,
    TableModule,
    TitleModule,
    ToolbarModule,
    RadioModule,
    PipeModule,
    MessageStripModule
} from '@fundamental-ngx/core';

@NgModule({
    declarations: [
        VariantManagementComponent
    ],
    imports: [
        CommonModule,
        SelectModule,
        CardModule,
        ListModule,
        ToolbarModule,
        PopoverModule,
        BarModule,
        DialogModule,
        FormModule,
        CheckboxModule,
        InputGroupModule,
        TableModule,
        IconModule,
        RadioModule,
        FormsModule,
        TitleModule,
        ButtonModule,
        PipeModule,
        MessageStripModule
    ],
    exports: [
        VariantManagementComponent
    ]
})
export class VariantManagementModule { }
