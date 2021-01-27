import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VariantManagementComponent } from './variant-management.component';
import {
    BarModule, ButtonModule,
    CardModule,
    CheckboxModule,
    DialogModule,
    FormModule, IconModule, InputGroupModule,
    ListModule,
    PopoverModule,
    SelectModule, TableModule, TitleModule,
    ToolbarModule
} from '@fundamental-ngx/core';
import { RadioModule } from '../radio/radio.module';
import { FormsModule } from '@angular/forms';

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
        ButtonModule
    ],
    exports: [
        VariantManagementComponent
    ]
})
export class VariantManagementModule { }
