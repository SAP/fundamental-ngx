import { NgModule } from '@angular/core';
import { MobileModeConfigToken, MobileModeControl, MOBILE_MODE_CONFIG } from '@fundamental-ngx/core/mobile-mode';

const SELECT_MOBILE_CONFIG: MobileModeConfigToken = {
    target: MobileModeControl.SELECT,
    config: { hasCloseButton: true, dialogConfig: { mobileOuterSpacing: true } }
};

@NgModule({
    providers: [{ provide: MOBILE_MODE_CONFIG, useValue: SELECT_MOBILE_CONFIG, multi: true }]
})
class MobileModeGlobalConfigExampleModule {}
