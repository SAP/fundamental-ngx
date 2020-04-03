import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './menu.component';
import { MenuGroupComponent } from './menu-group.component';
import { MenuTitleDirective } from './directives/menu-title.directive';
import { MenuListDirective } from './directives/menu-list.directive';
import { MenuItemDirective } from './directives/menu-item.directive';
import { MenuItemAddonDirective } from './menu-item-addon.directive';
import { MenuLinkDirective } from './directives/menu-link.directive';
import { MenuSeparatorComponent } from './menu-separator/menu-separator.component';
import { MenuAddonDirective } from './directives/menu-addon.directive';
import { PopoverModule } from '../popover/popover.module';
import { MenuItemComponent } from './menu-item/menu-item.component';

@NgModule({
    imports: [CommonModule, PopoverModule],
    declarations: [
        MenuComponent,
        MenuItemComponent,
        MenuAddonDirective,
        MenuSeparatorComponent,
        MenuLinkDirective,
        MenuGroupComponent,
        MenuTitleDirective,
        MenuListDirective,
        MenuItemDirective,
        MenuItemAddonDirective
    ],
    exports: [
        MenuComponent,
        MenuItemComponent,
        MenuSeparatorComponent,
        MenuLinkDirective,
        MenuGroupComponent,
        MenuTitleDirective,
        MenuListDirective,
        MenuItemDirective,
        MenuAddonDirective,
        MenuItemAddonDirective
    ]
})
export class MenuModule {}
