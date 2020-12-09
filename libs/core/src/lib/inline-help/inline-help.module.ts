import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InlineHelpDirective } from './inline-help.directive';
import { PopoverModule } from '../popover/public_api';
import { PopoverService } from '../popover/popover-service/popover.service';

@NgModule({
    imports: [CommonModule, PopoverModule],
    exports: [InlineHelpDirective],
    declarations: [InlineHelpDirective]
})
export class InlineHelpModule {}
