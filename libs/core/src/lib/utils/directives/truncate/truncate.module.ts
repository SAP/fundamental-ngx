import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TruncateDirective } from './truncate.directive';

@NgModule({
    imports: [CommonModule],
    exports: [TruncateDirective],
    declarations: [TruncateDirective]
})
export class TruncateModule {}
