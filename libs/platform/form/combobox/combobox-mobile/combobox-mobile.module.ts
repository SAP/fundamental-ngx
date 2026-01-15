import { NgModule } from '@angular/core';
import { ComboboxMobileComponent } from './combobox/combobox-mobile.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [ComboboxMobileComponent],
    exports: [ComboboxMobileComponent]
})
export class PlatformComboboxMobileModule {}
