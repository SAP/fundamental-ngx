import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TruncationDirective } from './truncation.directive';

@NgModule({
    imports: [CommonModule],
    exports: [TruncationDirective],
    declarations: [TruncationDirective]
})
export class TruncationModule {}
