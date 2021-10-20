import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LinkModule } from '@fundamental-ngx/core/link';
import { LinkComponent } from './link.component';

@NgModule({
    declarations: [LinkComponent],
    imports: [CommonModule, LinkModule],
    exports: [LinkComponent]
})
export class PlatformLinkModule {}
