import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkComponent } from './link.component';
import { LinkModule } from '@fundamental-ngx/core';

@NgModule({
    declarations: [LinkComponent],
    imports: [CommonModule, LinkModule],
    exports: [LinkComponent]
})
export class PlatformLinkModule {}
