import { NgModule } from '@angular/core';
import { ResizeDirective } from './resize.directive';

@NgModule({
    declarations: [ResizeDirective],
    exports: [ResizeDirective]
})
export class ResizeBehaviorModule {}
