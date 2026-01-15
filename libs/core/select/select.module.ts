import { NgModule } from '@angular/core';

import { OptionComponent } from './option/option.component';
import { SelectComponent } from './select.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    exports: [SelectComponent, OptionComponent],
    imports: [SelectComponent, OptionComponent]
})
export class SelectModule {}
