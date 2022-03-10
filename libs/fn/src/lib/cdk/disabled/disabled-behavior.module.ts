import { NgModule } from '@angular/core';
import { DisabledBehaviorDirective } from './disabled-behavior.directive';

@NgModule({
    declarations: [DisabledBehaviorDirective],
    exports: [DisabledBehaviorDirective]
})
export class DisabledBehaviorModule {}
