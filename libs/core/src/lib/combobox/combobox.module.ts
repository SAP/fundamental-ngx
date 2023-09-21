import { NgModule } from '@angular/core';
import { ComboboxComponent } from './combobox.component';
import { ListGroupPipe } from './list-group.pipe';

/**
 * @deprecated
 * Use `ComboboxComponent` import instead.
 */
@NgModule({
    imports: [ComboboxComponent, ListGroupPipe],
    exports: [ComboboxComponent, ListGroupPipe]
})
export class ComboboxModule {}
