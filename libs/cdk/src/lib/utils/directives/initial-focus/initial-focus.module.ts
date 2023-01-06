import { NgModule } from '@angular/core';
import { InitialFocusDirective, DeprecatedInitialFocusDirective } from './initial-focus.directive';

@NgModule({
    imports: [InitialFocusDirective, DeprecatedInitialFocusDirective],
    exports: [InitialFocusDirective, DeprecatedInitialFocusDirective]
})
export class InitialFocusModule {}
