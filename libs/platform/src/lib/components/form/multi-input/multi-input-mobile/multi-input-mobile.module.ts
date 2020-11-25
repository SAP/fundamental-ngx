import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlatformMultiInputMobileComponent } from './multi-input-mobile.component';
import { BarModule, ButtonModule, DialogModule } from '@fundamental-ngx/core';

@NgModule({
    declarations: [PlatformMultiInputMobileComponent],
    imports: [CommonModule, BarModule, DialogModule, ButtonModule],
    entryComponents: [PlatformMultiInputMobileComponent],
    exports: [PlatformMultiInputMobileComponent]
})
export class PlatformMultiInputMobileModule {}
