import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './menu.component';
import { MenuTitleDirective } from './directives/menu-title.directive';
import { MenuInteractiveDirective } from './directives/menu-interactive.directive';
import { MenuSeparatorComponent } from './menu-separator/menu-separator.component';
import { MenuAddonDirective } from './directives/menu-addon.directive';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuShortcutDirective } from './directives/menu-shortcut.directive';
import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { PopoverModule } from '../popover/popover.module';
import { MenuTriggerDirective } from './directives/menu-trigger.directive';

@NgModule({
    imports: [CommonModule, PopoverModule],
    declarations: [
        MenuComponent,
        MenuItemComponent,
        MenuAddonDirective,
        MenuSeparatorComponent,
        MenuShortcutDirective,
        MenuInteractiveDirective,
        MenuTitleDirective,
        SubMenuComponent,
        MenuTriggerDirective
    ],
    exports: [
        MenuComponent,
        MenuItemComponent,
        SubMenuComponent,
        MenuSeparatorComponent,
        MenuShortcutDirective,
        MenuInteractiveDirective,
        MenuTitleDirective,
        MenuAddonDirective,
        MenuTriggerDirective
    ]
})
export class MenuModule {}
