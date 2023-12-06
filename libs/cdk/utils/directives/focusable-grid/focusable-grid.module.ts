import { NgModule } from '@angular/core';
import { FocusableListModule } from '../focusable-list';
import { FocusableGridDirective } from './focusable-grid.directive';

@NgModule({
    imports: [FocusableListModule, FocusableGridDirective],
    exports: [FocusableListModule, FocusableGridDirective]
})
export class FocusableGridModule {}
