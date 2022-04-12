import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormLabelComponent } from './form-label.component';
import { IconModule } from '@fundamental-ngx/core/icon';
import { InlineHelpModule } from '@fundamental-ngx/core/inline-help';
import { LinkModule } from '@fundamental-ngx/core/link';

@NgModule({
    imports: [CommonModule, IconModule, InlineHelpModule, LinkModule],
    exports: [FormLabelComponent],
    declarations: [FormLabelComponent]
})
export class FormLabelModule {}
