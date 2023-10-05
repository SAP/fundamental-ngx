import { NgModule } from '@angular/core';
import { MultiComboboxComponent } from './multi-combobox.component';
import { SelectAllTogglerComponent } from './select-all-toggler/select-all-toggler.component';

@NgModule({
    imports: [MultiComboboxComponent, SelectAllTogglerComponent],
    exports: [MultiComboboxComponent, SelectAllTogglerComponent]
})
export class MultiComboboxModule {}
