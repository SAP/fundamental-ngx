import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule, FormModule as FdFormModule } from '@fundamental-ngx/core';
import { CheckboxComponent } from './checkbox.component';

@NgModule({
    declarations: [CheckboxComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FdFormModule, CheckboxModule],
    exports: [CheckboxComponent],
})
export class PlatformCheckboxModule {}
