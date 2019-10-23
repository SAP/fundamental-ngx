import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu-component/menu.component';
import { MenuItemComponent } from './menu-component/menu-item.component';
import { FundamentalNgxCoreModule, MenuKeyboardService } from '@fundamental-ngx/core';

@NgModule({
    declarations: [MenuComponent, MenuItemComponent],
    imports: [CommonModule, FundamentalNgxCoreModule],
    exports: [MenuComponent, MenuItemComponent],
    providers: [MenuKeyboardService]
})
export class FdpMenuModule {}
