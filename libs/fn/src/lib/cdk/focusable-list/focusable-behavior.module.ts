import { NgModule } from '@angular/core';
import { FocusableItemDirective } from './focusable-item.directive';
import { FocusableListDirective } from './focusable-list.directive';

@NgModule({
    declarations: [FocusableItemDirective, FocusableListDirective],
    exports: [FocusableItemDirective, FocusableListDirective]
})
export class FocusableBehaviorModule {}
