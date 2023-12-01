import { NgModule } from '@angular/core';

import { LineClampDirective, LineClampTargetDirective } from './line-clamp.directive';

@NgModule({
    imports: [LineClampTargetDirective, LineClampDirective],
    exports: [LineClampTargetDirective, LineClampDirective]
})
export class LineClampModule {}
