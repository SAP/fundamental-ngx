import { NgModule } from '@angular/core';
import { FormControlComponent } from './form-control.component';

/**
 * @deprecated
 * Import `FormControlComponent` directly as a standalone component.
 */
@NgModule({
    imports: [FormControlComponent],
    exports: [FormControlComponent]
})
export class FormControlModule {}
