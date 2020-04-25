import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutGridComponent } from './layout-grid.component';
import { LayoutGridSpanDirective } from './layout-grid-span.directive';

@NgModule({
    declarations: [LayoutGridComponent, LayoutGridSpanDirective],
    imports: [CommonModule],
    exports: [LayoutGridComponent, LayoutGridSpanDirective]
})
export class LayoutGridModule {}
