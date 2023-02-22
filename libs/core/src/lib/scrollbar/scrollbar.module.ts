import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScrollbarDirective } from './scrollbar.directive';

@NgModule({
    declarations: [],
    imports: [CommonModule, ScrollbarDirective],
    exports: [ScrollbarDirective]
})
export class ScrollbarModule {}
