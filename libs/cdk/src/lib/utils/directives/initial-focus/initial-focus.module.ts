import { NgModule } from '@angular/core';
import { InitialFocusDirective } from './initial-focus.directive';

@NgModule({
    imports: [InitialFocusDirective],
    exports: [InitialFocusDirective]
})
export class InitialFocusModule {}
