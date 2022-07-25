import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from '@fundamental-ngx/core/button';
import { PlatformMenuModule } from '@fundamental-ngx/platform/menu';
import { PipeModule } from '@fundamental-ngx/core/utils';
import { SplitMenuButtonComponent } from './split-menu-button.component';
import { PlatformContentDensityDeprecationsModule } from '@fundamental-ngx/platform/content-density-deprecations';

@NgModule({
    declarations: [SplitMenuButtonComponent],
    imports: [ButtonModule, CommonModule, PlatformMenuModule, PipeModule, PlatformContentDensityDeprecationsModule],
    exports: [SplitMenuButtonComponent, PlatformContentDensityDeprecationsModule]
})
export class PlatformSplitMenuButtonModule {}
