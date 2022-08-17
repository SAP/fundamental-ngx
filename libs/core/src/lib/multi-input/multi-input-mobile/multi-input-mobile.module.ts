import { NgModule } from '@angular/core';
import { BarModule } from '@fundamental-ngx/core/bar';
import { MultiInputMobileComponent } from './multi-input-mobile.component';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [MultiInputMobileComponent],
    imports: [BarModule, DialogModule, ButtonModule, CommonModule],
    exports: [MultiInputMobileComponent]
})
export class MultiInputMobileModule {}
