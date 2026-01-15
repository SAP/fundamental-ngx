import { NgModule } from '@angular/core';

import { ScrollbarDirective } from './scrollbar.directive';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [ScrollbarDirective],
    exports: [ScrollbarDirective]
})
export class ScrollbarModule {}
