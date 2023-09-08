import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { MenuMobileComponent } from './menu-mobile.component';

@NgModule({
    imports: [CommonModule, DialogModule, ButtonModule, MenuMobileComponent],
    exports: [MenuMobileComponent]
})
export class MenuMobileModule {}
