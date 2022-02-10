import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckboxModule } from '@fundamental-ngx/core/checkbox';
import { PipeModule } from '@fundamental-ngx/core/utils';
import { CheckboxComponent } from './checkbox.component';

@NgModule({
    declarations: [CheckboxComponent],
    imports: [CommonModule, FormsModule, CheckboxModule, PipeModule],
    exports: [CheckboxComponent]
})
export class PlatformCheckboxModule {}
