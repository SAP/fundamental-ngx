import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkComponent } from './link.component';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';

@NgModule({
    declarations: [LinkComponent],
    imports: [CommonModule, FundamentalNgxCoreModule],
    exports: [LinkComponent]
})
export class LinkModule {}
