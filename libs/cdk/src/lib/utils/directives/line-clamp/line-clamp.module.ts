import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LineClampTargetDirective, LineClampDirective } from './line-clamp.directive';

@NgModule({
    imports: [CommonModule],
    exports: [LineClampTargetDirective, LineClampDirective],
    declarations: [LineClampTargetDirective, LineClampDirective]
})
export class LineClampModule {}
