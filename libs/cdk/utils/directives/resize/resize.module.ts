import { NgModule } from '@angular/core';
import { ResizeHandleDirective } from './resize-handle.directive';
import { ResizeDirective } from './resize.directive';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [ResizeDirective, ResizeHandleDirective],
    exports: [ResizeDirective, ResizeHandleDirective]
})
export class ResizeModule {}
