import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormModule as FdFormModule } from '@fundamental-ngx/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextAreaComponent } from './text-area.component';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, FdFormModule],
    exports: [TextAreaComponent],
    declarations: [TextAreaComponent]
})
export class PlatformTextAreaModule {}
