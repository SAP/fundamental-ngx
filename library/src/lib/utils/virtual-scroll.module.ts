import { NgModule } from '@angular/core';

import { VirtualScrollDirective } from './virtual-scroll.directive';

@NgModule({
    declarations: [VirtualScrollDirective],
    exports: [VirtualScrollDirective]
})
export class VirtualScrollModule {}
