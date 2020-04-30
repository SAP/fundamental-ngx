import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '@fundamental-ngx/core';
import { PlatformMenuModule } from './../menu/menu.module';
import { SplitMenuButtonComponent } from './split-menu-button.component';

@NgModule({
    declarations: [SplitMenuButtonComponent],
    imports: [ButtonModule, CommonModule, PlatformMenuModule],
    exports: [SplitMenuButtonComponent],
})
export class PlatformSplitMenuButtonModule {}
