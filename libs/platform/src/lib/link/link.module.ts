import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LinkModule } from '@fundamental-ngx/core/link';
import { LinkComponent } from './link.component';
import { I18nModule } from '@fundamental-ngx/i18n';

@NgModule({
    declarations: [LinkComponent],
    imports: [CommonModule, LinkModule, I18nModule],
    exports: [LinkComponent]
})
export class PlatformLinkModule {}
