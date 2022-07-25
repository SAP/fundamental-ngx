import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from '@fundamental-ngx/core/button';
import { PipeModule } from '@fundamental-ngx/core/utils';
import { PlatformMenuModule } from '@fundamental-ngx/platform/menu';
import { MenuButtonComponent } from './menu-button.component';
import { PlatformContentDensityDeprecationsModule } from "@fundamental-ngx/platform/content-density-deprecations";

@NgModule({
    declarations: [MenuButtonComponent],
    imports: [CommonModule, ButtonModule, PlatformMenuModule, PipeModule, PlatformContentDensityDeprecationsModule],
    exports: [MenuButtonComponent, PlatformContentDensityDeprecationsModule]
})
export class PlatformMenuButtonModule {}
