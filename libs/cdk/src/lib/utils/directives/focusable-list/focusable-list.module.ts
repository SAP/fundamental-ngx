import { NgModule } from '@angular/core';
import { FocusableListDirective, DeprecatedFocusableListDirective } from './focusable-list.directive';
import { FocusableItemModule } from '../focusable-item';

@NgModule({
    imports: [FocusableItemModule, FocusableListDirective, DeprecatedFocusableListDirective],
    exports: [FocusableListDirective, FocusableItemModule, DeprecatedFocusableListDirective]
})
export class FocusableListModule {}
