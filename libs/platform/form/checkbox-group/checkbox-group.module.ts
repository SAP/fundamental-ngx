import { NgModule } from '@angular/core';

import { CheckboxGroupComponent } from './checkbox-group.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [CheckboxGroupComponent],
    exports: [CheckboxGroupComponent]
})
export class PlatformCheckboxGroupModule {}
