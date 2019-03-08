import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './menu.component';
import { MenuGroupComponent } from './menu-group.component';
import { MenuTitleDirective } from './menu-title.directive';
import { MenuListDirective } from './menu-list.directive';
import { MenuItemDirective } from './menu-item.directive';

@NgModule({
    imports: [CommonModule],
    exports: [MenuComponent, MenuGroupComponent, MenuTitleDirective, MenuListDirective, MenuItemDirective],
    declarations: [MenuComponent, MenuGroupComponent, MenuTitleDirective, MenuListDirective, MenuItemDirective]
})
export class MenuModule {}
