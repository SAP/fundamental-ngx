import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextComponent } from './text.component';
import { LinkModule } from '@fundamental-ngx/core/link';
import { LineClampModule } from '@fundamental-ngx/core/utils';
import { I18nModule } from '@fundamental-ngx/i18n';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';

@NgModule({
    declarations: [TextComponent],
    imports: [CommonModule, LinkModule, LineClampModule, I18nModule, SkeletonModule],
    exports: [TextComponent]
})
export class TextModule {}
