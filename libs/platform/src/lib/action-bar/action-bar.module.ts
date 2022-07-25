import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionBarModule } from '@fundamental-ngx/core/action-bar';
import { PipeModule } from '@fundamental-ngx/core/utils';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ActionBarComponent } from './action-bar.component';
import { PlatformContentDensityDeprecationsModule } from '@fundamental-ngx/platform/content-density-deprecations';

@NgModule({
    declarations: [ActionBarComponent],
    imports: [CommonModule, ButtonModule, ActionBarModule, PipeModule, PlatformContentDensityDeprecationsModule],
    exports: [ActionBarComponent, PlatformContentDensityDeprecationsModule]
})
export class PlatformActionBarModule {}
