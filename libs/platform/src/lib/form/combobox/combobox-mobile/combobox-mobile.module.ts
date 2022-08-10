import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { ComboboxMobileComponent } from './combobox/combobox-mobile.component';

@NgModule({
    declarations: [ComboboxMobileComponent],
    imports: [BarModule, DialogModule, ButtonModule, CommonModule],
    exports: [ComboboxMobileComponent]
})
export class PlatformComboboxMobileModule {}
