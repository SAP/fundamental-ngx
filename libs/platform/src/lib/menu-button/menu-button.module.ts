import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from '@fundamental-ngx/core/button';
import { PipeModule } from '@fundamental-ngx/core/utils';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { PlatformMenuModule } from '@fundamental-ngx/platform/menu';
import { PlatformContentDensityDeprecationsModule } from '@fundamental-ngx/platform/shared';
import { MenuButtonComponent } from './menu-button.component';

@NgModule({
    declarations: [MenuButtonComponent],
    imports: [
        CommonModule,
        ButtonModule,
        PlatformMenuModule,
        PipeModule,
        PlatformContentDensityDeprecationsModule,
        ContentDensityModule
    ],
    exports: [MenuButtonComponent, PlatformContentDensityDeprecationsModule, ContentDensityModule]
})
export class PlatformMenuButtonModule {}
