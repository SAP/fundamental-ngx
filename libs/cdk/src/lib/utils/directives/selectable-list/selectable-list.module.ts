import { NgModule } from '@angular/core';
import { SelectableListDirective } from './selectable-list.directive';
import { SelectableItemDirective } from './selectable-item.directive';

@NgModule({
    imports: [SelectableListDirective, SelectableItemDirective],
    exports: [SelectableListDirective, SelectableItemDirective]
})
export class SelectableListModule {}
