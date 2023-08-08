import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { MultiComboboxMobileComponent } from './multi-combobox/multi-combobox-mobile.component';
import { I18nModule } from '@fundamental-ngx/i18n';

@NgModule({
    declarations: [MultiComboboxMobileComponent],
    imports: [BarModule, DialogModule, ButtonModule, CommonModule, I18nModule],
    exports: [MultiComboboxMobileComponent]
})
export class PlatformMultiComboboxMobileModule {}
