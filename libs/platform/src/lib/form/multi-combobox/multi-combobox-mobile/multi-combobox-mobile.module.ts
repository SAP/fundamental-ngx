import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { MultiComboboxMobileComponent } from './multi-combobox/multi-combobox-mobile.component';

@NgModule({
    declarations: [MultiComboboxMobileComponent],
    imports: [BarModule, DialogModule, ButtonModule, CommonModule],
    exports: [MultiComboboxMobileComponent]
})
export class PlatformMultiComboboxMobileModule {}
