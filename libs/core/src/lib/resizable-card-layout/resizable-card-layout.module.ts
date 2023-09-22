import { NgModule } from '@angular/core';

import { ResizableCardItemComponent } from './resizable-card-layout/resizable-card-item/resizable-card-item.component';
import { ResizableCardLayoutComponent } from './resizable-card-layout/resizable-card-layout.component';

/**
 * @deprecated
 * Use direct imports of `ResizableCardLayoutComponent` and `ResizableCardItemComponent`.
 */
@NgModule({
    imports: [ResizableCardLayoutComponent, ResizableCardItemComponent],
    exports: [ResizableCardLayoutComponent, ResizableCardItemComponent]
})
export class ResizableCardLayoutModule {}
