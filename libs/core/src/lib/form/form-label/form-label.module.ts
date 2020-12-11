import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormLabelComponent } from './form-label.component';
import { FormHelpDirective } from './form-help.directive';

@NgModule({
    imports: [CommonModule],
    exports: [FormLabelComponent, FormHelpDirective],
    declarations: [FormLabelComponent, FormHelpDirective]
})
export class FormLabelModule {}
