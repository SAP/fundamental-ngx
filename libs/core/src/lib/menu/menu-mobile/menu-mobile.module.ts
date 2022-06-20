import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuMobileComponent } from './menu-mobile.component';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { ButtonModule } from '@fundamental-ngx/core/button';

@NgModule({
    declarations: [MenuMobileComponent],
    imports: [CommonModule, DialogModule, ButtonModule],
    exports: [MenuMobileComponent]
})
export class MenuMobileModule {}
