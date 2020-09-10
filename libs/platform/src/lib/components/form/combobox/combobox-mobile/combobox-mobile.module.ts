import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarModule, ButtonModule, DialogModule } from '@fundamental-ngx/core';

import { ComboboxMobileComponent } from './combobox/combobox-mobile.component';

@NgModule({
    declarations: [ComboboxMobileComponent],
    imports: [BarModule, DialogModule, ButtonModule, CommonModule],
    entryComponents: [ComboboxMobileComponent],
    exports: [ComboboxMobileComponent]
})
export class PlatformComboboxMobileModule {}
