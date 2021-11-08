import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TruncateTargetDirective, TruncateDirective } from './truncate.directive';

@NgModule({
    imports: [CommonModule],
    exports: [TruncateTargetDirective, TruncateDirective],
    declarations: [TruncateTargetDirective, TruncateDirective]
})
export class TruncateModule {}
