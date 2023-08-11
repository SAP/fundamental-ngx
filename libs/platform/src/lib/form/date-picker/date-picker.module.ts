import { NgModule } from '@angular/core';
import { PlatformDatePickerComponent } from './date-picker.component';
import { PlatformContentDensityDeprecationsModule } from '@fundamental-ngx/platform/shared';

@NgModule({
    imports: [PlatformDatePickerComponent, PlatformContentDensityDeprecationsModule],
    exports: [PlatformDatePickerComponent, PlatformContentDensityDeprecationsModule]
})
export class PlatformDatePickerModule {}
