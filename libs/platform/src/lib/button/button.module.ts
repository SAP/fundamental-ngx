import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from '@fundamental-ngx/core/button';
import { PipeModule } from '@fundamental-ngx/core/utils';
import { ButtonComponent } from './button.component';
import { PlatformContentDensityDeprecationsModule } from '@fundamental-ngx/platform/content-density-deprecations';

@NgModule({
    imports: [CommonModule, ButtonModule, PipeModule, PlatformContentDensityDeprecationsModule],
    exports: [ButtonComponent, PlatformContentDensityDeprecationsModule],
    declarations: [ButtonComponent]
})
export class PlatformButtonModule {}
