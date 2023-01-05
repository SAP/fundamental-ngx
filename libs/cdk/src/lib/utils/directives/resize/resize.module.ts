import { NgModule } from '@angular/core';
import { ResizeDirective } from './resize.directive';
import { ResizeHandleDirective } from './resize-handle.directive';

@NgModule({
    imports: [ResizeDirective, ResizeHandleDirective],
    exports: [ResizeDirective, ResizeHandleDirective]
})
export class ResizeModule {}
