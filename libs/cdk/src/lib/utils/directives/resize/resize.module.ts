import { NgModule } from '@angular/core';
import { ResizeDirective, DeprecatedResizeDirective } from './resize.directive';
import { ResizeHandleDirective, DeprecatedResizeHandleDirective } from './resize-handle.directive';

@NgModule({
    imports: [ResizeDirective, DeprecatedResizeDirective, ResizeHandleDirective, DeprecatedResizeHandleDirective],
    exports: [ResizeDirective, DeprecatedResizeDirective, ResizeHandleDirective, DeprecatedResizeHandleDirective]
})
export class ResizeModule {}
