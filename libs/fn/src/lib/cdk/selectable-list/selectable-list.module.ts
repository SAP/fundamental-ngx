import { NgModule } from '@angular/core';
import { SelectableListDirective } from './selectable-list.directive';
import { SelectableItemDirective } from './selectable-item.directive';

@NgModule({
    declarations: [SelectableListDirective, SelectableItemDirective],
    exports: [SelectableListDirective, SelectableItemDirective]
})
export class SelectableListModule {}
