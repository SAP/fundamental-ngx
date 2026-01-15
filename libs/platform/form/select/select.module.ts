import { NgModule } from '@angular/core';

import { SelectComponent } from './select/select.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [SelectComponent],
    exports: [SelectComponent]
})
export class PlatformSelectModule {}
