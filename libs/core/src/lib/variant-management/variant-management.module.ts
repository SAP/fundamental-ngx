import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VariantManagementComponent } from './variant-management.component';
import { BarModule, CardModule, ListModule, PopoverModule, SelectModule, ToolbarModule } from '@fundamental-ngx/core';

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
        BarModule
    ],
    exports: [
        VariantManagementComponent
    ]
})
export class VariantManagementModule { }
