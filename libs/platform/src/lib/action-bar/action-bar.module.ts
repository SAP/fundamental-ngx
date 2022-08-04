import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionBarModule } from '@fundamental-ngx/core/action-bar';
import { PipeModule } from '@fundamental-ngx/core/utils';
import { I18nModule } from '@fundamental-ngx/i18n';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ActionBarComponent } from './action-bar.component';
import { PlatformContentDensityDeprecationsModule } from '@fundamental-ngx/platform/shared';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    declarations: [ActionBarComponent],
    imports: [
        CommonModule,
        ButtonModule,
        ActionBarModule,
        PipeModule,
        PlatformContentDensityDeprecationsModule,
        ContentDensityModule,
        I18nModule
    ],
    exports: [ActionBarComponent, PlatformContentDensityDeprecationsModule, ContentDensityModule]
})
export class PlatformActionBarModule {}
