import { NgModule } from '@angular/core';
import { ReadonlyBehaviorDirective } from './readonly-behavior.directive';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [ReadonlyBehaviorDirective],
    exports: [ReadonlyBehaviorDirective]
})
export class ReadonlyBehaviorModule {}
