import { NgModule } from '@angular/core';
import { DisabledBehaviorDirective } from './disabled-behavior.directive';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [DisabledBehaviorDirective],
    exports: [DisabledBehaviorDirective]
})
export class DisabledBehaviorModule {}
