import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TextComponent } from './text.component';
import { LineClampModule } from '../utils/public_api';
import { LinkModule } from '../link/public_api';

@NgModule({
    declarations: [TextComponent],
    imports: [CommonModule, LinkModule, LineClampModule],
    exports: [TextComponent]
})
export class TextModule {}
