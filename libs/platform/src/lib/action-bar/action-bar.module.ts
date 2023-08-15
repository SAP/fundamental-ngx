import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionBarModule } from '@fundamental-ngx/core/action-bar';
import { PipeModule } from '@fundamental-ngx/cdk/utils';
import { I18nModule } from '@fundamental-ngx/i18n';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ActionBarComponent } from './action-bar.component';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    declarations: [ActionBarComponent],
    imports: [CommonModule, ButtonModule, ActionBarModule, PipeModule, ContentDensityModule, I18nModule],
    exports: [ActionBarComponent, ContentDensityModule]
})
export class PlatformActionBarModule {}
