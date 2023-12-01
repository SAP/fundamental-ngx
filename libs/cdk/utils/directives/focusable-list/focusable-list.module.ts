import { NgModule } from '@angular/core';
import { FocusableItemDirective } from '../focusable-item';
import { FocusableListDirective } from './focusable-list.directive';

@NgModule({
    imports: [FocusableItemDirective, FocusableListDirective],
    exports: [FocusableItemDirective, FocusableListDirective]
})
export class FocusableListModule {}
