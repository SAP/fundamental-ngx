import { NgModule } from '@angular/core';

import { LineClampDirective, LineClampTargetDirective } from './line-clamp.directive';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [LineClampTargetDirective, LineClampDirective],
    exports: [LineClampTargetDirective, LineClampDirective]
})
export class LineClampModule {}
