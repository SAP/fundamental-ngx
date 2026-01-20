import { NgModule } from '@angular/core';
import { DynamicComponentService } from '@fundamental-ngx/cdk/utils';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { PopoverMobileComponent } from './popover-mobile.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [DialogModule, ButtonComponent, PopoverMobileComponent],
    exports: [PopoverMobileComponent],
    providers: [DynamicComponentService]
})
export class PopoverMobileModule {}
