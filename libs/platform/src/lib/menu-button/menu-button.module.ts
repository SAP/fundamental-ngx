import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonModule } from '@fundamental-ngx/core/button';
import { PlatformMenuModule } from '@fundamental-ngx/platform/menu';
import { MenuButtonComponent } from './menu-button.component';

@NgModule({
    declarations: [MenuButtonComponent],
    imports: [CommonModule, ButtonModule, PlatformMenuModule],
    exports: [MenuButtonComponent]
})
export class PlatformMenuButtonModule {}
