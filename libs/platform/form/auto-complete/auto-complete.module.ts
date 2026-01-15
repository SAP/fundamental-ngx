import { NgModule } from '@angular/core';

import { AutoCompleteDirective } from './auto-complete.directive';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [AutoCompleteDirective],
    exports: [AutoCompleteDirective]
})
export class PlatformAutoCompleteModule {}
