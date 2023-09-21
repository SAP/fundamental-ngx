import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DynamicComponentService } from '@fundamental-ngx/cdk/utils';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { SelectMobileComponent } from './select-mobile.component';

@NgModule({
    imports: [CommonModule, DialogModule, ButtonModule, SelectMobileComponent],
    exports: [SelectMobileComponent],
    providers: [DynamicComponentService]
})
export class SelectMobileModule {}
