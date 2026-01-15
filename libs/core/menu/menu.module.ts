import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { DynamicComponentService, InitialFocusModule } from '@fundamental-ngx/cdk/utils';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { GlyphMenuAddonDirective } from './directives/glyph-menu-addon.directive';
import { MenuAddonDirective } from './directives/menu-addon.directive';
import { MenuItemInputDirective } from './directives/menu-item-input.directive';
import { MenuShortcutDirective } from './directives/menu-shortcut.directive';
import { MenuTitleDirective } from './directives/menu-title.directive';
import { MenuTriggerDirective } from './directives/menu-trigger.directive';
import { SegmentedButtonHeaderDirective } from './directives/segmented-button/segmented-button-header.directive';
import { SegmentedButtonOptionDirective } from './directives/segmented-button/segmented-button-option.directive';
import { ToggleButtonDirective } from './directives/toggle-button.directive';
import { MenuInteractiveComponent } from './menu-interactive.component';
import { MenuItemComponent, SubmenuComponent } from './menu-item/menu-item.component';
import { MenuSeparatorDirective } from './menu-separator.directive';
import { MenuComponent } from './menu.component';

/**
 * @deprecated
 * Use direct imports of components and directives.
 */
@NgModule({
    imports: [
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
        ToggleButtonDirective,
        SegmentedButtonHeaderDirective,
        SegmentedButtonOptionDirective,
        MenuItemInputDirective
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
        ToggleButtonDirective,
        SegmentedButtonHeaderDirective,
        SegmentedButtonOptionDirective,
        MenuItemInputDirective
    ],
    providers: [DynamicComponentService]
})
export class MenuModule {}
