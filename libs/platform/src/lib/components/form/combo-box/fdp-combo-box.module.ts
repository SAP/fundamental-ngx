import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ComboboxModule, FormModule as FdFormModule } from '@fundamental-ngx/core';
import { ComboBoxComponent } from './combo-box.component';

@NgModule({
    declarations: [
        ComboBoxComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FdFormModule,
        ComboboxModule
    ],
    exports: [
        ComboBoxComponent
    ]
})
export class FdpComboBoxModule {
}


