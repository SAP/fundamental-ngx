import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from '@fundamental-ngx/core/button';
import { PlatformMenuModule } from '@fundamental-ngx/platform/menu';
import { SplitMenuButtonComponent } from './split-menu-button.component';

@NgModule({
    declarations: [SplitMenuButtonComponent],
    imports: [ButtonModule, CommonModule, PlatformMenuModule],
    exports: [SplitMenuButtonComponent]
})
export class PlatformSplitMenuButtonModule {}
