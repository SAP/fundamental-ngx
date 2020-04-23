import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormModule as FdFormModule } from '@fundamental-ngx/core';
import { InputComponent } from './input.component';

@NgModule({
    declarations: [
        InputComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FdFormModule
    ],
    exports: [
        InputComponent
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ]
})
export class FdpInputModule {}
