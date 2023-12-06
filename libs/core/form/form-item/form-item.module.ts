import { NgModule } from '@angular/core';
import { FormItemComponent } from './form-item.component';

/**
 * @deprecated
 * Import `FormItemComponent` directly as a standalone component.
 */
@NgModule({
    imports: [FormItemComponent],
    exports: [FormItemComponent]
})
export class FormItemModule {}
