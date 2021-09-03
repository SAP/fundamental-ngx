import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormControlModule } from '@fundamental-ngx/core/form';
import { TextAreaComponent } from './text-area.component';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FormControlModule],
    exports: [TextAreaComponent],
    declarations: [TextAreaComponent]
})
export class PlatformTextAreaModule {}
