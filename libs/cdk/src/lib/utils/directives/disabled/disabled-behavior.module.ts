import { NgModule } from '@angular/core';
import { DisabledBehaviorDirective, DeprecatedDisabledBehaviorDirective } from './disabled-behavior.directive';

@NgModule({
    imports: [DisabledBehaviorDirective, DeprecatedDisabledBehaviorDirective],
    exports: [DisabledBehaviorDirective, DeprecatedDisabledBehaviorDirective]
})
export class DisabledBehaviorModule {}
