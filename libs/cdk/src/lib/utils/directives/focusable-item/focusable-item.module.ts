import { NgModule } from '@angular/core';
import { FocusableItemDirective, DeprecatedFocusableItemDirective } from './focusable-item.directive';

@NgModule({
    imports: [FocusableItemDirective, DeprecatedFocusableItemDirective],
    exports: [FocusableItemDirective, DeprecatedFocusableItemDirective]
})
export class FocusableItemModule {}
