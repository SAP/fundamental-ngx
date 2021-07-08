import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextAreaComponent } from './text-area.component';
import { FormControlModule } from '@fundamental-ngx/core/form';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FormControlModule],
    exports: [TextAreaComponent],
    declarations: [TextAreaComponent]
})
export class PlatformTextAreaModule {}
