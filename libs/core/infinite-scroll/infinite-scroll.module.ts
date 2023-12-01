import { NgModule } from '@angular/core';

import { InfiniteScrollDirective } from './infinite-scroll.directive';

@NgModule({
    imports: [InfiniteScrollDirective],
    exports: [InfiniteScrollDirective]
})
export class InfiniteScrollModule {}
