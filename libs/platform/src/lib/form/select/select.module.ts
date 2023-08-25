import { NgModule } from '@angular/core';

import { SelectComponent } from './select/select.component';
import { OptionComponent } from './option/option.component';

@NgModule({
    imports: [SelectComponent, OptionComponent],
    exports: [SelectComponent, OptionComponent]
})
export class PlatformSelectModule {}
