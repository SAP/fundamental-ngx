import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InitialFocusModule } from '@fundamental-ngx/core/utils';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { IconModule } from '@fundamental-ngx/core/icon';

import { MenuComponent } from './menu.component';
import { MenuTitleDirective } from './directives/menu-title.directive';
import { MenuInteractiveDirective } from './directives/menu-interactive.directive';
import { MenuSeparatorComponent } from './menu-separator/menu-separator.component';
import { MenuAddonDirective } from './directives/menu-addon.directive';
import { MenuItemComponent, SubmenuComponent } from './menu-item/menu-item.component';
import { MenuShortcutDirective } from './directives/menu-shortcut.directive';
import { MenuTriggerDirective } from './directives/menu-trigger.directive';
import { MenuKeydownListenerModule } from './directives/menu-keydown-listener.directive';

@NgModule({
    imports: [CommonModule, PopoverModule, IconModule, InitialFocusModule, MenuKeydownListenerModule],
    declarations: [
        MenuComponent,
        MenuItemComponent,
        MenuAddonDirective,
        MenuSeparatorComponent,
        MenuShortcutDirective,
        MenuInteractiveDirective,
        MenuTitleDirective,
        SubmenuComponent,
        MenuTriggerDirective
    ],
    exports: [
        MenuComponent,
        MenuItemComponent,
        SubmenuComponent,
        MenuSeparatorComponent,
        MenuShortcutDirective,
        MenuInteractiveDirective,
        MenuTitleDirective,
        MenuAddonDirective,
        MenuTriggerDirective
    ]
})
export class MenuModule {}
