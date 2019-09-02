import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './menu.component';
import { MenuGroupComponent } from './menu-group.component';
import { MenuTitleDirective } from './menu-title.directive';
import { MenuListDirective } from './menu-list.directive';
import { MenuItemDirective } from './menu-item.directive';
import { MenuAddonDirective } from './menu-addon.directive';
import { MenuItemAddonDirective } from './menu-item-addon.directive';

@NgModule({
    imports: [CommonModule],
    exports: [
        MenuComponent,
        MenuGroupComponent,
        MenuTitleDirective,
        MenuListDirective,
        MenuItemDirective,
        MenuAddonDirective,
        MenuItemAddonDirective
    ],
    declarations: [
        MenuComponent,
        MenuGroupComponent,
        MenuTitleDirective,
        MenuListDirective,
        MenuItemDirective,
        MenuAddonDirective,
        MenuItemAddonDirective
    ]
})
export class MenuModule { }
