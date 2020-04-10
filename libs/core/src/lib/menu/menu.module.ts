import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './menu.component';
import { MenuTitleDirective } from './directives/menu-title.directive';
import { MenuLinkDirective } from './directives/menu-link.directive';
import { MenuSeparatorComponent } from './menu-separator/menu-separator.component';
import { MenuAddonDirective } from './directives/menu-addon.directive';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuShortcutDirective } from './directives/menu-shortcut.directive';
import { MenuItemDirective } from './directives/menu-item.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [
        MenuComponent,
        MenuItemComponent,
        MenuAddonDirective,
        MenuSeparatorComponent,
        MenuShortcutDirective,
        MenuLinkDirective,
        MenuTitleDirective,
        MenuItemDirective
    ],
    exports: [
        MenuComponent,
        MenuItemComponent,
        MenuSeparatorComponent,
        MenuShortcutDirective,
        MenuLinkDirective,
        MenuTitleDirective,
        MenuAddonDirective,
        MenuItemDirective
    ]
})
export class MenuModule {}
