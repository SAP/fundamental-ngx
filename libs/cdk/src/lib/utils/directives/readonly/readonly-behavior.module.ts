import { NgModule } from '@angular/core';
import { ReadonlyBehaviorDirective, DeprecatedReadonlyBehaviorDirective } from './readonly-behavior.directive';

@NgModule({
    imports: [ReadonlyBehaviorDirective, DeprecatedReadonlyBehaviorDirective],
    exports: [ReadonlyBehaviorDirective, DeprecatedReadonlyBehaviorDirective]
})
export class ReadonlyBehaviorModule {}
