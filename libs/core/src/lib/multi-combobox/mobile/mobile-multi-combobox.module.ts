import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { I18nModule } from '@fundamental-ngx/i18n';
import { MobileMultiComboboxComponent } from './mobile-multi-combobox.component';

@NgModule({
    imports: [CommonModule, BarModule, DialogModule, ButtonModule, CommonModule, I18nModule],
    declarations: [MobileMultiComboboxComponent],
    exports: [MobileMultiComboboxComponent]
})
export class MobileMultiComboboxModule {}
