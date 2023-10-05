import { NgModule } from '@angular/core';

import { OptionComponent } from './option/option.component';
import { SelectComponent } from './select.component';

@NgModule({
    exports: [SelectComponent, OptionComponent],
    imports: [SelectComponent, OptionComponent]
})
export class SelectModule {}
