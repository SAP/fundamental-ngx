import { NgModule } from '@angular/core';
import { FormGroupComponent } from './form-group.component';

/**
 * @deprecated
 * Import `FormGroupComponent` directly as a standalone component.
 */
@NgModule({
    imports: [FormGroupComponent],
    exports: [FormGroupComponent]
})
export class FormGroupModule {}
