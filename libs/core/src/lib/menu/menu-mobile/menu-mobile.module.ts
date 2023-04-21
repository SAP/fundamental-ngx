import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuMobileComponent } from './menu-mobile.component';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { ButtonModule } from '@fundamental-ngx/core/button';

@NgModule({
    imports: [CommonModule, DialogModule, ButtonModule, MenuMobileComponent],
    exports: [MenuMobileComponent]
})
export class MenuMobileModule {}
