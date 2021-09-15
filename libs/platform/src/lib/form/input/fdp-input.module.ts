import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FormModule } from '@fundamental-ngx/core/form';
import { InputComponent } from './input.component';

@NgModule({
    declarations: [InputComponent],
    imports: [CommonModule, FormModule, FormsModule],
    exports: [InputComponent]
})
export class PlatformInputModule {}
