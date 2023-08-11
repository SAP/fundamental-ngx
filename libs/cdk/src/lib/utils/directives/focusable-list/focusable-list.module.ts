import { NgModule } from '@angular/core';
import { FocusableListDirective } from './focusable-list.directive';
import { FocusableItemDirective } from '../focusable-item';

@NgModule({
    imports: [FocusableItemDirective, FocusableListDirective],
    exports: [FocusableItemDirective, FocusableListDirective]
})
export class FocusableListModule {}
