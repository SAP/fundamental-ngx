import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormGroupModule } from '@fundamental-ngx/core/form';
import { CheckboxGroupComponent } from './checkbox-group.component';
import { PlatformCheckboxModule } from '../checkbox/checkbox.module';

@NgModule({
    imports: [CommonModule, PlatformCheckboxModule, FormsModule, FormGroupModule],
    exports: [CheckboxGroupComponent],
    declarations: [CheckboxGroupComponent]
})
export class PlatformCheckboxGroupModule {}
