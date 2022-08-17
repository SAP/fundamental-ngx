import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { PlatformMultiInputMobileComponent } from './multi-input-mobile.component';

@NgModule({
    declarations: [PlatformMultiInputMobileComponent],
    imports: [CommonModule, BarModule, DialogModule, ButtonModule],
    exports: [PlatformMultiInputMobileComponent]
})
export class PlatformMultiInputMobileModule {}
