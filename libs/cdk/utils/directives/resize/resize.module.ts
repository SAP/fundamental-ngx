import { NgModule } from '@angular/core';
import { ResizeHandleDirective } from './resize-handle.directive';
import { ResizeDirective } from './resize.directive';

@NgModule({
    imports: [ResizeDirective, ResizeHandleDirective],
    exports: [ResizeDirective, ResizeHandleDirective]
})
export class ResizeModule {}
