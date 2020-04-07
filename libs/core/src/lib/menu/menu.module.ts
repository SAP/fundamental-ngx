import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './menu.component';
import { MenuTitleDirective } from './directives/menu-title.directive';
import { MenuListDirective } from './directives/menu-list.directive';
import { MenuItemDirective } from './directives/menu-item.directive';
import { MenuItemAddonDirective } from './menu-item-addon.directive';
import { MenuLinkDirective } from './directives/menu-link.directive';
import { MenuSeparatorComponent } from './menu-separator/menu-separator.component';
import { MenuAddonDirective } from './directives/menu-addon.directive';
import { PopoverModule } from '../popover/popover.module';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuShortcutDirective } from './directives/menu-shortcut.directive';
import { DialogModule } from '../dialog/dialog.module';
import { ButtonModule } from '../button/button.module';

@NgModule({
    imports: [CommonModule, PopoverModule, DialogModule, ButtonModule],
    declarations: [
        MenuComponent,
        MenuItemComponent,
        MenuAddonDirective,
        MenuSeparatorComponent,
        MenuShortcutDirective,
        MenuLinkDirective,
        MenuTitleDirective,
        MenuListDirective,
        MenuItemDirective,
        MenuItemAddonDirective
    ],
    exports: [
        MenuComponent,
        MenuItemComponent,
        MenuSeparatorComponent,
        MenuShortcutDirective,
        MenuLinkDirective,
        MenuTitleDirective,
        MenuListDirective,
        MenuItemDirective,
        MenuAddonDirective,
        MenuItemAddonDirective
    ]
})
export class MenuModule {}
