import { NgModule } from '@angular/core';
import { ResizeHandleDirective } from './resize-handle.directive';
import { ResizeDirective } from './resize.directive';
import { SplitterDirective } from './splitter.directive';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [ResizeDirective, ResizeHandleDirective, SplitterDirective],
    exports: [ResizeDirective, ResizeHandleDirective, SplitterDirective]
})
export class ResizeModule {}
