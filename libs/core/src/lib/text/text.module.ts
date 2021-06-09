import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextComponent } from './text.component';
import { LinkModule } from '@fundamental-ngx/core/link';
import { LineClampModule } from '@fundamental-ngx/core/utils';

@NgModule({
    declarations: [TextComponent],
    imports: [CommonModule, LinkModule, LineClampModule],
    exports: [TextComponent]
})
export class TextModule {}
