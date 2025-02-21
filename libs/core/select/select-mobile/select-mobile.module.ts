import { NgModule } from '@angular/core';
import { DynamicComponentService } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { SelectMobileComponent } from './select-mobile.component';

@NgModule({
    imports: [DialogModule, ButtonComponent, SelectMobileComponent],
    exports: [SelectMobileComponent],
    providers: [DynamicComponentService]
})
export class SelectMobileModule {}
