import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutGridComponent } from './layout-grid.component';
import { directives } from './directives';

@NgModule({
    declarations: [LayoutGridComponent, ...directives],
    imports: [CommonModule],
    exports: [LayoutGridComponent, ...directives]
})
export class LayoutGridModule {}
