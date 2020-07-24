import { NgModule } from '@angular/core';
import { BarModule } from '../../bar/bar.module';
import { ComboboxMobileComponent } from './combobox-mobile.component';
import { ButtonModule } from '../../button/button.module';
import { DialogModule } from '../../dialog/dialog.module';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [ComboboxMobileComponent],
    imports: [BarModule, DialogModule, ButtonModule, CommonModule],
    entryComponents: [ ComboboxMobileComponent ],
    exports: [ComboboxMobileComponent]
})
export class ComboboxMobileModule {}
