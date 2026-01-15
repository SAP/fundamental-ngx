import { NgModule } from '@angular/core';

import { InfiniteScrollDirective } from './infinite-scroll.directive';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [InfiniteScrollDirective],
    exports: [InfiniteScrollDirective]
})
export class InfiniteScrollModule {}
