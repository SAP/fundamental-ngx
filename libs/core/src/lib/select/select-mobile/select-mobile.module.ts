import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from '@fundamental-ngx/core/button';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { DynamicComponentService } from '@fundamental-ngx/core/utils';
import { SelectMobileComponent } from './select-mobile.component';

@NgModule({
    declarations: [SelectMobileComponent],
    imports: [CommonModule, DialogModule, ButtonModule],
    exports: [SelectMobileComponent],
    providers: [DynamicComponentService]
})
export class SelectMobileModule {}
