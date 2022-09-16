import { NgModule } from '@angular/core';
import { DialogConfig } from '@fundamental-ngx/core/dialog';
import { MOBILE_MODE_CONFIG, MobileModeConfigToken, MobileModeControl } from '@fundamental-ngx/core/mobile-mode';

export const MOBILE_DIALOG_PORTRAIT: DialogConfig = {
    width: '360px',
    height: '640px'
};

export const POPOVER_MOBILE_CONFIG: MobileModeConfigToken = {
    target: MobileModeControl.POPOVER,
    config: { dialogConfig: MOBILE_DIALOG_PORTRAIT }
};

@NgModule({
    providers: [{ provide: MOBILE_MODE_CONFIG, useValue: POPOVER_MOBILE_CONFIG, multi: true }]
})
export class PopoverMobileGlobalConfigExampleModule {}
