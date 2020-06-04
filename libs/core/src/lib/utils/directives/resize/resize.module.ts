import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResizeDirective } from './resize.directive';
import { ResizeHandleDirective } from './resize-handle.directive';

@NgModule({
    imports: [CommonModule],
    exports: [ResizeDirective, ResizeHandleDirective],
    declarations: [ResizeDirective, ResizeHandleDirective]
})
export class ResizeModule {}
