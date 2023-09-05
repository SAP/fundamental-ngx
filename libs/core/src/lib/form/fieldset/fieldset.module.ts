import { NgModule } from '@angular/core';
import { FieldsetComponent } from './fieldset.component';

/**
 * @deprecated
 * Import `FieldsetComponent` directly as a standalone component.
 */
@NgModule({
    imports: [FieldsetComponent],
    exports: [FieldsetComponent]
})
export class FieldSetModule {}
