import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from '@fundamental-ngx/core/button';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { PlatformMenuModule } from '@fundamental-ngx/platform/menu';
import { PipeModule } from '@fundamental-ngx/cdk/utils';
import { SplitMenuButtonComponent } from './split-menu-button.component';
import { PlatformContentDensityDeprecationsModule } from '@fundamental-ngx/platform/shared';

@NgModule({
    declarations: [SplitMenuButtonComponent],
    imports: [
        ButtonModule,
        CommonModule,
        PlatformMenuModule,
        PipeModule,
        PlatformContentDensityDeprecationsModule,
        ContentDensityModule
    ],
    exports: [SplitMenuButtonComponent, PlatformContentDensityDeprecationsModule, ContentDensityModule]
})
export class PlatformSplitMenuButtonModule {}
