import { NgModule } from '@angular/core';
import { ComboboxItemDirective } from './combobox-item.directive';
import { ComboboxComponent } from './combobox.component';
import { ListGroupPipe } from './list-group.pipe';

/**
 * @deprecated
 * Use `ComboboxComponent` import instead.
 */
@NgModule({
    imports: [ComboboxComponent, ComboboxItemDirective, ListGroupPipe],
    exports: [ComboboxComponent, ComboboxItemDirective, ListGroupPipe]
})
export class ComboboxModule {}
