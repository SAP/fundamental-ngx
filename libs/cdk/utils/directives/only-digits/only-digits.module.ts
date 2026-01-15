import { NgModule } from '@angular/core';

import { OnlyDigitsDirective } from './only-digits.directive';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [OnlyDigitsDirective],
    exports: [OnlyDigitsDirective]
})
export class OnlyDigitsModule {}
