import { NgModule } from '@angular/core';
import { SelectableItemDirective } from './selectable-item.directive';
import { SelectableListDirective } from './selectable-list.directive';

@NgModule({
    imports: [SelectableListDirective, SelectableItemDirective],
    exports: [SelectableListDirective, SelectableItemDirective]
})
export class SelectableListModule {}
