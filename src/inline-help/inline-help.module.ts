import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InlineHelp } from './inline-help';

@NgModule({
    imports: [CommonModule],
    exports: [InlineHelp],
    declarations: [InlineHelp]
})
export class InlineHelpModule {}
