import { NgModule } from '@angular/core';

import { LayoutGridColDirective } from './directives/layout-grid-col.directive';
import { LayoutGridRowDirective } from './directives/layout-grid-row.directive';
import { LayoutGridComponent } from './layout-grid.component';

const components = [LayoutGridComponent, LayoutGridColDirective, LayoutGridRowDirective];

@NgModule({
    imports: [...components],
    exports: [...components]
})
export class LayoutGridModule {}
