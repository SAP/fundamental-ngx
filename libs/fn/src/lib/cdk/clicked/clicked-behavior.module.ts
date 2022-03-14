import { NgModule } from '@angular/core';
import { ClickedDirective } from './clicked.directive';

@NgModule({
    declarations: [ClickedDirective],
    exports: [ClickedDirective]
})
export class ClickedBehaviorModule {}
