import { NgModule } from '@angular/core';

import { LayoutGridColDirective } from './directives/layout-grid-col.directive';
import { LayoutGridRowDirective } from './directives/layout-grid-row.directive';
import { LayoutGridComponent } from './layout-grid.component';

const components = [LayoutGridComponent, LayoutGridColDirective, LayoutGridRowDirective];

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [...components],
    exports: [...components]
})
export class LayoutGridModule {}
