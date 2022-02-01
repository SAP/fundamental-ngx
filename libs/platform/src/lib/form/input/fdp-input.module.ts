import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FormModule } from '@fundamental-ngx/core/form';
import { PipeModule } from '@fundamental-ngx/core/utils';
import { InputComponent } from './input.component';

@NgModule({
    declarations: [InputComponent],
    imports: [CommonModule, FormModule, FormsModule, PipeModule],
    exports: [InputComponent]
})
export class PlatformInputModule {}
