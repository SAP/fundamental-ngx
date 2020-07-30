import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormModule as FdFormModule } from '@fundamental-ngx/core';
import { CheckboxGroupComponent } from './checkbox-group.component';
import { PlatformCheckboxModule } from '../checkbox/checkbox.module';

@NgModule({
    imports: [CommonModule, PlatformCheckboxModule, FormsModule, FdFormModule, ReactiveFormsModule],
    exports: [CheckboxGroupComponent],
    declarations: [CheckboxGroupComponent]
})
export class PlatformCheckboxGroupModule {}
