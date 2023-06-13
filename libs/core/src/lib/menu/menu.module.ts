import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './menu.component';
import { MenuTitleDirective } from './directives/menu-title.directive';
import { MenuInteractiveComponent } from './directives/menu-interactive.component';
import { MenuSeparatorDirective } from './menu-separator.directive';
import { MenuAddonDirective } from './directives/menu-addon.directive';
import { MenuItemComponent, SubmenuComponent } from './menu-item/menu-item.component';
import { MenuShortcutDirective } from './directives/menu-shortcut.directive';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { MenuTriggerDirective } from './directives/menu-trigger.directive';
import { DynamicComponentService, InitialFocusModule } from '@fundamental-ngx/cdk/utils';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { GlyphMenuAddonDirective } from './directives/glyph-menu-addon.directive';
import { PortalModule } from '@angular/cdk/portal';
import { ToggleButtonDirective } from './directives/toggle-button.directive';

@NgModule({
    imports: [
        CommonModule,
        PopoverModule,
        InitialFocusModule,
        ContentDensityModule,
        GlyphMenuAddonDirective,
        PortalModule,
        MenuComponent,
        MenuItemComponent,
        MenuAddonDirective,
        MenuSeparatorDirective,
        MenuShortcutDirective,
        MenuInteractiveComponent,
        MenuTitleDirective,
        SubmenuComponent,
        MenuTriggerDirective,
        ToggleButtonDirective
    ],
    exports: [
        MenuComponent,
        MenuItemComponent,
        SubmenuComponent,
        MenuSeparatorDirective,
        MenuShortcutDirective,
        MenuInteractiveComponent,
        MenuTitleDirective,
        MenuAddonDirective,
        MenuTriggerDirective,
        ContentDensityModule,
        GlyphMenuAddonDirective,
        ToggleButtonDirective
    ],
    providers: [DynamicComponentService]
})
export class MenuModule {}
