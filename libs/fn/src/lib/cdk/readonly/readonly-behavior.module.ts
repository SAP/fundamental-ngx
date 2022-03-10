import { NgModule } from '@angular/core';
import { ReadonlyBehaviorDirective } from './readonly-behavior.directive';

@NgModule({
    declarations: [ReadonlyBehaviorDirective],
    exports: [ReadonlyBehaviorDirective]
})
export class ReadonlyBehaviorModule {}
