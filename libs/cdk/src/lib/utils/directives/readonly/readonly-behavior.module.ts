import { NgModule } from '@angular/core';
import { ReadonlyBehaviorDirective } from './readonly-behavior.directive';

@NgModule({
    imports: [ReadonlyBehaviorDirective],
    exports: [ReadonlyBehaviorDirective]
})
export class ReadonlyBehaviorModule {}
