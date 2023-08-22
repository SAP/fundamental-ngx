import { NgModule } from '@angular/core';

import { LineClampTargetDirective, LineClampDirective } from './line-clamp.directive';

@NgModule({
    imports: [LineClampTargetDirective, LineClampDirective],
    exports: [LineClampTargetDirective, LineClampDirective]
})
export class LineClampModule {}
