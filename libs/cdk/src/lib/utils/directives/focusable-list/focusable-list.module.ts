import { NgModule } from '@angular/core';
import { FocusableListDirective } from './focusable-list.directive';
import { FocusableItemModule } from '../focusable-item';

@NgModule({
    imports: [FocusableItemModule, FocusableListDirective],
    exports: [FocusableListDirective, FocusableItemModule]
})
export class FocusableListModule {}
