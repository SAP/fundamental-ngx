import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextComponent } from './text.component';
import { LinkModule } from '@fundamental-ngx/core/link';
import { LineClampModule } from '@fundamental-ngx/cdk/utils';
import { I18nModule } from '@fundamental-ngx/i18n';

@NgModule({
    declarations: [TextComponent],
    imports: [CommonModule, LinkModule, LineClampModule, I18nModule],
    exports: [TextComponent]
})
export class TextModule {}
