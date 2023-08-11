import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from '@fundamental-ngx/core/button';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { PlatformMenuModule } from '@fundamental-ngx/platform/menu';
import { PipeModule } from '@fundamental-ngx/cdk/utils';
import { SplitMenuButtonComponent } from './split-menu-button.component';

@NgModule({
    declarations: [SplitMenuButtonComponent],
    imports: [ButtonModule, CommonModule, PlatformMenuModule, PipeModule, ContentDensityModule],
    exports: [SplitMenuButtonComponent, ContentDensityModule]
})
export class PlatformSplitMenuButtonModule {}
