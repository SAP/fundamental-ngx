import { NgModule } from '@angular/core';
import { FocusableItemDirective } from './focusable-item.directive';

@NgModule({
    declarations: [FocusableItemDirective],
    exports: [FocusableItemDirective]
})
export class FocusableItemModule {}
