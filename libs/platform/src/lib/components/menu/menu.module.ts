import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu-comp/menu.component';
import { MenuItemComponent } from './menu-comp/menu-item.component';
import { FundamentalNgxCoreModule } from '@fundamental-ngx/core';

@NgModule({
  declarations: [MenuComponent, MenuItemComponent],
  imports: [
    CommonModule,
    FundamentalNgxCoreModule
  ],
  exports: [MenuComponent, MenuItemComponent]
})
export class MenuModule { }
