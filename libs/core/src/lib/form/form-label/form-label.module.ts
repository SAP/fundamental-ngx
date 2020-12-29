import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormLabelComponent } from './form-label.component';
import { IconModule } from '../../icon/icon.module';
import { InlineHelpModule } from '../../inline-help/inline-help.module';

@NgModule({
    imports: [CommonModule, IconModule, InlineHelpModule],
    exports: [FormLabelComponent],
    declarations: [FormLabelComponent]
})
export class FormLabelModule {}
