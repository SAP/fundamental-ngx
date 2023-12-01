import { NgModule } from '@angular/core';

import { ScrollSpyDirective } from './scroll-spy.directive';

/**
 * @deprecated
 * Use direct `ScrollSpyDirective` import.
 */
@NgModule({
    imports: [ScrollSpyDirective],
    exports: [ScrollSpyDirective]
})
export class ScrollSpyModule {}
