import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarModule, ButtonModule, DialogModule } from '@fundamental-ngx/core';

import { MultiComboboxMobileComponent } from './multi-combobox/multi-combobox-mobile.component';

@NgModule({
    declarations: [MultiComboboxMobileComponent],
    imports: [BarModule, DialogModule, ButtonModule, CommonModule],
    entryComponents: [MultiComboboxMobileComponent],
    exports: [MultiComboboxMobileComponent]
})
export class PlatformMultiComboboxMobileModule {}
