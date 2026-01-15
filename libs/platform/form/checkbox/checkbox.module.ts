import { NgModule } from '@angular/core';
import { CheckboxComponent } from './checkbox.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [CheckboxComponent],
    exports: [CheckboxComponent]
})
export class PlatformCheckboxModule {}
