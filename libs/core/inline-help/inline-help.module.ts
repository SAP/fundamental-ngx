import { NgModule } from '@angular/core';

import { InlineHelpDirective } from './inline-help.directive';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [InlineHelpDirective],
    exports: [InlineHelpDirective]
})
export class InlineHelpModule {}
