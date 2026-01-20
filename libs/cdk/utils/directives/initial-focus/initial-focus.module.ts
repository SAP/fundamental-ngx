import { NgModule } from '@angular/core';
import { InitialFocusDirective } from './initial-focus.directive';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [InitialFocusDirective],
    exports: [InitialFocusDirective]
})
export class InitialFocusModule {}
