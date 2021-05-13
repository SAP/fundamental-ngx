import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatformFooterComponent } from './page-footer.component';

@NgModule({
    declarations: [PlatformFooterComponent],
    imports: [CommonModule],
    exports: [PlatformFooterComponent]
})
export class PlatformPageFooterModule {}
