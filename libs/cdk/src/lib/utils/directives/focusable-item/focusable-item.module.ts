import { NgModule } from '@angular/core';
import { FocusableItemDirective } from './focusable-item.directive';

@NgModule({
    imports: [FocusableItemDirective],
    exports: [FocusableItemDirective]
})
export class FocusableItemModule {}
