import { NgModule } from '@angular/core';
import { FocusableDirective } from './focusable.directive';
import { FocusableListDirective } from './focusable-list.directive';

@NgModule({
    declarations: [FocusableDirective, FocusableListDirective],
    exports: [FocusableDirective, FocusableListDirective]
})
export class FocusableBehaviorModule {}
