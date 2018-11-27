import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './menu.component';
import { MenuGroupComponent } from './menu-group.component';
import { MenuTitleComponent } from './menu-title.component';
import { MenuListComponent } from './menu-list.component';
import { MenuItemComponent } from './menu-item.component';
import { MenuAddonComponent } from './menu-addon.component';

@NgModule({
    imports: [CommonModule],
    exports: [MenuComponent, MenuGroupComponent, MenuTitleComponent, MenuListComponent, MenuItemComponent, MenuAddonComponent],
    declarations: [MenuComponent, MenuGroupComponent, MenuTitleComponent, MenuListComponent, MenuItemComponent, MenuAddonComponent]
})
export class MenuModule {}
