import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutGridComponent } from './layout-grid.component';
import { LayoutGridRowDirective } from './directives/layout-grid-row.directive';
import { LayoutGridColDirective } from './directives/layout-grid-col.directive';

@NgModule({
    declarations: [LayoutGridComponent, LayoutGridColDirective, LayoutGridRowDirective],
    imports: [CommonModule],
    exports: [LayoutGridComponent, LayoutGridColDirective, LayoutGridRowDirective]
})
export class LayoutGridModule {}
