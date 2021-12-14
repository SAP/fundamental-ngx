import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from '@fundamental-ngx/core/dialog';
import { ButtonModule } from '@fundamental-ngx/core/button';

import { MenuKeydownListenerModule } from '../directives/menu-keydown-listener.directive';
import { MenuMobileComponent } from './menu-mobile.component';

@NgModule({
    declarations: [MenuMobileComponent],
    imports: [CommonModule, DialogModule, ButtonModule, MenuKeydownListenerModule],
    exports: [MenuMobileComponent],
    entryComponents: [MenuMobileComponent]
})
export class MenuMobileModule {}
