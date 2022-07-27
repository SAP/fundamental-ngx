import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from '@fundamental-ngx/core/button';
import { PipeModule } from '@fundamental-ngx/core/utils';
import { ButtonComponent } from './button.component';
import { PlatformContentDensityDeprecationsModule } from '@fundamental-ngx/platform/content-density-deprecations';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    imports: [CommonModule, ButtonModule, PipeModule, PlatformContentDensityDeprecationsModule, ContentDensityModule],
    exports: [ButtonComponent, PlatformContentDensityDeprecationsModule, ContentDensityModule],
    declarations: [ButtonComponent]
})
export class PlatformButtonModule {}
