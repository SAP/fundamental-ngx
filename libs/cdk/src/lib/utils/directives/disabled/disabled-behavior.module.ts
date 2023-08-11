import { NgModule } from '@angular/core';
import { DisabledBehaviorDirective } from './disabled-behavior.directive';

@NgModule({
    imports: [DisabledBehaviorDirective],
    exports: [DisabledBehaviorDirective]
})
export class DisabledBehaviorModule {}
