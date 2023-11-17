import { NgModule } from '@angular/core';

import { SelectComponent } from './select/select.component';

@NgModule({
    imports: [SelectComponent],
    exports: [SelectComponent]
})
export class PlatformSelectModule {}
