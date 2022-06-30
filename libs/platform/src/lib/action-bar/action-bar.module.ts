import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionBarModule } from '@fundamental-ngx/core/action-bar';
import { PipeModule } from '@fundamental-ngx/core/utils';
import { I18nModule } from '@fundamental-ngx/i18n';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { ActionBarComponent } from './action-bar.component';

@NgModule({
    declarations: [ActionBarComponent],
    imports: [CommonModule, ButtonModule, ActionBarModule, PipeModule, I18nModule],
    exports: [ActionBarComponent]
})
export class PlatformActionBarModule {}
