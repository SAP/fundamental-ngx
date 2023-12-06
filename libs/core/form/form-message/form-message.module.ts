import { NgModule } from '@angular/core';
import { FormMessageComponent } from './form-message.component';

/**
 * @deprecated
 * Import `FormMessageComponent` directly as a standalone component.
 */
@NgModule({
    imports: [FormMessageComponent],
    exports: [FormMessageComponent]
})
export class FormMessageModule {}
