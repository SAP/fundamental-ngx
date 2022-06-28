import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageStripComponent } from './message-strip.component';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { I18nModule } from '@fundamental-ngx/i18n';

@NgModule({
    declarations: [MessageStripComponent],
    imports: [CommonModule, ButtonModule, I18nModule],
    exports: [MessageStripComponent]
})
export class MessageStripModule {}
