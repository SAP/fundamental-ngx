import { NgModule } from '@angular/core';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ComboboxMobileComponent } from './combobox-mobile.component';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [ComboboxMobileComponent],
    imports: [BarModule, DialogModule, ButtonModule, CommonModule],
    exports: [ComboboxMobileComponent]
})
export class ComboboxMobileModule {}
