import { NgModule } from '@angular/core';

import { InfiniteScrollDirective } from './infinite-scroll.directive';

@NgModule({
    declarations: [InfiniteScrollDirective],
    exports: [InfiniteScrollDirective]
})
export class InfiniteScrollModule {}
