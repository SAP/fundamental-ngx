import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { DynamicComponentService } from '@fundamental-ngx/cdk/utils';
import { PopoverMobileComponent } from './popover-mobile.component';

@NgModule({
    imports: [CommonModule, DialogModule, ButtonModule, PopoverMobileComponent],
    exports: [PopoverMobileComponent],
    providers: [DynamicComponentService]
})
export class PopoverMobileModule {}
