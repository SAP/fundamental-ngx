import { NgModule } from '@angular/core';

import { ComboboxComponent } from './combobox/combobox.component';
import {
    ComboboxItemDirective,
    ComboboxItemGroupDirective,
    ComboboxSecondaryItemDirective,
    ComboboxSelectedItemDirective
} from './directives/combobox-item.directive';

const EXPORTABLE_COMPONENTS = [
    ComboboxComponent,
    ComboboxItemDirective,
    ComboboxSelectedItemDirective,
    ComboboxItemGroupDirective,
    ComboboxSecondaryItemDirective
];

@NgModule({
    imports: [...EXPORTABLE_COMPONENTS],
    exports: [...EXPORTABLE_COMPONENTS]
})
export class PlatformComboboxModule {}
