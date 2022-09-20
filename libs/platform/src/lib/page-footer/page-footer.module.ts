import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatformFooterComponent } from './page-footer.component';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';

@NgModule({
    declarations: [PlatformFooterComponent],
    imports: [CommonModule, SkeletonModule],
    exports: [PlatformFooterComponent]
})
export class PlatformPageFooterModule {}
