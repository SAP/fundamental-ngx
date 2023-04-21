import { NgModule } from '@angular/core';
import { DynamicComponentService } from '@fundamental-ngx/cdk/utils';
import { PopoverMobileComponent } from './popover-mobile.component';

@NgModule({
    imports: [PopoverMobileComponent],
    exports: [PopoverMobileComponent],
    providers: [DynamicComponentService]
})
export class PopoverMobileModule {}
