import { NgModule } from '@angular/core';
import { FormLabelComponent } from './form-label.component';

/**
 * @deprecated
 * Import `FormLabelComponent` directly as a standalone component.
 */
@NgModule({
    imports: [FormLabelComponent],
    exports: [FormLabelComponent]
})
export class FormLabelModule {}
