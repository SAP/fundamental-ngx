import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './menu.component';
import { MenuTitleDirective } from './directives/menu-title.directive';
import { MenuListDirective } from './directives/menu-list.directive';
import { MenuLinkDirective } from './directives/menu-link.directive';
import { MenuSeparatorComponent } from './menu-separator/menu-separator.component';
import { MenuAddonDirective } from './directives/menu-addon.directive';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuShortcutDirective } from './directives/menu-shortcut.directive';
import { DialogModule } from '../dialog/dialog.module';
import { ButtonModule } from '../button/button.module';
import { MenuItemDirective } from './directives/menu-item.directive';

@NgModule({
    imports: [CommonModule, DialogModule, ButtonModule],
    declarations: [
        MenuComponent,
        MenuItemComponent,
        MenuAddonDirective,
        MenuSeparatorComponent,
        MenuShortcutDirective,
        MenuLinkDirective,
        MenuTitleDirective,
        MenuListDirective,
        MenuItemDirective
    ],
    exports: [
        MenuComponent,
        MenuItemComponent,
        MenuSeparatorComponent,
        MenuShortcutDirective,
        MenuLinkDirective,
        MenuTitleDirective,
        MenuListDirective,
        MenuAddonDirective,
        MenuItemDirective
    ]
})
export class MenuModule {}
