import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './menu.component';
import { MenuTitleDirective } from './directives/menu-title.directive';
import { MenuInteractiveDirective } from './directives/menu-interactive.directive';
import { MenuSeparatorComponent } from './menu-separator/menu-separator.component';
import { MenuAddonDirective } from './directives/menu-addon.directive';
import { MenuItemComponent, SubmenuComponent } from './menu-item/menu-item.component';
import { MenuShortcutDirective } from './directives/menu-shortcut.directive';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { MenuTriggerDirective } from './directives/menu-trigger.directive';
import { IconModule } from '@fundamental-ngx/core/icon';
import { DynamicComponentService, InitialFocusModule } from '@fundamental-ngx/cdk/utils';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    imports: [CommonModule, PopoverModule, IconModule, InitialFocusModule, ContentDensityModule],
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
        MenuTriggerDirective,
        ContentDensityModule
    ],
    providers: [DynamicComponentService]
})
export class MenuModule {}
