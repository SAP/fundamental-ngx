import { NgModule } from '@angular/core';
import { MultiComboboxComponent } from './multi-combobox/multi-combobox.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [MultiComboboxComponent],
    exports: [MultiComboboxComponent]
})
export class PlatformMultiComboboxModule {}
