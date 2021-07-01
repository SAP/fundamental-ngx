import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InlineHelpDirective } from './inline-help.directive';
import { PopoverModule } from '@fundamental-ngx/core/popover';

@NgModule({
    imports: [CommonModule, PopoverModule],
    exports: [InlineHelpDirective],
    declarations: [InlineHelpDirective]
})
export class InlineHelpModule {}
