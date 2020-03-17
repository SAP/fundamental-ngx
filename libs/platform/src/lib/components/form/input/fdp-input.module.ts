import { NgModule } from '@angular/core';
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
    ]
})
export class FdpInputModule {
}


