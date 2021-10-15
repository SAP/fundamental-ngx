import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { CheckboxComponent } from './checkbox.component';

@NgModule({
    declarations: [CheckboxComponent],
    imports: [CommonModule, FormsModule, CheckboxModule],
    exports: [CheckboxComponent]
})
export class PlatformCheckboxModule {}
