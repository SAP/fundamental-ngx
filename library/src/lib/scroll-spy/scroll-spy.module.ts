import { NgModule } from '@angular/core';

import { ScrollSpyDirective } from './scroll-spy.directive';

@NgModule({
    declarations: [ScrollSpyDirective],
    exports: [ScrollSpyDirective]
})
export class ScrollSpyModule {}
