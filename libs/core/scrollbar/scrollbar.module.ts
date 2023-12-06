import { NgModule } from '@angular/core';

import { ScrollbarDirective } from './scrollbar.directive';

@NgModule({
    imports: [ScrollbarDirective],
    exports: [ScrollbarDirective]
})
export class ScrollbarModule {}
